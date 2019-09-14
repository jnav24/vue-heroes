<template>
	<div id="search">
		<v-layout class="search-container" justify-center>
			<v-flex lg6 xl6>
				<v-layout justify-space-between>
					<v-flex lg3 xl3>
						<v-text-field
							v-model="form.name"
							label="Search Hero by Name"></v-text-field>
					</v-flex>

					<v-flex lg3 xl3>
						<v-select
							v-model="form.universe"
							:items="universeList"
							label="Select Universe"></v-select>
					</v-flex>

					<v-flex lg3 xl3>
						<v-select
							v-model="form.gender"
							:items="genderList"
							label="Select Gender"></v-select>
					</v-flex>
				</v-layout>

				<v-layout justify-center>
					<v-btn
						:class="{'disabledBtn': !canSubmit()}"
						@click="resetFilter()"
						:disabled="!canSubmit()">Reset</v-btn>
					<v-btn
						class="submit-btn"
						:class="{'disabledBtn': !canSubmit()}"
						@click="submitFilter()"
						color="green"
						dark
						:disabled="!canSubmit()"
						style="margin-left: .875rem;">
						Submit
					</v-btn>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {mapGetters, mapMutations} from 'vuex';

	export default Vue.extend({
		computed: {
			...mapGetters('Heroes', [
				'genderList',
				'universeList',
			]),
		},
		created() {
			const storedFilter = localStorage.getItem('hero_filter');

			if (!!storedFilter) {
				const { name, gender, universe } = JSON.parse(storedFilter);
				this.form = {
					name,
					gender,
					universe,
				};
				this.submitFilter();
			}
		},
		data: () => {
			return {
				form: {
					name: '',
					gender: '',
					universe: '',
				},
			};
		},
		methods: {
			...mapMutations('Heroes', [
				'SET_FILTER_GENDER',
				'SET_FILTER_NAME',
				'SET_FILTER_UNIVERSE',
			]),
			canSubmit(): boolean {
				return this.isNotEmpty(this.form.name) ||
					this.isNotEmpty(this.form.gender) ||
					this.isNotEmpty(this.form.universe);
			},
			isNotEmpty(value: string): boolean {
				return !!value && !!value.trim();
			},
			resetFilter(): void {
				this.form = {
					name: '',
					gender: '',
					universe: '',
				};
				this.submitFilter();
			},
			submitFilter(): void {
				this.SET_FILTER_GENDER(this.form.gender);
				this.SET_FILTER_NAME(this.form.name);
				this.SET_FILTER_UNIVERSE(this.form.universe);
				localStorage.setItem('hero_filter', JSON.stringify(this.form));
			},
		},
	});
</script>

<style lang="scss" scoped>
	#search {
		.search-container {
			background: #fcfcfc;
			border-bottom: 1px solid #ededed;
			padding: 1rem 0;
		}

		.disabledBtn {
			background: #ccc !important;
			color: #aaa !important;
		}
	}
</style>
