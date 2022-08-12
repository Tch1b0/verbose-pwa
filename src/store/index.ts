import { createStore } from "vuex";

interface StateType {
    favourites: string[];
}

export default createStore<StateType>({
    state: {
        favourites: [],
    },
    getters: {},
    mutations: {
        appendFavourite(state, word: string) {
            state.favourites.push(word);
        },
        removeFavourite(state, word: string) {
            state.favourites = state.favourites.filter(
                (value) => value !== word,
            );
        },
    },
    actions: {
        toggleFavourite(_, word: string) {
            const method = this.state.favourites.includes(word)
                ? "removeFavourite"
                : "appendFavourite";
            this.commit(method, word);
        },
    },
    modules: {},
});
