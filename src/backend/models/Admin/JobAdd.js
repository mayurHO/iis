// src/backend/models/Job.js
import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; 

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
image: {
  type: DataTypes.STRING,
  allowNull: true,
}
}, {
  tableName: "job", 
  timestamps: true, 
});

export default Job;
