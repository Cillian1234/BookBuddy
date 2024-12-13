import {useEffect, useState} from "react";

export default function StudentList(props) {
    const [students, setStudents] = useState(props.classroom[0].students);
    const [assignments, setAssignments] = useState(props.classAssignments);
    const [ready, setReady] = useState(false);
    const [assignmentList, setAssignmentList] = useState();

    useEffect(() => {
        setAssignments(props.classAssignments);
        setStudents(props.classroom[0].students);

        if (students && assignments) {
            setAssignmentList(createClassroomAssignmentListElement())
            setReady(!ready);
        }
    }, [props.classAssignments, props.classroom[0].students]);


    const createStudentListElement = (
        students.map((Student, key) => (
            <li key={key}>
                {Student.name} {Student.studentID}
                {/*TODO: make delete user entry in classroom student table*/}
                {/*<button*/}
                {/*    color="red"*/}
                {/*    type="button"*/}
                {/*    onClick={() => {*/}
                {/*        props.deleteStudent(Student.studentID);*/}
                {/*    }}*/}
                {/*>Delete</button>*/}
            </li>
))
)

function createClassroomAssignmentListElement() {
    return assignments.map((Assignment, key) => (
        <li key={key}>{Assignment.assignmentContent} - Due: {Assignment.dueDate} - Submitted: {Assignment.submitted ? "Yes!" : "no :("}</li>
    ))
}

return (
    <div>
        <h3>Students</h3>
        <ul>
            {ready ? createStudentListElement : <p>Loading</p>}
        </ul>
        <h3>Class assignments</h3>
        <ul>
            {ready ? assignmentList : <p>Loading</p>}
        </ul>
    </div>
)
}