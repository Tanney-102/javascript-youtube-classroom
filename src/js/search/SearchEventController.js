import SearchController from "./SearchController.js";

import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";

import elements from "../utils/elements.js";
import { ALERT_MESSAGE, VIDEOS } from "../utils/constants.js";
import {
  openModal,
  closeModal,
  showElement,
  hideElement,
} from "../utils/dom.js";

export default class SearchEventController {
  constructor() {
    this.searchController = new SearchController();
  }

  bindEvents() {
    this.bindModalEvents();
    this.bindSearchEvents();
    this.bindSaveVideoEvent();
  }

  bindModalEvents() {
    elements.$searchButton.addEventListener(
      "click",
      this.onClickSearchButton.bind(this)
    );
    elements.$searchModal.addEventListener("click", this.onClickDimmed);
    elements.$searchModalClose.addEventListener(
      "click",
      this.onClickSearchModalCloseButton
    );
  }

  bindSearchEvents() {
    elements.$searchForm.addEventListener("submit", this.onSearch.bind(this));
    elements.$keywordHistory.addEventListener(
      "click",
      this.onClickKeywordHistory.bind(this)
    );
    elements.$searchResults.addEventListener(
      "scroll",
      this.onScroll.bind(this)
    );
    elements.$searchResults.addEventListener(
      "loadSearchAll",
      this.onLoadSearchAll
    );
  }

  bindSaveVideoEvent() {
    elements.$searchResults.addEventListener(
      "click",
      this.onClickSaveVideoButtons.bind(this)
    );
  }

  onClickSearchButton() {
    openModal(elements.$searchModal);
    elements.$searchForm.elements["search-keyword"].focus();

    this.searchController.updateKeywordHistory();
    this.searchController.showSavedVideoCount();
  }

  onClickDimmed(e) {
    if (e.target.classList.contains("modal")) {
      closeModal(elements.$searchModal);
    }
  }

  onClickSearchModalCloseButton() {
    closeModal(elements.$searchModal);
  }

  onSearch(e) {
    e.preventDefault();
    const searchKeyword = e.target.elements["search-keyword"].value;
    this.searchController.searchVideos(searchKeyword);
  }

  onClickKeywordHistory(e) {
    const keyword = e.target.dataset.keyword.replace("+", " ");
    if (!keyword) {
      return;
    }

    if (e.target.classList.contains("js-remove-btn")) {
      this.searchController.removeKeywordHistoryChip(keyword);
    }

    if (e.target.classList.contains("icon")) {
      this.searchController.searchVideosByHistory(keyword);
    }
  }

  onScroll(e) {
    this.searchController.addVideosByScroll(e.target);
  }

  onLoadSearchAll() {
    hideElement(elements.$skeletonSearchResults);
    showElement(elements.$searchResults);
  }

  onClickSaveVideoButtons(e) {
    if (!e.target.dataset.videoId) {
      return;
    }

    if (videos.getSavedVideoCount() >= VIDEOS.SAVED_VIDEOS_MAX_COUNT) {
      alert(ALERT_MESSAGE.SAVE_COUNT_EXCEEDED_ERROR);
      return;
    }

    this.searchController.saveVideo(e.target.dataset.videoId);
  }
}