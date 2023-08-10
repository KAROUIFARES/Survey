export default {
	async Insert() {
		if (appsmith.store.Questions[appsmith.store.rank].question.QuestionRank === appsmith.store.nb) {
			await InsertDataApi.run();
			if(InsertDataApi.data.message==="Data saved successfully")
			{
				await storeValue("terminer",true)
			}
		}
	}
};
