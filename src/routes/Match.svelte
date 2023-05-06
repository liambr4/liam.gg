<script lang="ts">
	import { match_details, QueueType } from './search';
	export let match_id = '';
	export let puuid = '';
	let promise_match = match_details(match_id);
	let items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
	function getClassForMatch(win: boolean, pood: string) {
		if (win == true) {
			if (pood == puuid) return 'bg-green-400 border-2 border-green-400';
			else return 'bg-green-300 border-2 border-green-300';
		} else {
			if (pood == puuid) return 'bg-red-400 border-2 border-red-400';
			else return 'bg-red-300 border-2 border-red-300';
		}
	}
</script>

{#await promise_match then match}
	<div class="grid grid-cols-4 gap-1 p-2">
		{#each match.info.participants as participant}
			{#if participant.puuid == puuid}
				<div class={`col-span-1 p-1 ${participant.win ? 'bg-green-300' : 'bg-red-300'}`}>
					<img
						alt="idk"
						src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`}
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
					<p>Damage to Champions: {participant.totalDamageDealtToChampions.toLocaleString()}</p>
					<p>{QueueType[match.info.queueId]}</p>
				</div>
			{/if}
		{/each}
		<div class="col-span-3">
			<div class="grid grid-cols-2">
				<div>
					<div class="flex flex-col gap-1">
						{#each match.info.participants as participant, index}
							{#if index < 5}
								<div
									class={`p-1 + ${getClassForMatch(participant.win, participant.puuid)}`}
								>
									<img
										class="float-left pr-1 pb-0"
										alt="idk"
										src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`}
										width="50"
										height="50"
									/>
									<div class="grid grid-cols-2">
										<div class="grid grid-rows-2">
											<a
												class={participant.puuid == puuid ? 'font-bold' : 'font-normal'}
												href={`/?name=${participant.summonerName}`}>{participant.summonerName}</a
											>
											<div>
												{participant.kills + '/' + participant.deaths + '/' + participant.assists}
											</div>
										</div>
										<div class="grid grid-cols-7">
											{#each items as item}
												{#if participant[item] != 0}
													<img
														class="float-left pr-1 pb-0"
														alt="idk"
														src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${participant[item]}.png`}
														width="50"
														height="50"
													/>
												{/if}
											{/each}
										</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
				<div>
					<div class="flex flex-col gap-1">
						{#each match.info.participants as participant, index}
							{#if index > 4}
								<div
									class={`p-1 + ${getClassForMatch(participant.win, participant.puuid)}`}
								>
									<img
										class="float-left pr-1 pb-0"
										alt="idk"
										src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`}
										width="50"
										height="50"
									/>
									<div class="grid grid-cols-2">
										<div class="grid grid-rows-2">
											<a
												class={participant.puuid == puuid ? 'font-bold' : 'font-normal'}
												href={`/?name=${participant.summonerName}`}>{participant.summonerName}</a
											>
											<div>
												{participant.kills + '/' + participant.deaths + '/' + participant.assists}
											</div>
										</div>
										<div class="grid grid-cols-7">
											{#each items as item}
												{#if participant[item] != 0}
													<img
														class="float-left pr-1 pb-0"
														alt="idk"
														src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${participant[item]}.png`}
														width="50"
														height="50"
													/>
												{/if}
											{/each}
										</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/await}
