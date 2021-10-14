import React from 'react';

/* Styles */
import './progress-view.css';

export default function ProgressView({ visible }) {
    const style = {
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 1 : 0
    };

    return (
        <div className="progress-view" style={style}>
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3"></div>
        </div>
    );
};
