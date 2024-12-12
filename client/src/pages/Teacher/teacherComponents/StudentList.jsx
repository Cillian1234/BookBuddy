import {useEffect, useState} from "react";

export default function StudentList(props) {
    const [data, setData] = useState(props.classroom);
    const [studentInfo, setStudentInfo] = useState([]);

    useEffect(async () => {
        await getStudentInfo();
    })

    function getStudentInfo() {
        data[0].students.map((Student, key) => (
            fetch(`http://localhost:8080/record/getUserInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indicate the type of data being sent
                },
                body: JSON.stringify({
                    _id: Student.studentID
                }),
            })
                .then(res => res.json())
                .then(data => setStudentInfo((prevData) => ({
                        ...prevData,
                        data
                    })
                ))
        ))
    }

    const createStudentListElement = (
            studentInfo.map((Student, key) => (
                <li key={key}>{`${Student.fName} ${Student.sName}`}</li>
            )),
            console.log(studentInfo)
    )

    const createClassroomAssignmentListElement = (
        data[0].assignments.map((Assignment, key) => (
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