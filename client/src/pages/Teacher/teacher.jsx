import Navbar from '../../../src/components/Navbar.jsx';
import '../../css/acc/teacher/teacher.css';
import React, { useState, useEffect } from 'react';

export default function Teacher() {
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
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '' });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    if (!selectedClassroom && classrooms.length > 0) {
      setSelectedClassroom(classrooms[0]);
    }
    if (selectedClassroom && !selectedGroup && selectedClassroom.groups.length > 0) {
      setSelectedGroup(selectedClassroom.groups[0]);
    }
    if (selectedGroup && !selectedStudent && selectedGroup.students.length > 0) {
      setSelectedStudent(selectedGroup.students[0]);
    }
  }, [classrooms, selectedClassroom, selectedGroup, selectedStudent]);

  const handleReview = (studentName, stars, comment) => {
    setClassrooms(prevClassrooms =>
      prevClassrooms.map(classroom =>
        classroom.name === selectedClassroom.name
          ? {
              ...classroom,
              groups: classroom.groups.map(group =>
                group.name === selectedGroup.name
                  ? {
                      ...group,
                      students: group.students.map(student =>
                        student.name === studentName
                          ? { ...student, review: { stars, comment } }
                          : student
                      ),
                    }
                  : group
              ),
            }
          : classroom
      )
    );
    setEditingStudent(null);
  };

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
    setNewAssignment({ title: '', dueDate: '' });
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

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="teacher-info">
          {/*//TODO: ADD THE TEACHERS IMAGE AND NAME UPLOADED FROM DATABASE */}
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
        <div className="assignments-section">
          <h2>Assignments</h2>
          <label>
            Classroom:
            <select
              onChange={e => {
                const selectedClass = classrooms.find(c => c.name === e.target.value);
                setSelectedClassroom(selectedClass);
                setSelectedGroup(selectedClass.groups[0]);
              }}
            >
              {classrooms.map((classroom, idx) => (
                <option key={idx} value={classroom.name}>{classroom.name}</option>
              ))}
            </select>
          </label>
          <label>
            Group:
            <select
              onChange={e => setSelectedGroup(selectedClassroom.groups.find(g => g.name === e.target.value))}
              value={selectedGroup.name}
            >
              {selectedClassroom.groups.map((group, idx) => (
                <option key={idx} value={group.name}>{group.name}</option>
              ))}
            </select>
          </label>
          <label>
            Task:
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
        {editingStudent && (
          <div className="student-review">
            <h3>Review {editingStudent.name}</h3>
            <label>
              Stars:
              <input
                type="number"
                value={editingStudent.review.stars}
                onChange={e =>
                  handleReview(editingStudent.name, Number(e.target.value), editingStudent.review.comment)
                }
                max={5}
                min={1}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={editingStudent.review.comment}
                onChange={e =>
                  handleReview(editingStudent.name, editingStudent.review.stars, e.target.value)
                }
              ></textarea>
            </label>
          </div>
        )}
      </div>
    </>
  );
}
