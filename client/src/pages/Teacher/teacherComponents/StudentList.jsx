import {useState} from "react";

export default function StudentList(props) {
    const [classroom, setClassroom] = useState(...props.classroom);


    const createStudentListElement = (
        classroom.students.map((Student, key) => (
            <li key={key}>{Student.name} {Student.studentID}</li>
        ))
    )

    const createClassroomAssignmentListElement = (
        classroom.assignments.map((Assignment, key) => (
            <li key={key}>{Assignment.name}</li>
        ))
    )

    return (
        <div>
            <h3>Students</h3>
            <ul>
                {createStudentListElement}
            </ul>
            <h3>Assignments</h3>
            <ul>
                {createClassroomAssignmentListElement}
            </ul>
        </div>
    )
}