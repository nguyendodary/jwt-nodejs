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

    userService.createNewUser(username, email, password);


    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    console.log("Received ID to delete:", req.params.id);

    await userService.deleteUser(req.params.id);

    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser
}