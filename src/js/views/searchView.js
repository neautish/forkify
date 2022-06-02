import { state } from '../model.js'

class SearchView {
    #parentElement = document.querySelector('.search');

    getQuery() {
        const query = this.#parentElement.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    #clearInput() {
        this.#parentElement.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this.#parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            state.search.page = 1;

            handler();
        })
    }

};

export default new SearchView();