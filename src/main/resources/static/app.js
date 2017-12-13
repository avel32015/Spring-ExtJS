Ext.application({
    name: 'App',

    extend: 'Ext.app.Application',

    requires: [
        'App.view.main.Main'
    ],
	
    mainView: 'App.view.main.Main'

});
