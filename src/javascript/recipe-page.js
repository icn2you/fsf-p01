// ********** Variables for QueryURLs **********
const apiKey = MY_API_KEY;
// const apiKey = SPOONACULAR_API_KEY;
const recipeURL = 'https://api.spoonacular.com/recipes/';
const recipeID = '663323';

// ********** QueryURL **********
// https://spoonacular.com/food-api/docs#Get-Recipe-Information
// https://api.spoonacular.com/recipes/:id/information?apiKey=###&includeNutrition=false
const queryURL = `${recipeURL}${recipeID}/information?apiKey=${apiKey}&includeNutrition=false`;

$.ajax({
  url: queryURL,
  method: 'GET'
}).then((response) => {
  console.log('ajax1 | successful!!!!');
  console.log(response);

  const tr = $(`<tr id=${response.id}>`);
  const idTd = $('<td>').text(response.id);
  const titleTd = $('<td>').text(response.title);
  const imgEl = $('<img>').attr('src', response.image);
  const imgTd = $('<td class="image">').append(imgEl);
  const minutesTd = $('<td>').text(response.readyInMinutes);
  const summaryTd = $('<td>').html(response.summary);
  const dietsTd = $('<td>');
  let dietsText = '';
  response.diets.forEach((diet) => {
    dietsText += `${diet}, `;
  });
  dietsTd.text(dietsText);
  const servingTd = $('<td>').text(response.servings);
  const ingredientsTd = $('<td class="ingredients">').append($('<ul>'));
  response.extendedIngredients.forEach((ingredient) => {
    const ingItemEl = $('<li>');
    const ingNameEl = $('<span>').text(ingredient.name);
    const ingAmountEl = $('<span>').text(` - ${ingredient.amount}${ingredient.unit}`);
    ingItemEl.append(ingNameEl, ingAmountEl);
    ingredientsTd.append(ingItemEl);
  });

  const instructionTd = $('<td class="instruction">').html(response.instructions);
  tr.append(idTd, titleTd, imgTd, minutesTd, dietsTd, servingTd, ingredientsTd, summaryTd, instructionTd);
  $('#recipe .result tbody').append(tr);

  console.log('recipeIDs: ' + recipeIDs);
}).catch(function (error) {
  console.log(`${error.status} ${error.statusText.toUpperCase()}`);
});
