Ext.define('App.model.Customer', {
	extend: 'App.model.Base',
	alias: 'model.customer',
	
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'name', 
		validators: [{ type: 'length', min: 1, max: 255 }]
	}]
	
});
