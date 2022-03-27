import { getUserPostsService } from "../../services/user/getUserPostsService.js";


export async function getUserPostsController(req, res) {
    try{
        const posts = await getUserPostsService(req.params.userId);

        res.status(201).json({
            success: true,
            posts
        })
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error getting user posts'
        })
    }
}