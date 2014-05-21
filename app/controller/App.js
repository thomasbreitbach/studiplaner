/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.controller.App', {
  extend: 'Ext.app.Controller',
  
  requires: [
		'studiplaner.view.SlideMenu'
  ],
  
  config: {
        refs: {
            viewPort: "viewport",
            modulesListContainer: "moduleslistcontainer",
            workListContainer: "worklistcontainer",
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
			}
        }
    },
    
    onSlideMenuCommand: function (list, record){
		var id = record.data.itemId;
		var content;
		switch(id){
		case "modules":
			content = {xtype: "moduleslistcontainer"};
			break;
		case "work":
			content = {xtype: "worklistcontainer"};
			break;
		case "workload":
			break;
		case "calendar":
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
