export default {
  async Start() {
    const Essai = {
      "_id":UUID.generate(), 
      "QuestionnaireId": appsmith.store.QuestionnaireId, 
      "dateEssai": new Date(), 
      "UserEmail": "" 
    }
		storeValue("Essai",Essai)
		await storeValue("EssaiId",appsmith.store.Essai._id)
		await CreateEssai.run()
    const tab = [];
    await GetQuestionsApi.run();
    console.log();
		storeValue("isDisabled",true)
    storeValue("nb", GetQuestionsApi.data.length);
    storeValue("Questions", GetQuestionsApi.data);
    storeValue("QuestionRankAfSin", tab);
    storeValue("LastData", tab);
    storeValue("QuesElim", tab);
    storeValue("rank", 0);
    storeValue("UserReponse", []);
    storeValue("RankArray", await QuestionRankArray.Array());
    storeValue("terminer", false);
    storeValue("n", false);
    navigateTo("StartSurvey", {});
  }
};
