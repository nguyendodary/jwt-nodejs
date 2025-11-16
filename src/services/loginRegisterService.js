import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}


const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist!",
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist!",
                EC: 1
            }
        }
        let hashPassword = hashUserPassword(rawUserData.password);
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })
        return {
            EM: "Created a user successful!",
            EC: 0
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "An error occurred with the service...!",
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            console.log("Found user information");
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: "OK!",
                    EC: 0,
                    DT: ""
                }
            }
        }
        console.log("Not found user: ", rawData.valueLogin, " password: ", rawData.password);
        return {
            EM: "Your information is not correct!",
            EC: 1,
            DT: ""
        }


        // if (isPhoneExist === true) {

        // }
    } catch (error) {
        console.log(error)
        return {
            EM: "An error occurred with the service...!",
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}