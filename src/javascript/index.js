import $ from 'jquery';

import landingPage from './landing-page';
import recipesPage from './recipes-page';

let initFunctions = {
  "landing-page": landingPage,
  "recipes-page": recipesPage
};

$(document).ready(() => {
  const page = $('html').data('page');
  initFunctions[page]();
});