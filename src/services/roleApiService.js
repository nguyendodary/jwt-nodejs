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

module.exports = {
    createNewRole
}