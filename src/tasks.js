const mysql = require("mysql2/promise");
const config = require("../config.js");

postTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "insert into todoapp.t_task(task_name, deadline, category_id)values (?,?,?);"; //?は後から配列で設定
    let d = [body.TaskName, body.Deadline, body.Category];
    const [rows, fields] = await connection.query(sql, d); //実際に当てはめる動作
    //console.log(rows);
    return rows;
  } catch (e) {
    console.log(e);
  } finally {
    connection.end();
  }
};

getTasks = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id;";
    const [rows, fields] = await connection.query(sql);
    return rows;
  } catch (e) {
    console.log(e);
  } finally {
    connection.end();
  }
};

getTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id where t_task.id = ?;";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

patchTasksId = async function (id, body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "update t_task set task_name =?,deadline=?,category_id=?,task_status=?,updated_at=? where id=?;";
    let d = [
      body.taskName,
      body.deadline,
      body.category,
      body.status,
      new Date(),
      id,
    ];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (e) {
    console.log(e);
  } finally {
    connection.end();
  }
};

deleteTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql = "delete from t_task where id = ?;";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (e) {
    console.log(e);
  } finally {
    connection.end();
  }
};

exports.postTasks = postTasks;
exports.getTasks = getTasks;
exports.getTasksId = getTasksId;
exports.patchTasksId = patchTasksId;
exports.deleteTasksId = deleteTasksId;
