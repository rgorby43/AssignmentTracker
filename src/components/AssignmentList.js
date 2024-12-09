import React, { useState } from 'react';
import AssignmentModal from './AssignmentModal';

const formatDate = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);

    const dayOfWeek = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayOfMonth = parseInt(day, 10);

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${dayOfWeek}, ${monthName} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}, ${year}`;
};

const AssignmentList = ({ assignments, deleteMode, onDelete, onToggleComplete, onEditAssignment }) => {
    const [editIndex, setEditIndex] = useState(null);

    const handleEditSave = (updatedData) => {
        onEditAssignment(editIndex, updatedData);
        setEditIndex(null);
    };

    return (
        <div className="assignment-list">
            <div className="assignment-header">
                <span>Class</span>
                <span>Project Name</span>
                <span>Due Date</span>
                <span>Actions</span> {/* Add an Actions header */}
            </div>
            {assignments.map((assignment, index) => (
                <div
                    key={index}
                    className={`assignment-card ${assignment.color}`}
                >
                    <span>{assignment.class}</span>
                    <span>{assignment.name}</span>
                    <span>{formatDate(assignment.dueDate)}</span> {/* Format the date */}
                    <div className="action-buttons">
                        {deleteMode && (
                            <button
                                className="delete-icon"
                                onClick={() => onDelete(index)}
                            >
                                ✖
                            </button>
                        )}
                        {!deleteMode && (
                            <button
                                className={`checkmark-icon ${assignment.status === 'Complete' ? 'completed' : 'incomplete'}`}
                                onClick={() =>
                                    assignment.status === 'Complete'
                                        ? setEditIndex(index)
                                        : onToggleComplete(index)
                                }
                            >
                                {assignment.status === 'Complete' ? '✎' : '✔'}
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {editIndex !== null && (
                <AssignmentModal
                    isOpen={editIndex !== null}
                    assignment={assignments[editIndex]}
                    onClose={() => setEditIndex(null)}
                    onSave={handleEditSave}
                    type="edit"
                />
            )}
        </div>
    );
};

export default AssignmentList;
