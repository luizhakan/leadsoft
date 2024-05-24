import pool from "../db/db";
import * as fs from 'fs';
import * as readline from 'readline';
import path from 'path';

let isProcessing = false;
let processingPaused = false;
let readInterface: readline.Interface | null = null;


const app = async (req: any, res: any) => {
  res.send('Olá, mundo!');
};

const login = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const result = await pool.query('SELECT * FROM "User" WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.status(200).json({ message: 'Logado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const createUser = async (req: any, res: any) => {
  try {
    const { username, password, role } = req.body;

    const result = await pool.query(
      'INSERT INTO "User" (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role]
    );
    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getUsers = async (req: any, res: any) => {
  try {
    const result = await pool.query('SELECT * FROM "User"');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const processStart = async (req: any, res: any) => {
  if (isProcessing) {
    return res.status(400).json({ error: 'Processamento já está em andamento' });
  }

  isProcessing = true;
  processingPaused = false;

  const csvData = req.body;

  if (!csvData || !Array.isArray(csvData) || csvData.length === 0) {
    console.error('Dados inválidos');
    isProcessing = false;
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const filePath = 'data.csv';

  fs.writeFileSync(filePath, csvData.join('\n'));

  readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  let lineCount = 0;
  readInterface.on('line', async (line) => {
    if (processingPaused) {
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (!processingPaused) {
            clearInterval(checkInterval);
            resolve(null);
          }
        }, 1000);
      });
    }

    if (lineCount > 0) {
      const [gender, title, type, source, userId] = line.split(';');
      console.log(`Linha ${lineCount}:`, gender, title, type, source, userId);

      // Validate userId
      const userIdInt = parseInt(userId, 10);
      if (isNaN(userIdInt)) {
        console.error('Valor inválido para userId:', userId);
        return;
      }

      try {
        await pool.query(
          'INSERT INTO "Anime" (gender, title, type, source, userId) VALUES ($1, $2, $3, $4, $5)',
          [gender, title, type, source, userIdInt]
        );

        console.log(`Linha ${lineCount} inserida com sucesso`);
      } catch (error) {
        console.error('Erro ao inserir dados no banco de dados:', error);
      }
    }
    lineCount++;

    if (lineCount === 10) {
      readInterface?.close();
    }
  });

  readInterface.on('close', () => {
    isProcessing = false;
    fs.unlinkSync(filePath);
  });

  res.json({ message: 'Processamento iniciado com sucesso' });
};

const processPause = async (req: any, res: any) => {
  if (!isProcessing) {
    return res.status(400).json({ error: 'Nenhum processamento em andamento' });
  }

  processingPaused = true;

  if (readInterface) {
    readInterface.close();
  }

  res.json({ message: 'Processamento pausado e encerrado com sucesso' });
};

const uploadCSV = async (req: any, res: any) => {
  res.json({ message: 'Arquivo CSV carregado com sucesso' });
};

const animes = async (req: any, res: any) => {
  try {
    const result = await pool.query('SELECT * FROM "Anime" LIMIT 100');
    const animeCount = result.rowCount;

    res.json({ animes: result.rows, animeCount });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const logout = async (req: any, res: any) => {
  res.json({ message: 'Logout realizado com sucesso' });
};

export {
  login,
  createUser,
  getUsers,
  processStart,
  processPause,
  logout,
  uploadCSV,
  animes
};
