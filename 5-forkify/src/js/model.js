import { getJson } from "./helper";
import { RECIPE_PAR_PAGE } from "./config";

export let stat = {
  recipe: {},

  search: {
    query: "",
    result: [],
    page: 1,
  },
  bookmarks: [],
};

export const recipeData = async function (id) {
  try {
    const data = await getJson(id);

    stat.recipe = data.data.recipe;

    if (stat.bookmarks.some((b) => b.id === id)) {
      stat.recipe.bookmarked = true;
    } else {
      stat.recipe.bookmarked = false;
    }

    //console.log(stat.recipe);
  } catch (err) {
    throw err;
  }
};

export const searchData = async function (query) {
  const data = await getJson(`/?search=${query}`);

  stat.search.result = [...data.data.recipes];
  stat.search.page = 1;
};

export const devideRecipe = function (pag = 1) {
  stat.search.page = pag;
  const start = (pag - 1) * RECIPE_PAR_PAGE;
  const end = pag * RECIPE_PAR_PAGE;

  return stat.search.result.slice(start, end);
};

export const updateServing = function (newServing) {
  const amountOfChange = newServing / stat.recipe.servings;

  stat.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * amountOfChange;
  });

  stat.recipe.servings = newServing;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(stat.bookmarks));
};

export const addBookmarks = function (rec) {
  stat.bookmarks.push(rec);

  if (rec.id === stat.recipe.id) {
    stat.recipe.bookmarked = true;
  }
  persistBookmarks();
};

export const removeBookmark = function (id) {
  const index = stat.bookmarks.findIndex((idx) => idx.id === id);
  stat.bookmarks.splice(index, 1);

  if (id === stat.recipe.id) {
    stat.recipe.bookmarked = false;
  }

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) stat.bookmarks = JSON.parse(storage);
};
init();
