import {ActionTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {RootStateInterface} from '@/store/root-state.interface';
import {getHeroes} from '@/shared/services/heroes.service';

const HeroesActions: ActionTree<HeroesStateInterface, RootStateInterface> = {
    async getHeroes({ commit }): Promise<{ status: number; data: any[] | {} }> {
        try {
            const response: { status: number; data: any } = await getHeroes();

            if (response.status === 200) {
                commit('ADD_HEROES', response.data.data);
                return {
                    status: 200,
                    data: {},
                };
            }

            return {
                status: 400,
                data: {},
            };
        } catch (error) {
            return {
                status: 400,
                data: {},
            };
        }
    },
};

export default HeroesActions;
