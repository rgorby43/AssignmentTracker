import React, { useState, useEffect } from 'react';

const AssignmentModal = ({ isOpen, assignment, onClose, onSave, type = 'add' }) => {
    const [formData, setFormData] = useState({
        class: '',
        name: '',
        dueDate: '',
        status: 'Incomplete',
    });

    useEffect(() => {
        if (isOpen && type === 'edit' && assignment) {
            setFormData({ ...assignment });
        } else {
            setFormData({ class: '', name: '', dueDate: '', status: 'Incomplete' });
        }
    }, [isOpen, assignment, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="class"
                        placeholder="Class"
                        value={formData.class}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Assignment Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">
                            {type === 'edit' ? 'Save' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignmentModal;
