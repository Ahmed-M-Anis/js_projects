import * as model from "./model.js";

import recipeView from "./views/recipeView.js";
import resultView from "./views/resultView.js";
import searchView from "./views/searchView.js";
import bookmarkView from "./views/bookmarkView.js";

import paginationView from "./views/paginationView.js";


// https://forkify-api.herokuapp.com/v2

const recipeControler = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpiner();

    await model.recipeData(id);
    recipeView.render(model.stat.recipe);
  } catch (err) {
    recipeView.renderErrorMassage();
  }
};

const searchControler = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpiner();

    await model.searchData(query);

    resultView.render(model.devideRecipe());

    paginationView.render(model.stat.search);
  } catch (err) {
    console.log(err);
  }
};

const pagenationControler = function (goTOPage) {
  resultView.render(model.devideRecipe(goTOPage));

  paginationView.render(model.stat.search);
};

const updateServingControler = function (newServing) {
  model.updateServing(newServing);

  recipeView.render(model.stat.recipe);
};

const bookmarkAddControler = function () {
  if (model.stat.recipe.bookmarked) model.removeBookmark(model.stat.recipe.id);
  else model.addBookmarks(model.stat.recipe);

  recipeView.render(model.stat.recipe);

  bookmarkView.render(model.stat.bookmarks);
};

const bookmarkControler = function () {
  bookmarkView.render(model.stat.bookmarks);
};

const init = function () {
  bookmarkView.addHandlerRender(bookmarkControler);
  recipeView.addHandlerRender(recipeControler);
  searchView.addHandlerSearch(searchControler);
  paginationView.addHandlerPage(pagenationControler);
  recipeView.addHandlerupdateServing(updateServingControler);
  recipeView.addHandlerBookmark(bookmarkAddControler);
};

init();
