/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleMenu', {
	xtype: 'slidemenu',
	singleton: true,
	requires: ['Ext.Menu'],

	constructor: function(config) {
		this.initConfig(config);
	},
	
	setMenu: function (){	
		Ext.Viewport.setMenu(this.createMenu('right'), {
			side: 'right',
			cover: false
		})
	},

    createMenu: function(side){
        var blocksContainer = Ext.create('Ext.Container', {
			//~ xtype: 'container',
			itemId: 'blocksContainer',
			width: 250,
			scrollable: 'vertical',
			layout: {
				type: 'vbox',
				align: 'center'
			}
		});
		
		blocksContainer.add([{
			xtype: 'container',
			width: 200,
			height: 100,
			layout: {
				type: 'hbox',
				align: 'center'
			},
			draggable: {
				direction: 'both',
			},
			html: '<p>Blaaap</p>',
			style: 'background-color: white'
		}]);
		
        return Ext.create('Ext.Menu', {
            style: 'padding: 0',
            items: [blocksContainer]
        });
    },
    
    //~ onListItemTap: function (list, index, target, record, evt, options){
		//~ Ext.Viewport.fireEvent('slideMenuCommand', this, record);
	//~ }
});
