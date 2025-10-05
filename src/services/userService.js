import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (username, email, password) => {
    let hashPass = hashUserPassword(password);
    connection.query(
        `INSERT INTO users(username, email, password) VALUES(?, ?, ?);`, [username, email, hashPass],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
}

const getUserList = () => {
    connection.query(
        `Select * from users`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log("Check results: ", results)
        }
    );
}

module.exports = {
    createNewUser, getUserList
}