Ext.define('App.view.customer.Choice', {
	extend: 'Ext.window.Window',
	xtype: 'customerChoice',
	
	width: 500,
	height: 300,
	minWidth: 300,
	minHeight: 220,
	bodyPadding: 5,
	border: true,
	referenceHolder: true,
	modal: true,
	layout: 'fit',
	renderTo: Ext.getBody(),
		   
	
	title: 'Выбор клиента',
	
	items: [{
		xtype: 'grid',
		title: false,
		scrollable: true,
		bind: '{customers}',
		reference: 'grid',
		columns: [
			{ text: 'Ид', dataIndex: 'id', width: 20, sortable: true },
			{ text: 'Наименование', dataIndex: 'name', flex: 1, sortable: true }
		]
	}],
	
	listeners: {
		beforeshow: function() {
			if ( !this.customer ) return;
			var grid = this.lookupReference('grid');
			if (grid) grid.setSelection( this.customer );
		}
	},
	
	buttons: [{
		text: 'Выбрать',
		handler: function() {
			var win = this.up('window'), grid = win.lookupReference('grid'), row = grid ? grid.getSelection() : null;
			if ( row && row[0] ) {
				if ( win.callbackResult && win.callbackResult( row[0] ) === false ) return;
				win.close();
			}
		}
	},{
		text: 'Очистить',
		handler: function() {
			var win = this.up('window');
			if ( win.callbackResult && win.callbackResult( null ) === false ) return;
		   win.close();
		}
	},{
		text: 'Отмена',
		handler: function() {
			var win = this.up('window');
			win.close();
		}
	}]
});

