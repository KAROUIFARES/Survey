export default {
	async GestSinario() {
		const sinario = appsmith.store.Questions[appsmith.store.rank]?.sinario; // Utiliser l'opérateur de coalescence nulle (?.) pour accéder à sinario
		if (sinario !== undefined && sinario.length !== 0) {
			let Reponse = [];
			let i = 0;
			const question = appsmith.store.Questions[appsmith.store.rank]?.question; // Utiliser l'opérateur de coalescence nulle (?.) pour accéder à question

			if (question && question.ReponseType) {
				const responseType = question.ReponseType;
				if (responseType === "radio") {
					Reponse[0] = RadioGroup.selectedOptionValue;
				} else if (responseType === "checkbox") {
					Reponse = CheckboxGroup.selectedValues;
				}
			}
			console.log(Reponse);

			while (i < sinario.length) {
				if (IsEqual.isEqual(sinario[i].condition, Reponse)) {
					storeValue("sinario", sinario[i]);
					storeValue("tab", Reponse);
					return true;
				}
				i++;
			}
			return false;
		} else {
			return false;
		}
	}
};
