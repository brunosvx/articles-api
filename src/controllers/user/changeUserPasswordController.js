import { changeUserPasswordService } from "../../services/user/changeUserPasswordService.js";


export async function changeUserPasswordController(req, res) {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;

    try{
        await changeUserPasswordService({ userId, oldPassword, newPassword });

        res.status(200).json({
            success: true,
            message: 'Your password has been changed'
        })
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error changing password'
        })
    }
}