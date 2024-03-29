const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    duration: req.body.duration,
    employeeId: req.body.employeeId,
    projectId: req.body.projectId
  };
  
  Task.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
  
  Task.findAll({where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving board."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;
  Task.update(req.body, {
      where: {id: id}
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else if (num == 0) {
        res.send({
          message: "Task data was not changed."
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  
  Task.destroy({
      where: {id: id}
    })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};
