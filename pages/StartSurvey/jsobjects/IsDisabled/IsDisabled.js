export default {
	meth(){
		const checkboxValid=CheckboxGroup.isValid;
		const inputValid=Input1.isValid;
		const inputVisible=Input1.isVisible
		if(!CheckboxGroup.isValid){ storeValue("isDisabled",true) }
		if(CheckboxGroup.isValid){ storeValue("isDisabled",false)	}
		if( CheckboxGroup.isValid && Input1.isVisible && !Input1.isValid ){	storeValue("isDisabled",true) }
		if(TreeSelect3.isValid){ storeValue("isDisabled",false)	}
		appsmith.store.isDisabled
	}
};