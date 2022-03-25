import { getPostService } from "../../services/post/getPostService.js";


export async function getPostController(req, res) {
    const { id } = req.params;

    try{

        const post = await getPostService(id);
        
        res.status(200).json({
            success: true,
            post
        })
        
    }catch(error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.errorMessage || 'Unexpected error getting the post'
        })
    }
}