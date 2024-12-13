import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/teacher/teacher.css';
import ReviewForm from './teacherComponents/ReviewForm.jsx'
import AssignmentForm from './teacherComponents/AssignmentForm.jsx'
import StudentList from './teacherComponents/StudentList.jsx'
import AddToClassForm from "./teacherComponents/AddToClassForm.jsx";
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function Teacher() {
  const navigate = useNavigate()
  const _id = Cookies.get("UID")
  let teacherName;
  let field, changedValue

  const [classrooms, setClassrooms] = useState();
  const [classAdd, setClassAdd] = useState(
      {
        teacherID: _id,
        studentName: "",
        studentID:""
      }
  );
  const [assignment, setAssignment] = useState({
    assignedTo: "",
    assignmentContent: "",
    teacherName,
    dueDate: "",
  });

  const [studentReview, setStudentReview] = useState({
    childID: "",
    stars: "",
    teacherName,
    teacherComment: "",
  });

  useEffect(() => {
    if (Cookies.get("Level") != "Teacher" && Cookies.get("Locked") === "true") {
      navigate('/TeachSign')
    }
    teacherName = getTeacherName()
    getClassroom()
  }, []);

  function handleReviewChange(field, changedValue) {
    setStudentReview(prevReview => ({
      ...prevReview,
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
        ...studentReview
      }),
    })
  }

  function handleAssignmentChange(field, changedValue) {
    setAssignment(prevAssignment => ({
      ...prevAssignment,
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
      }),
    })
  };

   function getClassroom() {
     fetch(`http://localhost:8080/record/getClassroom/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        _id,
      }),
    })
        .then(res => res.json())
        .then(data => {
          setClassrooms(data);
        })
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

  const handleSelectStudent = (studentName) => {
    // TODO: select student
  };

  function getTeacherName() {

    fetch(`http://localhost:8080/record/getUserInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the type of data being sent
      },
      body: JSON.stringify({
        _id
      }),
    })
      .then(res => res.json())
      .then(data => {
          return teacherName = `${data[0].fName} ${data[0].sName}`
      })
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="teacher-info">
          {/*//TODO: ADD THE TEACHERS IMAGE UPLOADED FROM DATABASE */}
          {assignment.teacherName}
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
        <div className="classrooms-section">
          <h2>Classroom</h2>
          {classrooms &&
            <StudentList
              classroom={classrooms}
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
          handleAssignmentChange={handleAssignmentChange}
          handleAssignmentSubmit={handleAssignmentSubmit}
        />

        <ReviewForm
          studentReview={studentReview}
          handleReviewChange={handleReviewChange}
          handleReviewSubmit={handleReviewSubmit}
        />
      </div>
    </>
  );
}
