/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.imprint.ImprintContainer', {
	extend: 'Ext.Container',
	xtype: 'imprintcontainer',

	requires: [
		'Ext.Menu'
	],
	  
  	config: {
		layout: {
        	type: 'fit'
    	}
  	},

  	initialize: function(){
		this.callParent(arguments);
	
		var menuButton = {
            xtype: "button",
        	iconCls: 'list',
        	ui: 'action',
        	handler: this.onMenuButtonTap,
        	scope: this
		};

		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Impressum',
		    docked: "top",
		    items: [
				menuButton
		    ]
		};
		
		var content = {
			xtype: "container",
			margin: "20 20 20 20",
			html: "<p>Dies ist ein Produkt der THM - Technische Hochschule Mittelhessen</p>"+
					"<p>Planung und Realisierung: Thomas Breitbach<p>"
		};

  
    	this.add([topToolbar, content]);
	},
	
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	}
});
