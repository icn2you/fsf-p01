// ********** Variables for QueryURLs **********
const apiKey = MY_API_KEY;
// const apiKey = SPOONACULAR_API_KEY;
const recipeURL = 'https://api.spoonacular.com/recipes/';
const diet = 'vegetarian';
const intolerances = 'peanut';
const ingredients = 'tomato,onion';
const number = 3;
const apiImagePath = 'https://spoonacular.com/recipeImages/';

// https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
const sort = 'popularity';

// https://spoonacular.com/food-api/docs#Diets
const dietTypesList = [
  'glutenFree',
  'ketogenic',
  'vegan',
  'vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'pescetarian',
  'paleo',
  'primal',
  'whole30', // doesn't exist?
];

// https://spoonacular.com/food-api/docs#Intolerances
const intolerancesList = [
  'dairy',
  'egg',
  'gluten',
  'grain',
  'peanut',
  'seafood',
  'sesame',
  'shellfish',
  'soy',
  'sulfite',
  'tree nut',
  'wheat'
];

// ********** QueryURLs **********
// https://spoonacular.com/food-api/docs#Search-Recipes-Complex
// https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&intolerances=egg,gluten&includeIngredients=tomato,onion&instructionsRequired=true&addRecipeInformation=true&sort=<string>&number=100&limitLicense=true&apiKey=###
const queryURL = `${recipeURL}complexSearch?apiKey=${apiKey}&diet=${diet}&intolerances=${intolerances}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&sort=${sort}&number=${number}&limitLicense=true`;

// Search by Diet and instructionsRequired => id, image, imageUrls, readyInMinutes, servings, title
// https://spoonacular.com/food-api/docs#Search-Recipes
const queryUrlRecipes = `${recipeURL}search?apiKey=${apiKey}&diet=${diet}&intolerances=${intolerances}&instructionsRequired=true&number=${number}`;

// Search by Ingredients
// https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
const queryUrlByIng = `${recipeURL}findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=${number}`;


const recipeIDs = [];

$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
  console.log('ajax1 | successful!!!!');
  const results = response.results;
  console.log(results);

  results.forEach(function(result) {
    // Render only recipes whose cooking time is equal to or less than 30 mins
    if (result.readyInMinutes <= 45) {
      recipeIDs.push(result.id);

      const tr = $(`<tr id=${result.id}>`);
      const idTd = $('<td>').text(result.id);
      const titleTd = $('<td>').text(result.title);
      const imgEl = $('<img>').attr('src', result.image);
      const imgTd = $('<td>').append(imgEl);
      const minutesTd = $('<td>').text(result.readyInMinutes);
      const summaryTd = $('<td>').html(result.summary);
      const dietsTd = $('<td>');
      let dietsText = '';
      result.diets.forEach((diet) => {
        dietsText += `${diet}, `;
      });
      dietsTd.text(dietsText);
      // const servingTd = $('<td>').text(result.servings);

      tr.append(idTd, titleTd, imgTd, minutesTd, dietsTd, summaryTd);
      $('#ingredients .result tbody').append(tr);
    }
  });

  console.log('recipeIDs: ' + recipeIDs);
}).catch(function (error) {
  console.log(`${error.status} ${error.statusText.toUpperCase()}`);
});


/*
$.ajax({
  url: queryUrlRecipes,
  method: 'GET'
}).done(function (response1) {
  console.log('ajax1 | successful!!!!');
  const results = response1.results;
  console.log(results);

  results.forEach(function(result) {
    // Render only recipes whose cooking time is equal to or less than 30 mins
    if (result.readyInMinutes <= 30) {
      recipeIDs.push(result.id);

      const tr = $(`<tr id=${result.id}>`);
      const idTd = $('<td>').text(result.id);
      const titleTd = $('<td>').text(result.title);
      const imgEl = $('<img>').attr('src', `${apiImagePath}${result.image}`);
      imgEl.attr('height', '200px');
      const imgTd = $('<td>').append(imgEl);
      const servingTd = $('<td>').text(result.servings);
      const minutesTd = $('<td>').text(result.readyInMinutes);

      tr.append(idTd, titleTd, imgTd, servingTd, minutesTd);
      $('#ingredients .result tbody').append(tr);
    }
  });

  console.log('recipeIDs1: ' + recipeIDs);

// Filter out the recipes by selected Ingredients
  $.ajax({
    url: queryUrlByIng,
    method: 'GET'
  }).done(function (response2) {
    console.log('ajax2 | successful!!!!');
    console.log(response2);

    response2.forEach(function(recipe) {

      if (recipeIDs.includes(recipe.id)) {
        recipeIDs2.push(recipe.id);
      }
      // recipeIDs.push(recipe.id);
      //
      // const tr = $(`<tr id=${recipe.id}>`);
      // const idTd = $('<td>').text(recipe.id);
      // const titleTd = $('<td>').text(recipe.title);
      // const imgEl = $('<img>').attr('src', recipe.image);
      // const imgTd = $('<td>').append(imgEl);
      //
      // tr.append(idTd, titleTd, imgTd);
      // $('#ingredients .result tbody').append(tr);
    });

    console.log('recipeIDs2: ' + recipeIDs2);

  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log(`ajax2 | ${textStatus.toUpperCase()}: ${errorThrown}`)
  });

}).fail(function(jqXHR, textStatus, errorThrown) {
  console.log(`ajax1 | ${textStatus.toUpperCase()}: ${errorThrown}`)
});
*/



/*
======= Using Promises Example by Bjorn =============
$.ajax({url: 'blah', method: 'GET'}).then(function(response) {
  var mything = response.mything;

  return $.ajax({url: 'blah' + mything})
}).then(function (response) {
  return $.ajax({});
}).catch(function (error) {
  console.log(error.lineNumber);
});
*/
