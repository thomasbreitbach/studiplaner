/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.ModulesListContainer', {
	extend: 'Ext.Container',
	xtype: 'moduleslistcontainer',

	  
  	config: {
		layout: {
        	type: 'fit'
    	}
  	},

  	initialize: function(){
		this.callParent(arguments);
	
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
		        { xtype: 'spacer' },
		        newButton
		    ]
		};

		var modulesList = {
    		xtype: "moduleslist",
    		store: Ext.getStore("Modules"),
    		listeners: {
       		 	itemtap: { fn: this.onModulesListDisclose, scope: this }
        		// itemswipe: { fn: this.onModulesListSwipe, scope: this }
        	}
    	};
    
    	this.add([topToolbar, modulesList]);
	},
  
  	onNewButtonTap: function () {
        console.log("newModuleCommand");
    	this.fireEvent("newModuleCommand", this);
	},
	
	onModulesListDisclose: function (list, index, target, record, evt, options) {
    	console.log("editModuleCommand");
    	this.fireEvent('editModuleCommand', this, record);
	}
});
