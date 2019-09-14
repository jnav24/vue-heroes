import Vue from 'vue';
import store from '@/store/index';
import Router, {Route} from 'vue-router';

if (!process || process.env.NODE_ENV !== 'test') {
    Vue.use(Router);
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: {
                name: 'heroes',
            },
        },
        {
            beforeEnter: (to: Route, from: Route, next: any) => {
                store.dispatch('Heroes/getHeroes');
                next();
            },
            component: () => import(/* webpackChunkName: "heroes" */ '@/pages/Heroes.vue'),
            name: 'heroes',
            path: '/heroes',
        },
        {
            beforeEnter: (to: Route, from: Route, next: any) => {
                store.dispatch('Heroes/getHeroes');
                next();
            },
            component: () => import(/* webpackChunkName: "heroes" */ '@/pages/Hero.vue'),
            name: 'hero',
            path: '/hero/:name',
        },
        {
            path: '*',
            redirect: {
                name: 'heroes',
            },
        },
    ],
});
