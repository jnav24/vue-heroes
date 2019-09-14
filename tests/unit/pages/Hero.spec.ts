import Vue from 'vue';
import Vuex from 'vuex';
import vuetify from 'vuetify';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import HeroesState from '@/store/modules/heroes/heroes.state';
import HeroesActions from '@/store/modules/heroes/heroes.action';
import HeroesMutations from '@/store/modules/heroes/heroes.mutation';
import Hero from '@/pages/Hero.vue';
import Heroes from '@/pages/Heroes.vue';
import {HeroesInterface} from '@/shared/interfaces/heroes.interface';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);
const router = new Router({
	routes: [
		{
			component: Heroes,
			name: 'heroes',
			path: '/heroes',
		},
		{
			component: Hero,
			name: 'hero',
			path: '/hero/:name',
		},
	],
});

const jasmine = {
	name: 'Jasmine',
	alias: 'Jasmine Test',
	slug: 'jasmine',
	image: '',
	description: 'This is from a test.',
	universe: 'Angular testing universe',
	gender: 'Female',
	species: 'jasmine',
};

const heroData: HeroesInterface[] = [
	jasmine,
	{
		name: 'Jest',
		slug: 'jest',
		alias: 'Jest Test',
		image: 'https://uploads.toptal.io/blog/image/91299/toptal-blog-image-1434577722896-66635fe9efe5898fa701037c0da6c0f4.jpg',
		description: 'This is from a test.',
		universe: 'Vue testing universe',
		gender: 'Male',
		species: 'jest',
	},
	{
		name: 'Mocha',
		slug: 'mocha',
		alias: 'Mocha Test',
		image: 'https://uploads.toptal.io/blog/image/91299/toptal-blog-image-1434577722896-66635fe9efe5898fa701037c0da6c0f4.jpg',
		description: 'This is from a test.',
		universe: 'Javascript testing universe',
		gender: 'Male',
		species: 'mocha',
	},
];

jest.mock('@/shared/services/heroes.service', () => ({
	getHeroes: jest.fn(() => {
		return new Promise((resolve, reject) => {
			(process as any).nextTick(() => {
				if (heroData.length) {
					resolve({
						status: 200,
						data: {
							data:  heroData,
						},
					});
				} else {
					reject({
						status: 400,
						data: {},
					});
				}
			});

			(process as any).on('unhandledRejection', (reason: any) => {
				console.log('REJECTION', reason);
				reject();
			});
		});
	}),
}));

describe('Hero Component', () => {
	let store: any;
	let wrapper: any;

	beforeEach(() => {
		Vue.use(vuetify);
		store = new Vuex.Store({
			modules: {
				Heroes: {
					namespaced: true,
					state: HeroesState,
					getters: {
						heroesList: () => heroData,
					},
					mutations: HeroesMutations,
					actions: HeroesActions,
				},
			},
		});
		wrapper = shallowMount(Hero, {
			localVue,
			router,
			store,
		});
	});

	it('renders without errors', () => {
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	it('should match the value with the route params', () => {
		router.push({ name: 'hero', params: { name: 'jest' } });
		expect(wrapper.vm.$route.params.name).toEqual('jest');
	});

	it('should have the correct hero object from route param', () => {
		router.push({ name: 'hero', params: { name: 'jasmine' } });
		expect(jasmine.name).toEqual(wrapper.vm.hero.name);
	});

	it('should undefined if name param is not found in heroes list', () => {
		router.push({ name: 'hero', params: { name: 'not-found' } });
		expect(wrapper.vm.hero).toBeUndefined();
	});
});
