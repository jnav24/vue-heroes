<template>
	<div id="list-table">
		<v-card>
			<v-card-text>
				<v-data-table
					:single-expand="false"
					:expanded.sync="expanded"
					:hide-default-footer="true"
					:items-per-page="25"
					:headers="heroHeaders"
					show-expand
					item-key="name"
					:items="heroesList">
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>The Greatest Heroes</v-toolbar-title>
						</v-toolbar>
					</template>

					<template v-slot:expanded-item="{ heroHeaders, item }">
						<td :colspan="headersLength + 1">
							<v-layout class="expanded-container">
								<v-flex class="img-container" lg3 xl3>
									<img
										:src="item.image" alt="">
								</v-flex>

								<v-flex lg9 xl9 class="expanded-content">
									<h4>{{ item.name }}</h4>
									<p class="alias">{{ item.alias }}</p>

									<v-layout justify-space-between style="margin-bottom: 2rem">
										<v-flex>
											<strong>Species:</strong> {{ item.species }}
										</v-flex>

										<v-flex>
											<strong>Gender:</strong> {{ item.gender }}
										</v-flex>

										<v-flex>
											<strong>Universe:</strong> {{ item.universe }}
										</v-flex>
									</v-layout>

									<p class="description">{{ item.description }}</p>
								</v-flex>
							</v-layout>
						</td>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {mapGetters} from 'vuex';

	export default Vue.extend({
		computed: {
			headersLength() {
				return this.heroHeaders.length;
			},
			...mapGetters('Heroes', [
				'heroesList',
			]),
		},
		data: () => {
			return {
				expanded: [],
				heroHeaders: [
					{ text: 'Hero Name', value: 'name' },
					{ text: 'Secret Identity', value: 'alias' },
					{ text: 'Gender', value: 'gender' },
					{ text: 'Species', value: 'species' },
					{ text: 'Universe', value: 'universe' },
				],
			};
		},
	});
</script>

<style lang="scss" scoped>
	#list-table {
		.expanded-container {
			padding: 1rem 0.25rem;
		}

		.img-container {
			img {
				border-radius: 0.25rem;
				width: 100%;
			}
		}

		.expanded-content {
			padding: 1rem 1rem 0;

			h4 {
				font-size: 1.5rem;
				font-weight: 300;
			}

			p {
				&.alias {
					color: #908f8f;
					font-size: 1rem;
				}

				&.description {
					color: #5a5a5a;
				}
			}
		}
	}
</style>
