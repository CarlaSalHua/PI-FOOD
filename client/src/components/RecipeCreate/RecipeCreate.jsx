import React, {useState,useEffect, useRef} from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, dietsByNameType } from "../../redux/actions";
import { validationImage, validationText } from "./Validations";

const RecipeCreate =()=>{
    const dispatch = useDispatch();
    const diets= useSelector((state)=>state.diets)

    const [input, setInput]= useState ({
        name:'',
        summary:'',
        healthScore:'',
        image:'',
        diets:[],
        stepInstructions:[
            {
                name:'',
                steps:[],
            }
        ],
    });

    const [succesPost, setSuccesPost] = useState(false);
    const [errorText, setErrorText] = useState({});
    const [errorImage, setErrorImage] = useState(null);
    const [dietSelected, setDietSelected] = useState([]);
    const [imageRecipe, setImageRecipe] = useState('');
    const [inputStep, setInputStep] = useState({
        number: 0,
        step: null,
    });
    
    const inputStepRef= useRef(null);
    const inputImageRef= useRef(null);

    //IMAGE
    const handleImage= (input)=>{
        const advice =validationImage(input);
        setErrorImage(advice);
        setImageRecipe(inputImageRef.current.value);
    };
    
    //INPUT VALIDATIONS
    const handleInputs= (data)=>{
        const advice =validationText(data);
        setErrorText(advice);
        if(Object.entries(advice).length===0){
            setSuccesPost(true);
            createRecipe(dispatch, input); //function imported
            dietsByNameType(dispatch); //function imported
        };
    };
    
    //CHANGE
    const handleChange= (e)=>{
        setInput((input)=>({
            ...input,
            [e.target.name]: e.target.value,
        }));
        // setErrors(validate({
        //     ...input,
        //     [e.target.value]:e.target.value
        // }))
    };

    //DIET
    const handleDiets= (e)=>{
        if(dietSelected.includes(e.target.value)){
            setDietSelected((dietSelected)=>
                dietSelected.filter((d)=>d!==e.target.value)
            ); 
        }
        else{
            setDietSelected((dietSelected)=>
            [...dietSelected, e.target.value]
            );
        };
    };

    //STEP
    const handleChangeStep=(e)=> {
        setInputStep((inputStep)=>({
            ...inputStep,
            [e.target.name]:e.target.value,
        }));
    };

    const handleAddStep=()=> {
        setInput((input)=>({
            ...input,
            stepInstructions:[
                {
                    name:'',
                    steps: [...input.stepInstructions[0].steps, inputStep]
                },
            ],
        }));
        
        setInputStep({
            number: ++inputStep.number,
            step:'',
        });

        inputStepRef.current.value='';
    };

    useEffect(()=>{
        setInput((input)=>({
            ...input,
            diets: dietSelected,
        }))
    },[dietSelected]);

    
    return (
    <div>
        <div>

            <Link to='/home'><button>Back</button></Link>
            <h3>Create your healthy recipe!</h3>

            <form onSubmit={(e)=>e.preventDefault()} action=''>
                {/* *********************************** */}
                <div>
                    <label>Name Recipe:{' '}</label>
                    <input type='text' value={input.name} name='name' id='name' onChange={handleChange} autoComplete='off'/>
                    <span>{errorText.name}</span>
                </div>
                {/* ************************************ */}
                <div>    
                    <div>
                        <img src={imageRecipe} alt=''/>
                    </div>
                    {/* ************************************ */}
                    <div>
                        <label>Image(URL):</label>
                        <input onChange={handleChange} type='text' name='image'/>
                        <span>{errorImage}</span>
                    </div>
                    {/* ************************************ */}
                    <button onClick={()=>handleImage()}>Add image</button>
                </div>
                {/* ************************************ */}
                <div>
                    <label htmlFor='summary'>Summary:</label>
                    <textarea type='text' name='summary' id='summary' onChange={handleChange}/>
                    <span>{errorText.summary}</span>
                </div>
                {/* ************************************ */}
                <div>
                    <label htmlFor='healthScore'>Healthy Score:</label>
                    <input type='number' name='healthScore' id='healthScore' min={0} max={100}/>
                    <span>{errorText.healthScore}</span>
                </div>
                {/* ************************************ */}
                <div>

                    <div>
                        <label htmlFor=''>Diets:</label>
                        {diets?.map((d,index)=>(
                            <div key={index}>
                                <input onClick={handleDiets} type='text' alt=''/>
                                <span>{d.name[0].toUpperCase() + d.name.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                    {/* ************************************ */}
                    <div>
                        <label htmlFor=''>Steps:</label>
                        <div>
                            <span>{inputStep.number+1}</span>
                            <input onChange={handleChangeStep} type='text'  name='step' id='step'  autoComplete='off' />
                            <button onClick={handleAddStep} >More Steps</button>
                        </div>
                    </div>
                    {/* ************************************ */}
                </div>
            </form>
            {/* ************************************ */}
            <button onClick={()=>handleInputs(input)}>
                Create
            </button>
        </div>
        {
            succesPost&&(
                <div>
                    <div>
                        <h2>The recipe was succesfully created{' '}</h2>
                        <NavLink to={'/home'}>
                            <button>Home</button>
                        </NavLink>
                    </div>
                </div>
            )
        }
    </div>
  );
};

export default RecipeCreate;