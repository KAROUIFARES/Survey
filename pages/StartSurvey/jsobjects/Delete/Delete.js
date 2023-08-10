export default {
	async meth(tableau, tableau1, ques) {
		const tab = appsmith.store.QuestionRankAfSin || [];
		const data = {
			"QuestionRank": appsmith.store.rank,
			"RankArray": [...tableau], // Utiliser le spread operator pour créer une copie de "tableau"
			"QuestionArray": [...ques] // Utiliser le spread operator pour créer une copie de "ques"
		};

		tab.push(data);
		await storeValue("QuestionRankAfSin", tab);

		if (tableau) {
			for (let i = 0; i < tableau1.length; i++) {
				const index = tableau.indexOf(tableau1[i]);
				if (index !== -1) {
					tableau.splice(index, 1);
					ques.splice(index, 1);
				}
			}
			await storeValue("Questions", [...ques]); // Utiliser le spread operator pour mettre à jour "Questions"
		}

		return tableau;
	}
};
