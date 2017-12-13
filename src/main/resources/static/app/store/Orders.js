Ext.define('App.store.Orders', {
	extend: 'Ext.data.Store',
	alias: 'store.orders',
	storeId: 'orders',
	
	requires: [
		'App.model.Order'
	],
	
	model: 'App.model.Order',
	autoLoad: true
	
});

