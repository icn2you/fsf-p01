// ********** Variables for QueryURLs **********
const recipeURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
const recipeID = '663323';

// ********** QueryURL **********
// https://spoonacular.com/food-api/docs#Get-Recipe-Information
// https://api.spoonacular.com/recipes/:id/information?apiKey=###&includeNutrition=false
const queryURL = `${recipeURL}${recipeID}/information`;

var recipePromise = $.ajax({
  url: queryURL,
  method: 'GET',
  headers: {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": SPOONACULAR_API_KEY
  },
})

recipePromise.then((response) => {
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

gapi.load('client', function () {
  var gapiPromise = gapi.client.init({
    'apiKey': YOUTUBE_API_KEY
  }).then(function() {
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("Youtube API Client loaded"); },
            function(err) { console.error("Error loading Youtube API Client: ", err); });
  })
  
  Promise.all([recipePromise, gapiPromise]).then(function(values) {
    var recipe = values[0];
    var keyword = recipe.title;

    return gapi.client.youtube.search.list({
      part: "snippet",
      q: keyword,
      topicId: "/m/02wbm",
      order: "relevance",
      maxResults: 3
    })
  }).then(function(response) {
    console.log("Response successful: ");
    var videos = response.result.items;

    videos.forEach(function(video) {
      // create an <iframe> for each video
      // src url should be https://youtube.com/embed/VIDEO_ID
      // append the video to the 'videos' div
      console.log(video.id.videoId);
      $("#videos").append(`<iframe src="https://youtube.com/embed/${video.id.videoId}">`)
    })
  }).catch(function(error) {
    console.log("Error searching: ", error)
  })
});