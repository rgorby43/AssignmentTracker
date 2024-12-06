import React, { useState } from 'react';

const AddAssignmentForm = ({ onAddAssignment }) => {
    const [formData, setFormData] = useState({
        class: '',
        name: '',
        dueDate: '',
        status: 'Incomplete',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.class && formData.name && formData.dueDate) {
            onAddAssignment(formData);
            setFormData({ class: '', name: '', dueDate: '', status: 'Incomplete' });
        } else {
            alert('Please fill out all fields!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="class"
                placeholder="Class"
                value={formData.class}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={formData.name}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddAssignmentForm;
