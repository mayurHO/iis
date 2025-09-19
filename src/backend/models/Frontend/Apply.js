// models/Apply.js
import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; 

const Apply = sequelize.define("Apply", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experienceType: {
    type: DataTypes.ENUM("fresher", "experience"),
    allowNull: false,
  },
  lastEmployer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  experienceYears: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  resume: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, {
  tableName: "applies",
  timestamps: true,
});

export default Apply;
