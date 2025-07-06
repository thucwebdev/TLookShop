import jwt from 'jsonwebtoken'

const authUser = async (req , res , next) => {

    const {token} = req.headers;

    if(!token) {
        return res.json({success : false , message : "Bạn không có quyền truy cập. Vui lòng đăng nhập lại để tiếp tục."})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({success:fasle , message:error.message})
    }

}

export default authUser