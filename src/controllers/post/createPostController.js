import { createPostService } from "../../services/post/createPostService.js";


export async function createPostController(req, res) {
    try{
        const createdPost = await createPostService({ ...req.body, authorId: req.userId });

        res.status(201).json({
            success: true,
            message: 'Post created',
            post: createdPost
        })
    }catch(error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error creating post'
        })
    }
}