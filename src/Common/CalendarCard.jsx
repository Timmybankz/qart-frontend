import React from 'react';
import '../Styles/Calender.css';

function CalendarCard({ calObj, isActive }) {
    return (
        <button className={isActive(calObj.id, calObj.cssClass)}>
            <span>{calObj.comment}</span>
            <h2 className="p">{calObj.id}</h2>
            <span>{calObj.id < 2 ? 'Month': 'Months' }</span>
        </button>
    );
}

export default CalendarCard;