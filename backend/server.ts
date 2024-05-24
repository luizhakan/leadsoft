import express from 'express';
import bodyParser from 'body-parser';
import {
  login,
  createUser,
  getUsers,
  processStart,
  processPause,
  logout,
  animes
} from './routes/routes';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  credentials: true
};

const app = express();
const port = 5000;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req: any, res: any) => {
  res.send('Olá, mundo!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
  res.send('Olá, mundo!');});

app.post('/users/login', login)

app.post('/users/create', createUser);

app.get('/users', getUsers);

app.post('/process/start', processStart);

app.post('/process/pause', processPause);

app.get('/animes', animes);

app.get('/logout', logout);

app.listen(port, () => {
  console.log(`Servidor rodandoo em http://localhost:${port}`);
});