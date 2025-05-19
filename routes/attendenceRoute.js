const express=require('express');
const router=express.Router();
const attendanceController=require('../controllers/attendanceController');

router.post('/add',attendanceController.addAttendance);
router.get('/',attendanceController.getAttendance);
router.get('/:id',attendanceController.getAttendanceByStudentId);

module.exports=router;