import { state, loadRecipe, loadSearchResults, updateServings, addBookmark, deleteBookmark } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView..js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'regenerator-runtime/runtime'; //Polyfilling async/await
import 'core-js/stable'; //Polyfilling everything else


///////////////////////////////////////

const controlRecipe = async function () {
  // Read the recipe's id from URL
  const id = window.location.hash.slice(1);

  if (!id) return;

  // Render Spinner
  recipeView.rednerSpinner();

  try {
    resultsView.update(state.search.results);

    await loadRecipe(id);
    const { recipe: data } = state;

    // rendering recipe
    recipeView.render(data);

    // Update bookmarks view
    bookmarksView.update(state.bookmarks);

  } catch (err) {
    console.error(err);
    recipeView.renderError(err);
  }
};


const controlSearchResults = async function (pageNum = state.search.page) {

  try {
    // Get search query
    let query = searchView.getQuery();
    query = query ? query : state.search.query;

    if (!query) return;

    // Render Spinner
    resultsView.rednerSpinner();

    // Load search results
    await loadSearchResults(query, pageNum);
    const { results: data } = state.search;

    // Render results
    resultsView.render(data);

    // Render Pagination Buttons
    paginationView.render(state.search);

  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
}

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  updateServings(newServings);

  // Update the recipe view
  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
}

const controlAddBookmark = function () {
  // Add/Remove Bookmark
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);

  // Update recipe view
  recipeView.update(state.recipe)

  // Render bookmarks
  bookmarksView.render(state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(state.bookmarks);
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlSearchResults);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};
init();
