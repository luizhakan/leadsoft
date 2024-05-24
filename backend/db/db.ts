import { Pool } from 'pg';

const pool = new Pool({
  user: "leadsoftteste",
  host: "db",
  database: "leadsoftdb",
  password: "senha-leadsoft",
  port: 5432,
});

export default pool;
