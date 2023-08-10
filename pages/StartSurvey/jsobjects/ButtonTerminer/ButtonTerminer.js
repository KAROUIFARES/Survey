export default {
	meth()
	{
		if(Checkbox1.isChecked)
			{
				return !(Checkbox1.isChecked&&Input2.text.length>0&&Input2.isValid)
			}else
				return false
		
	},
	async meth2(){
		if(!Button1.isDisabled)
		{
			await InsertUserEmail.run()
			if(InsertUserEmail.data.message==="Data saved successfully")
				showAlert("terminer avec succes")
		}else{
			showAlert("terminer avec succes")
		}
	}
}