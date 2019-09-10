import {ActionTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {RootStateInterface} from '@/store/root-state.interface';

const HeroesActions: ActionTree<HeroesStateInterface, RootStateInterface> = {};

export default HeroesActions;
