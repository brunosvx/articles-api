import { createUserService } from "../../services/user/createUserService.js";


export async function createUserController(req, res) {
    try{
        const createdUser = await createUserService(req.body);

        res.status(201).json({
            success: true,
            message: 'User created',
            user: createdUser
        })
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error during create user'
        })
    }
}