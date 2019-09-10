import {GetterTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {RootStateInterface} from '@/store/root-state.interface';

const HeroesGetters: GetterTree<HeroesStateInterface, RootStateInterface> = {};

export default HeroesGetters;
