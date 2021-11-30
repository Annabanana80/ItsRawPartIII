import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import './RecipeList.css'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])

  useEffect(function(){
    async function getRecipes(){
      try {
        const response = await axios.get("http://localhost:3001/api/recipes")
        setRecipes(response.data)
      } catch(error) {
        console.log('error', error)
      }
    }
    getRecipes()
  },[])
  return (
    <div className="RecipeList">
      <div className="recipeListHeader">
        <h2 className="listTitle">Recipes</h2>
        <button className="mdc-button mdc-button--raised">
          <Link to='/new' className="mdc-button__label">Create Recipe</Link>
        </button>  
      </div>           
      <hr/>
      <div className='container'>
      {recipes.map((recipe) => {
        return(          
          <div className="card" key={recipe._id}>
            <img className="card-img" src={`${process.env.PUBLIC_URL}/images/uploads/${recipe.photo}`} alt="cute cat"/>
            <div className="card-gradient"></div>
            <div className="card-animation">
              <h3 className="card-title">{recipe.title}</h3>
              <p className="card-description">{recipe.summary}</p>
            </div>
            <div className="card-footer">
              <button className="mdc-button mdc-button--outlined">
                <div className="mdc-button__ripple"></div>
                <Link className="mdc-button__label" to={`/recipes/${recipe._id}`}>See Recipe</Link>
              </button>
              <small>_id: {recipe._id}</small>
            </div>
          </div>         
        )     
      })}
      </div>
    </div>
  )
}
