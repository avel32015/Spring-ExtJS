Ext.define('App.model.Order', {
	extend: 'App.model.Base',
	alias: 'model.order',

	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'num',
		type: 'string',
		unique: true,
		validators: [{ type: 'length', min: 1, max: 10 }]
	}, {
		name: 'name', 
		type: 'string',
		validators: [{ type: 'length', max: 255 }]
	}, {
		name: 'date',
		type: 'date',
		dateFormat: 'Y-m-d'
		/*, validators: [{ type: 'date', format: 'd/m/Y' }]*/
	}, {
		name: 'status',
		reference: 'Status'
		//, validators: [{ type: 'length', min: 1 }]
		//, validators: [{ type: 'notnull' }]*/
	}, {
		name: 'source',
		reference: 'Customer'
	}, {
		name: 'destination',
		reference: 'Customer'
	}]

	, onLoad: function() {
		var value, role, name, field, session = this.session;
		for (name in this.associations) {
			role = this.associations[name];
			value = role.instanceName ? this[role.instanceName] : null;
			if (value) value = value.id;
			this.data[name] = value;
			if (session) {
				field = this.fieldsMap[name];
				session.updateReference(this, field, value, null);
			}
		}
	}
	
});

