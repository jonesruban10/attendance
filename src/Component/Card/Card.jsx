import React, { useState } from 'react'
import './Card.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Card = (props) => {
    // const [values, setvalues] = useState([]);
    // const [Percentage, setpercentage] = useState([]);

return (
        <Compactcard param={props} set />
    )
}

//Data Display card
function Compactcard({ param }) {
    return (
        <div className='Compactcard'

            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow
            }}>
        
            <div className='radialbar'>

                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
            </div>
            <div className='detail'>

                <span>${param.valus}</span>
                <span>16 </span>
                <span>{param.title}</span>
            </div>

        </div>
    )

}

export default Card