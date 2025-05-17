const express=require('express');
const router=express.Router();
const attendanceController=require('../controllers/attendanceController');

router.post('/add',attendanceController.addAttendance);

module.exports=router;