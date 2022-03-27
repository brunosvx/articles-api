import { getPostsService } from "../../services/post/getPostsService.js";


export async function getPostsController(req, res) {

    try{
        const posts = await getPostsService(req.query);
        
        res.status(200).json({
            success: true,
            posts
        })
        
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error getting posts'
        })
    }
}