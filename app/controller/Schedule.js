/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Schedule", {
    extend: "Ext.app.Controller",
    lastPressedContainer: null,
    
    requires: [
		'Ext.ComponentQuery'
    ],
    
    config: {
        refs: {
            scheduleContainer: "schedulecontainer",
            scheduleDayContainer: "scheduledaycontainer"
        },
        control: {
            scheduleContainer: {
                toggleBlocksPanelCommand: "onToggleBlocksPanelCommand",
                //~ updateBlocksCommand: "onUpdateBlocksCommand",
                hideBlocksPanelCommand: 'onHideBlocksPanelCommand',
                selectBlockCommand: 'onSelectBlockCommand',
                assignBlockCommand: 'onAssignBlockCommand',
                phaseChangedCommand: 'onPhaseChangedCommand'
            },
            scheduleDayContainer: {
				blockLongPressCommand: "onBlockLongPressCommand"
			}
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    
    //***********
    //**HELPER***
    //***********
    showBlocksPanel: function (headerString) {
		var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		var listHeader = blocksPanel.down('#blockList-listHeader');
		listHeader.setHtml(headerString);

		if(blocksPanel.isHidden()){
			blocksPanel.show();
		}else{
			blocksPanel.hide();
		}
	},
	
	clearBlockContainer: function (block, container) {
		Ext.Msg.show({
			title: 'Block löschen?',
			message: 'Möchtest du den Block wirklich löschen?',
			buttons: [{
				itemId: 'no',
				text: 'Nein',
				ui: 'action'
			}, {
				itemId: 'yes',
				text: 'Ja',
				ui: 'action'
			}],		
			fn: function(text, btn) {
				if(text == 'yes'){
					var store_sb = Ext.getStore("ScheduleBlocks");
					
					//delete phasexAssignedTo id
					var record = store_sb.findRecord('id', block.scheduleBlockId);
					var attribute = "phase" + (container.phaseId+1) + "AssignedTo";
					record.set(attribute , null);
					
					//remove block from container
					container.removeAt(0);
					
					//sync data
					store_sb.sync();
				}else{
					return false;
				}
			}
		});
	},
    
    //*************
    //**COMMANDS***
    //*************
    onToggleBlocksPanelCommand: function (container, btn) {
		console.log("onToggleModulesMenuCommand");
		var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		if(blocksPanel.isHidden()){
			blocksPanel.show();
			btn.addCls('x-button-pressing');
		}else{
			blocksPanel.hide();
			btn.removeCls('x-button-pressing');
		}
	},
	
	onBlockLongPressCommand: function (dayContainer, pressedContainer) {
		console.log("onBlockLongPressCommand: " + pressedContainer.getItemId());
		this.lastPressedContainer = pressedContainer;
		
		console.log(pressedContainer.getAt(0));
		var block = pressedContainer.getAt(0);
		//already assigned to?
		if(block != undefined){
			this.clearBlockContainer(block, pressedContainer);
		}else{
			//no block assigned --> show panel
			this.showBlocksPanel(pressedContainer.name);
		}
	},
	
	onHideBlocksPanelCommand: function () {
		console.log("onHideBlocksPanelCommand");
		var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		blocksPanel.hide();
	},
	
	onSelectBlockCommand: function (panel, record) {
		console.log("onSelectBlockCommand");
	},
	
	onAssignBlockCommand: function () {
		console.log("onAssignBlockCommand");

		var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		var blocksList = blocksPanel.down('#blockslist');
		var selection = blocksList.getSelection();
		
		if(selection.length > 0){
			var selectedScheduleBlock = selection[0];
	
			//1. update module block attributes		
			var attribute;	
			switch(this.lastPressedContainer.phaseId){
			case 0: 
				attribute = "phase1AssignedTo";
				break;
			case 1: 
				attribute = "phase2AssignedTo";
				break;
			case 2: 
				attribute = "phase3AssignedTo";
				break;
			}
			console.log(this.lastPressedContainer.getItemId());
			selectedScheduleBlock.set(attribute, this.lastPressedContainer.getItemId());
			
			var store = Ext.getStore("ScheduleBlocks");
			store.sync();
			store.load();
			
			//2. add module block to schedule block
			var curContent = this.lastPressedContainer.getHtml();
			this.lastPressedContainer.add({
				xtype: 'container',
				html: selectedScheduleBlock.ModuleBelongsToInstance.data.name,
				scheduleBlockId: selectedScheduleBlock.data.id
			})
			
			//last step: hide panel
			blocksPanel.hide();
		}else{
			//no block selected
			Ext.Msg.alert('Kein Auswahl', 'Bitte wähle einen Block aus der Liste!', Ext.emptyFn);
		}
	},
	
	onPhaseChangedCommand: function (container, value) {
		console.log("onPhaseChangedCommand " + value);
		var phasesCarousel = this.getScheduleContainer().down('#phasesCarousel');
		phasesCarousel.animateActiveItem(value, {type: 'fade'});
	},
	
	//~ onUpdateBlocksCommand: function () {
		//~ console.log("onUpdateBlocks");
		//~ var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		//~ var blocks = this.scheduleBlocksStore.getData().items;
		//~ var modulesStore = Ext.getStore('Modules');
		//~ 
		//~ for(var i=0; i<blocks.length; i++){
			//~ var moduleName = modulesStore.getById(blocks[i].get('module_id')).get('name');
			//~ var type = blocks[i].get('type');
			//~ blocksPanel.add({
				//~ xtype: 'component',
				//~ itemId: 'block' + i,
				//~ height: 100,
				//~ width: '80%',
				//~ cls: "blocks-panel-block",
				//~ html: '<p>' + moduleName + ' ' + type +'</p>'
			//~ });
		//~ }
		//~ 
	//~ },

	//--------------------------------
    launch: function () {
		console.log("launch");
        this.callParent();
        //load Store
        var scheduleBlocksStore = Ext.getStore("ScheduleBlocks");
		scheduleBlocksStore.load();
		
		//build schedule/timetable
		console.log("build schedule/timetable");
		var scheduleContainer = this.getScheduleContainer();
		var count = scheduleBlocksStore.getTotalCount();
		
		for(var i = 0; i < count; i++){
			var record = scheduleBlocksStore.getAt(i);
			console.log(record);
			var name = record.data.Module.name;
			
			var phase1 = record.get('phase1AssignedTo');
			if(phase1 != null){
				var phase1Id = "#" + phase1;
				var c1 = scheduleContainer.down(phase1Id);
				
				c1.add({
					xtype: 'container',
					html: name,
					scheduleBlockId: record.data.id
				});
			}
			
			var phase2 = record.get('phase2AssignedTo');
			if(phase2 != null){
				var phase2Id = "#" + phase2;
				var c2 = scheduleContainer.down(phase2Id);

				c2.add({
					xtype: 'container',
					html: name,
					scheduleBlockId: record.data.id
				});
			}
			
			var phase3 = record.get('phase3AssignedTo');
			if(phase3 != null){
				var phase3Id = "#" + phase3;
				var c3 = scheduleContainer.down(phase3Id);

				c3.add({
					xtype: 'container',
					html: name,
					scheduleBlockId: record.data.id
					style: 'background-color: white'
				});
			}	
		}    
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
