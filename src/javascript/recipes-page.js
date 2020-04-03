/******************************************************************************
 FSWD:  Yuko Uda, Brittany-Renee Davis & Christopher Zenner
 Date:  04/03/2020
 File:  recipes-page.js
 Ver.:  0.1.0 20200403

 This JS script implements the functionality for a recipe search app/site.
 ******************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import 'materialize-css';
import { SPOONACULAR_API_KEY } from '../../config/keys';

// EX_page) http://localhost:9000/recipes.html?params=eyJkaWV0IjoidmVnZXRhcmlhbiIsImludG9sZXJhbmNlcyI6WyJwZWFudXQiXSwiaW5ncmVkaWVudHMiOlsidG9tYXRvIiwib25pb24iXX0=

const queryString = require('query-string');
const separator = ',';

const renderRecipesPage = () => {
  const queryURL = buildRecipesQueryURL();
  console.log(queryURL);
  const recipeIDs = [];

  $.ajax({
    url: queryURL,
    method: 'GET',
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": SPOONACULAR_API_KEY
    },
  }).then(function(response) {
    console.log('recipes ajax1 | successful!!!!');
    const results = response.results;
    console.log(results);

  }).catch(function (error) {
    console.log(`${error.status} ${error.statusText.toUpperCase()}`);
  });

};

const buildRecipesQueryURL = () => {
  console.log(location.search);
  const parsed = queryString.parse(location.search);
  console.log(parsed);
  const searchObj = JSON.parse(atob(parsed.params));
  console.log(searchObj);

  // searchObj = {
  //   diet: diet,
  //   intolerances: intolerances,
  //   ingredients: searchIngredients
  // };

  const recipeURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
  const diet = searchObj.diet;
  console.log('diet: ' + diet);
  const intolerances = _.join(searchObj.intolerances, separator);
  console.log('intolerances: ' + intolerances);
  const ingredients = _.join(searchObj.ingredients, separator);
  console.log('ingredients: ' + ingredients);
  const number = 50;
// https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
  const sort = 'popularity';

  const queryURL = `${recipeURL}complexSearch?diet=${diet}&intolerances=${intolerances}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&sort=${sort}&number=${number}&limitLicense=true`;
  console.log(queryURL);
  return queryURL;
};

const recipesPage = () => {
  console.log('recipes page!!');
  renderRecipesPage();
};

export default recipesPage;