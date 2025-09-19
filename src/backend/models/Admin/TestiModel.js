import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; // adjust path to your DB connection

const TestiModel = sequelize.define(
  "TestiModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    t_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    t_image_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    t_profession: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    t_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "testimonials",
    timestamps: true, // enables createdAt & updatedAt
  }
);

export default TestiModel;
