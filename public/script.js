

function handleAttendanceSubmit(e,dateInput){   //studentId, date, status
    console.log("handleAttendanceSubmit:- ",dateInput);
    e.preventDefault();
  
    const studentsLists=document.querySelectorAll('.student');
    const attendancePromises=[];
         studentsLists.forEach(student=>{
        const studentId=student.getAttribute('data-id');
        const studentName=student.getAttribute('data-name');
        const status=student.querySelector('input[type="radio"]:checked')?.value;
        if (!status) {
            alert(`Please select a status for ${studentName}`)
            return;
        }
        console.log({studentId,studentName,status});
       const promise=axios.post('http://localhost:5000/api/attendances/add', {
        studentId,
        date: dateInput,
        status
    })
    .then(response => {
       console.log('✅ Attendance submitted:', response.data);
    })
    .catch(error => {
        console.error('❌ Error submitting attendance:', error.response?.data || error.message);
    });
   attendancePromises.push(promise);
})
   Promise.all(attendancePromises).then(() => {
       console.log('✅ All attendance submitted');
         const oldForm=document.getElementById('attendanceForm');
    if(oldForm){
       oldForm.remove();
    }
     showAttendenceList(dateInput); // show attendance if records found
   })
   .catch(error => {
       console.error('❌ Error submitting attendance:', error.response?.data || error.message);
   });  
    
     }


// Function to handle attendance marking
     function markAttendance(dateInput){
     const students=fetchAllStudents();
    const form=document.createElement('form');
    form.className='container mt-2';
    form.id='attendanceForm';
    students.forEach(student => {
        const studentDiv=document.createElement('div');
        studentDiv.className='container fs-5 text-center student';
        studentDiv.setAttribute('data-id', student.id);
        studentDiv.setAttribute('data-name', student.name);
        studentDiv.innerHTML=`
  <!-- ${student.name} -->
  <div class="row mt-3"> 
   <div class="col">${student.name}</div>
    <div class="form-check mx-2 col d-flex justify-content-center align-items-center gap-2">
      <input class="form-check-input" type="radio" name="${student.name}" value="Present">
      <label class="form-check-label">Present</label>
    </div>
    <div class="form-check col d-flex justify-content-center align-items-center gap-2">
      <input class="form-check-input" type="radio" name="${student.name}" value="Absent">
    <label class="form-check-label">Absent</label>
  </div>
  </div> 
`;

form.appendChild(studentDiv);
    })
    const submitButton=document.createElement('button');
    submitButton.type='submit';
    submitButton.className='btn btn-primary mt-3';
    submitButton.innerText='Submit Attendance';
    form.appendChild(submitButton);
    document.querySelector('body').appendChild(form);
form.addEventListener('submit', (e)=>{handleAttendanceSubmit(e,dateInput)});
     }

// Function to fetch attendance list
async function fetchAttendenceByDate(dateInput){
    try {
        const response=await axios.get('http://localhost:5000/api/attendances', {
            params: {
                date: dateInput
            }
        });
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching attendance:', error.response?.data || error.message);
        return null;
    }
}

// Function to show attendance by date
async function showAttendenceList(dateInput){

     const attendanceList=document.createElement('div');
     attendanceList.id = 'attendance-list'; 
    attendanceList.className='container mt-5';
    const attendances=await fetchAttendenceByDate(dateInput);
    console.log("showAttendenceList:- ",attendances);
    attendances?.forEach(attendance => {
        const listItem=document.createElement('div');
        listItem.className='container text-center fs-5';
        listItem.innerHTML=`
  <div class="row mt-3">
  
    <div class="col">
        ${attendance.Student.name}
    </div>
    <div class="col">
        ${attendance.status==='Present'? '✅ Present' : '❌ Absent'}
    </div>
  </div>
        `;
        attendanceList.appendChild(listItem);
    });
    document.querySelector('body').appendChild(attendanceList);


};

// Function to handle date submission
async function handleDateSubmit(e){
e.preventDefault();
//remove old attendance form and list
  const oldForm=document.getElementById('attendanceForm');
    if(oldForm){
       oldForm.remove();
    }
    const oldAttendanceList=document.getElementById('attendance-list');
    if(oldAttendanceList){
       oldAttendanceList.remove();
    }
    const oldReportList=document.getElementById('report-list');
    if(oldReportList){
       oldReportList.remove();
    }
const dateInput = document.getElementById("date").value;


const attendances=await fetchAttendenceByDate(dateInput);
console.log("handleDateSubmit:- ",attendances);
if(!attendances?.length>0){
  markAttendance(dateInput);  // Mark attendance if no records found
}else{
showAttendenceList(dateInput); // show attendance if records found
}

}

// Function to fetch all students from local storage or API
 function fetchAllStudents(){
    let students=localStorage.getItem('students');
    if(students){
        students=JSON.parse(students);
    }else{
         axios.get('http://localhost:5000/api/students')
    .then(response=>{
         students = response.data.students;
        localStorage.setItem('students', JSON.stringify(students));
    })
    .catch(error=>{
        console.error(error);
    });
    }
   return students;
}

function fetchAttendenceByStudentId(studentId){
    return axios.get(`http://localhost:5000/api/attendances/${studentId}`)
    .then(response=>{
        return response.data;
    })
    .catch(error=>{
        console.error(error);
        return null;
    });
}


async function showAttendenceReport(){
    const reportList=document.createElement('div');
    reportList.className='container mt-5';
    reportList.id='report-list';
   const students = fetchAllStudents();
   console.log(students);
   for (const student of students) {
       const attendances = await fetchAttendenceByStudentId(student.id);
       const daysCount = attendances.length;
       const presentCount = attendances.filter(attendance => attendance.status === 'Present').length;
     console.log(`Student: ${student.name}, Days: ${daysCount}, Present: ${presentCount}`);
      const listItem=document.createElement('div');
        listItem.className='container text-center fs-5';
        listItem.innerHTML=`
    <div class="row mt-3">
        <div class="col">${student.name}</div>
        <div class="col"> ${presentCount}/${daysCount}</div>
        <div class="col">${(presentCount/daysCount * 100).toFixed(0)}%</div>
    </div>
        `;
       reportList.appendChild(listItem);
   }
   document.querySelector('body').appendChild(reportList);
}

// Set default date to today
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];  // Format: YYYY-MM-DD
  dateInput.value = today;
});
document.getElementById('report').addEventListener('click', () => {
   //remove old attendance form and list
  const oldForm=document.getElementById('attendanceForm');
    if(oldForm){
       oldForm.remove();
    }
    const oldAttendanceList=document.getElementById('attendance-list');
    if(oldAttendanceList){
       oldAttendanceList.remove();
    }
    const oldReportList=document.getElementById('report-list');
    if(oldReportList){
       oldReportList.remove();
    }
   console.log("fetchAllStudent's report ");
   showAttendenceReport();
});