import React from 'react';
import { formatDate } from '../utils/dateUtils';

const AssignmentList = ({ assignments, deleteMode, onDelete, onToggleComplete, onEditAssignment }) => {
    return (
        <div className="assignment-list">
            <div className="assignment-header">
                <span>Class</span>
                <span>Project Name</span>
                <span>Due Date</span>
                <span>Actions</span>
            </div>
            {assignments.map((assignment, index) => (
                <div key={index} className={`assignment-card ${assignment.color}`}>
                    <span>{assignment.class}</span>
                    <span>{assignment.name}</span>
                    <span>{formatDate(assignment.dueDate)}</span>
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
                                        ? onEditAssignment(index)
                                        : onToggleComplete(index)
                                }
                            >
                                {assignment.status === 'Complete' ? '✎' : '✔'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AssignmentList;
