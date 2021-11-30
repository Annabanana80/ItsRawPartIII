import React, { useState } from "react"; 
import { post } from 'axios';
import './CreateRecipe.css'

function CreateRecipe(props) {
  const initialState = { title: '', summary: '', ingredients: '', instructions:'', photo:'' }
  const [recipe, setRecipe] = useState(initialState) 

  function handleChange(event) { 
    setRecipe({...recipe, [event.target.name]: event.target.value})
    console.log(recipe)
  }
  const handlePhoto = (e) => {
    setRecipe({...recipe, photo: e.target.files[0]});
}

  function handleSubmit(event) { 
    event.preventDefault();  
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('summary', recipe.summary);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('photo', recipe.photo);
    async function postRecipe() {
      try {
        const response = await post('http://localhost:3001/api/recipes', formData); 
        props.history.push(`/recipes/${response.data._id}`);  
      } catch(error) {
        console.log('error', error);
      }
    }
    postRecipe();
  }

  function handleCancel() {
    props.history.push("/recipes");
  }

  return ( 
    <div className="CreateRecipe">
      <div className="createRecipeHeader">
        <h1 className="listTitle">Create recipe</h1>
      </div>
      <hr/>
      <div className="formContainer mdc-card">
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-group">
          <label>Title</label>
          <input name="title" type="text" value={recipe.title} onChange={handleChange} className="form-control" />
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
        <div className="form-group">
          <label>Add a photo?</label>
          <input filename="photo" onChange={handlePhoto} type="file" />
        </div>
        <div className="btnContainer">
          <button type="submit" value="Submit" className="mdc-button mdc-button--raised">Submit</button>
          <button type="button" onClick={handleCancel} className="mdc-button mdc-button--raised">Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
