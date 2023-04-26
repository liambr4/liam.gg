<script lang="ts">
	import Match from './Match.svelte';
	import { match_history } from './search';
	export let count: number;
	export let id = '';
	console.log( count, id);
	let matches_promise: Promise<string[]>;
	if (id.length > 1 && count != null) {
		matches_promise = match_history(id, count);
	}
</script>

<div>
	{#if matches_promise}
		{#await matches_promise}
			<h2>Loading matches...</h2>
		{:then matches}
			<div class={`grid grid-rows-${matches.length} gap-1`}>
				{#each matches as match_id}
					<Match {match_id} puuid={id} />
				{/each}
			</div>
		{/await}
	{/if}
</div>
