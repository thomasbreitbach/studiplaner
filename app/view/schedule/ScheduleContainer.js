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
	
		//~ var modulesMenuButton = Ext.create('Ext.Button', {
        	//~ iconCls: '',
        	//~ itemId: 'modulesBtn',
        	//~ text: 'Module',
        	//~ ui: 'action',
        	//~ handler: this.onModulesButtonTap,
        	//~ scope: this
		//~ });
		
		var blocksPanel = Ext.create('Ext.Panel', {
			itemId: 'blocksPanel',
			left: 0,
			width: '88%',
			height: '88%',
			margin: '5% 0 0 6%',
			//~ style: 'background-color: transparent;',
			cls: 'blocks-panel',
			layout: 'fit'
		});
		blocksPanel.hide();
		
		var blocksList = {
    		xtype: "blockslist",
    		itemId: 'blockslist',
    		//~ store:  Ext.getStore("ScheduleBlocks"),
    		listeners: {
       		 	itemtap: { fn: this.onModulesListTap, scope: this }
        	}
    	}; 
    	
    	var listHeader = {
			xtype: 'container',
			docked: 'top',
			itemId: 'blockList-listHeader',
            height: 35,
            cls: 'blocklist-listheader'
		};
		
		var buttonsToolbar = {
			xtype: 'toolbar',
			docked: 'bottom',
			style: 'background-color: black; background-image: none;',
			items: [
				{
					xtype: 'button',
					ui: 'decline',
					text: 'Abbrechen',
					width: '48%',
					handler: this.onCancelButtonTap,
					scope: this
				}, {
					xtype: 'button',
					ui: 'confirm',
					text: 'Übernehmen',
					width: '48%',
					handler: this.onConfirmButtonTap,
					scope: this
				}
			]
		};
		
    	blocksPanel.add([listHeader, blocksList, buttonsToolbar]);


		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Wochenplan',
		    docked: "top",
		    items: [
				menuButton
		        //~ { xtype: 'spacer' },
		        //~ modulesMenuButton
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
	
	onCancelButtonTap: function (){
		this.fireEvent("hideBlocksPanel", this);
	},
	
	onConfirmButtonTap: function (){
		this.fireEvent("hideBlocksPanel", this);
	},
	  
  	onModulesButtonTap: function (btn) {
		console.log("onModulesMenuButtonTap");
    	this.fireEvent("toggleBlocksPanelCommand", this, btn);
	},
	
	onModulesListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('editModuleCommand', this, record);
	}
});
