/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleContainer', {
	extend: 'Ext.Container',
	xtype: 'schedulecontainer',

	requires: [
		'Ext.Menu',
		'Ext.Panel',
		'Ext.dataview.List'
	],
	  
  	config: {
		layout: 'fit'
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
	
		var modulesMenuButton = Ext.create('Ext.Button', {
        	iconCls: '',
        	text: 'Module',
        	ui: 'action',
        	handler: this.onModulesButtonTap,
        	scope: this
		});
		
		var blocksPanel = Ext.create('Ext.Panel', {
			itemId: 'blocksPanel',
			left: 0,
			width: '98%',
			height: '98%',
			margin: '5 5 5 5',
			scrollable: 'vertical',
			style:'background-color: transparent;',
			cls: 'blocks-panel',
			layout: {
				type: 'vbox',
				pack: 'start'
			}
		});
		blocksPanel.hide();

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
    	this.add([topToolbar, carousel, blocksPanel]);
	},
	
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	  
  	onModulesButtonTap: function (btn) {
		console.log("onModulesMenuButtonTap");
    	this.fireEvent("toggleBlocksPanelCommand", this, btn);
	},
	
	onModulesListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('editModuleCommand', this, record);
	}
});
