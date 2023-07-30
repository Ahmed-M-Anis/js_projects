class search {
  _prentE = document.querySelector(".search");

  getQuery() {
    const form = this._prentE.querySelector(".search__field").value;
    this._prentE.querySelector(".search__field").value = "";
    return form;
  }

  addHandlerSearch(handler) {
    this._prentE.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new search();
