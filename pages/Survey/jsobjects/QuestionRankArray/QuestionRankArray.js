export default {
	async Array()
	{
		var array=[]
		const nb=appsmith.store.nb
		for(let i=0;i<nb;i++){	array[i]=i+1	}
		return array
	}
}