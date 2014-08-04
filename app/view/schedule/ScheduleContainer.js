
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
	
		/*
		 * TOP TOOLBAR
		 */
		var menuButton = {
            xtype: "button",
        	iconCls: 'list',
        	ui: 'action',
        	handler: this.onMenuButtonTap,
        	scope: this
		};	
		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Wochenplan',
		    docked: "top",
		    items: [menuButton]
		};
		
		/*
		 * BLOCKS PANEL
		 */
		var blocksPanel = Ext.create('Ext.Panel', {
			itemId: 'blocksPanel',
			left: 0,
			width: '88%',
			height: '88%',
			margin: '0.9em 0 0 6%',
			cls: 'blocks-panel',
			layout: 'fit',
			showAnimation: 'fadeIn',
			hideAnimation: 'fadeOut'
		});
		var blocksList = {
    		xtype: "blockslist",
    		itemId: 'blockslist',
    		store:  Ext.getStore("ScheduleBlocks"),
    		listeners: {
       		 	//~ itemtap: { fn: this.onBlocksListTap, scope: this }
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
    	blocksPanel.hide();

		/*
		 * PHASE CHOOSER
		 */
		var phasesChooser = {
			xtype: 'container',
			docked: 'top',
			items: [
				{
					xtype: 'selectfield',
					label: 'Phase',
					itemId: 'phaseSelectField',
					usePicker: 'true',
					defaultPhonePickerConfig : {
						doneButton : 'Übernehmen',
						cancelButton : 'Abbrechen'
					},
					options: [
						{text: '1. Hälfte des Semesters',  value: 0},
						{text: '2. Hälfte des Semesters', value: 1},
						{text: 'Semesterferien',  value: 2}
					],
					listeners: {
						change: { fn: this.onSelectFieldChanged, scope: this }
					}
				}
			]
		}

		/*
		 * 2-Dim-Carousel
		 */
		var carousel = Ext.create('studiplaner.view.LockableCarousel', {
			direction: "vertical",
			itemId: "phasesCarousel",
			indicator: false,
			items: [
				{
					xtype: "schedulecarousel",
					phaseId: 0
				},
				{
					xtype: "schedulecarousel",
					phaseId: 1
				},
				{
					xtype: "schedulecarousel",
					phaseId: 2
				}
			]	
    	});
    	carousel.lock();    
    	
    	this.add([topToolbar, phasesChooser, carousel, blocksPanel]);
	},
	
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	
	onCancelButtonTap: function (){
		console.log("onCancelButtonTap");
		this.fireEvent("hideBlocksPanelCommand", this);
	},
	
	onConfirmButtonTap: function (){
		this.fireEvent("assignBlockCommand", this);
	},
	
	onSelectFieldChanged: function (element, value) {
		this.fireEvent("phaseChangedCommand", this, value);
	},
	
	//~ onBlocksListTap: function (list, index, target, record, evt, options) {
		//~ console.log("onBlocksListTap");
		//~ console.log(this.down('#blockslist').getSelection());
    	//~ this.fireEvent('selectBlockCommand', this, record);
	//~ }
});
