import React from "react";

export default function AssignmentForm({ assignment, handleAssignmentChange, handleAssignmentSubmit }) {
    return (
        <form className="assignments-section" onSubmit={handleAssignmentSubmit}>

            {/* TODO: bring back class + group selection functionality */}

            <h2>Assignments</h2>
            {/*<label>*/}
            {/*    Classroom:*/}
            {/*    <select*/}
            {/*        onChange={e => {*/}
            {/*            const selectedClass = classrooms.find(c => c.name === e.target.value);*/}
            {/*            setSelectedClassroom(selectedClass);*/}
            {/*            setSelectedGroup(selectedClass.groups[0]);*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {classrooms.map((classroom, idx) => (*/}
            {/*            <option key={idx} value={classroom.name}>{classroom.name}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</label>*/}
            {/*<label>*/}
            {/*    Group:*/}
            {/*    <select*/}
            {/*        onChange={e => setSelectedGroup(selectedClassroom.groups.find(g => g.name === e.target.value))}*/}
            {/*        value={selectedGroup.name}*/}
            {/*    >*/}
            {/*        {selectedClassroom.groups.map((group, idx) => (*/}
            {/*            <option key={idx} value={group.name}>{group.name}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</label>*/}
            <label>
                Assigned to (Student, group, class):
                <input
                    type="text"
                    name="assignedTo"
                    value={assignment.assignedTo}
                    onChange={event => handleAssignmentChange(event.target.name, event.target.value)}
                />
            </label>
            <label>
                Task:
                <input
                    type="text"
                    name="assignmentContent"
                    value={assignment.assignmentContent}
                    onChange={event => handleAssignmentChange(event.target.name, event.target.value)}
                />
            </label>
            <label>
                Due Date:
                <input
                    type="date"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={event => handleAssignmentChange(event.target.name, event.target.value)}
                />
            </label>
            <button type="submit">Add Assignment</button>
        </form>
    )
}