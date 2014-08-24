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
    	scrollable:'vertical'
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
					'<p>Modul:<br>Entwicklunsprojekt SoSe 14</p>'+
					'<p>Betreuung:<br>Prof. Dr. rer. nat. Dominik Schultes</p>'+
					'<p>Planung und Realisierung:<br>Thomas Breitbach<p>'+
					'<p>Idee:<br>M. H. Edu. Sabine Langkamm<p>'+
					'<p>Source-Code:<br><a href="https://github.com/thomasbreitbach/studiplaner" title="Studiplaner Source-Code auf GitHub" target="_blank">Studiplaner auf GitHub</a></p>' +	
					'<h2>Verwendete Bibliotheken:</h2>' +
					'<ul><li>Sencha Touch 2.3 unter der <a href="http://www.gnu.org/licenses/gpl-3.0-standalone.html" title="GNU GPLv3" target="_blank">GNU GPLv3</a> Lizenz</ul>' + 
					'<li>Highcharts JS unter der <a href="http://creativecommons.org/licenses/by-nc/3.0/" title="GNU GPLv3" target="_blank">CC BY-NC 3.0</a> Lizenz</li></ul>'
		};

    	this.add([topToolbar, content]);
	},
	
	//Listener functions
	onMenuButtonTap: function (){
		Ext.Viewport.fireEvent("toggleSlideMenuCommand", this);
	}
});
