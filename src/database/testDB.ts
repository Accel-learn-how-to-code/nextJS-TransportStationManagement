import sql from "mssql";

export const sqlConfig = {
  user: "sa",
  password: "123456",
  database: "QLBenXe",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true,
  },
};
