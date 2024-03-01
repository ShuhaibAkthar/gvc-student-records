import Admin from "../../models/Admin";

export const getAdmins = async (event) => {
    try {

        //* Get all admins
        const admins = await Admin.find();

        //* convert res to json format
        res = JSON.stringify(admins);

        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error fetching students";
        event.sender.send("error-res", errorMessage);
    }
};

export const getAdmin = async (event, id) => {
    try {
        // Get the admin with the specified id
        const admin = await Admin.findById(id);

        // Send the admin to the renderer process
        let res = JSON.stringify(admin);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error fetching admin";
        event.sender.send("error-res", errorMessage);
    }
}

export const addAdmin = async (event, adminData) => {
    try {
        // Create a new admin
        const admin = new Admin(adminData);

        // Save the admin
        const newAdmin = await admin.save();

        // Send the new admin to the renderer process
        let res = JSON.stringify(newAdmin);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error adding admin";
        event.sender.send("error-res", errorMessage);
    }
}

export const updateAdmin = async (event, updateData) => {
    try {

        const { id, adminData } = updateData;

        // Update the admin with the specified id
        const updatedAdmin = await Admin.findByIdAndUpdate(id
            , adminData, { new: true });

        // Send the updated admin to the renderer process
        let res = JSON.stringify(updatedAdmin);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error updating admin";
        event.sender.send("error-res", errorMessage);
    }
}

export const deleteAdmin = async (event, id) => {
    try {
        // Delete the admin with the specified id
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        // Send the deleted admin to the renderer process
        let res = JSON.stringify(deletedAdmin);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error deleting admin";
        event.sender.send("error-res", errorMessage);
    }
}

export const adminLogin = async (event, loginData) => {
    try {
        // Get the admin with the specified email
        const admin = await Admin.findOne({ email: loginData.email });

        //* check if admin exists
        if (!admin) {
            event.sender.send("error-res", "User name or password is incorrect");
        }

        //* check if password is correct
        if (admin.password !== loginData.password) {
            event.sender.send("error-res", "password is incorrect");
        }

        // Send the admin to the renderer process
        let res = JSON.stringify(admin);
        event.sender.send("success-res", res);
    } catch (error) {
        console.error(error);
        const errorMessage = error.message || "Error deleting admin";
        event.sender.send("error-res", errorMessage);
    }

};