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
import {SPOONACULAR_API_KEY} from "../../config/keys";

const searchIngredients = [];

const renderSearchRecipesForm = () => {
  // diets & restrictions
  const diets = ['Ketogenic', 'Lacto-vegetarian', 'Ovo-vegetarian', 'Paleo', 'Primal', 'Vegan', 'Vegetarian', 'Whole30'],
    allergies = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];

  let dietOpts = '',
    foodAllergies = '';

  function addSearchIngredient() {
    let ingredient = $('#search-ingredient').val().trim();

    // if a user try to add an empty string, do nothing.
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

  // Initialize Materialize form select.
  $('select').formSelect();
};


const renderCarousel = () => {
  const number = 10;
  const recipeURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
  const queryURL = `${recipeURL}random?limitLicense=true&number=${number}`;

  $.ajax({
    url: queryURL,
    method: 'GET',
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": SPOONACULAR_API_KEY
    },
  }).then(function(response) {
    console.log('random recipes ajax1 | successful!!!!');
    const recipes = response.recipes;
    console.log(recipes);

    _.forEach(recipes, (recipe) => {
      let html = `<a class="carousel-item" href="recipe.html?id=${recipe.id}">
            <span class="cooking-time">${recipe.readyInMinutes}min</span>
            <img src="${recipe.image}">
            <h3 class="random-recipes__title">${recipe.title}</h3>
            <button class="waves-effect waves-light btn-large random-recipes__btn">
              View This Recipe
              <i class="material-icons right">chevron_right</i>
            </button>
         </a>`;
      $('#random-recipes').append(html);
    });

    // Initialize Materialize carousel.
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });

  }).catch(function (error) {
    console.log(`${error.status} ${error.statusText.toUpperCase()}`);
  });
};


const buildUrlForRecipesPage = () => {

  const diet = $('#special-diets option:selected').val().trim();

  const intolerances = [];
  $('#food-allergies input:checked').each((_, checkbox) => {
    intolerances.push($(checkbox).attr('name'));
  });

  const params = {
    diet: diet,
    intolerances: intolerances,
    ingredients: searchIngredients
  };

  console.log(JSON.stringify(params));

  const paramsBase64 = btoa(JSON.stringify(params));

  const recipesPageUrl = `recipes.html?params=${paramsBase64}`;

  return recipesPageUrl;
};

const landingPage = () => {
  console.log('landingPage!!!');

  renderSearchRecipesForm();

  renderCarousel();

  $('#search-btn').on('click', () => {
    // buildUrlForRecipesPage();
    location.href = buildUrlForRecipesPage();
  });
};

export default landingPage;

export { renderSearchRecipesForm };
