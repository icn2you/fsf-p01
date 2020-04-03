import $ from 'jquery';
import _ from 'lodash';
import { buildUrlToRecipesPage, createTopPage } from './recipes';

$(document).ready(() => {
  createTopPage();

  $('#search-btn').on('click', () => {
    // buildUrlToRecipesPage();
    location.href = buildUrlToRecipesPage();
  });
});