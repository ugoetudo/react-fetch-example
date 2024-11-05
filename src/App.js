import './App.css';
import { useState } from 'react';

// define a new component that handles that makes a request using the fetch function of the window object
// note that we don't need to explicitly mention "window" as it is always in scope



function StudentCard ({first_name, last_name}) {
  return (
    <div id="stu_card">
      
      <p><span id="stu_ln">{last_name}</span>, &nbsp; {first_name}</p>
      
    </div>
  )
}

function StudentUser() {
  var [studentData, setStudentData] = useState({});
  var [studentId, setStudentId] = useState("");

  const getStudent = async () => {
    const response = await fetch(`http://localhost:3000/users?vnum=${studentId}`)
    const response_data = await response.json()
    setStudentData({...response_data})
  }
  // note that getStudent is equivalent to niceGetStudent
  const niceGetStudent = () => {
    fetch(`http://localhost:3000/users?vnum=${studentId}`).then( //our first then
      function(response) {response.json().then( //second then
        function(responsedata) {setStudentData({...responsedata})}
      )}
    )
  }

  const updateSid = (e) => {
    setStudentId(e.target.value);
  }

  if (Object.keys(studentData).length === 0) {
    return (
    <div>
      <input type="text" onChange={updateSid}></input> &nbsp; 
      <input type="button" value="check student" onClick={niceGetStudent}></input>
    </div>
    )
  }
  else {
    return (
      <div>
        <StudentCard first_name={studentData.first_name} last_name={studentData.last_name} />
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Example!</h1>
      <StudentUser />
    </div>
  );
}

export default App;
