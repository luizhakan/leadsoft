import { useEffect, useState } from "react";
import Header from "../../components/header/Header";

type Anime = {
  id: number;
  gender: string;
  title: string;
  type: string;
  source: string;
};

const Items = () => {
  const [loading, setLoading] = useState(true);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [csvData, setCsvData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/animes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAnimes(data.animes || []);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ color: "#10D1E9" }}>Carregando...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (e: any) => {
      const contents = e.target.result;
      setCsvData(contents.split('\n'));
    };

    reader.readAsText(file);
  };

  const handleProcessStart = async () => {
    try {
      const response = await fetch('http://localhost:5000/process/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(csvData),
      });

      if (!response.ok) {
        throw new Error('Erro ao iniciar o processamento');
      }

      console.log('Processamento iniciado com sucesso');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao iniciar o processamento:', error);
    }
  };

  const handleProcessStop = async () => {
    try {
      const response = await fetch('http://localhost:5000/process/pause', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Erro ao parar o processamento');
      }
      console.log('Processamento parado com sucesso');
    } catch (error) {
      console.error('Erro ao parar o processamento:', error);
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div
        style={{
          backgroundColor: "#383837",
          color: "#145EF4",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* upar csv para processar */}
        <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{
          marginBottom: "20px",
          width: "100%",
          padding: "10px",
          border: "1px solid #10D1E9",
          borderRadius: "4px",
          color: "#10D1E9",
          backgroundColor: "#383837",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          appearance: "none",
        }}
      />

      <button
        onClick={handleProcessStart}
        style={{
          backgroundColor: "#10D1E9",
          color: "#383837",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Processar
      </button>

      <button
        onClick={handleProcessStop}
        style={{
          backgroundColor: "#10D1E9",
          color: "#383837",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          marginLeft: "10px",
        }}
      >
        Parar
      </button>
          
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #10D1E9', padding: '10px', textAlign: 'center' }}>Id</th>
            <th style={{ borderBottom: '2px solid #10D1E9', padding: '10px', textAlign: 'center' }}>Gender</th>
            <th style={{ borderBottom: '2px solid #10D1E9', padding: '10px', textAlign: 'center' }}>Title</th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime) => (
            <tr key={anime.id}>
              <td style={{ borderBottom: '1px solid #145EF4', padding: '10px', textAlign: 'center' }}>{anime.id}</td>
              <td style={{ borderBottom: '1px solid #145EF4', padding: '10px', textAlign: 'center' }}>{anime.gender}</td>
              <td style={{ borderBottom: '1px solid #145EF4', padding: '10px', textAlign: 'center' }}>{anime.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </>
  );
};

export default Items;
