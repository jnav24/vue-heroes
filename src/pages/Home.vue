<template>
	<div id="home">
		<Search></Search>
		<ListTable></ListTable>
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
	})
</script>

<style></style>
