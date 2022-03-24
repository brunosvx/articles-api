import { editPostService } from "../../services/post/editPostService.js";
import { isPostOwnerService } from "../../services/post/isPostOwnerService.js";


export async function editPostController(req, res) {
    const { postId, title, content } = req.body;
    const { userId, isAdmin } = req;

    try{

        const hasPermission = isAdmin || await isPostOwnerService({ userId, postId });

        if(!hasPermission) {
            return res.status(401).json({
                success: false,
                message: 'You must be the owner of the post'
            })
        }

        await editPostService({ id: postId, title, content  });
        
        res.status(200).json({
            success: true,
            message: 'Post updated'
        })
        
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error updating post'
        })
    }
}