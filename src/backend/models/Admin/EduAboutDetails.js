import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; 

const EduAboutDetails = sequelize.define('EduAboutDetails', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  subheading: { type: DataTypes.STRING(255), allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  deleted_at: { type: DataTypes.DATE, allowNull: true },
  about_quote: { type: DataTypes.STRING(255), allowNull: true },
  about_item_img1: { type: DataTypes.STRING(255), allowNull: true },
  about_item_title1: { type: DataTypes.STRING(255), allowNull: true },
  about_item_description1: { type: DataTypes.STRING(255), allowNull: true },
  about_item_img2: { type: DataTypes.STRING(255), allowNull: true },
  about_item_title2: { type: DataTypes.STRING(255), allowNull: true },
  about_item_description2: { type: DataTypes.STRING(255), allowNull: true },
  about_image_1: { type: DataTypes.STRING(255), allowNull: true },
  about_image_2: { type: DataTypes.STRING(255), allowNull: true },
  about_image_3: { type: DataTypes.STRING(255), allowNull: true },
  exp_icon: { type: DataTypes.STRING(255), allowNull: true },
  exp_text: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'edu_about_table',
  timestamps: true,            
  paranoid: false,              
  underscored: true,
});

export default EduAboutDetails;
