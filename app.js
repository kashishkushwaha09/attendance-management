const express= require('express');
const app=express();
const db  = require('./utils/db-connection'); // Import the db instance
const studentRoute=require('./routes/studentsRoute');
const attendanceRoute=require('./routes/attendenceRoute')
require('./models'); // Import models to set up associations
app.use(express.static('public'));

app.use(express.json());
app.use('/api/students',studentRoute);
app.use('/api/attendances', attendanceRoute);
db.sync({alter:true}).then(()=>{
app.listen(5000,()=>{
    console.log("server is listening on port 5000");
})
})
.catch((err)=>{
    console.log(err);
})
