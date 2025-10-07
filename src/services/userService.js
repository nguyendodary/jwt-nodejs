// get the client
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (username, email, password) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] =
            await connection.execute(`INSERT INTO users(username, email, password) VALUES(?, ?, ?);`,
                [username, email, hashPass]);
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(`Select * from users`);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(`DELETE FROM users WHERE id=?`, [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (id, username, email) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        await connection.execute(`UPDATE users SET username = ?, email = ? WHERE id = ?`, [username, email, id]);
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUser
}