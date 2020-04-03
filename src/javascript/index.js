import $ from 'jquery';

import landingPage from './landing-page';

let initFunctions = {
  "landing-page": landingPage
};

$(document).ready(() => {
  const page = $('html').data('page');
  initFunctions[page]();
});