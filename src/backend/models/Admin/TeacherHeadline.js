import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; // adjust path to your Sequelize instance

const TeacherHeadline = sequelize.define(
  "TeacherHeadline",
  {
    teacher_subheading: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    teacher_heading: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    teacher_heading_des: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
    tableName: "teacher_headline",
    timestamps: true,        // Enables Sequelize-managed createdAt & updatedAt
    createdAt: "createdAt",  // maps Sequelize createdAt to your column
    updatedAt: "updatedAt",  // maps Sequelize updatedAt to your column
  }
);

export default TeacherHeadline;
