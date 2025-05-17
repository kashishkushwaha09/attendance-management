const Student = require('../models/studentsModel');


const addStudent = async (req, res) => {    
    const { name} = req.body;
    try {
        const student = await Student.create({ name });
        res.status(201).json({ student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getStudents = async (req, res) => {
    console.log("getStudents");
    try {
        const students = await Student.findAll();
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {addStudent,getStudents};