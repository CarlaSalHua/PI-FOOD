import React from 'react';
import s from './Loading.module.css';


const Loading =() => {

    return (
        <div className={s.containerLoading}>
            <img className="imgLoading" src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" alt=''/>
        </div>
    )
};

export default Loading;