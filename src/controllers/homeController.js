import mysql from 'mysql2';
// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});

const handleHelloWorld = (req, res) => {
    const name = "Nguyen Quoc Do";
    return res.render("home.ejs", { name });
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    connection.query(
        `INSERT INTO users(username, email, password) VALUES(?, ?, ?);`, [username, email, password],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
    return res.send("handleCreateNewUser")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}