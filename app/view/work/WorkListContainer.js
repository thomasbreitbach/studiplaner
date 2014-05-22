/**
 * @author Thomas Breitbach
 */
 Ext.define('studiplaner.view.work.WorkListContainer', {
	extend: 'Ext.Container',
	xtype: 'worklistcontainer',

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
		    title: 'Arbeitszeiten',
		    docked: "top",
		    items: [
				menuButton,
		        { xtype: 'spacer' },
		        newButton
		    ]
		};

		var workList = {
    		xtype: "worklist",
    		store: Ext.getStore("Work"),
    		listeners: {
       		 	itemtap: { fn: this.onWorkListTap, scope: this }
        	}
    	};
    	
    	//~ TODO Performance
    	Ext.create('studiplaner.form.WorkForm'); 
    
    	this.add([topToolbar, workList]);
	},
	
	//Listener functions    
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	
	onNewButtonTap: function () {
        console.log("newWorkCommand");
    	this.fireEvent("newWorkCommand", this);
	},
	
	onWorkListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('editWorkCommand', this, record);
	}
});
