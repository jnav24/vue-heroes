import Vue from 'vue';
import Vuex from 'vuex';
import Heroes from '@/store/modules/heroes/heroes.store';
import {RootStateInterface} from '@/store/root-state.interface';

Vue.use(Vuex);

export default new Vuex.Store<RootStateInterface>({
    modules: {
        Heroes,
    },
});
