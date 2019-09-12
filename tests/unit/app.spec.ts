import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Vue from 'vue';
import vuetify from 'vuetify';
import Router from 'vue-router';


describe('App.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        Vue.use(vuetify);
        Vue.use(Router);

        wrapper = shallowMount(App, {});
    });

    it('renders without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
