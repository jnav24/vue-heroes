import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';

const HeroesState: HeroesStateInterface = {
    filter: {
        gender: '',
        name: '',
        universe: '',
    },
    list: [],
};

export default HeroesState;
