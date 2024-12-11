import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/teacher/teacher.css';
import ReviewForm from './teacherComponents/ReviewForm.jsx'
import AssignmentForm from './teacherComponents/AssignmentForm.jsx'
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function Teacher() {
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("Test");
  const [classrooms, setClassrooms] = useState([
    {
      name: 'CODE CLASS 1',
      groups: [
        { name: 'Group A', students: [
          { name: 'Kevin McCallister', review: { stars: 5, comment: 'Best Behaviour in class' }, notifications: 3 },
          { name: 'Michael Myers', review: { stars: 5, comment: 'Completing assignments' }, notifications: 2 }
        ]},
        { name: 'Group B', students: [
          { name: 'Mr Fox', review: { stars: 4, comment: 'Good participation' }, notifications: 1 }
        ]}
      ],
      assignments: [
        { title: 'coding', dueDate: '2024-04-10' },
        { title: 'Exam', dueDate: '2024-04-12' }
      ],
    },
    {
      name: 'CODE CLASS 2',
      groups: [
        { name: 'Group A', students: [
          { name: 'Jaden Hossler', review: { stars: 4, comment: 'Great participation' }, notifications: 1 }
        ]}
      ],
      assignments: [
        { title: 'Crying', dueDate: '2024-04-15' }
      ],
    },
  ]);

  const [selectedClassroom, setSelectedClassroom] = useState(classrooms[0]);
  const [selectedGroup, setSelectedGroup] = useState(classrooms[0].groups[0]);
  const [selectedStudent, setSelectedStudent] = useState(classrooms[0].groups[0].students[0]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignment, setAssignment] = useState({
    assignedTo: "",
    assignmentContent: "",
    teacherName: "",
    dueDate: "",
  });

  const [studentReview, setStudentReview] = useState({
    childID: "",
    stars: "",
    teacherName: "",
    teacherComment: "",
  });
  let field, changedValue;

  useEffect(() => {
    if (Cookies.get("Level") != "Teacher" && Cookies.get("Locked") === "true") {
      navigate('/TeachSign')
    }
    getTeacherName()
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

  const handleAddStudent = (groupName, student) => {
    setClassrooms(prevClassrooms =>
      prevClassrooms.map(classroom =>
        classroom.name === selectedClassroom.name
          ? {
              ...classroom,
              groups: classroom.groups.map(group =>
                group.name === groupName
                  ? {
                      ...group,
                      students: [...group.students, student],
                    }
                  : group
              ),
            }
          : classroom
      )
    );
  };

  const handleSelectStudent = (studentName) => {
    setSelectedStudents(prevSelected =>
      prevSelected.includes(studentName)
        ? prevSelected.filter(name => name !== studentName)
        : [...prevSelected, studentName]
    );
    setEditingStudent(selectedGroup.students.find(student => student.name === studentName));
  };

  function getTeacherName() {
    const _id = Cookies.get("UID")
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
          setAssignment((prevAssignment) => ({
            ...prevAssignment,
            teacherName: `${data[0].fName} ${data[0].sName}`,
          }));
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
          {classrooms.flatMap(classroom => classroom.groups.flatMap(group => group.students.map(student => (
            student.notifications > 0 && (
              <div key={student.name} className="notification">
                {student.name} in <strong>{classroom.name}</strong> - <strong>{group.name}</strong> has {student.notifications} notifications
              </div>
            )
          ))))}
        </div>
        <div className="classrooms-section">
          <h2>Classrooms</h2>
          {classrooms.map((classroom, index) => (
            <div key={index} className="classroom">
              <h3>{classroom.name}</h3>
              {classroom.groups.map((group, idx) => (
                <div key={idx} className="group">
                  <button onClick={() => setSelectedGroup(group)}>
                    {group.name}
                  </button>
                  {selectedGroup === group && (
                    <ul>
                      {group.students.map((student, i) => (
                        <li
                          key={i}
                          className={selectedStudents.includes(student.name) ? 'selected' : ''}
                          onClick={() => handleSelectStudent(student.name)}
                        >
                          {student.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

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
