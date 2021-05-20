import sql from "mssql";

const sqlConfig = {
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

export async function getAdmin() {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query("SELECT * from tblAdmin");
    console.log(typeof result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}
export async function getChuXe() {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query("SELECT * from tblChuXe");
    console.log(typeof result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}
export async function getNhaXe() {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query("SELECT * from tblNhaXe");
    console.log(typeof result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}
