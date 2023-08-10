export default {
	meth() {
		if (!IsEqual.isEqual(appsmith.store.UserReponse, [])) {
			if (appsmith.store.Questions[appsmith.store.rank].question.ReponseType === "radio") {
				return appsmith.store.UserReponse.find(item=>item.QuestionRank===appsmith.store.Questions[appsmith.store.rank].question.QuestionRank).reponse[0];
			} else if (appsmith.store.Questions[appsmith.store.rank]?.question.ReponseType === "checkbox") {
				return appsmith.store.UserReponse.find(item=>item.QuestionRank===appsmith.store.Questions[appsmith.store.rank].question.QuestionRank).reponse;
			}
		}
	}
};
