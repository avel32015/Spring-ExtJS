Ext.define('App.model.Base', {
	extend: 'Ext.data.Model',
	alias: 'model.base',

	schema: {
		namespace: 'App.model',
		proxy: {
			type: 'rest',
			url: 'api/{entityName:lowercase}',
			writer: {
				writeAllFields: true,
				allDataOptions: true
			}
		}
	}
	
});


