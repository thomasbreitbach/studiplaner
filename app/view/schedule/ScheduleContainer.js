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
		
		var blocksPanel = Ext.create('Ext.Panel', {
			itemId: 'blocksPanel',
			left: 0,
			width: '88%',
			height: '88%',
			margin: '5% 0 0 6%',
			cls: 'blocks-panel',
			layout: 'fit',
			showAnimation: 'fadeIn',
			hideAnimation: 'fadeOut'
		});
		blocksPanel.hide();
		
		var blocksList = {
    		xtype: "blockslist",
    		itemId: 'blockslist',
    		store:  Ext.getStore("ScheduleBlocks"),
    		listeners: {
       		 	itemtap: { fn: this.onBlocksListTap, scope: this },
       		 	//~ itemtap: { 
					//~ fn: function(list, index, target, record, evt, options) {
						//~ if (record.get('assigned') === false) {
							//~ return true;
						//~ }else{
							//~ return false;
						//~ }
					//~ },
					//~ order: 'before'
				//~ }
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
					width: '49%',
					style: 'margin-left: -1px',
					handler: this.onCancelButtonTap,
					scope: this
				}, {
					xtype: 'button',
					ui: 'confirm',
					text: 'Übernehmen',
					width: '50%',
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
		    items: [menuButton]
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
		this.fireEvent("hideBlocksPanelCommand", this);
	},
	
	onConfirmButtonTap: function (){
		this.fireEvent("assignBlockCommand", this);
	},
	
	onBlocksListTap: function (list, index, target, record, evt, options) {
		console.log("onBlocksListTap");
		//~ console.log(this.down('#blockslist').getSelection());
    	//~ this.fireEvent('selectBlockCommand', this, record);
	}
});
