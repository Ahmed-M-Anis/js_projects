import icons from "url:../../img/icons.svg";

export class view {
  render(data, f = true) {
    this._data = data;
    const html = this._renderRecipe();
    if (!f) return html;

    this._clearParnt();
    this._parentE.insertAdjacentHTML("afterbegin", html);
  }

  renderErrorMassage() {
    const html = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${this._erorMassege}</p>
      </div>`;
    this._clearParnt();
    this._parentE.insertAdjacentHTML("afterbegin", html);
  }

  _clearParnt() {
    this._parentE.innerHTML = "";
  }

  renderSpiner() {
    const spiner = `
         div class="spinner">
           <svg>
            <use href="${icons}#icon-loader"></use>
           </svg>
        </div>
        `;

    this._clearParnt();
    this._parentE.insertAdjacentHTML("afterbegin", spiner);
  }
}
