import { DataTypes } from "sequelize";
import sequelize from "@/utils/db"; // Adjust the path to your Sequelize instance

const TestimonialsHead = sequelize.define(
  "TestimonialsHead",
  {
    test_subheading: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    test_heading: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    test_heading_des: {
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
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "testimonials_heading", // Your actual table name
    timestamps: true, // Enables Sequelize to manage createdAt & updatedAt
  }
);

export default TestimonialsHead;
