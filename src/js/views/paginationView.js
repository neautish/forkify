import View from './View.js';
import icons from '../../img/icons.svg';
import { state } from '../model.js'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');


    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            state.search.page = goToPage;

            handler(goToPage);
        })
    }

    _generateMarkup(data) {
        const pagesNumber = Math.ceil(data.totalResults / data.number);
        console.log(data.page, pagesNumber)

        // page 1, and there are more pages
        if (data.page === 1 && pagesNumber > 1) {
            return `
            <button class="btn--inline pagination__btn--next" data-goto="${data.page + 1}">
                <span>Page ${data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
          `
        }

        // last page
        if (data.page === pagesNumber && pagesNumber > 1) {
            return `
            <button class="btn--inline pagination__btn--prev" data-goto="${data.page - 1}">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${data.page - 1}</span>
            </button>
            `
        }

        // other pages
        if (data.page < pagesNumber) {
            return `
            <button class="btn--inline pagination__btn--prev" data-goto="${data.page - 1}">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${data.page - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next" data-goto="${data.page + 1}">
                <span>Page ${data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }

        // page 1, and NO more pages
    }

};

export default new PaginationView();