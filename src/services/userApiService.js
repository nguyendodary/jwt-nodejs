import express from "express";
import db from "../models/index";
import { checkEmailExist, checkPhoneExist, hashUserPassword } from "../services/loginRegisterService";

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex", "address"],
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
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [["id", "DESC"]]
        });

        const totalPages = Math.ceil(count / limit);

        return {
            EM: "fetch ok",
            EC: "0",
            DT: {
                totalRows: count,
                totalPages: totalPages,
                users: rows
            }
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "error from service",
            EC: "1",
            DT: []
        };
    }
};

const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist!",
                EC: 1,
                DT: "email"
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist!",
                EC: 1,
                DT: "phone"
            }
        }
        let hashPassword = hashUserPassword(data.password);


        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: "create ok",
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with empty groupId",
                EC: 1,
                DT: "group"
            };
        }


        let user = await db.User.findOne({
            where: { id: data.id }
        });

        if (!user) {
            return {
                EM: "User not found",
                EC: 2,
                DT: ""
            };
        }

        if (data.email && data.email !== user.email) {
            let emailExist = await db.User.findOne({
                where: { email: data.email }
            });
            if (emailExist) {
                return {
                    EM: "Email already exists!",
                    EC: 1,
                    DT: "email"
                };
            }
        }

        if (data.phone && data.phone !== user.phone) {
            let phoneExist = await db.User.findOne({
                where: { phone: data.phone }
            });
            if (phoneExist) {
                return {
                    EM: "Phone number already exists!",
                    EC: 1,
                    DT: "phone"
                };
            }
        }

        await user.update({
            username: data.username,
            address: data.address,
            sex: data.sex,
            groupId: data.groupId,
            phone: data.phone,
            email: data.email
        });

        return {
            EM: "Update user success",
            EC: 0,
            DT: ""
        };

    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong with service",
            EC: 1,
            DT: []
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: id
            }
        })
        if (user) {
            await user.destroy();
            return {
                EM: "Delete user success",
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "user not exist",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "error from service",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}