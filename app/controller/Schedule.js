/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Schedule", {
    extend: "Ext.app.Controller",
    scheduleBlocksStore: null,
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.form.ModuleForm'
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
                updateBlocksCommand: "onUpdateBlocksCommand"
            },
            scheduleDayContainer: {
				blockLongPressCommand: "onBlockLongPressCommand",
				blockTapCommand: "onBlockTapCommand"
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
		var blocksPanel = this.getScheduleContainer().down('#blocksPanel');
		
		//set panels header
		var listHeader = blocksPanel.down('#blockList-listHeader');
		listHeader.setHtml(pressedContainer.name);
				
		//~ blocksPanel.down('#blockslist').refresh();
		var moduleButton = this.getScheduleContainer().down('#modulesBtn');
		if(blocksPanel.isHidden()){
			blocksPanel.show();
			moduleButton.addCls('x-button-pressing');
		}else{
			blocksPanel.hide();
			moduleButton.removeCls('x-button-pressing');
		}
	},
	
	//~ blockTapCommand: function (dayContainer, blockContainer) {
		//~ console.log("blockTapCommand");
		//~ console.log(blockContainer);
		//~ blockContainer.addCls("schedule-weekday-block-tap");
	//~ },

    launch: function () {
        this.callParent();
        //load Store
        this.scheduleBlocksStore = Ext.getStore("ScheduleBlocks");
        this.scheduleBlocksStore.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
