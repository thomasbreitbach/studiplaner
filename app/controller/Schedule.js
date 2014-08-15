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
					var record = store_sb.findRecord('id', block.getScheduleBlockId());
					var attribute = "phase" + (container.config.phaseId+1) + "AssignedTo";
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
	
	buildSchedule: function (scheduleBlocksStore, workingTimesStore) {
		console.log("build schedule/timetable");
		var scheduleContainer = this.getScheduleContainer();
		
		/*
		 * add study blocks
		 */
		var scheduleBlocksCount = scheduleBlocksStore.getTotalCount();
		
		for(var i = 0; i < scheduleBlocksCount; i++){
			var record = scheduleBlocksStore.getAt(i);
			var name = record.data.Module.name;
			
			var phase1 = record.get('phase1AssignedTo');
			if(phase1 != null){
				var phase1Id = "#" + phase1;
				var c1 = scheduleContainer.down(phase1Id);
				
				c1.add({
					xtype: 'scheduleblock',
					name: name,
					type: record.data.type,
					scheduleBlockId: record.data.id
				});
			}
			
			var phase2 = record.get('phase2AssignedTo');
			if(phase2 != null){
				var phase2Id = "#" + phase2;
				var c2 = scheduleContainer.down(phase2Id);

				c2.add({
					xtype: 'scheduleblock',
					name: name,
					scheduleBlockId: record.data.id
				});
			}
			
			var phase3 = record.get('phase3AssignedTo');
			if(phase3 != null){
				var phase3Id = "#" + phase3;
				var c3 = scheduleContainer.down(phase3Id);

				c3.add({
					xtype: 'scheduleblock',
					name: name,
					scheduleBlockId: record.data.id
				});
			}	
		}    
		
		/*
		 * add working blocks
		 */
		//~ TODO!
		//~ this.addWorkingTimes(workingTimesStore);
	},
	
	addWorkingTimes: function(workingTimesStore){
		var workingTimesCount = workingTimesStore.getTotalCount();
		
		for(var i = 0; i < workingTimesCount; i++){
			var workingTime = workingTimesStore.getAt(i).getData(true);
			var workName = workingTime.Work.name;
			
			
			console.log(workName);
		}
	},
	
	filterBlocksList: function (selection) {
		var scheduleBlocks = Ext.getStore("ScheduleBlocks");
		scheduleBlocks.clearFilter();
		
		scheduleBlocks.filter([
			Ext.create('Ext.util.Filter', 
				{
					filterFn: function(record) { 
						var type = record.data.Module.type;
						var ret = false;
						switch(selection){
						case 0:
							//1.Phase des Semesters
							ret = (type == 0 || type == 2) ? true : false;
							break;	
						case 1:
							//2.Phase des Semesters
							ret = (type == 0) ? true : false;
							break;
						case 2:
							//Semesterferien
							ret = (type == 1) ? true : false;
							break;
						}
						return ret;
					}, 
					root: 'data',
					scope: this
				}
			)
		]);
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
		
		var block = pressedContainer.getAt(0);
		//already assigned to?
		if(block != undefined){
			this.clearBlockContainer(block, pressedContainer);
		}else{
			//no block assigned --> show panel
			this.showBlocksPanel(pressedContainer.config.name);
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
		var me = this,
			blocksPanel = this.getScheduleContainer().down('#blocksPanel'),
			blocksList = blocksPanel.down('#blockslist'),
			selection = blocksList.getSelection();
		
		if(selection.length < 1){
			//no block selected
			Ext.Msg.alert('Kein Auswahl', 'Bitte wähle einen Block aus der Liste!', Ext.emptyFn);
			return;
		}
		
		var selectedScheduleBlock = selection[0];
	
		//1. update module block attributes		
		var attribute;	
		switch(me.lastPressedContainer.config.phaseId){
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
	
		if(selectedScheduleBlock.get(attribute) != null){
			//block already used in this phase
			Ext.Msg.alert('Bereits verwendet!', 'Diesen Block hast du in der aktuellen Phase bereits zugewiesen.', Ext.emptyFn);
			return;
		}
		
		selectedScheduleBlock.set(attribute, me.lastPressedContainer.getItemId());
		
		var store = Ext.getStore("ScheduleBlocks");
		store.sync();
		store.load();
		
		//2. add module block to schedule block
		var curContent = me.lastPressedContainer.getHtml();
		this.lastPressedContainer.add({
			xtype: 'scheduleblock',
			name: selectedScheduleBlock.ModuleBelongsToInstance.data.name,
			type: selectedScheduleBlock.data.type,
			scheduleBlockId: selectedScheduleBlock.data.id
		});
		
		//last step: hide panel
		blocksPanel.hide();
	},
	
	onPhaseChangedCommand: function (container, value) {
		console.log("onPhaseChangedCommand " + value);
		var phasesCarousel = this.getScheduleContainer().down('#phasesCarousel');
		phasesCarousel.animateActiveItem(value, {type: 'fade'});
		
		//filter BlocksList
		this.filterBlocksList(value);
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
        this.callParent();
        //load Store
        var scheduleBlocksStore = Ext.getStore("ScheduleBlocks");		
		var workingTimesStore = Ext.getStore("WorkingTimes");

		//build schedule/timetable
		this.buildSchedule(scheduleBlocksStore, workingTimesStore);
		
		//filter blocks list (schedule blocks)
		this.filterBlocksList(0);
    },
    
    init: function () {
        this.callParent();
    }
});
