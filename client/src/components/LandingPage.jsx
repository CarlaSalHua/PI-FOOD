import React from 'react';
import {Link} from 'react-router-dom';

function LandingPage(){
    return(
        <div>
            <h1>Welcome Foodie!</h1>
            <Link to='/home'>
                <button>Sing in</button>
            </Link>
        </div>
    )
};

export default LandingPage;