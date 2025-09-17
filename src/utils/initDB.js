import sequelize from "@/utils/db";
import User from "../backend/models/Admin/User";
import Job from "../backend/models/Admin/JobAdd";

export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    // This will create or alter tables based on models
    await User.sync({ alter: true });
     await Job.sync({ alter: true });
    console.log("Job table created/updated successfully!");
  } catch (err) {
    console.error("DB initialization failed:", err);
  }
}
