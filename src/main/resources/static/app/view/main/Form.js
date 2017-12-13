Ext.define('App.view.main.Form', {
	extend: 'Ext.window.Window',
	xtype: 'ordersForm',
	
	requires: [
		'App.view.customer.Choice'
	],

	width: 500,
	height: 350,
	minWidth: 500,
	minHeight: 350,
	modal: true,
	layout: 'fit',
	renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'form',
		
		defaultType: 'textfield',
		fieldDefaults: {
			labelWidth: 100
		},
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		bodyPadding: 5,
		border: false,
		
		items: [{
			fieldLabel: 'Номер',
			name: 'num',
			allowBlank: false
		}, {
			fieldLabel: 'Наименование',
			name: 'name'
		}, {
			fieldLabel: 'Дата',
			name: 'date',
			xtype: 'datefield',
			format: 'd/m/Y'
		}, {
			fieldLabel: 'Состояние',
			name: 'statusId',
			xtype: 'combobox',
			bind: { store: '{statuses}' },
			displayField: 'name',
			valueField: 'id',
			forceSelection: true,
			allowBlank: false
		}, {
			xtype: 'panel',
			layout: { type: 'hbox', align: 'stretch' },
			border: false,
			style: 'padding-bottom: 10px',
			items: [{
				fieldLabel: 'Отправитель',
				xtype: 'textfield',
				name: 'sourceName',
				editable: false,
				flex: 1
			}, {
				xtype: 'button', 
				text: '...',
				handler: function () {
					var win = this.up('window'), form = win.down('form').getForm(), rec = win.record;
					Ext.create({ xtype: 'customerChoice', customer: rec.getSource(),
						callbackResult: function( customer ) {
							rec.setSource( customer );
							form.setValues({ sourceName: customer ? customer.get('name') : '' });
						} 
					}).show();
				}
			}]
		}, { 
			xtype: 'panel',
			layout: { type: 'hbox', align: 'stretch' },
			border: false,
			style: 'padding-bottom: 10px',
			items: [{
				fieldLabel: 'Получатель',
				xtype: 'textfield',
				name: 'destName',
				editable: false,
				flex: 1
			}, {
				xtype: 'button',
				text: '...',
				handler: function () {
					var win = this.up('window'), form = win.down('form').getForm(), rec = win.record;
					Ext.create({ xtype: 'customerChoice', customer: rec.getDestination(),
						callbackResult: function( customer ) {
							rec.setDestination( customer );
							form.setValues({ destName: customer ? customer.get('name') : '' });
						} 
					}).show();
				}
			}]
		}]
	}],
	
	listeners: {
		beforeshow: function() {
			this.setTitle( this.record.phantom ? "Создание" : "Изменение" );
			var form = this.down('form').getForm();
			var x, data = this.record.getData(true) || {};
			data.statusId = (x = this.record.getStatus()) ? x.get('id') : '';
			data.sourceName = (x = this.record.getSource()) ? x.get('name') : '';
			data.destName = (x = this.record.getDestination()) ? x.get('name') : '';
			form.setValues( data );
		},
		close: function() {
			this.record.reject();
		}
		
	},
	
	buttons: [{
		text: 'OK',
		formBind: true,
		handler: function() {
			var win = this.up('window'), form = win.down('form').getForm(), rec = win.record;
			if ( form.isValid() ) {
				form.updateRecord( rec );

				var prev, statusId = form.getValues()['statusId'];
				prev = (prev = rec.getStatus()) ? prev.id : null;
				if ( prev != statusId ) rec.setStatus( statusId ? Ext.getStore('statuses').findRecord('id', statusId) : null );

				if ( !rec.dirty ) { win.close(); return; }
				
				var validation = rec.getValidation(true);
				if ( validation.isValid() ) {
					rec.save({
						recordCreator: function(data) {
							var obj, role;
							for (role in rec.associations) if ( (obj = data[ role ]) && Ext.isObject(obj) ) data[ role ] = obj.id;
							return data;
						},
						callback: function(record, operation, success) {
							if ( win.callbackSave ) win.callbackSave(record, operation, success);
							if ( success ) {
								rec.commit();
								win.close();
							}
						}
					});
				} else {
					var errors = validation.getData();
					for (var name in errors) if ( errors[name] === true ) delete errors[name];
					if ( win.callbackSave ) win.callbackSave(null, Ext.encode( errors ).replace(/[{}"]/g, ' ').replace(/\,/g, '<br>'), false);
				}
			}
		}
	},{
		text: 'Отмена',
		handler: function() {
			this.up('window').close();
		}
	}]
});
