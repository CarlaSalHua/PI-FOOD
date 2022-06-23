import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRecipe } from "../../redux/actions";
import { validationImage, validationText } from "./Validations";
import healthyGirl from "../../imagenes/healthyGirl.png";
import icon from "../../imagenes/DietTypes/DietTypes.jsx";
import s from "./RecipeCreate.module.css";

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

const RecipeCreate = () => {
  const dispatch = useDispatch();
  // const typeDiets= useSelector((state)=>state.diets)
  const typeDiets = [
    "gluten free",
    "dairy free",
    "fodmap friendly",
    "ketogenic",
    "primal",
    "lacto ovo vegetarian",
    "vegan",
    "paleolithic",
    "whole 30",
    "pescatarian",
  ];
  // console.log(typeDiets)

  const [succesPost, setSuccesPost] = useState(false);
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    diets: [],
    steps: [
      {
        name: "",
        steps: [],
      },
    ],
  });

  const [errorText, setErrorText] = useState({});
  const [errorImage, setErrorImage] = useState(null);

  const [dietSelected, setDietSelected] = useState([]);
  
  const [imageRecipe, setImageRecipe] = useState("");
  const [inputSteps, setInputSteps] = useState({
    number: 0,
    step: null,
  });

  const inputStepRef = useRef(null);
  const inputImageRef = useRef(null);

  //IMAGE
  const handleImage = (input) => {
    const advice = validationImage(input);
    setErrorImage(advice);
    setImageRecipe(inputImageRef.current.value);
  };

  //INPUT VALIDATIONS
  const handleInputs = (input) => {
    //console.log("my data", input);
    const advice = validationText(input);
    setErrorText(advice);
    if (Object.entries(advice).length === 0) {
      const stepsToString = JSON.stringify(input.steps[0].steps);
         console.log("formateados", stepsToString);
      
         const myData = {
        ...input,
        steps: stepsToString,
        healthScore: Number(input.healthScore),
      };
      setSuccesPost(true);
      dispatch(createRecipe(myData)); //function imported
    }
  };

  //CHANGE
  const handleChange = (e) => {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  //DIET
  const handleDiets = (e) => {
    e.preventDefault();
    if (input.diets.includes(e.target.value)) {
      input.diets = input.diets.filter((i) => i !== e.target.value);
      setDietSelected((dietSelected) =>
        dietSelected.filter((d) => d !== e.target.value)
      );
    } 
    
    else {
      input.diets.push(e.target.value);
      setDietSelected((dietSelected) => [...dietSelected, e.target.value]);
    }
    //console.log(input.diets);
  };

  //STEP
  const handleChangeStep = (e) => {
    setInputSteps((inputSteps) => ({
      ...inputSteps,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleAddStep = () => {
    setInput((input) => ({
      ...input,
      steps: [
        {
          name: "",
          steps: [...input.steps[0].steps, inputSteps],
        },
      ],
    }));
    
    setInputSteps({
      number: ++inputSteps.number,
      step: "",
    });
    
    inputStepRef.current.value = "";
  };
  
  // useEffect(()=>{
  //     setInput({
  //         ...input,
  //         diets: input.diets,
  //     });
  // },[dietSelected]);

  useEffect(() => {
    setInput((formData) => ({
      ...formData,
      diets: dietSelected,
    }));
  }, [dietSelected]);

  return (
    <div className={s.generalContent}>
      <img src={healthyGirl} alt="" />
      {/* *********************************** */}
      <div className={s.content}>
        <h3 className={s.title}>Create your healthy recipe!</h3>

        <form onSubmit={(e) => e.preventDefault()} action="">
          {/* *********************************** */}
          <div className={s.contentName}>
            <label htmlFor="name">Name Recipe: </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              autoComplete="off"
            />
            <span>{errorText.name}</span>
          </div>

          {/* ************************************ */}

          <div className={s.contentScore}>
            <label htmlFor="healthScore">Healthy Score:</label>
            <input
              onChange={handleChange}
              type="number"
              name="healthScore"
              id="healthScore"
              min={0}
              max={100}
            />
            <span>{errorText.healthScore}</span>
          </div>

          {/* ****************************************** */}
          <div className={s.contentImage}>
            <div className={s.contentImg}>
              <img src={imageRecipe} alt="" />
            </div>
            {/* *********************** */}
            <div className={s.contentInput}>
              <label htmlFor="image">Image(URL):</label>
              <input
                onChange={handleChange}
                ref={inputImageRef}
                type="text"
                id="image"
                name="image"
              />
              <span>{errorImage}</span>
            </div>
            {/* *********************** */}
            <button onClick={() => handleImage(inputImageRef.current.value)}>
              Add image
            </button>
          </div>
          {/* ********************************************** */}

          <div className={s.contentSteps}>
            <label htmlFor="">Steps:</label>
            <div className={s.addSteps}>
              <span>{inputSteps.number + 1}</span>
              <input
                onChange={handleChangeStep}
                type="text"
                name="step"
                id="step"
                autoComplete="off"
                ref={inputStepRef}
              />
              <button type="submit" onClick={handleAddStep}>
                More Steps
              </button>
            </div>
          </div>
          {/* ********************************************** */}
          <div className={s.contentSummary}>
            <label htmlFor="summary">Summary:</label>
            <textarea name="summary" id="summary" onChange={handleChange} />
            <span>{errorText.summary}</span>
          </div>
          {/* ********************************************** */}

          <div>
            <div className={s.contentDiets}>
              <div className={s.formDiets}>
                <label className={s.dietsTitle} htmlFor="">
                  Diets:
                </label>
                <div className={s.formContainerDiets}>
                  {typeDiets?.map((index) => {
                    // console.log(iconDietTypes[d.nameType])
                    return (
                      <div key={index} className={s.containerDiets}>
                        <input
                          onClick={(e)=>handleDiets(e)}
                          className={`${s.formDietButton} ${
                            input.diets.includes(index) ? s.dietSelected : null
                          } `}
                          type="image"
                          src={iconDietTypes[index]}
                          alt={`${index}-icon`}
                          value={index}
                        />
                        {/* <span>{index[0].toUpperCase() + index.slice(1)}</span> */}
                        <label>{index}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* ************************************ */}
          </div>
        </form>
        {/* ************************************ */}
        <button onClick={()=> handleInputs(input)} className={s.buttonCreate}>
          Create
        </button>
        <Link to="/home">
          <button className={s.backButton}>Back</button>
        </Link>
      </div>
      {succesPost && (
        <div className={s.generalContainerSucces}>
          <div className={s.containerSucces}>
            <h2>The recipe was succesfully created </h2>
            <NavLink to={"/home"}>
              <button>Home</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCreate;
