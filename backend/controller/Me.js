import TryCatch from "../utils/TryCatch.js";

export const myprofile = TryCatch(async (req, res) => {
  // req.user set by isAuth
  const user = req.user;
  if (!user) return res.status(404).json({ msg: "User not found" });

  res.status(200).json({ success: true, user });
});
export default myprofile;
