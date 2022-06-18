import React from "react";
import {Link} from 'react-router-dom';
import s from '../Card/Card.module.css'
import CardStyle from './CardStyle.js'

const Card =({id, name, image, summary, diets, healthScore})=> {
    return(
        <CardStyle className={s.card} background={image} >
            <div className={s.cardConteiner} >
                <Link to={`/recipes/${id}`} className={s.link}>
                <h3 className={s.name}>{name}</h3>
                {/* <img className={s.image} src={image} alt='imagen'/> */}
                <p className={s.score}>Score: {healthScore}</p>
                <p className={s.diets}>Diets: {diets}</p>
                {/* <p>Summary: {summary}</p> */}
                </Link>

            </div>
        </CardStyle>
    )
}

export default Card;