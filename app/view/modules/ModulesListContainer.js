/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.modules.ModulesListContainer', {
	extend: 'Ext.Container',
	xtype: 'moduleslistcontainer',

	requires: [
		'Ext.Menu',
		'Ext.dataview.List'
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
	
		var newButton = {
            xtype: "button",
        	iconCls: 'add',
        	ui: 'action',
        	handler: this.onNewButtonTap,
        	scope: this
		};

		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Modulverwaltung',
		    docked: "top",
		    items: [
				menuButton,
		        { xtype: 'spacer' },
		        newButton
		    ]
		};

		var modulesList = {
    		xtype: "moduleslist",
    		store: Ext.getStore("Modules"),
    		itemHeight: 47,
    		listeners: {
       		 	itemtap: { fn: this.onModulesListTap, scope: this }
        	}
    	};    
    	this.add([topToolbar, modulesList]);
	},
	
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	  
  	onNewButtonTap: function () {
    	this.fireEvent("newModuleCommand", this);
	},
	
	onModulesListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('editModuleCommand', this, record);
	}
});
