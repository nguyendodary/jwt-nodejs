import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (username, email, password) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true
    })

    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    });


    let users = [];
    users = await db.User.findAll();
    return users;

}

const deleteUser = async (userID) => {
    await db.User.destroy({
        where: {
            id: userID
        }
    });

}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: id
        }
    })
    return user.get({ plain: true });

};

const updateUser = async (id, username, email) => {
    try {
        await db.User.update(
            { username: username, email: email },
            { where: { id: id } }
        );
    } catch (error) {
        console.log("Error updating user:", error);
    }
};




module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUser
}