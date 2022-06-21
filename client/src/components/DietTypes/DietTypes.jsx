import React from 'react';
import s from './DietTypes.module.css'
import icon from '../../imagenes/DietTypes/DietTypes.jsx';


const Diet = (diet) => {

    const iconDietTypes= {
        'gluten free': icon.glutenFreeIcon,
        'dairy free': icon.dairyFreeIcon,
        paleolithic: icon.paleolithicIcon,
        'lacto ovo vegetarian': icon.lactoOvoIcon,
        primal: icon.primalIcon,
        'whole 30': icon.whole30Icon,
        vegan: icon.veganIcon,
        'fodmap friendly': icon.foadmapFriendlyIcon,
        pescatarian: icon.pescatarianIcon,
        ketogenic: icon.ketogenicIcon,
    };

    return (
        <div className={s.containerDiets}>
            <h4>Diet Types:</h4>
            {   diet.diets?.map((e, i)=>(
                <div key={i} className={s.imgDiets}><br/>
                    <div className={s.contentImg}>
                        <img src={iconDietTypes[e]} alt=''/>
                    </div>
                    <p>{e[0].toUpperCase()+e.slice(1)}</p>
                </div>
            ))}
        </div>
    );
};

export default Diet;