/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.ModulesListContainer', {
	extend: 'Ext.Container',
	xtype: 'moduleslistcontainer',

  	initialize: function(){
		this.callParent(arguments);
	
		var newButton = {
            xtype: "button",
        	text: '+',
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
       			disclose: { fn: this.onNotesListDisclose, scope: this },
       		 	// itemtap: { fn: this.onNotesListDisclose, scope: this },
        		// itemswipe: { fn: this.onNotesListSwipe, scope: this }
        	}
    	};
    
    	this.add([topToolbar, modulesList]);
	},
  
  	onNewButtonTap: function () {
        console.log("newNoteCommand");
    	this.fireEvent("newNoteCommand", this);
	},
  
  	config: {
		layout: {
        	type: 'fit'
    	}
  	}
});