import {env} from '$env/dynamic/public'

export const API_KEY = env['PUBLIC_API_KEY']

export async function search(name: string | null) {
	let data: SummonerData = new SummonerData();
	if (name != null) {
		const res = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
		);
		data = await res.json();
	}
	return data;
}
export async function match_history(puuid: string, count: number) {
	const res = await fetch(
		`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${count}&count=${5}&api_key=${API_KEY}`
	);
	const data: string[] = await res.json();
	return data;
}
export async function match_details(match_id: string) {
	const res = await fetch(
		`https://americas.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${API_KEY}`
	);
	const data = await res.json();
	return data;
}
export async function league_entires(accountId: string) {
	const res = await fetch(
		`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}?api_key=${API_KEY}`
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
