import { setUserAdminService } from "../../services/user/setUserAdminService.js";


export async function setUserAdminController(req, res) {
    const { userId } = req.body;

    try{
        await setUserAdminService(userId);

        res.status(200).json({
            success: true,
            message: 'Admin role added to user'
        })
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error setting admin to user'
        })
    }
}