// models/Banner.js
import { DataTypes } from "sequelize";
import sequelize from "@/utils/db";

const Banner = sequelize.define(
  "Banner",
  {
    bannerID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "bannerID" },
    baner_name: { type: DataTypes.STRING(255), allowNull: true, field: "baner_name" },
  },
  {
    tableName: "banner",
  timestamps: false,
    paranoid: true,  
  }
);

export default Banner;
