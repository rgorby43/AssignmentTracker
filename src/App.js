import './App.css';
import React, { useState } from 'react';
import AssignmentList from './components/AssignmentList';
import ProgressIndicator from './components/ProgressIndicator';
import AssignmentModal from './components/AssignmentModal';

function App() {
    const [assignments, setAssignments] = useState([
        {
            class: 'Math',
            name: 'Homework 1',
            dueDate: '2024-12-10',
            status: 'Incomplete',
            color: 'red',
        },
        {
            class: 'Science',
            name: 'Lab Report',
            dueDate: '2024-12-15',
            status: 'Complete',
            color: 'green',
        },
        {
            class: 'Math',
            name: 'Quiz 1',
            dueDate: '2024-12-18',
            status: 'Incomplete',
            color: 'blue',
        },
    ]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add'); // Track modal type
    const [editingAssignment, setEditingAssignment] = useState(null); // Track assignment being edited
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');

    const handleAddOrEditAssignment = (assignment) => {
        const dueDate = new Date(assignment.dueDate);
        const today = new Date();
        const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24);

        // Determine the color based on due date and status
        if (assignment.status === 'Complete') {
            assignment.color = 'green';
        } else if (diffInDays < 0) {
            assignment.color = 'red';
        } else if (diffInDays <= 7) {
            assignment.color = 'yellow';
        } else {
            assignment.color = 'blue';
        }

        setAssignments((prev) => {
            if (modalType === 'edit') {
                return prev.map((item, index) =>
                    index === assignment.index ? { ...assignment } : item
                );
            } else {
                const newArray = [...prev, assignment];
                return newArray.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            }
        });

        setModalOpen(false);
        setEditingAssignment(null);
    };

    const handleDeleteAssignment = (indexToDelete) => {
        setAssignments((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const handleToggleComplete = (indexToToggle) => {
        setAssignments((prev) =>
            prev.map((assignment, index) => {
                if (index === indexToToggle) {
                    const newStatus = assignment.status === 'Complete' ? 'Incomplete' : 'Complete';
                    let newColor;

                    if (newStatus === 'Complete') {
                        newColor = 'green';
                    } else {
                        const dueDate = new Date(assignment.dueDate);
                        const today = new Date();
                        const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24);

                        if (diffInDays < 0) {
                            newColor = 'red';
                        } else if (diffInDays <= 7) {
                            newColor = 'yellow';
                        } else {
                            newColor = 'blue';
                        }
                    }

                    return {
                        ...assignment,
                        status: newStatus,
                        color: newColor,
                    };
                }
                return assignment;
            })
        );
    };

    const uniqueClasses = [...new Set(assignments.map((assignment) => assignment.class))];

    return (
        <div className="app">
            <header>
                <h1>Assignment Tracker</h1>
                <div className="action-buttons">
                    <button
                        className="add-btn"
                        onClick={() => {
                            setModalType('add');
                            setModalOpen(true);
                        }}
                    >
                        +
                    </button>
                    <button className="remove-btn" onClick={() => setDeleteMode(!deleteMode)}>
                        -
                    </button>
                </div>
            </header>
            <ProgressIndicator assignments={assignments} />
            <AssignmentList
                assignments={assignments}
                deleteMode={deleteMode}
                onDelete={handleDeleteAssignment}
                onToggleComplete={handleToggleComplete}
                onEditAssignment={(index) => {
                    setEditingAssignment({ ...assignments[index], index });
                    setModalType('edit');
                    setModalOpen(true);
                }}
            />
            {isModalOpen && (
                <AssignmentModal
                    isOpen={isModalOpen}
                    assignment={editingAssignment}
                    onClose={() => setModalOpen(false)}
                    onSave={handleAddOrEditAssignment}
                    type={modalType}
                />
            )}
        </div>
    );
}

export default App;
