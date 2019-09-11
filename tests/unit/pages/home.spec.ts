import {shallowMount} from '@vue/test-utils';
import Home from '@/pages/Home.vue';
import ListTable from '@/components/ListTable.vue';
import Search from '@/components/Search.vue';
import vuetify from 'vuetify';
import Vue from 'vue';

describe('Home Page', () => {
    let wrapper: any;

    beforeEach(() => {
        Vue.use(vuetify);
        wrapper = shallowMount(Home, {});
    });

    it('renders without errors', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should have a filter component', () => {
        expect(wrapper.find(Search).exists()).toBeTruthy();
    });

    it('should have component', () => {
        expect(wrapper.contains(ListTable)).toBeTruthy();
    });
});
