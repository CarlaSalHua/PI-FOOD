import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.css'

function LandingPage(){
    return(
        <>
            <Link to='/home'>
                <h1>Welcome Foodie!</h1>
                
                    <button>
                        <span>Healthy Start</span>
                    </button>
            </Link>
        </>
    )
};

export default LandingPage;