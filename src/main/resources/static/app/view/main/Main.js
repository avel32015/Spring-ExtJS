Ext.define('App.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
    	'App.store.Orders',
		'App.store.Statuses',
		'App.store.Customers',
		'App.view.main.MainController',
        'App.view.main.List'
	],

    controller: 'main',
    referenceHolder: true,
	session: true,
	viewModel: {
		stores: {
			orders: { type: 'orders', session: true },
			statuses: { type: 'statuses', session: true },
			customers: { type: 'customers', session: true }
		}
	},
	
    layout: {
        type: 'vbox',
        pack: 'end',
        align: 'stretch'
    },
    
    items: [{
		xtype: 'ordersList',
    	flex: 1
    }]
    
});
 
