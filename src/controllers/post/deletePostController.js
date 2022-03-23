import { deletePostService } from "../../services/post/deletePostService.js";
import { isPostOwnerService } from "../../services/post/isPostOwnerService.js";


export async function deletePostController(req, res) {
    const { postId } = req.body;
    const { userId, isAdmin } = req;

    try{

        const hasPermission = isAdmin || await isPostOwnerService({ userId, postId });

        if(!hasPermission) {
            return res.status(401).json({
                success: false,
                message: 'You must be the owner of the post'
            })
        }

        await deletePostService(postId)
        
        res.status(200).json({
            success: true,
            message: 'Post deleted'
        })
        
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error deleting post'
        })
    }
}