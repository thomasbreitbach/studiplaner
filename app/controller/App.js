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
            viewPort: "viewport"
        },
        control: {
            viewPort: {
                slideMenuCommand: 'onSlideMenuCommand',
                toggleSlideMenuCommand: 'onToggleSlideMenuCommand'
            }	
        }
    },
    
    onSlideMenuCommand: function (list, record){
		var id = record.data.itemId,
			content;
		switch(id){
		case "modules":
			content = 0;
			break;
		case "work":
			content = 1;
			break;
		case "workload":
			content = 2;
			studiplaner.app.getController('Workload').onUpdateChartDataCommand(); 
			break;
		case "calendar":
			content = 3;
			break;
		case "export":
			content = 4;
			studiplaner.app.getController('Export').onGenerateMail(); 
			break;
		case "imprint":
			content = 5;
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
	},
	
	init: function () {
        this.callParent();
    }
});
