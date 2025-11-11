import { User } from "../models/user.js";
import GenerateToken from "../utils/generattokn.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

const Login = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

  GenerateToken(user._id, res);

  res.status(200).json({
    msg: "Login successful",
    user: { _id: user._id, name: user.name, email: user.email },
  });
});

export default Login;
