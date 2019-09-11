<template>
	<div id="home">
		<Search></Search>
		<v-layout justify-center style="padding-top: 2rem;">
			<v-flex lg8 xl8>
				<ListTable></ListTable>
			</v-flex>
		</v-layout>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import ListTable from '@/components/ListTable.vue';
	import Search from '@/components/Search.vue';

	export default Vue.extend({
		components: {
			ListTable,
			Search,
		},
	});
</script>

<style></style>
