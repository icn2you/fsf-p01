/******************************************************************************
FSWD:  Yuko Uda, Brittany-Renee Davis & Christopher Zenner
Date:  03/29/2020
File:  recipes.js
Ver.:  0.1.0 20200329
       
This JS script implements the functionality for a recipe search app/site.
******************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import 'materialize-css';

$(document).ready(() => {
  // diets & restrictions
  const diets = ['Ketogenic', 'Lacto-vegetarian', 'Ovo-vegetarian', 'Paleo', 'Primal', 'Vegan', 'Vegetarian', 'Whole30'],
        allergies = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];

  let dietOpts = '',
      foodAllergies = '',
      searchIngredients = [];

  function addSearchIngredient() {
    let ingredient = $('#search-ingredient').val(),
        ingredientLI = '<li>';
    
    searchIngredients.push(ingredient);
    ingredientLI += `${ingredient}</li>`;

    $('#search-ingredients').append(ingredientLI);
    $('#search-ingredient').val('');
  }      

  _.forEach(diets, val => {
    // <option value="1">Option 1</option>
    dietOpts += `<option value="${_.toLower(val)}">${val}</option>`;
  });

  $('#special-diets').append(dietOpts);

  _.forEach(allergies, val => {
    let count = 0,
      divider = '<div class="col s3">';

    foodAllergies += ((count === 0 || count % 5 === 0) ? divider : null);
    foodAllergies += `<div><label><input id="${_.toLower(val)}" type="checkbox"><span>${val}</span></label></div>`;
    foodAllergies += ((count % 5 === 0) ? '</div>' : null);

    count++;
  });

  $('#food-allergies').append(foodAllergies);

  $('#search-ingredient').on('keyup', event => {
    if (event.type === 'keyup' && event.key !== 'Enter')
      return;

    addSearchIngredient();
  });

  $('#add-ingredient').on('click', event => {
    addSearchIngredient();
  });

  // Initialize Materialize carousel and form select.
  $('.carousel').carousel();
  $('select').formSelect();
});