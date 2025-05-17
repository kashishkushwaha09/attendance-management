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
        const attendance = await Attendance.create({ studentId, date, status });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addAttendance
};
