/******************************************************************************
FSWD:  Yuko Uda, Brittany-Renee Davis & Christopher Zenner
Date:  03/29/2020
File:  landing-page.js
Ver.:  0.1.0 20200329
       
This JS script implements the functionality for a recipe search app/site.
******************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import 'materialize-css';

const createTopPage = () => {
  // diets & restrictions
  const diets = ['Ketogenic', 'Lacto-vegetarian', 'Ovo-vegetarian', 'Paleo', 'Primal', 'Vegan', 'Vegetarian', 'Whole30'],
    allergies = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];

  let dietOpts = '',
    foodAllergies = '',
    searchIngredients = [];

  function addSearchIngredient() {
    let ingredient = $('#search-ingredient').val().trim();
    console.log('ingredient.length: ' + ingredient.length);

    if (ingredient.length <= 0) {
      return;
    }

    const ingredientLI = $('<li>');
    searchIngredients.push(ingredient);
    ingredientLI.text(ingredient);
    $('#search-ingredients').append(ingredientLI);
    $('#search-ingredient').val('');
  }

  _.forEach(diets, val => {
    // <option value="1">Option 1</option>
    console.log('diet: ' + val.toLowerCase());
    dietOpts += `<option value="${_.toLower(val)}">${val}</option>`;
  });

  console.log('dietOpts' + dietOpts);
  $('#special-diets').append(dietOpts);

  _.forEach(allergies, val => {
    let count = 0,
      divider = '<div class="col s3">';

    foodAllergies += ((count === 0 || count % 5 === 0) ? divider : null);
    foodAllergies += `<div><label><input type="checkbox" name="${_.toLower(val)}"><span>${val}</span></label></div>`;
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
};


const buildUrlToRecipesPage = () => {

  const diet = $('#special-diets option:selected').val().trim();
  const ingredients = [];
  $('#search-ingredients li').each((_, item) => {
    ingredients.push($(item).text());
  });
  console.log(ingredients);

  const intolerances = [];
  $('#food-allergies input:checked').each((_, checkbox) => {
    intolerances.push($(checkbox).attr('name'));
  });
  console.log(intolerances);

  const params = {
    diet: diet,
    intolerances: intolerances,
    ingredients: ingredients
  };

  console.log(params);

  console.log(JSON.stringify(params));

  const paramsBase64 = btoa(JSON.stringify(params));

  const recipesPageUrl = `recipes.html?params=${paramsBase64}`;
  
  console.log('recipesPageUrl: ' + recipesPageUrl);
  return recipesPageUrl;
};

// $('#search-btn').on('click', () => {
//   // buildUrlToRecipesPage();
//
//   location.href = buildUrlToRecipesPage();
// });

export {
  createTopPage,
  buildUrlToRecipesPage
};
