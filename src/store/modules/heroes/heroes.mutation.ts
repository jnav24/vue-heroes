import {MutationTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {HeroesInterface} from '@/shared/interfaces/heroes.interface';

const HeroesMutations: MutationTree<HeroesStateInterface> = {
    ADD_HEROES(state, payload: HeroesInterface[]) {
        state.list = payload;
    },
    SET_FILTER_GENDER(state, payload: string) {
        state.filter = {
            ...state.filter,
            gender: payload,
        };
    },
    SET_FILTER_NAME(state, payload: string) {
        state.filter = {
            ...state.filter,
            name: payload,
        };
    },
    SET_FILTER_UNIVERSE(state, payload: string) {
        state.filter = {
            ...state.filter,
            universe: payload,
        };
    },
};

export default HeroesMutations;
