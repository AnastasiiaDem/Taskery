module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            createdAt: false,
            updatedAt: false,
            tableName: 'user'
        }
    );

    const Task = sequelize.define('task', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: DataTypes.STRING,
            status: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            duration: {
                type: DataTypes.STRING,
                allowNull: false
            },
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'project',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            createdAt: false,
            updatedAt: false,
            tableName: 'task'
        }
    );
    const Project = sequelize.define('project', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            projectName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: DataTypes.STRING,
            status: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            createdAt: false,
            updatedAt: false,
            tableName: 'project'
        }
    );

    return {User, Task, Project};
};
