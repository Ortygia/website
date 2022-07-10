/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import { SearchTerm, DocumentLink } from './util/search';


export interface State {
	stats: {
		downloads: string;
		stars: string;
		contributors: string;
	};
	searchIndex: SearchTerm[];
	searchRef: DocumentLink[];
}

export const key: InjectionKey<Store<State>> = Symbol('docs');

export const store = createStore<State>({
	state: {
		stats: {
			downloads: `${(225_000_000).toLocaleString()}+`,
			stars: `${(11_000).toLocaleString()}+`,
			contributors: `${(100).toLocaleString()}+`,
		},
		searchIndex: [],
		searchRef: [],
	},
	mutations: {
		setStats(state, { stats }: { stats: { downloads: string; stars: string; contributors: string } }) {
			state.stats = stats;
		},
		setSearchIndex(state, { searchIndex, searchRef }: { searchIndex: SearchTerm[]; searchRef: DocumentLink[] }) {
			state.searchIndex = searchIndex;
			state.searchRef = searchRef;
		},
	},
	actions: {
		fetchStats: async ({ commit }) => {
			let downloads = 0;
			let stars = 0;
			let contributors = 0;

			const toJSON = (res: Response) => res.json();
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			const noop = () => {};

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const [fetchedDownloads, fetchedStars, fetchedContributors] = await Promise.all([
				fetch('https://api.github.com/repos/Ortygia/deaftone').then(toJSON, noop),
				fetch('https://api.github.com/repos/Ortygia/deaftone/stats/contributors').then(toJSON, noop),
			]);

			if (fetchedDownloads?.downloads) {
				downloads = 0;

				for (const item of fetchedDownloads.downloads) {
					downloads += item.downloads;
				}
			}
			if (fetchedStars?.stargazers_count) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				stars = fetchedStars.stargazers_count;
			}
			if (fetchedContributors) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				contributors = fetchedContributors.length;
			}
			commit({
				type: 'setStats',
				stats: {
					downloads: `${downloads.toLocaleString()}+`,
					stars: `${stars.toLocaleString()}+`,
					contributors: `${contributors.toLocaleString()}+`,
				},
			});
		},

	},
});

export function useStore() {
	return baseUseStore(key);
}
