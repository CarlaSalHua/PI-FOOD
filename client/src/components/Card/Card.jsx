import React from "react";
import {Link} from 'react-router-dom';
import s from '../Card/Card.module.css';
import CardStyle from './CardStyle.js';
import icon from "../../imagenes/DietTypes/DietTypes.jsx";


const iconDietTypes = {
    "gluten free": icon.glutenFreeIcon,
    "dairy free": icon.dairyFreeIcon,
    paleolithic: icon.paleolithicIcon,
    "lacto ovo vegetarian": icon.lactoOvoIcon,
    primal: icon.primalIcon,
    "whole 30": icon.whole30Icon,
    vegan: icon.veganIcon,
    "fodmap friendly": icon.foadmapFriendlyIcon,
    pescatarian: icon.pescatarianIcon,
    ketogenic: icon.ketogenicIcon,
  };
  
const Card =({id, name, image, summary, diets, healthScore})=> {

    return(
        <CardStyle className={s.card} background={image} >
            <div className={s.cardConteiner} >
                <Link to={`/recipes/${id}`} className={s.link}>
                <h3 className={s.name}>{name}</h3>
                <p className={s.score}>Health Score: {healthScore}</p>

                <div className={`${s.dietContainer}`}>
                { diets?.map((i,type)=>(
                <div key={type} className={s.dietDetails}>
                    <img className={s.diets} src={iconDietTypes[i]} alt=''></img>
                    <p>{i[0].toUpperCase()+i.slice(1)}</p>
                </div>
                ))}
                </div>
                
                </Link>

            </div>
        </CardStyle>
    )
}

export default Card;