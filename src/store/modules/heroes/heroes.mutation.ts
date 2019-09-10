import {MutationTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {HeroesInterface} from '@/shared/interfaces/heroes.interface';

const HeroesMutations: MutationTree<HeroesStateInterface> = {
    ADD_HEROES(state, payload: HeroesInterface[]) {
        state.list = payload;
    },
};

export default HeroesMutations;
