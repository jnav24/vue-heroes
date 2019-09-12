import {GetterTree} from 'vuex';
import {HeroesStateInterface} from '@/store/modules/heroes/heroes-state.interface';
import {RootStateInterface} from '@/store/root-state.interface';
import {HeroesInterface} from '@/shared/interfaces/heroes.interface';

const getList = (heroes: HeroesInterface[], value: string) => {
    const list: string[] = [];

    heroes.forEach((hero: any) => {
        if (list.indexOf(hero[value]) < 0) {
            list.push(hero[value]);
        }
    });

    return list;
};

const isNotEmpty = (value: string): boolean => !!value && !!value.trim();

const HeroesGetters: GetterTree<HeroesStateInterface, RootStateInterface> = {
    heroesList: (state) => {
        let filtered = JSON.parse(JSON.stringify(state.list));

        if (isNotEmpty(state.filter.name)) {
            filtered = filtered.filter((hero: HeroesInterface) => {
                return hero.name.toLowerCase().indexOf(state.filter.name.toLowerCase()) > -1;
            });
        }

        if (isNotEmpty(state.filter.universe)) {
            filtered = filtered.filter((hero: HeroesInterface) => hero.universe === state.filter.universe);
        }

        if (isNotEmpty(state.filter.gender)) {
            filtered = filtered.filter((hero: HeroesInterface) => hero.gender === state.filter.gender);
        }

        return filtered;
    },
    genderList: (state) => getList(state.list, 'gender'),
    universeList: (state) => getList(state.list, 'universe'),
};

export default HeroesGetters;
