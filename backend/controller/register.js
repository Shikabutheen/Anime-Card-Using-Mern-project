import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import GenerateToken from "../utils/generattokn.js";
import TryCatch from "../utils/TryCatch.js";

const Reg = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });

  GenerateToken(user._id, res);

  res.status(201).json({
    msg: "Registration successful",
    user: { _id: user._id, name: user.name, email: user.email },
  });
});

export default Reg;
