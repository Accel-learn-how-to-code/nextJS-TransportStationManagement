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

export async function getAllUsers() {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .query(
        "select id, UsersName, AccountType, TelNo, Email, Gender from tblAccount"
      );
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUsers(selectedUser) {
  try {
    let pool = await sql.connect(sqlConfig);
    await pool
      .request()
      .query("DELETE FROM tblAccount WHERE id IN (" + selectedUser + ")");
  } catch (error) {
    console.log(error);
  }
}
