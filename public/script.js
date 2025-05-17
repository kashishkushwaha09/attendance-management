
function handleDateSubmit(e){
e.preventDefault();
const dateInput = document.getElementById("date").value;
console.log(typeof dateInput);
fetchByDate(date);
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
async function fetchByDate(date){
 try {
        const response = await axios.get('http://localhost:5000/api/attendances', {
            date
        });
        console.log('✅ Students List:', response.data);
      } catch (error) {
        console.error('❌ Error fetching students:', error.response?.data || error.message);
      }
}
// document.addEventListener('DOMContentLoaded', fetchAllStudents);