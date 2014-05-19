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
            ViewPort: "viewport"
        },
        control: {
            ViewPort: {
            	// The commands fired by the sliding menu
                slideMenuCommand: "onSlideMenuCommand"
            }
        }
    },
    
    onSlideMenuCommand: function (list, record){
		console.log(record);
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
	}
});
