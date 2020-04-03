import $ from 'jquery';
import _ from 'lodash';
import { buildUrlToRecipesPage, createTopPage } from './landing-page';

$(document).ready(() => {
  createTopPage();

  $('#search-btn').on('click', () => {
    // buildUrlToRecipesPage();
    location.href = buildUrlToRecipesPage();
  });
});