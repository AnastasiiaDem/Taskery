module.exports = app => {
  const user = require("../controllers/user.controller.js");
  
  const router = require("express").Router();
  
  router.post("/", user.create);
  router.post("/authenticate", user.authenticate);
  router.post("/register", user.register);
  router.get("/", user.findAll);
  router.get("/:id", user.findOne);
  router.put("/:id", user.update);
  router.delete("/:id", user.delete);
  
  app.use('/api/user', router);
};
