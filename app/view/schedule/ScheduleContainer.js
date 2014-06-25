/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleContainer', {
	extend: 'Ext.Container',
	xtype: 'schedulecontainer',

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
	
		var modulesMenuButton = {
            xtype: "button",
        	iconCls: '',
        	text: 'Module',
        	ui: 'action',
        	handler: this.onModulesMenuButtonTap,
        	scope: this
		};

		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Wochenplan',
		    docked: "top",
		    items: [
				menuButton,
		        { xtype: 'spacer' },
		        modulesMenuButton
		    ]
		};

		var carousel = {
    		xtype: "schedulecarousel"
    	};    
    	this.add([topToolbar, carousel]);
	},
	
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	  
  	onModulesMenuButtonTap: function () {
		console.log("onModulesMenuButtonTap");
    	this.fireEvent("toggleModulesMenuCommand", this);
	},
	
	onModulesListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('editModuleCommand', this, record);
	}
});
