import {HeroesInterface} from '@/shared/interfaces/heroes.interface';

export interface HeroesStateInterface {
    filter: {
        gender: string;
        name: string;
        universe: string;
    };
    list: HeroesInterface[];
}
