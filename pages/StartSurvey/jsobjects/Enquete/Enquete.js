export default {
	async SuivantButton() {
		if(!appsmith.store.n)
			storeValue("n",true)
		if(appsmith.store.Questions[appsmith.store.rank].question.QuestionRank < appsmith.store.nb){if (await Sinario.GestSinario()) {
			const sinario = appsmith.store.sinario;
			if (sinario.NextQuestionRank !== -1) {
				storeValue("rankPreced", appsmith.store.rank);
				const nextRankIndex = appsmith.store.RankArray.indexOf(sinario.NextQuestionRank);
				storeValue("rank", nextRankIndex !== -1 ? nextRankIndex : appsmith.store.rank);
				storeValue("isDisabled",true)
			} else {
				// Stockage des données avant l'appel de Delete.meth()
				const tab1 = await Delete.meth([...appsmith.store.RankArray], appsmith.store.sinario.QuestionRankEliminate, appsmith.store.Questions);
				storeValue("RankArray", tab1);
				storeValue("rankPreced", appsmith.store.rank);
				const nextRankIndex = tab1.indexOf(appsmith.store.rank + 1);
				storeValue("rank", nextRankIndex !== -1 ? tab1[nextRankIndex] : appsmith.store.rank);
				storeValue("isDisabled",true)
			}
		} else {
			storeValue("rankPreced", appsmith.store.rank);
			storeValue("rank", appsmith.store.rank + 1);
			storeValue("isDisabled",true)
		}
		resetWidget("CheckboxGroup", true);
		storeValue("Data", []);}
	},

	async PrecedButton() {
		const previousRank = appsmith.store.rankPreced;
		await storeValue("rank", previousRank);
		await storeValue("rankPreced", previousRank - 1);

		const tab = appsmith.store.QuestionRankAfSin || [];
		if (tab.length > 0 && appsmith.store.rank === tab[tab.length - 1].QuestionRank) {
			await storeValue("RankArray", tab[tab.length - 1].RankArray);
			await storeValue("Questions", tab[tab.length - 1].QuestionArray);
			tab.splice(tab.length - 1, 1);
		}
	}
};
