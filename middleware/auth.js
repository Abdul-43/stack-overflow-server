//Custom middleware
import jwt from "jsonwebtoken";
export async function auth(req, res, next) {
//   const authHeader = await req.header("accesstoken");
//   console.log("authHeader", authHeader);
//   console.log(req.headers);
//   const token =  authHeader && authHeader.split(" ")[1];
//   console.log("token", token);
//   if (token == null) return res.sendStatus(401);

//    jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     console.log(req.user);
//     next();
//   });

const token = req.cookies.accessToken
console.log(token)
if(!token){
    return res.status(401).json({success:false,message:"You are not authorized"})
}

jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err){
        return res.status(401).json({success:false, message:"token is invalid"})
    }
    req.user =user
    next()
})

}
