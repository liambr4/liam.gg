<script lang="ts">
	import { match_details, QueueType } from './search';
	export let match_id = '';
	export let puuid = '';
	let promise_match = match_details(match_id);
</script>

{#await promise_match then match}
	<div class="grid grid-cols-4 gap-1 p-2">
		{#each match.info.participants as participant}
			{#if participant.puuid == puuid}
				<div class={`col-span-1 p-1 ${participant.win ? 'bg-green-300' : 'bg-red-300'}`}>
					<img
						alt="idk"
						src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${participant.championName}.png`}
					/>
					<p>
						{participant.kills +
							'/' +
							participant.deaths +
							'/' +
							participant.assists +
							' (' +
							((participant.kills + participant.assists) / participant.deaths).toFixed(1) +
							'KDA)'}
					</p>
					<p>Damage to Champions: {participant.totalDamageDealtToChampions}</p>
					<p>{QueueType[match.info.queueId]}</p>
				</div>
			{/if}
		{/each}
		<div class="col-span-3">
			<div class="grid grid-rows-5 grid-flow-col gap-2">
				{#each match.info.participants as participant}
					<div
						class={`p-1 ${participant.win ? 'bg-green-300' : 'bg-red-300'} ${
							participant.puuid == puuid && 'border-2 border-blue-500'
						}`}
					>
						<img
							class="float-left pr-1 pb-0"
							alt="idk"
							src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${participant.championName}.png`}
							width="50"
							height="50"
						/>
						<a href={`/?name=${participant.summonerName}`}>{participant.summonerName}</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/await}
