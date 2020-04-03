import $ from 'jquery';

import createLandingPage from './landing-page';

let initFunctions = {
  "landing-page": createLandingPage
};

$(document).ready(() => {
  const page = $('html').data('page');
  initFunctions[page]();
});