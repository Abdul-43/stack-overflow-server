import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "failed to create" });
    console.log(err);
  }
};

// login
export const login = async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const { password, role, ...rest } = user._doc;
    console.log(user._doc);
    //    jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const cookieOptions = {
      httpOnly: true,
    };

    res.cookie("accessToken", token, cookieOptions).json({
      token,
    });
    console.log(token);
    res.status(200);
    console.log(res.name);
  
    // next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "failed to login" });
  }
};

