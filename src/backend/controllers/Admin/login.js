import User from "../../models/Admin/User.js";
import jwt from "jsonwebtoken";

class LoginController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Directly compare plain text password
      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new LoginController();
