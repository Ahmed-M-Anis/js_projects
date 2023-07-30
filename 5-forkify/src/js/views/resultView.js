import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";
import { view } from "./view.js";

class resultView extends view {
  _parentE = document.querySelector(".results");
  _data;

  _renderRecipe() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new resultView();
