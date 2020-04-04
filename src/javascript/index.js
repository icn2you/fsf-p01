import $ from 'jquery';

// import landingPage from './landing-page';
// import recipesPage from './recipes-page';
import recipePage from './recipe-page';

let initFunctions = {
  // "landing-page": landingPage,
  // "recipes-page": recipesPage,
  "recipe-page": recipePage
};

$(document).ready(() => {
  const page = $('html').data('page');
  initFunctions[page]();
});