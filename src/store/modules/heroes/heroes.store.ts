import {Module} from 'vuex';
import {RootStateInterface} from '@/store/root-state.interface';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import HeroesState from '@/store/modules/heroes/heroes.state';
import HeroesGetters from '@/store/modules/heroes/heroes.getter';
import HeroesActions from '@/store/modules/heroes/heroes.action';
import HeroesMutations from '@/store/modules/heroes/heroes.mutation';

const Heroes: Module<HeroesStateInterface, RootStateInterface> = {
    namespaced: true,
    state: HeroesState,
    getters: HeroesGetters,
    actions: HeroesActions,
    mutations: HeroesMutations,
};

export default Heroes;
