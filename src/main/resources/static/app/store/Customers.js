Ext.define('App.store.Customers', {
	extend: 'Ext.data.Store',
	alias: 'store.customers',
	storeId: 'customers',
	
	requires: [
		'App.model.Customer'
	],
	
	autoLoad: true,
	//autoSync: true,
	model: 'App.model.Customer'
	
});

