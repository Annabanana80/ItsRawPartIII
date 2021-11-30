import React, { useState, useEffect } from "react";
import { get, patch } from 'axios';
import './EditRecipe.css'

function EditRecipe(props) {

  const initialState = { title: '', summary: '', ingredients: '', instructions:'', photo:'' }
  const [recipe, setRecipe] = useState(initialState)

  useEffect(function() {
    async function getRecipe() {
      try {
        const response = await get(`http://localhost:3001/api/recipes/${props.match.params._id}`);
        setRecipe(response.data);      
      } catch(error) {
        console.log(error);
      }
    }
    getRecipe();    
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('summary', recipe.summary);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('photo', recipe.photo);
    async function updateRecipe() {
      try {
        await patch(`http://localhost:3001/api/recipes/${recipe._id}`, formData);
        props.history.push(`/recipes/${recipe._id}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateRecipe();
  }

  function handleChange(event) {
    setRecipe({...recipe, [event.target.name]: event.target.value})
  }
  const handlePhoto = (e) => {
    setRecipe({...recipe, photo: e.target.files[0]});
  }

  function handleCancel() {
    props.history.push(`/recipes/${recipe._id}`);
  }

  return (
    <div className="EditRecipe">
      <div className='editRecipeHeader'>
        <h1 className="listTitle">Edit {recipe.title}</h1>
      </div>      
      <hr/>
      <div className='formContainer mdc-card'>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='form-group'>
          <label>Title</label>
          <input type="text" name="title" value={recipe.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Summary</label>
          <input name="summary" type="text" value={recipe.summary} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Ingredients</label>
          <textarea name="ingredients" rows="5" type="text" value={recipe.ingredients} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea name="instructions" rows="5" value={recipe.instructions} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-grou">
          <label>Edit photo?</label>
          <input filename="photo" onChange={handlePhoto} type="file" />
        </div>
        <div className="btnContainer">
          <button type="submit" className="mdc-button mdc-button--raised">Update</button>
          <button type="button" onClick={handleCancel} className="mdc-button mdc-button--raised">Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default EditRecipe;
