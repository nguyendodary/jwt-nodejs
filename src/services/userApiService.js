import e from "express";
import db from "../models/index";


const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] }
        });
        if (users) {
            console.log("Check users: ", users);
            return {
                EM: "Get data success",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "Get data success",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Get data fail",
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit
        })
        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: "fetch ok",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Get data fail",
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (user) {
            user.save({

            })
        } else {

        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}