import React from "react";
export default function AddToClassForm({ studentInfo, handleClassAddChange, handleClassAddSubmit}) {
    return (
        <form className="assignments-section" onSubmit={handleClassAddSubmit}>

            <h2>Add child to class</h2>

            <label>
                Student ID:
                <input
                    type="text"
                    name="studentID"
                    value={studentInfo.studentID}
                    onChange={event => handleClassAddChange(event.target.name, event.target.value)}
                />
            </label>
            <label>
                Student name:
                <input
                    type="text"
                    name="studentName"
                    value={studentInfo.studentName}
                    onChange={event => handleClassAddChange(event.target.name, event.target.value)}
                />
            </label>
            <button type="submit">Add student to class</button>
        </form>
    )
}