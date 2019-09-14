<template>
	<div id="hero">
		<v-layout justify-center>
			<v-flex lg6 xl6 style="padding-top: 2rem;">
				<v-btn
					@click="$router.push({ name: 'heroes' })"
					color="#66BB6A"
					dark
					fab
					small
					style="margin-right: 0.425rem;">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>
				<span>Back to list</span>

				<v-card v-if="!!hero" flat style="margin-top: 2rem;">
					<v-card-text>
						<v-layout>
							<v-flex lg3 xl3 class="side-content">
								<img :src="hero.image" alt="">
							</v-flex>

							<v-flex lg9 xl9 class="main-content">
								<h1>{{ hero.name }}</h1>
								<p><strong>Real name:</strong> {{ hero.alias }}</p>
								<p><strong>Species:</strong> {{ hero.species }}</p>
								<p><strong>Gender:</strong> {{ hero.gender }}</p>
								<p><strong>Comic universe:</strong> {{ hero.universe }}</p>
								<p class="description">{{ hero.description }}</p>
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
	import {Route} from 'vue-router';
	import {HeroesInterface} from '@/shared/interfaces/heroes.interface';

	export default Vue.extend({
		computed: {
			hero() {
				return this.$store.getters['Heroes/heroesList'].find((hero: HeroesInterface) => {
					return hero.slug === this.$route.params.name;
				});
			},
		},
		created() {
			if (!this.hero) {
				this.$router.push({ name: 'heroes' });
			}
		},
		name: 'Hero',
	});
</script>

<style lang="scss" scoped>
	#hero {
		.side-content {
			img {
				margin-bottom: 1.5rem;
				width: 100%;
			}

			p {
				margin: 0;
			}
		}

		.main-content {
			padding-left: 2rem;

			h1 {
				color: #000;
				font-size: 2.25rem;
				font-weight: 300;
				margin-top: 1.25rem;
				margin-bottom: 2rem;
			}

			p {
				color: lighten(#000, 30%);
				margin: 0;

				&.description {
					margin-top: 2rem;
				}
			}
		}
	}
</style>
