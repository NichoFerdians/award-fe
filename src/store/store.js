import { createStore } from 'vuex';

const store = createStore({
    state: {
        filterString: '',
        slider: [10000, 500000],
        type: [],
        chipPoin: false,
        chipType: false,
    },
    mutations: {
        setFilter(state, filter) {
            state.filterString = filter;
        },
        setSlider(state, slider) {
            state.slider = slider;
        },
        setType(state, type) {
            state.type = type;
        },
        setChipPoin(state, chipPoin) {
            state.chipPoin = chipPoin;
        },
        setChipType(state, chipType) {
            state.chipType = chipType;
        },
    },
    actions: {
    },
    getters: {
        getFilterString(state) {
            return state.filterString;
        },
        getSlider(state) {
            return state.slider;
        },
        getType(state) {
            return state.type;
        },
        getChipPoin(state) {
            return state.chipPoin;
        },
        getChipType(state) {
            return state.chipType;
        },
    }
});

export default store;