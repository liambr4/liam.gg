<script lang="ts">
	import { league_entires, type SummonerData } from './search';
	export let summoner: SummonerData;
	let promise_entry = league_entires(summoner.id);
</script>

{#await promise_entry then entry}
	<div class="grid grid-cols-4 pb-1 px-2">
		<img
			width="200"
			src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/${summoner.profileIconId}.png`}
			alt="Profile Icon"
		/>
		<div class="col-span-3">
			<p class="font-mono">{summoner.name}</p>
			<p class="font-mono">Level {summoner.summonerLevel}</p>
			<p class="font-mono">
				<strong>Solo/Duo</strong>
				{#if entry[0]}
					{entry[0].tier}
					{entry[0].rank} | {entry[0].leaguePoints} LP | {entry[0].wins}W/{entry[0]
						.losses}L({Math.round((entry[0].wins / (entry[0].wins + entry[0].losses)) * 100)}%)
				{:else}
					Unranked
				{/if}
			</p>

			<p class="font-mono">
				<strong> Flex </strong>
				{#if entry[1]}
					{entry[1].tier}
					{entry[1].rank} | {entry[1].leaguePoints} LP | {entry[1].wins}W/{entry[1]
						.losses}L({Math.round((entry[1].wins / (entry[1].wins + entry[1].losses)) * 100)}%)
				{:else}
					Unranked
				{/if}
			</p>
		</div>
	</div>
{/await}
