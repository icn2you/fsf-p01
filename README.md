# CookQuik

## Project Description
We built a recipe app that allows the user to select a diet type (e.g., vegetarian, Kosher, gluten-free, etc.) and optionally specify a list of ingredients.
The app will then use an API call to one/more recipe services to pull back recipes conforming to the specified parameters--that is, diet type and ingredients.
The results will be displayed in an aesthetically pleasing manner using a carousel. When the user selects a particular recipe from the carousel,
the recipe will load full-page and, at the bottom, display a form field that will allow the user to input the number of people to serve.
The app will then calculate the ingredient portions accordingly. Finally, the app will use local storage so the user can persist one/more favorite recipes.

## Summary 
The primary goal for this product is to make cooking easier and more efficient by provinding diet specific and allergin complient recipies.
Our target audience comprises of amateur chefs, busy professionals, working moms, etc. hence the 45m alloted cook time and adjustable serving sizes.

## APIs Used
* Spoonacular
* Youtube Data
 
## Built With 
* Lodash
* Materialize
* Math.js
* Node query-string
* Sass
* Webpack

## Deployment/Installing

```javascript
// provide API keys in config/keys.js
const SPOONACULAR_API_KEY = 'spoonacular rapidapi key',
      YOUTUBE_API_KEY     = 'google api key for youtube data api v3';
export { SPOONACULAR_API_KEY, YOUTUBE_API_KEY };
```

```shell
# install deps and toolchain
npm install
# build frontend
npm run build
```

## Authors
Christopher Zenner, Yuko Uda, Brittany-Renee Davis

## Helpful Links
* [Presentation Slides](https://docs.google.com/presentation/d/1c-VUgYBjS09AjHnAK8YAVp3cPgb_0q0bc6mAjjp2gwg/edit?ts=5e88b77f#slide=id.g72af502572_0_1)
* [Live Demo](https://christopherzenner.dev/fsf-proj-01/)