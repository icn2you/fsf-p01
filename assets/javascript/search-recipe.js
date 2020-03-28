const apiKey = RECIPES_API_KEY;
const recipeURL = 'https://api.spoonacular.com/recipes/';

const queryUrlByIng = `${recipeURL}findByIngredients?apiKey=${apiKey}&ingredients=apples,+flour,+sugar&diet=vegan&number=2`;

const recipeIDs = [];

$.ajax({
  url: queryUrlByIng,
  method: 'GET'
}).then(function (response) {
  console.log('ajax1!!!!');
  console.log(response);
  response.forEach(function(recipe) {
    recipeIDs.push(recipe.id);

    const tr = $(`<tr id=${recipe.id}>`);
    const idTd = $('<td>').text(recipe.id);
    const titleTd = $('<td>').text(recipe.title);
    const imgEl = $('<img>').attr('src', recipe.image);
    const imgTd = $('<td>').append(imgEl);

    tr.append(idTd, titleTd, imgTd);
    $('#ingredients .result tbody').append(tr);

  });

  console.log(recipeIDs);

  recipeIDs.forEach(function(id) {
    console.log('test');
    const queryURL = `${recipeURL}${id}/information?apiKey=${apiKey}&includeNutrition=false`;
    console.log('query: ' + queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      console.log('ajax2!!!!');
      console.log(response);

      const servingTd = $('<td>').text(response.servings);
      $(`#${id}`).append(servingTd);
    });
  });
});


// recipeIDs.forEach(function(id) {
//   console.log('test');
//   const queryURL = `${recipeURL}${id}/information?apiKey=${apiKey}includeNutrition=false`;
//   console.log('query: ' + queryURL);
//
//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function (response) {
//     console.log('response2: ' + response);
//
//     const servingTd = $('<td>').text(response.servings);
//     $(`#${id}`).append(servingTd);
//   });
// });