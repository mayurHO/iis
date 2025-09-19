import { DataTypes } from "sequelize";
import sequelize from "@/utils/db";

const ClientModel = sequelize.define("ClientModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "clients", 
  timestamps: false,
    paranoid: true,  
});

export default ClientModel;
