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

let offset = 0;

const renderRecipesList = (offset) => {
  const queryURL = buildRecipesQueryURL(offset);
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

    if (results.length < 20) {
      $('#show-more').remove();
    }

    const dietTypeEls = (diets) => {
      let html = '';
      _.forEach(diets, (diet) => {
        html += `<span class="waves-effect waves-light btn-small">${diet}</span>`;
      });
      return html;
    };

    results.forEach(function(result) {
      // Render only recipes whose cooking time is equal to or less than 45 mins
      if (result.readyInMinutes <= 45) {
        recipeIDs.push(result.id);

        const recipeItemHtml = `
          <div class="card recipes-card">
            <div class="recipes-img__container">
                <a href="recipe.html?id=${result.id}" target="_blank" rel="noopener">
                <img src="${result.image}" alt="${result.title}">
              </a>
              <span class="recipes-cooking-time">${result.readyInMinutes}min</span>
            </div>
            <div class="recipes-description">
                <div class="card-content">
                    <h5 class="recipe-title">
                        <a href="recipe.html?id=${result.id}" target="_blank" rel="noopener">${result.title}</a>
                    </h5>
                    <div class="diet-types-container">
                        ${dietTypeEls(result.diets)}
                    </div>
                    <p class="summary">${result.summary}</p>
                </div>
                <div class="card-action health-score">
                    <i class="material-icons left">grade</i>
                    <span>Health Score: </span>
                    <span>${result.healthScore}</span>
                </div>
            </div>
        </div>
        `;

        $('#recipes-list').append(recipeItemHtml);
      }
    });

  }).catch(function (error) {
    console.log(`${error.status} ${error.statusText.toUpperCase()}`);
  });

};

const buildRecipesQueryURL = (offset) => {
  const searchObj = createSearchObj();
  console.log(searchObj);

  const recipeURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
  const diet = searchObj.diet;
  console.log('diet: ' + diet);
  const intolerances = _.join(searchObj.intolerances, ',');
  console.log('intolerances: ' + intolerances);
  const ingredients = _.join(searchObj.ingredients, ',');
  console.log('ingredients: ' + ingredients);
  const number = 20;
// https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
  const sort = 'popularity';

  const queryURL = `${recipeURL}complexSearch?diet=${diet}&intolerances=${intolerances}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&sort=${sort}&number=${number}&limitLicense=true&offset=${offset}`;
  console.log(queryURL);
  return queryURL;
};

const renderSearchCriteria = () => {
  const searchObj = createSearchObj();

  $('#search-diet-types span').text(searchObj.diet);
  $('#search-food-allergies span').text(_.join(searchObj.intolerances, ', '));
  $('#search-ingredients span').text(_.join(searchObj.ingredients, ', '));
};

const createSearchObj = () => {
  console.log(location.search);
  const parsed = queryString.parse(location.search);
  console.log(parsed);
  return JSON.parse(atob(parsed.params));

  // searchObj = {
  //   diet: diet,
  //   intolerances: intolerances,
  //   ingredients: searchIngredients
  // };
};

const recipesPage = () => {
  console.log('recipes page!!');
  renderSearchCriteria();
  renderRecipesList(0);

  $('#show-more').on('click', () => {
    offset += 20;
    renderRecipesList(offset);
  });
};

export default recipesPage;