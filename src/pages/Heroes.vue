<template>
	<div id="heroes">
		<Search></Search>

		<v-layout justify-center style="margin-top: 2rem;">
			<v-flex lg6 xl6>
				<v-card
					class="hero-card"
					v-for="(hero, index) in heroesList"
					:key="index">
					<v-card-text>
						<v-layout>
							<v-flex lg2 xl2>
								<img :src="hero.image" alt="">
							</v-flex>

							<v-flex lg10 xl10 style="padding-left: 1rem;">
								<router-link
									class="link"
									tag="h4"
									:to="{
										name: 'hero',
										params: { name: hero.slug },
									}">{{ hero.name }}</router-link>
								<p class="alias">{{ hero.alias }}</p>

								<v-layout justify-space-between style="margin-bottom: 1.5rem">
									<v-flex>
										<strong>Species:</strong> {{ hero.species }}
									</v-flex>

									<v-flex>
										<strong>Gender:</strong> {{ hero.gender }}
									</v-flex>

									<v-flex>
										<strong>Universe:</strong> {{ hero.universe }}
									</v-flex>
								</v-layout>

								<p class="description" v-if="hero.description.length > charLen">
									{{ hero.description.substring(0, charLen) }}...
								</p>

								<p class="description" v-if="hero.description.length <= charLen">
									{{ hero.description }}
								</p>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Search from '@/components/Search.vue';
	import {mapGetters} from 'vuex';

	export default Vue.extend({
		components: {
			Search,
		},
		computed: {
			...mapGetters('Heroes', [
				'heroesList',
			]),
		},
		data: () => {
			return {
				charLen: 250,
			};
		},
	});
</script>

<style lang="scss" scoped>
	#heroes {
		.hero-card {
			margin-bottom: 1rem;
		}

		.link {
			color: #29B6F6;
			cursor: pointer;
			display: inline-block;
			width: auto;

			&:hover {
				color: #0288D1;
			}
		}

		img {
			width: 100%;
		}

		h4 {
			color: #000;
			font-size: 2rem;
			font-weight: 300;
			padding-top: 0.875rem;
		}

		strong {
			color: #000;
		}

		p {
			&.alias {
				color: #908f8f;
				font-size: 1rem;
				margin-top: 0.5rem;
			}

			&.description {
				color: #5a5a5a;
			}
		}
	}
</style>
