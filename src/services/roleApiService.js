import db from "../models/index";
const createNewRole = async (rolesFromFE) => {
    try {
        let currentRole = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true
        });

        const arrayOne = rolesFromFE;
        const arrayTwo = currentRole;

        const persists = arrayOne.filter(
            ({ url }) => !arrayTwo.some(role => role.url === url)
        );

        if (persists.length === 0) {
            return {
                EM: "Nothing to create!",
                EC: 0,
                DT: []
            }
        }

        await db.Role.bulkCreate(persists);

        return {
            EM: `Create role success: ${persists.length}`,
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
};

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [["id", "DESC"]]
        });
        return {
            EM: `Get all roles success!`,
            EC: 0,
            DT: data
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

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
        }
        return {
            EM: `Delete role success!`,
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

module.exports = {
    createNewRole, getAllRoles, deleteRole
}