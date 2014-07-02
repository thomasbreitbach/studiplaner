/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Schedule", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.form.ModuleForm'
    ],
    
    config: {
        refs: {
            scheduleContainer: "schedulecontainer"
        },
        control: {
            scheduleContainer: {
            	// The commands fired by the schedule container.
                toggleModulesMenuCommand: "onToggleModulesMenuCommand",
                updateBlocksCommand: "onUpdateBlocksCommand"
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
    onToggleModulesMenuCommand: function () {
		console.log("onToggleModulesMenuCommand");
		if(Ext.Viewport.getMenus().right.isHidden()){
			Ext.Viewport.showMenu('right');
		}else{
			Ext.Viewport.hideMenu('right');
		}
	},
	
	onUpdateBlocksCommand: function () {
		console.log("onUpdateBlocks");
		
	},

    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Modules");
        store.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
