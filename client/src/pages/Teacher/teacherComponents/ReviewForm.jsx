import React from "react";

export default function ReviewForm({studentReview, handleReviewChange, handleReviewSubmit}) {
    return (
        <form className="student-review" onSubmit={handleReviewSubmit}>
            <h3>Review student name</h3> /* TODO: add selected student name here */
            <label>
                StudentID:
                <input
                    type="text"
                    name="childID"
                    value={studentReview.childID}
                    onChange={event => handleReviewChange(event.target.name, event.target.value)}
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