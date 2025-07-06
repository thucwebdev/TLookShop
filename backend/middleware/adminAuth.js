import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token){
            return res.json({success: false , message:"Bạn không có quyền truy cập. Vui lòng đăng nhập lại để tiếp tục."})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false , message:"Bạn không có quyền truy cập. Vui lòng đăng nhập lại để tiếp tục."})
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({success:fasle , message:error.message})
    }
}

export default adminAuth