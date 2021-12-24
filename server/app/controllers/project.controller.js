const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const project = {
    id: req.params.id,
    projectName: req.body.projectName,
    description: req.body.description,
    status: req.body.status
  };
  
  Project.create(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
  
  Project.findAll({where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Project.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  
  Project.update(req.body, {
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
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  
  Project.destroy({
      where: {id: id}
    })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};
