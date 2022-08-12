import { createStore } from "vuex";
import { Storage } from "./storage";

function loadFavourites(): string[] {
    const item = Storage.get("favourites");

    if (item !== null) {
        return JSON.parse(item);
    } else {
        return [];
    }
}

interface StateType {
    favourites: string[];
}

const store = createStore<StateType>({
    state: {
        favourites: loadFavourites(),
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

store.subscribe((m, s) => {
    if (!["appendFavourite", "removeFavourite"].includes(m.type)) return;

    Storage.set("favourites", JSON.stringify(s.favourites));
});

export default store;
