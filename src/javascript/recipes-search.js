// ********** Variables for QueryURLs **********
const apiKey = MY_API_KEY;
// const apiKey = SPOONACULAR_API_KEY;
const recipeURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
const diet = 'vegetarian';
const intolerances = 'peanut';
const ingredients = 'tomato,onion';
const number = 3;

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

// ********** QueryURL **********
// https://spoonacular.com/food-api/docs#Search-Recipes-Complex
// https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&intolerances=egg,gluten&includeIngredients=tomato,onion&instructionsRequired=true&addRecipeInformation=true&sort=<string>&number=100&limitLicense=true&apiKey=###
const queryURL = `${recipeURL}complexSearch?diet=${diet}&intolerances=${intolerances}&includeIngredients=${ingredients}&instructionsRequired=true&addRecipeInformation=true&sort=${sort}&number=${number}&limitLicense=true`;

const recipeIDs = [];

$.ajax({
  url: queryURL,
  method: 'GET',
  headers: {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": SPOONACULAR_API_KEY
  },
}).then(function(response) {
  console.log('ajax1 | successful!!!!');
  console.log(queryURL);
  const results = response.results;
  console.log(results);

  results.forEach(function(result) {
    // Render only recipes whose cooking time is equal to or less than 45 mins
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
