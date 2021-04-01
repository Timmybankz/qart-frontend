import React from 'react';
import '../Styles/Styles.css';

export function CardWithImage({ img }) {

    return (
        <div className="card">
            <img src="../assets/resize-suit.jpeg" alt="Avatar" />
        </div>
    )
}

export function CardWithOutImage({ data }) {

    return (
        <div className="card">
            {data}
        </div>
    )
}
