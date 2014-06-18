/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.controller.App', {
  extend: 'Ext.app.Controller',
  xtype: 'appcontroller',
  
  requires: [
		'studiplaner.view.SlideMenu'
  ],
  
  config: {
        refs: {
            viewPort: "viewport",
            modulesListContainer: "moduleslistcontainer",
            workListContainer: "worklistcontainer",
            workloadContainer: 'workloadcontainer',
            scheduleContainer: "schedulecontainer"
        },
        control: {
            viewPort: {
            	// The commands fired by the sliding menu
                slideMenuCommand: "onSlideMenuCommand"
            },
			modulesListContainer: {
				toggleSlideMenuCommand: "onToggleSlideMenuCommand"
			},
            workListContainer: {
				toggleSlideMenuCommand: "onToggleSlideMenuCommand"
			},
			workloadContainer: {
				toggleSlideMenuCommand: "onToggleSlideMenuCommand"
			},
			scheduleContainer: {
				toggleSlideMenuCommand: "onToggleSlideMenuCommand"
			}	
        }
    },
    
    onSlideMenuCommand: function (list, record){
		var id = record.data.itemId;
		var content;
		switch(id){
		case "modules":
			content = 0;
			break;
		case "work":
			content = 1;
			break;
		case "workload":
			content = 2;
			Ext.Function.defer(Ext.Viewport.fireEvent('updateChartDataCommand', this), 500, this);
			break;
		case "calendar":
			content = 3;
			break;
		case "assistent":
			break;
		case "export":
			break;
		}
		
		Ext.Viewport.toggleMenu('left');
		Ext.Viewport.setActiveItem(content);
	},
	
	onToggleSlideMenuCommand: function (){
		if(Ext.Viewport.getMenus().left.isHidden()){
			Ext.Viewport.showMenu('left');
		}else{
			Ext.Viewport.hideMenu('left');
		}
	}
});
