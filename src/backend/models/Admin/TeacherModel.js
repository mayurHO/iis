import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; // adjust path to your sequelize instance

const Teacher = sequelize.define(
  "Teacher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teacher_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    teacher_image_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    teacher_profession: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    facebook_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    whatsapp_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    linkedin_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    youtube_link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "teachers",
    timestamps: true, // enables Sequelize-managed createdAt & updatedAt
    createdAt: "createdAt", // map Sequelize createdAt
    updatedAt: "updatedAt", // map Sequelize updatedAt
  }
);

export default Teacher;
