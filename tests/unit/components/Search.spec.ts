import {createLocalVue, shallowMount} from '@vue/test-utils';
import Search from '@/components/Search.vue';
import Vue from 'vue';
import vuetify from 'vuetify';
import HeroesState from '@/store/modules/heroes/heroes.state';
import HeroesActions from '@/store/modules/heroes/heroes.action';
import Vuex from 'vuex';
import HeroesMutations from '@/store/modules/heroes/heroes.mutation';
import HeroesGetters from '@/store/modules/heroes/heroes.getter';

const localVue = createLocalVue();
localVue.use(Vuex);

const heroData = [
    {
        name: 'Jasmine',
        alias: 'Jasmine Test',
        image: '',
        description: 'This is from a test.',
        universe: 'Angular testing universe',
        gender: 'Female',
        species: 'jasmine',
    },
    {
        name: 'Jest',
        alias: 'Jest Test',
        image: '',
        description: 'This is from a test.',
        universe: 'Vue testing universe',
        gender: 'Male',
        species: 'jest',
    },
    {
        name: 'Mocha',
        alias: 'Mocha Test',
        image: '',
        description: 'This is from a test.',
        universe: 'Javascript testing universe',
        gender: 'Male',
        species: 'mocha',
    },
];

jest.mock('@/shared/services/heroes.service', () => ({
    getHeroes: jest.fn(() => {
        return new Promise((resolve) => {
            (process as any).nextTick(() => {
                resolve({
                    status: 200,
                    data: {
                        data: heroData,
                    },
                });
            });
        });
    }),
}));

describe('Search.vue', () => {
    let store: any;
    let wrapper: any;

    beforeEach(() => {
        Vue.use(vuetify);
        store = new Vuex.Store({
            modules: {
                Heroes: {
                    namespaced: true,
                    state: HeroesState,
                    getters: HeroesGetters,
                    mutations: HeroesMutations,
                    actions: HeroesActions,
                },
            },
        });
        wrapper = shallowMount(Search, {
            localVue,
            store,
        });
    });

    afterEach(() => {
        store.commit('Heroes/ADD_HEROES', []);
        store.commit('Heroes/SET_FILTER_GENDER', '');
        store.commit('Heroes/SET_FILTER_NAME', '');
        store.commit('Heroes/SET_FILTER_UNIVERSE', '');
    });

    it('renders without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should filter the state based on name', async () => {
        expect(store.getters['Heroes/heroesList'].length).toEqual(0);
        await store.dispatch('Heroes/getHeroes');
        store.commit('Heroes/SET_FILTER_NAME', 'Jasmine');
        expect(store.getters['Heroes/heroesList'].length).toEqual(1);
    });

    it('should filter the state based on form input', async () => {
        await store.dispatch('Heroes/getHeroes');

        const form = {
            gender: 'Male',
            name: '',
            universe: '',
        };

        wrapper.setData({
            form,
        });

        wrapper.vm.submitFilter();
        expect(store.state.Heroes.filter.gender).toEqual(form.gender);
        expect(store.getters['Heroes/heroesList'].length).toBe(2);
    });

    it('should reset the filter form', async () => {
        await store.dispatch('Heroes/getHeroes');

        const form = {
            gender: 'Male',
            name: 'Mocha',
            universe: 'Javascript testing universe',
        };

        wrapper.setData({
            form,
        });
        wrapper.vm.resetFilter();
        expect(store.state.Heroes.filter.gender).toEqual('');
        expect(store.state.Heroes.filter.name).toEqual('');
        expect(store.state.Heroes.filter.universe).toEqual('');
    });

    it('should check if the value is empty or not', () => {
        expect(wrapper.vm.isNotEmpty('pizza')).toBeTruthy();
        expect(wrapper.vm.isNotEmpty(undefined)).toBeFalsy();
        expect(wrapper.vm.isNotEmpty(null)).toBeFalsy();
        expect(wrapper.vm.isNotEmpty('')).toBeFalsy();
    });

    it('should check if button can be submitted', async () => {
        await store.dispatch('Heroes/getHeroes');

        expect(wrapper.vm.canSubmit()).toBeFalsy();
        expect(wrapper.find('.submit-btn.disabledBtn').isVisible()).toBeTruthy();

        const form = {
            gender: '',
            name: 'Jest',
            universe: '',
        };

        wrapper.setData({
            form,
        });

        expect(wrapper.vm.canSubmit()).toBeTruthy();
        expect(wrapper.find('.submit-btn.disabledBtn').exists()).toBeFalsy();
        expect(wrapper.find('.submit-btn').exists()).toBeTruthy();
    });

    it('should check if gender list is not empty', async () => {
        await store.dispatch('Heroes/getHeroes');
        expect(wrapper.vm.genderList.length).toBeGreaterThanOrEqual(1);
    });

    it('should check if universe list is not empty', async () => {
        await store.dispatch('Heroes/getHeroes');
        expect(wrapper.vm.universeList.length).toBeGreaterThanOrEqual(1);
    });
});
