import React from "react";
import {Link} from 'react-router-dom';
import s from '../Card/Card.module.css'

const Card =({id, name, image, summary, diets, healthScore})=> {
    return(
        <div className={s.cardConteiner}>
            <Link to={`/recipes/${id}`}>
            <h3 className={s.name}>{name}</h3>
            <img className={s.image} src={image} alt='imagen'/>
            </Link>
            <p>Score: {healthScore}</p>
            <p>Diets: {diets}</p>
            <p>Summary: {summary}</p>
        </div>
    )
}

export default Card;