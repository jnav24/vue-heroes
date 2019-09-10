import {ActionTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {RootStateInterface} from '@/store/root-state.interface';
import { heroesList } from '@/models/heroes';

const HeroesActions: ActionTree<HeroesStateInterface, RootStateInterface> = {
    async getHeroes({ commit }): Promise<{ status: number; data: any[] | {} }> {
        return new Promise((resolve) => {
            commit('ADD_HEROES', heroesList);
            resolve({
                status: 200,
                data: {},
            });
        });
    },
};

export default HeroesActions;
