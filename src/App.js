import './App.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import AssignmentList from './components/AssignmentList';
import ProgressIndicator from './components/ProgressIndicator';
import AssignmentModal from './components/AssignmentModal';
import { FaSignOutAlt } from 'react-icons/fa';
import { db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

function App() {
    const [assignments, setAssignments] = useState([{
        class: 'Tutorial',
        name: 'Welcome to the Assignment Tracker!',
        dueDate: '2024-12-05',
        status: 'Complete',
        color: 'green',
        tutorial: true,
    }, {
        class: 'Tutorial',
        name: 'Click the green Plus to add an assignment',
        dueDate: '2024-12-05',
        status: 'Incomplete',
        color: 'yellow',
        tutorial: true,
    }, {
        class: 'Tutorial',
        name: 'Click the red minus to remove a project',
        dueDate: '2024-12-05',
        status: 'Incomplete',
        color: 'red',
        tutorial: true,
    }, {
        class: 'Tutorial',
        name: 'Click the pencil to edit and the check to mark as complete',
        dueDate: '2024-12-05',
        status: 'Incomplete',
        color: 'blue',
        tutorial: true,
    }]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);
    const [user, setUser] = useState(null);

    // Load assignments for logged-in user
    useEffect(() => {
        const fetchAssignments = async () => {
            if (user) {
                const userDoc = doc(db, "assignments", user.sub); // Unique user ID
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    setAssignments(docSnap.data().assignments || []);
                } else {
                    setAssignments([]); // No saved assignments
                }
            }
        };
        fetchAssignments();
    }, [user]);

    // Save assignments to Firestore
    const saveAssignmentsToFirestore = async (assignments) => {
        if (user) {
            const userDoc = doc(db, "assignments", user.sub);
            await setDoc(userDoc, { assignments });
        }
    };

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
            let updatedAssignments;
            if (modalType === 'edit') {
                updatedAssignments = prev.map((item, index) =>
                    index === assignment.index ? { ...assignment } : item
                );
            } else {
                updatedAssignments = [...prev, assignment].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            }
            saveAssignmentsToFirestore(updatedAssignments); // Save to Firestore
            return updatedAssignments;
        });

        setModalOpen(false);
        setEditingAssignment(null);
    };

    const handleDeleteAssignment = (indexToDelete) => {
        setAssignments((prev) => {
            const updatedAssignments = prev.filter((_, index) => index !== indexToDelete);
            saveAssignmentsToFirestore(updatedAssignments); // Save to Firestore
            return updatedAssignments;
        });
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

    const handleLoginSuccess = (credentialResponse) => {
        const userData = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
        setUser(userData); // Save user info
    };

    const handleLogout = () => {
        setUser(null); // Clear user data
        setAssignments([]); // Clear assignments
    };

    return (
        <GoogleOAuthProvider clientId="268560180807-9b96imi66ogg3g6t2dqojrvi5fb41crt.apps.googleusercontent.com">
            <div className="app">
                <header>
                    <h1>Assignment Tracker</h1>
                    {!user ? (
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => console.log('Login failed')}
                        />
                    ) : (
                        <div className="user-info">
                            <button className="logout-button" onClick={handleLogout}>
                                <FaSignOutAlt /> {/* Logout icon */}
                            </button>
                        </div>
                    )}
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
                {user && (
                    <>
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
                    </>
                )}
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
