Ext.define('App.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',

	requires: [
		'App.view.main.Form'
	]
	
	, onReloadClick: function() {
		var store = Ext.getStore('orders');
		store.load();
	}
    
	, onAddClick: function () {
		var store = Ext.getStore('orders'),
			record = store.createModel({}),
			self = this;
		record.setId( 0 );
		
		Ext.create({ xtype: 'ordersForm', record: record, 
			callbackSave: function(record, operation, success) {
				if (!success) self.onErrorOperation( operation );
				else store.add( record );
			}
		}).show();
	}
	
	, onEditClick: function () {
		var grid = this.lookupReference('ordersList'),
			rows = grid ? grid.getSelection() : null,
			self = this;
		for(var i = 0; rows && i < rows.length; i++) {
			Ext.create({ xtype: 'ordersForm', record: rows[i],
				callbackSave: function(record, operation, success) {
					if (!success) self.onErrorOperation( operation );
				}
			}).show();
		}
	}

	, onRemoveClick: function () {
		var grid = this.lookupReference('ordersList'),
			store = grid.getStore(),
			rows = grid.getSelection();
			self = this;
		if (rows && rows.length) {
			Ext.Msg.confirm('Подтверждение', 'Удалить записи (' + rows.length + ') ?', function(btn) {
				if (btn == 'yes') {
					store.remove( rows );
					store.sync({
						failure: function(batch) {
							var o = batch.getExceptions();
							self.onErrorOperation( o && o.length ? o[0] : null );
						}
					});
				}
			});
		}
	}
	
	, onErrorOperation: function(operation) {
		var e = operation && operation.getError ? operation.getError() : null;
		Ext.Msg.show({
			title: 'Ошибка ' + (e ? e.status + ' ' + e.statusText : ''),
			message: typeof(operation) === 'string' ? operation : 'Сообщение: ' + (e && e.response ? e.response.responseText : ''),
			buttons: Ext.Msg.OK,
			icon: Ext.Msg.ERROR
		});
	}
	
});
