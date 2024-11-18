import React from 'react';

function StatusDropdown({ statuses, currentStatus, onChange }) {
    return (
        <select
            value={currentStatus || ''}
            onChange={(e) => onChange(e.target.value)}
        >
            {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                    {status.name}
                </option>
            ))}
        </select>
    );
}

export default StatusDropdown;
