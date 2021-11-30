import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import './RecipeInfo.css'

export default function RecipeInfo(props) {
  const [recipe, setrecipe] = useState({}); 

  useEffect(function() { 
    async function getRecipe() {
      try {
        const response = await axios.get(`http://localhost:3001/api/recipes/${props.match.params._id}`); 
        setrecipe(response.data);      
      } catch(error) {
        console.log('error', error);
      }
    }
    getRecipe();    
  }, [props]); 

  async function handleDelete() { 
    try {
      await axios.delete(`http://localhost:3001/api/recipes/${props.match.params._id}`); 
      props.history.push("/recipes"); 
    } catch(error) {
      console.error(error);
    }
  }
//  const fallback_img = "http://placekitten.com/300/400"
//   const swapDefaultImage = (e) => (e.target.src = fallback_img);
  return ( 
    <div className="RecipeInfo">
      <div className="recipeInfoHeader">
        <h1 className="listTitle">{recipe.title}</h1>
      </div>
      <section className="recipeInfoContainer">
        <div className="imageSummary">
          <img className ="foodPhoto" src={`${process.env.PUBLIC_URL}/images/uploads/${recipe.photo}`} alt='food'/>
          <div className="summary mdc-card">
            <p>{recipe.summary}</p>
          </div>
        </div>
      <div className="ingInstContainer">
        <div className="ingredients mdc-card">
          <h3>Ingredients</h3>
          <p>{recipe.ingredients}</p>
        </div>
        <div className="instructions mdc-card">
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
      </div> 
      </section>
    
      <div className="btnInfoContainer">
        <Link to={`/recipes/${recipe._id}/edit`} className="mdc-button mdc-button--raised" id="edit">Donkey!</Link> 
        <button onClick={handleDelete} className="mdc-button mdc-button--raised" id="delete" >Shut it down!!</button> 
        <Link to="/recipes" className="mdc-button mdc-button--raised" id="close">**** Off</Link>
      </div>
    </div>
  );
};

