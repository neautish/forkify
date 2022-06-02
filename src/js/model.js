import { API_KEY, API_URL, RES_PER_PAGE, RES_TO_IGNORE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        totalResults: 0,
        offset: RES_TO_IGNORE,
        number: RES_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
}

export const loadRecipe = async function (id) {

    try {
        const data = await getJSON(`${API_URL}${id}/information?apiKey=${API_KEY}`);

        state.recipe = data;

        if (state.bookmarks.some(bookmark => bookmark.id === data.id))
            data.bookmarked = true;
        else data.bookmarked = false;

    } catch (err) {
        // console.error(err);
        throw (err)
    }
};

export const loadSearchResults = async function (query, pageNum) {
    console.log(query, pageNum)
    try {
        const data = await getJSON(`${API_URL}complexSearch?apiKey=${API_KEY}&query=${query}&offset=${(pageNum - 1) * state.search.offset}&number=${state.search.number}`);

        state.search.results = data.results;
        state.search.query = query;
        state.search.totalResults = data.totalResults;

        console.log(state.search.query)
        console.log(state.search.results)

    } catch (err) {
        console.error(err);
        throw (err)
    }
};

export const updateServings = function (newServings) {
    state.recipe.extendedIngredients.forEach(ing => {
        ing.amount = ing.amount * newServings / state.recipe.servings
    });
    console.log(state.recipe.servings)
    state.recipe.servings = newServings;
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    // add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
}

export const deleteBookmark = function (id) {
    // delete bookmark
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as Not bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();
