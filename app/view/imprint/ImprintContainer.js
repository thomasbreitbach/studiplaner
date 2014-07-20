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
			cls: 'imprint-body',
			html: 	'<div class="thm-logo"></div>'+
					'<h1>Dies ist ein Produkt der THM - Technische Hochschule Mittelhessen</h1>'+
					'<p>Wiesenstraße 14<br>35390 Gießen</p>'+
					'<p>Planung und Realisierung:<br>Thomas Breitbach<p>'+
					'<p>Modul:<br>Entwicklunsprojekt</p>'+
					'<p>Source-Code:<br><a href="https://github.com/thomasbreitbach/studiplaner" title="Studiplaner Source-Code auf GitHub">Studiplaner auf GitHub</a></p>'
		};

  
    	this.add([topToolbar, content]);
	},
	
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	}
});
