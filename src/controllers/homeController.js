import userService from "../services/userService"

const handleHelloWorld = (req, res) => {
    const name = "Nguyen Quoc Do";
    return res.render("home.ejs", { name });
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //userService.createNewUser(username, email, password)



    // console.log("Check hash password: ", hashPassword)

    // let check = bcrypt.compareSync(password, hashPassword);

    // console.log("Check pass: ", check);


    return res.send("handleCreateNewUser")
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}