export default {
	async meth() {

		const UserReponse=appsmith.store.UserReponse;
		if(appsmith.store.Questions[appsmith.store.rank].question.ReponseType==="radio"){
			if(RadioGroup.selectedOptionValue!==undefined){
				const reponse={
					"EssaiId":appsmith.store.EssaiId,
					"QuestionRank":appsmith.store.Questions[appsmith.store.rank].question.QuestionRank,
					"QuestionnaireId":appsmith.store.QuestionnaireId,
					"reponse":[RadioGroup.selectedOptionValue]
				};
				const existingReponse=UserReponse.find(item=>item.QuestionRank===appsmith.store.Questions[appsmith.store.rank].question.QuestionRank)
				if(existingReponse!==undefined)
				{
					appsmith.store.UserReponse[appsmith.store.UserReponse.indexOf(existingReponse)]=reponse
				}else
					UserReponse.push(reponse)
				storeValue("UserReponse",UserReponse)
			}
		}
		if(appsmith.store.Questions[appsmith.store.rank].question.ReponseType==="checkbox"){
				const reponse={
					"EssaiId":appsmith.store.EssaiId,
					"QuestionRank":appsmith.store.Questions[appsmith.store.rank].question.QuestionRank,
					"QuestionnaireId":appsmith.store.QuestionnaireId,
					"reponse":CheckboxGroup.selectedValues
				}
				const existingReponse=UserReponse.find(item=>item.QuestionRank===appsmith.store.Questions[appsmith.store.rank].question.QuestionRank)
				if(existingReponse!==undefined)
				{
					appsmith.store.UserReponse[appsmith.store.UserReponse.indexOf(existingReponse)]=reponse
				}else
					UserReponse.push(reponse)
				storeValue("UserReponse",UserReponse)
		}
		if(appsmith.store.Questions[appsmith.store.rank].question.ReponseType==="select"){
			const reponse={
					"EssaiId":appsmith.store.EssaiId,
					"QuestionRank":appsmith.store.Questions[appsmith.store.rank].question.QuestionRank,
					"QuestionnaireId":appsmith.store.QuestionnaireId,
					"reponse":TreeSelect3.selectedOptionValue
				}
			const existingReponse=UserReponse.find(item=>item.QuestionRank===appsmith.store.Questions[appsmith.store.rank].question.QuestionRank)
				if(existingReponse!==undefined)
				{
					appsmith.store.UserReponse[appsmith.store.UserReponse.indexOf(existingReponse)]=reponse
				}else
					UserReponse.push(reponse)
				storeValue("UserReponse",UserReponse)
		}
		
	}
};
