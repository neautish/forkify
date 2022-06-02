import View from './View.js';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks');
    _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup(data) {
        return data.map(data => this._generateMarkupPreview(data)).join('');
    }

    _generateMarkupPreview(data) {
        const id = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link ${+data.id === +id && 'preview__link--active'}" href="#${data.id}">
            <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <!-- <p class="preview__publisher">The Pioneer Woman</p> -->
                <!-- <div class="preview__user-generated">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div> -->
            </div>
            </a>
        </li>
        `;
    }
};

export default new BookmarksView();