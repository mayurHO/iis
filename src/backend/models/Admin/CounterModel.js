import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; // adjust the path to your db connection

const CounterModel = sequelize.define("CounterModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  counter_image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  counter_title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  counter_tagline: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: "counter_table", // replace with your actual table name
  timestamps: true,     // Sequelize will automatically handle createdAt and updatedAt
});

export default CounterModel;
