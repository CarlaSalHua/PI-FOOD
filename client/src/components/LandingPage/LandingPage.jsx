import React from 'react';
import {Link} from 'react-router-dom';
//import styles from './LandingPage.css'
import Background from '../../imagenes/multivegetal.jpg'

function LandingPage(){
    return(
        <>
        <h1>Healthy Food Web</h1>
                <h2>Welcome Foodie!</h2>
                <h4>Find your best healthy recipe!</h4>
            <Link to='/home'>
                    <button>
                        <span>Healthy Start</span>
                    </button>
            </Link>
            <img src={Background} alt='vegetales'/>
        </>
    )
};

export default LandingPage;