import React from 'react';

const ProgressIndicator = ({ assignments }) => {
    const total = assignments.length;
    const completed = assignments.filter((a) => a.status === 'Complete').length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="progress-indicator">
            <p>{completed} of {total} assignments completed ({percentage}%)</p>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressIndicator;
