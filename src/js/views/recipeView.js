import View from './View.js'
import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg';

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn) return;
            const updateTo = +btn.dataset.updateTo
            if (updateTo > 0) handler(updateTo);
        })
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return;
            console.log(btn)
            handler();
        })
    }

    _generateMarkup(data) {
        return `
        <figure class="recipe__fig">
            <img src="${data.image}"  alt="${data.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${data.readyInMinutes}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-update-to="${data.servings - 1}">
                        <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-update-to="${data.servings + 1}">
                        <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="recipe__user-generated">
            <!-- <svg>
                    <use href="${icons}#icon-user"></use>
                </svg> -->
            </div> 
            <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${data.bookmarked === true ? '-fill' : ''}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${data.extendedIngredients && data.extendedIngredients.map(this._generateMarkupIngredients).join('')}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">SUMMARY</h2>
            <p class="recipe__directions-text">${data.summary}</p>
            <a
                class="btn--small recipe__btn"
                href="${data.sourceUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
        </div>
        `;
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
    }

    _generateMarkupIngredients(ing) {
        return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.amount && new Fraction(ing.amount).toString()}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.name}
            </div>
          </li>
        `;
    }

}

export default new RecipeView();