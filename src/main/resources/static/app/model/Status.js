Ext.define('App.model.Status', {
	extend: 'App.model.Base',
	alias: 'model.status',
	
	fields: [{
		name: 'id',
		validators: [{ type: 'length', min: 1, max: 10 }]
	}, {
		name: 'name', 
		validators: [{ type: 'length', min: 0, max: 255 }]
	}]
	
});

