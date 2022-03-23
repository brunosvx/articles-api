import { authenticateUserService } from "../../services/user/authenticateUserService.js";


export async function authenticateUserController(req, res) {
    try{
        const user = await authenticateUserService(req.body);

        res.status(200).json({
            success: true,
            message: 'User authenticated',
            user
        })
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error authenticating user'
        })
    }
}