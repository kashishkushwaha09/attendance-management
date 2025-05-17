
function handleDateSubmit(e){
e.preventDefault();
const dateInput = document.getElementById("date").value;
console.log(typeof dateInput);
}
 function fetchAllStudents(){
    axios.get('http://localhost:5000/api/students')
    .then(response=>{
        console.log(response.data);
    })
    .catch(error=>{
        console.error(error);
    });
}
// document.addEventListener('DOMContentLoaded', fetchAllStudents);