import React from 'react';
import '../Styles/Calender.css';

function CalendarCard({ calObj }) {
    return (
        <button className={calObj.cssClass}>
            <span>{calObj.comment}</span>
            <h2 className="p">{calObj.id}</h2>
            <span>Month</span>
        </button>
    );
}

export default CalendarCard;