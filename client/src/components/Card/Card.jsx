import React from "react";
import {Link} from 'react-router-dom';
import '../styles/CardStyle.css'

const Card = ({id, name, image, summary, diets, healthyscore, steps})=> {
    return(
        <div className='card'>
            <Link to={`/recipe/${id}`}>
                <h3 className='name'>{name}</h3>
            </Link>
            <img className='img' src={image} alt='img'/>
            <h5>Summary: {summary}</h5>
            <h4>Diets: {diets}</h4>
            <h4>Score: {healthyscore}</h4>
            <button></button>
            <h5>{steps}</h5>
        </div>
    )

}

export default Card;