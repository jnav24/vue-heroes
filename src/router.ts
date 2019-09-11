import Vue from 'vue';
import store from '@/store/index';
import Router, {Route} from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            beforeEnter: (to: Route, from: Route, next: any) => {
                store.dispatch('Heroes/getHeroes');
                next();
            },
            component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
            name: 'home',
            path: '/',
        },
    ],
});
