
// const db = require('../utils/db-connection'); // your Sequelize instance
const Student = require('./studentsModel');
const Attendance = require('./attendanceModel');

// Setup associations
Student.hasMany(Attendance);
Attendance.belongsTo(Student);

module.exports = {
    // db, // export this for syncing
    Student,
    Attendance
};
