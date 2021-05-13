import sql from "mssql";

const sqlConfig = {
  user: "sa",
  password: "123456",
  database: "alice",
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

export async function getUsers() {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query("SELECT * from Bank");
    //console.log(result.recordset);
    //sql.close();
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

//getUsers();
