Ext.define('App.store.Statuses', {
	extend: 'Ext.data.Store',
	alias: 'store.statuses',
	storeId: 'statuses',
	
	requires: [
		'App.model.Status'
	],
	
	autoLoad: true,
	//autoSync: true,
	model: 'App.model.Status'
	
});
