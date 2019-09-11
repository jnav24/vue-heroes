import {createLocalVue, shallowMount} from '@vue/test-utils';
import ListTable from '@/components/ListTable.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import vuetify from 'vuetify';
import HeroesState from '@/store/modules/heroes/heroes.state';
import HeroesGetters from '@/store/modules/heroes/heroes.getter';
import HeroesMutations from '@/store/modules/heroes/heroes.mutation';
import HeroesActions from '@/store/modules/heroes/heroes.action';

const localVue = createLocalVue();
localVue.use(Vuex);

const heroData = [
    {
        name: 'Jest',
        alias: 'The test',
        image: '',
        description: 'This is from a test.',
        universe: 'testing universe',
        gender: 'neither',
        species: 'jest',
    }
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

describe('ListTable Component', () => {
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
        wrapper = shallowMount(ListTable, {
            localVue,
            store,
        });
    });

    it('renders without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should have one hero in the getter', async () => {
        await store.dispatch('Heroes/getHeroes');
        expect(wrapper.vm.heroesList.length).toEqual(1);
    });

    it('should have the same name in heroes', async () => {
        await store.dispatch('Heroes/getHeroes');
        expect(wrapper.vm.heroesList[0].name).toEqual(heroData[0].name);
    });
});
