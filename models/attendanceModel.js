const {DataTypes}=require('sequelize');
const sequelize= require('../utils/db-connection')

const Attendance=sequelize.define('attendances',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
     date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Present', 'Absent'),
      allowNull: false
    }
})
module.exports=Attendance;


