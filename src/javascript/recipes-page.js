/******************************************************************************
 FSWD:  Yuko Uda, Brittany-Renee Davis & Christopher Zenner
 Date:  04/03/2020
 File:  recipes-page.js
 Ver.:  0.1.0 20200403

 This JS script implements the functionality for a recipe search app/site.
 ******************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import 'materialize-css';

const queryString = require('query-string');

const renderRecipesPage = () => {
  console.log(location.search);
  const parsed = queryString.parse(location.search);
  console.log(parsed);
  const searchObj = JSON.parse(atob(parsed['params']));
  console.log(searchObj);
};

const recipesPage = () => {
  console.log('recipes page!!');
  renderRecipesPage();
};

export default recipesPage;