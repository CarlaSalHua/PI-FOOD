import React from 'react';
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css'
import fishFood from '../../imagenes/fishFood.png'
import salad from '../../imagenes/salad.png'

function LandingPage(){
    return(
        <div className={s.landing} id='landing'>
            <div className={s.content}>

                <div className={s.contentText}>
                    <h1 className={s.title} >Healthy Food Web</h1>
                        <h2 className={s.subtitle} >Welcome Foodie!</h2>
                            <h4 className={s.text1} >Find your best healthy recipe and don't feel bad for what you eat.</h4>
                            <h4 className={s.text2} >Eat delicious food, eat healthy food, just here in healthy food web!</h4>
                    <Link to='/home' >
                            <button className={s.buttonStart}>
                                <span>Healthy Start</span>
                            </button>
                    </Link>
                </div>

                <div className={s.contentSalad}>
                    <img src={salad} className={s.salad} alt='salad'/>
                </div>
                <div className={s.contentSalad2}>
                    <img src={salad} className={s.salad} alt='salad'/>
                </div>
                <div className={s.contentFish}>
                    <img  src={fishFood} className={s.fishFood} alt='salmonSalad'/>
                </div>


            </div>


        </div>
    )
};

export default LandingPage;