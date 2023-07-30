import { view } from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class BookmarksView extends view {
  _parentE = document.querySelector(".bookmarks__list");

  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _renderRecipe() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
