<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title class="headline text-uppercase">
				<span>Heroes</span>
			</v-toolbar-title>
		</v-app-bar>

		<v-content style="margin-bottom: 2rem;">
			<v-layout justify-center>
				<v-flex lg8 xl8>
					<router-view/>
				</v-flex>
			</v-layout>
		</v-content>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'App',
		components: {},
		data: () => ({
			//
		}),
	});
</script>
