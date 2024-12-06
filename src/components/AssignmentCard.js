import React from 'react';

const AssignmentCard = ({ assignment }) => {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        backgroundColor: assignment.color,
    };

    return (
        <div style={cardStyle}>
            <p><strong>Class:</strong> {assignment.class}</p>
            <p><strong>Project Name:</strong> {assignment.name}</p>
            <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {assignment.status}</p>
        </div>
    );
};

export default AssignmentCard; // Default export
