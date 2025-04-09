import React from "react";

export default function ReviewForm({studentReview, selectedStudent, handleReviewChange, handleReviewSubmit}) {
    return (
        <form className="student-review" onSubmit={handleReviewSubmit}>
            <h3>Review student name</h3>
            <label>
                StudentID:
                <input
                    type="text"
                    name="childID"
                    value={selectedStudent.StudentName}
                    readOnly={true}
                    // onChange={event => handleReviewChange(event.target.name, event.target.value)}
                />
            </label>
            <label>
                Stars:
                <input
                    type="number"
                    name="stars"
                    value={studentReview.stars}
                    onChange={event => handleReviewChange(event.target.name, event.target.value)}
                    max={5}
                    min={1}
                />
            </label>
            <label>
                Comment:
                <textarea
                    value={studentReview.teacherComment}
                    name="teacherComment"
                    onChange={event => handleReviewChange(event.target.name, event.target.value)}
                ></textarea>
            </label>
            <button type="submit">Add Assignment</button>
        </form>
    )
}