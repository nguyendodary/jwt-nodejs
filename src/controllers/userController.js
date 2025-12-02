import userApiService from "../services/userApiService";

const readFunc = async (req, res) => {
    try {
        let page = +req.query.page || 1;
        let limit = +req.query.limit || 10;

        let data = await userApiService.getUserWithPagination(page, limit);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        });
    }
};

const createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let data = req.body;
        let result = await userApiService.updateUser(data);

        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        });
    }
};

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: "OK",
        EC: 0,
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        }
    })
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}