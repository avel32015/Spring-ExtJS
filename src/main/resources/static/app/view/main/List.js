Ext.define('App.view.main.List', {
    extend: 'Ext.grid.Panel',
	xtype: 'ordersList',

    title: 'Заявки',
	reference: 'ordersList',
	scrollable: true,
	selModel: 'checkboxmodel',
	
	bind: '{orders}',
    columns: [
    	{ text: 'Номер', dataIndex: 'num', width: 120, sortable: true }, 
		{ text: 'Наименование', dataIndex: 'name', flex: 1, sortable: true }, 
		{ text: 'Дата', dataIndex: 'date', width: 100, sortable: true, xtype:'datecolumn', format:'d/m/Y' }, 
		{ text: 'Состояние', width: 100, sortable: true, 
			renderer: function (value, metaData, record) { 
				var v = record.getStatus();
				return v ? v.getId() : ''; 
			}
		}, { text: 'Отправитель', flex: 1, sortable: true,
			renderer: function (value, metaData, record) { 
				var v = record.getSource ? record.getSource() : null;
				return v ? v.get('name') : '';
			}
		}, { text: 'Получатель', flex: 1, sortable: true, 
			renderer: function (value, metaData, record) { 
				var v = record.getDestination ? record.getDestination() : null;
				return v ? v.get('name') : '';
			}
		}
	],

    dockedItems: [{
		xtype: 'toolbar',
		items: [{
			text: 'Обновить',
			iconCls: 'x-fa fa-refresh',
			handler: 'onReloadClick'
		}, {
			text: 'Создать',
			iconCls: 'x-fa fa-plus',
			handler: 'onAddClick'
		}, {
			text: 'Изменить',
			iconCls: 'x-fa fa-edit',
			handler: 'onEditClick',
			bind: { disabled: '{!ordersList.selection}' }
		}, {
			text: 'Удалить',
			iconCls: 'x-fa fa-trash',
			handler: 'onRemoveClick',
			bind: { disabled: '{!ordersList.selection}' }
		}]
	}],
	
	/*
	bbar: {
		xtype: 'pagingtoolbar',
		displayInfo: true
	},*/
	
	fbar: [{
		xtype: 'toolbar',
		items: [{ xtype: 'tbtext', bind: 'Всего записей: {orders.totalCount}' }]
	}]
	
});
