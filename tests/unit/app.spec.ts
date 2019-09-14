import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Vue from 'vue';
import vuetify from 'vuetify';


describe('App.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        Vue.use(vuetify);

        wrapper = shallowMount(App, {
            stubs: [
                'router-view',
            ],
        });
    });

    it('renders without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
