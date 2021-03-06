// 1件の情報取得処理
const mysql = require("mysql");
const config = require("C:\\Users\\syama\\Desktop\\sample-project\\config.js");
getTasks = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id;";
    let d = [body.taskName, body.deadline, body.category];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (e) {
    console.log(e);
  } finally {
    connection.end();
  }
};
