import React from 'react';
import './App.css'
import { Route, Link } from 'react-router-dom';
import CreateRecipe from './components/recipes/CreateRecipe'
import EditRecipe from './components/recipes/EditRecipe'
import RecipeList from './components/recipes/RecipeList'
import RecipeInfo from './components/recipes/RecipeInfo'
import Home from '../src/components/pages/Home'

export default function App () {
  return (
    <div className="App">
      <header>
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <span className="mdc-top-app-bar__title">It's RAAAAAW!!!</span>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite"><Link to='/'>Home</Link></button>
            <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search"><Link to='/recipes'>Recipes</Link></button>
          </section>
        </div>
      </header>      
      <main className="mdc-top-app-bar--fixed-adjust">
        <Route exact path='/recipes' component={RecipeList} />
        <Route exact path='/new' component={CreateRecipe} />
        <Route exact path='/recipes/:_id' component={RecipeInfo} />
        <Route exact path='/recipes/:_id/edit' component={EditRecipe} />
        <Route exact path='/' component={Home} />
      </main>
  </div>
  )
}
