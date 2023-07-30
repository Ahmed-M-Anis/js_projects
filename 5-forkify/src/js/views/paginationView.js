import icons from "url:../../img/icons.svg";
import { view } from "./view";
import { RECIPE_PAR_PAGE } from "../config";

class pagenationView extends view {
  _parentE = document.querySelector(".pagination");
  _data;

  _renderRecipe() {
    const pagesNumber = Math.ceil(this._data.result.length / RECIPE_PAR_PAGE);
    const curPage = this._data.page;

    if (curPage === 1 && pagesNumber > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
        `;
    }
    if (curPage === pagesNumber && pagesNumber > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
          </button>
        `;
    }
    if (curPage < pagesNumber && pagesNumber > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    }
    return "";
  }

  addHandlerPage(handler) {
    this._parentE.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goTOPage = Number(btn.dataset.goto);
      handler(goTOPage);
    });
  }
}

export default new pagenationView();
