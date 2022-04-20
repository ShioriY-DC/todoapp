// 新規登録処理
const mysql = require("mysql");
const config = require("C:\\Users\\syama\\Desktop\\sample-project\\config.js");
//"C:\Users\syama\Desktop\sample-project\config.js"
postTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);

    const sql =
      "insert into todoapp.t_task(task_name, deadline, category_id)values (?,?,?);";
    let d = [body.taskName, body.deadline, body.category];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (e) {
    console.log(e);
  } finally {
    connection.end();
  }
};
