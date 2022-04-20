var express = require("express");
var router = express.Router();
const tasks = require("../../src/tasks.js");
/*タスク登録*/
router.post("/tasks", async function (req, res, next) {
  //console.log(req.body);
  const postTasks = await tasks.postTasks(req.body);
  //req.bodyはフォームの中身
  res.send(postTasks);
});

//タスク一覧を取得するルーティング
router.get("/tasks", async function (req, res, next) {
  //console.log(req.body);
  const getTasks = await tasks.getTasks();
  res.send(getTasks);
});

/*タスクを一件取得*/
router.get("/tasks/:id", async function (req, res, next) {
  //console.log(req.body);
  const getTasksId = await tasks.getTasksId(req.params.id);
  res.send(getTasksId);
});

/*更新*/
router.patch("/tasks/:id", async function (req, res, next) {
  //console.log(req.body);
  const patchTasksId = await tasks.patchTasksId(req.params.id, req.body);
  res.send(patchTasksId);
});
/*削除*/
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTasksId = await tasks.deleteTasksId(req.params.id);
  res.send(deleteTasksId);
});

/* 商品一覧を取得するルーティング */
/*
router.get("/items", function (req, res, next) {
  const itemsList = items.getListItem();
  res.send(itemsList);
});*/

/*１件の商品情報を取得するルーティング */
/*
router.get("/items/:id", function (req, res, next) {
  const item = items.getItem(req.params.id);
  res.send(item);
});
*/

module.exports = router;
