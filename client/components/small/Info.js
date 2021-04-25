import React from 'react'

export default function Info({info, showInfo}) {
    return (
        <div className="info">
            <p className="info-message">{info}</p>
            <p className="info-close-btn" onClick={ ()=>showInfo(null) }>Close</p>
        </div>
    )
}
