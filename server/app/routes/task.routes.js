module.exports = app => {
  const task = require("../controllers/task.controller.js");

  const router = require("express").Router();

  router.post("/", task.create);

  router.get("/", task.findAll);
  router.get("/:id", task.findOne);

  router.put("/:id", task.update);

  router.delete("/:id", task.delete);

  app.use('/api/task', router);
};
