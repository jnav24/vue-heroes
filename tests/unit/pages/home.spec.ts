import {shallowMount} from '@vue/test-utils';
import Home from '@/pages/Home.vue';
import ListTable from '@/components/ListTable.vue';
import Search from '@/components/Search.vue';

describe('Home Page', () => {
    it('renders without errors', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('should have a filter component', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.find(Search).exists()).toBeTruthy();
    });

    it('should have component', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.contains(ListTable)).toBeTruthy();
    });
});
