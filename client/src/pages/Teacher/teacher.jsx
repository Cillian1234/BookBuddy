import { Link } from 'react-router-dom';
// Importing the navbar component
import Navbar from '../../../src/components/Navbar.jsx';
// Importing the CSS files for styling
import '../../css/acc/teacher/teacher.css';
import React, { useState, useEffect } from 'react';

export default function Teacher() {
  // Initial classrooms data
  const [classrooms, setClassrooms] = useState([
    { 
      // First classroom with its students and assignments
      name: 'Students',
      students: [
        { name: 'Kevin McCallister', parent: 'I forgot', review: { stars: 5, comment: 'Best Behaviour in class' }, notifications: 3 },
        { name: 'Michael Myers', parent: 'have no clue', review: { stars: 5, comment: 'Completing assignments' }, notifications: 2 }
      ],
      assignments: [
        { title: 'coding', dueDate: '2024-04-10' },
        { title: 'Exam', dueDate: '2024-04-12' }
      ],
    },
    { 
      // Second classroom with its students and assignments
      name: 'We are coding class',
      students: [
        { name: 'Jaden Hossler', parent: 'Mr. Hossler', review: { stars: 4, comment: 'Great participation' }, notifications: 1 }
      ],
      assignments: [
        { title: 'Crying', dueDate: '2024-04-15' }
      ],
    },
  ]);

  // State for the selected classroom, student, and new assignment details
  const [selectedClassroom, setSelectedClassroom] = useState(classrooms[0]);
  const [selectedStudent, setSelectedStudent] = useState(classrooms[0].students[0]);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '' });

  useEffect(() => {
    if (!selectedClassroom && classrooms.length > 0) {
      setSelectedClassroom(classrooms[0]);
    }
    if (selectedClassroom && !selectedStudent && selectedClassroom.students.length > 0) {
      setSelectedStudent(selectedClassroom.students[0]);
    }
  }, [classrooms, selectedClassroom, selectedStudent]);

  // Function to handle adding a review for a student
  const handleReview = (studentName, stars, comment) => {
    setClassrooms(prevClassrooms =>
      prevClassrooms.map(classroom =>
        classroom.name === selectedClassroom.name
          ? {
              ...classroom,
              students: classroom.students.map(student =>
                student.name === studentName
                  ? { ...student, review: { stars, comment } }
                  : student
              ),
            }
          : classroom
      )
    );
  };

  // Function to handle adding a new assignment to a classroom
  const handleAddAssignment = () => {
    setClassrooms(prevClassrooms =>
      prevClassrooms.map(classroom =>
        classroom.name === selectedClassroom.name
          ? {
              ...classroom,
              assignments: [...classroom.assignments, newAssignment],
            }
          : classroom
      )
    );
    // Reset the new assignment state
    setNewAssignment({ title: '', dueDate: '' });
  };

  // Function to handle adding a new student to a classroom
  const handleAddStudent = (classroomName, student) => {
    setClassrooms(prevClassrooms =>
      prevClassrooms.map(classroom =>
        classroom.name === classroomName
          ? {
              ...classroom,
              students: [...classroom.students, student],
            }
          : classroom
      )
    );
  };

  return (
    <> 
      <Navbar />
      <div className="contents">  
        <h2>Teacher's Dashboard</h2>

        {/* List of Classrooms */}
        <h3>Classrooms</h3>
        <ul className="classroom-list">
          {classrooms.map(classroom => (
            <li key={classroom.name} onClick={() => setSelectedClassroom(classroom)}>
              {classroom.name} ({classroom.students.length} students, {classroom.assignments.length} assignments)
            </li>
          ))}
        </ul>

        {/* Display students in the selected classroom */}
        {selectedClassroom && (
          <div className="classroom-details">
            <h3>{selectedClassroom.name}</h3>
            <ul className="student-list">
              {selectedClassroom.students.map(student => (
                <li key={student.name} onClick={() => setSelectedStudent(student)}>
                  {student.name} (Parent: {student.parent}) - {student.notifications} notifications
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Form to add a new assignment */}
        <div className="assignment-form">
          <h3>Add Assignment</h3>
          <label>
            Title:
            <input
              type="text"
              value={newAssignment.title}
              onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={newAssignment.dueDate}
              onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            />
          </label>
          <button onClick={handleAddAssignment}>Add Assignment</button>
        </div>

        {/* Form to add a review for a selected student */}
        {selectedStudent && (
          <div className="review-form">
            <h3>Review {selectedStudent.name}</h3>
            <label>
              Stars:
              <input
                type="number"
                value={selectedStudent.review.stars}
                onChange={e =>
                  handleReview(selectedStudent.name, Number(e.target.value), selectedStudent.review.comment)
                }
                max={5}
                min={1}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={selectedStudent.review.comment}
                onChange={e =>
                  handleReview(selectedStudent.name, selectedStudent.review.stars, e.target.value)
                }
              ></textarea>
            </label>
          </div>
        )}

        {/* Form to add a new student to the selected classroom */}
        <div className="add-student-form">
          <h3>Add Student to Classroom</h3>
          <label>
            Student Name:
            <input type="text" placeholder="Student Name" id="studentName" />
          </label>
          <label>
            Parent Name:
            <input type="text" placeholder="Parent Name" id="parentName" />
          </label>
          <button onClick={() => {
            const studentName = document.getElementById('studentName').value;
            const parentName = document.getElementById('parentName').value;
            handleAddStudent(selectedClassroom.name, { name: studentName, parent: parentName, review: { stars: 0, comment: '' }, notifications: 0 });
          }}>Add Student</button>
        </div>
      </div>
    </>
  );
}
