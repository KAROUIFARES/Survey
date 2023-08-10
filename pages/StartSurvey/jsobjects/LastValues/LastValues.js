export default {
  meth() {
    const rankIndex = appsmith.store.RankArray.indexOf(appsmith.store.rank);
    if (rankIndex !== -1 && appsmith.store.Questions[rankIndex]?.question?.ReponseType === "checkbox") {
      const Reponse = appsmith.store.Data || [];
      const CheckboxValue = appsmith.store.LastData || [];

      // Récupérer les valeurs sélectionnées dans CheckboxGroup
      const selectedValues = CheckboxGroup.selectedValues || [];

      // Ajouter les valeurs sélectionnées à Reponse si elles ne sont pas déjà présentes dans CheckboxValue
      for (let i = 0; i < selectedValues.length; i++) {
        if (!CheckboxValue.includes(selectedValues[i])) {
          Reponse.push(selectedValues[i]);
        }
      }

      // Mettre à jour les valeurs de LastData et Data dans appsmith.store
      storeValue("LastData", selectedValues);
      storeValue("Data", Reponse);

      console.log(Reponse);
    }
  }
};
