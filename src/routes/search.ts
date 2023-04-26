const api_key = 'RGAPI-61d34ab1-408f-41e5-99a9-ba01da15fcea';
export async function search(name: string | null) {
	let data: SummonerData = new SummonerData();
	console.log("name", name)
	if (name != null) {
		const res = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`
		);
		data = await res.json();
	}
	console.log(data);
	return data;
}
export async function match_history(puuid: string, count: number) {
	console.log(puuid, count);
	const res = await fetch(
		`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${count}&count=${20}&api_key=${api_key}`
	);
	const data: string[] = await res.json();
	console.log(data);
	return data;
}
export async function match_details(match_id: string) {
	const res = await fetch(
		`https://americas.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${api_key}`
	);
	const data = await res.json();
	console.log(data);
	return data;
}
export async function league_entires(accountId: string) {
	const res = await fetch(
		`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}?api_key=${api_key}`
	);
	const data = await res.json();
	return data;
}

export class SummonerData {
	id: string;
	accountId: string;
	puuid: string;
	name: string;
	profileIconId: string;
	revisionDate: string;
	summonerLevel: number;
	constructor() {
		this.id = '';
		this.name = '';
		this.puuid = '';
		this.accountId = '';
		this.revisionDate = '';
		this.profileIconId = '';
		this.summonerLevel = 0;
	}
}
export enum Queue {
	'Custom' = 1,
	'Blind' = 2,
	'Solo/Duo' = 3,
	'Flex' = 6,
	'Draft' = 400,
	'ARAM' = 65
}
export const QueueType: { [key: number]: string } = {
	65: 'ARAM',
	400: 'Normal Draft',
	420: '5v5 Ranked Solo',
	430: '5v5 Blind Pick',
	440: '5v5 Ranked Flex'
};
