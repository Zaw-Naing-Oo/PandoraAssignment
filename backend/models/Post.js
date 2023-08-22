import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Post = sequelize.define('Posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: { // This is the foreign key referencing User's id
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // This should match the name of your User model
      key: 'id',     // This should match the primary key of the User model
    },
  },
});

export default Post;