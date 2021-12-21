const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.password || !req.body.email || !req.body.lastName || !req.body.firstName || !req.body.position) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    User.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

exports.authenticate = (req, res) => {
    const {email, password} = req.body;
    let users = [];
    User.findAll()
        .then(data => {
            data.forEach((d, idx) => {
                users[idx] = d.dataValues;
            });
            const user = users.find(x => x.email === email && x.password === password);
            if (user) {
                res.send(user);
            } else {
                res.status(500).send({
                    message:
                        'Username or password is incorrect'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Users.'
            });
        });
};

exports.register = (req, res) => {
    const user = req.body;
    let users = [];
    User.findAll()
        .then(data => {
            data.forEach((d, idx) => {
                users[idx] = d.dataValues;
            });

            if (users.find(x => x.email === user.email)) {
                res.status(500).send({
                    message:
                        'Username "' + user.email + '" is already registered'
                });
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            User.create(user)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Users.'
            });
        });
};
