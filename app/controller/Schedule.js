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
            	// The commands fired by the schedule container.
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
	
	onBlockLongPressCommand: function (dayContainer, pressedContainer) {
		console.log("onBlockLongPressCommand: " + pressedContainer.getItemId());
		
		this.lastPressedContainer = pressedContainer;
		var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		var listHeader = blocksPanel.down('#blockList-listHeader');
		//set panels header
		listHeader.setHtml(pressedContainer.name);
				
		//~ blocksPanel.down('#blockslist').refresh();
		if(blocksPanel.isHidden()){
			blocksPanel.show();
		}else{
			blocksPanel.hide();
		}
	},
	
	onHideBlocksPanelCommand: function () {
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
			console.log(selectedScheduleBlock);
			console.log(this.lastPressedContainer);
			
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
			this.lastPressedContainer.setHtml(curContent + '<p>' + selectedScheduleBlock.ModuleBelongsToInstance.data.name + '</p>');
			
		
			//last step: hide panel
			blocksPanel.hide();
		}else{
			//no block selected
			Ext.Msg.alert('Kein Auswahl', 'Bitte wähle einen Block aus der Liste!', Ext.emptyFn);
		}
	},
	
	onPhaseChangedCommand: function (container, value) {
		console.log("onPhaseChangedCommand " + value);
		
	},

	//--------------------------------
    launch: function () {
        this.callParent();
        //load Store
        var scheduleBlocksStore = Ext.getStore("ScheduleBlocks");
		scheduleBlocksStore.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
