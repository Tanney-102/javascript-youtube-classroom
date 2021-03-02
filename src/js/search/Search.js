import SearchController from "./SearchController.js";
import elements from "../utils/elements.js";

export default class Search {
  constructor() {
    this.searchController = new SearchController();
  }

  init() {
    elements.$searchForm.addEventListener("submit", this.onSearch.bind(this));
  }

  onSearch(e) {
    e.preventDefault();
    const searchKeyword = e.target.elements["search-keyword"].value;
    this.searchController.searchVideos(searchKeyword);
  }
}