const Student = require('../models/studentsModel');
const Attendance = require('../models/attendanceModel');

const addAttendance = async (req, res) => {
    try {
        console.log(req.body);
        const { studentId, date, status } = req.body;
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const attendance = await Attendance.create({ StudentId: studentId, date, status });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  
};
  const getAttendance = async (req, res) => {
        try {
            console.log(req.query);
            const { date } = req.query;
            const attendance = await Attendance.findAll({ 
                where: { date },
                include:[{
                    model: Student,
                    attributes: ['name']
                }],
                order: [['StudentId', 'ASC']]
            });
            if (!attendance) {
                return res.status(404).json({ error: 'Attendance not found' });
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    const getAttendanceByStudentId = async (req, res) => {
        try {
           const {id} = req.params;
            const attendance = await Attendance.findAll({ 
                where: { StudentId: id }
            });
            if (!attendance) {
                return res.status(404).json({ error: 'Attendance not found' });
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

module.exports = {
    addAttendance,
    getAttendance,
    getAttendanceByStudentId
};
