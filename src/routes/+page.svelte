<script lang="ts">
	import { page } from '$app/stores';
	import Matches from './Matches.svelte';
	import { search, SummonerData } from './search';
	import Summoner from './Summoner.svelte';
	let name: string;
	let num_matches = 1;
	$: {
		summoner_promise = search($page.url.searchParams.get('name'));
	}
	export let summoner_promise: Promise<SummonerData>;
	function searchName(name: string) {
		$page.url.searchParams.set('name', name);
		summoner_promise = search(name);
	}
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>
<div class="pt-1 mx-2 grid grid-cols-3 pb-1 ">
	<a href="/">
		<img src="lamagg.png" alt="lamagg" class="h-12" />
	</a>
	<div class="col-span-2">
		<input
			class="p-2 rounded-md h-12 "
			placeholder="Your Summoner Name"
			bind:value={name}
			on:keydown={async (e) => {
				if (e.key == 'Enter') {
					searchName(name);
				}
			}}
		/>
		<button
			class="bg-blue-200 rounded-md p-2 h-12"
			on:click={() => {
				searchName(name);
			}}>Search</button
		>
	</div>
</div>
<div>
		{#await summoner_promise then summoner_data}
			{#if summoner_data.puuid}
				<Summoner summoner={summoner_data} />
				{#each Array(num_matches) as _, index (index)}
					<Matches id={summoner_data.puuid} count={20 * index} />
				{/each}
				<div class="grid place-items-center py-1 px-2">
					<button class="bg-blue-100 rounded-md h-10 p-2" on:click={() => (num_matches += 1)}
						>More</button
					>
				</div>
			{/if}
		{/await}
</div>
