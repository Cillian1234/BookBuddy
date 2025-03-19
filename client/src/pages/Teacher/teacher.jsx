import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/teacher/teacher.css';

import ReviewForm from './teacherComponents/ReviewForm.jsx'
import AssignmentForm from './teacherComponents/AssignmentForm.jsx'
import StudentList from './teacherComponents/StudentList.jsx'
import AddToClassForm from "./teacherComponents/AddToClassForm.jsx";

import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

import cNb from "../../assets/Images by AJ/cupNbook.gif";

export default function Teacher() {
  const navigate = useNavigate()
  const _id = Cookies.get("UID")
  let field, changedValue

  const [teacherName, setTeacherName] = useState(getTeacherName())
  const [classrooms, setClassrooms] = useState();
  const [classAssignments, setClassAssignments] = useState();
  const [selectedStudent, setSelectedStudent] = useState("Please select a student")
  const [classAdd, setClassAdd] = useState({
    teacherID: _id,
    studentName: "",
    studentID:""
  }); // Construct for database query
  const [assignment, setAssignment] = useState({
    assignedTo: selectedStudent.studentID,
    assignmentContent: "",
    teacherName: "",
    dueDate: "",
    submitted: false,
  }); // Construct for database query

  const [studentReview, setStudentReview] = useState({
    childID: selectedStudent.studentID,
    stars: "",
    teacherName: "",
    teacherComment: "",
  }); // Construct for database query

  useEffect( () => {
    if (Cookies.get("Level") != "Teacher" && Cookies.get("Locked") === "true") {
      navigate('/TeachSign')
    }
    getClassAndAssignments()
  }, []);

  async function getClassAndAssignments() {
    const classroomData = await getClassroom();
    await getClassAssignments(classroomData);
  }

  async function getClassAssignments(classroomData) {
     const _id = classroomData[0]._id;
     console.log("Class ID", _id)
     const response = await fetch(`http://localhost:8080/record/getClassAssignments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({_id}),
    })
      const data = await response.json();
      setClassAssignments(data)
  }

  function handleReviewChange(field, changedValue) {
    setStudentReview(prevReview => ({
      ...prevReview,
      childID: selectedStudent.StudentID,
      [field]: changedValue,
    }));
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();

    await fetch(`http://localhost:8080/record/setReview/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        ...studentReview,
        teacherName: teacherName
      }),
    })
  }

  function handleAssignmentChange(field, changedValue) {
    setAssignment(prevAssignment => ({
      ...prevAssignment,
      assignedTo: selectedStudent.StudentID,
      [field]: changedValue,
    }));
  };

  async function handleAssignmentSubmit(event) {
    event.preventDefault();

    await fetch(`http://localhost:8080/record/setAssignment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        ...assignment,
        teacherName: teacherName
      }),
    })
  };

   async function getClassroom() {
     const response = await fetch(`http://localhost:8080/record/getClassroom/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({_id}),
    })
     const data = await response.json();
     setClassrooms(data)
     return data;
  }

  function handleClassAddChange(field, changedValue) {
    setClassAdd(prevStudent => ({
      ...prevStudent,
      [field]: changedValue,
    }));
  };

  async function handleClassAddSubmit(event) {
    event.preventDefault();

    await fetch(`http://localhost:8080/record/AddToClass/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        ...classAdd,
      }),
    })
  };

  async function getTeacherName() {

    const response = await fetch(`http://localhost:8080/record/getUserInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        _id
      }),
    })
    const data = await response.json();
    const nameJson = {...data[0]};
    const name = `${nameJson.fName} ${nameJson.sName}`;
    setTeacherName(name);
  }

  // TODO: make delete user entry in classroom student table
  async function deleteStudent(id) {
    await fetch(`http://localhost:8080/record/${id}`, {
      method: "DELETE",
    });
  }

  function setSelectedStudentFromChild(SelectedStudent) {
    setSelectedStudent(SelectedStudent)
    console.log(selectedStudent)
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="teacher-info">
          <h3>Teachers Profile</h3>
          {/*//TODO: ADD THE TEACHERS IMAGE UPLOADED FROM DATABASE */}
        </div>
        <div className="notifications-section">
          <h2>Notifications</h2>
          {/*{classrooms.flatMap(classroom => classroom.groups.flatMap(group => group.students.map(student => (*/}
          {/*  student.notifications > 0 && (*/}
          {/*    <div key={student.name} className="notification">*/}
          {/*      {student.name} in <strong>{classroom.name}</strong> - <strong>{group.name}</strong> has {student.notifications} notifications*/}
          {/*    </div>*/}
          {/*  )*/}
          {/*))))}*/}
        </div>
        <img id="cupNbook" src={cNb} alt="cup and book" />
        <div className="classrooms-section">
          <h2>Classroom</h2>
          {classrooms &&
            <StudentList
              classroom={classrooms}
              classAssignments={classAssignments}
              setSelectedStudent={setSelectedStudentFromChild}
              deleteStudent={deleteStudent}
            />
          }
        </div>

        <AddToClassForm
          studentInfo={classAdd}
          handleClassAddChange={handleClassAddChange}
          handleClassAddSubmit={handleClassAddSubmit}
        />

        <AssignmentForm
          assignment={assignment}
          selectedStudent={selectedStudent}
          handleAssignmentChange={handleAssignmentChange}
          handleAssignmentSubmit={handleAssignmentSubmit}
        />

        <ReviewForm
          studentReview={studentReview}
          selectedStudent={selectedStudent}
          handleReviewChange={handleReviewChange}
          handleReviewSubmit={handleReviewSubmit}
        />
      </div>
    </>
  );
}
