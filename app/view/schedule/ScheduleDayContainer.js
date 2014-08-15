/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleDayContainer', {
	extend: 'Ext.Container',
	xtype: 'scheduledaycontainer',
	

	requires: [
		'Ext.Menu',
		'Ext.dataview.List'
	],
	  
  	config: {
		scrollable: 'vertical',		
		layout: {
        	type: 'vbox',
        	align: 'center'
    	},
    	times: ['8:00 - 9:30',  '9:45 - 11:15', '11:30 - 13:00', '14:00 - 15:30', '15:40 - 17:10', '17:20 - 18:50', '19:00 - 20:30'],
		name: null,
		phaseId: null,
		weekdayId: null,
		blockCls: null,
  	},

  	initialize: function(){
		var me = this;
		me.callParent(arguments);
		var header = {
			xtype: 'container',
			html: '<div class="schedule-weekday-header">' + me.getName() + '</div>',
            height: 40
		}
		
		var array = new Array();
		array[0] = header;
		
		for(var i=0; i<me.getTimes().length; i++){
			array[i+1] = {
				xtype: 'container',
				itemId: me.getItemId() +'-blockId-' +i,
				phaseId: me.getPhaseId(),
				weekdayId: me.getWeekdayId(),
				blockId: i,
				name: me.getName() + ' - ' + (i+1) + '. Block (' + me.getTimes()[i] + ')',
				height: 100,
				width: '100%',
				cls: me.getBlockCls(),
				html: '<span class="schedule-block-time">' + me.getTimes()[i] + '</span>',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				listeners: [
					{
						element: 'element',
						event: 'tap',
						//~ event: 'longpress',
						fn: me.onBlockTap,
						scope: me
					}
				]
			}
		}
		me.add(array);
	},
	
	//~ onBlockLongPress: function (event, container, options, eOpts) {
		//~ console.log("onBlockLongPress");
		//~ var id = eOpts.firingArguments[0].delegatedTarget.id; //find container id
		//~ var pressedContainer = Ext.getCmp(id);
		//~ this.fireEvent("blockLongPressCommand", this, pressedContainer);
	//~ },
	
	onBlockTap: function (event, container, options, eOpts) {
		console.log("onBlockTap");
		var id = eOpts.firingArguments[0].delegatedTarget.id; //find container id
		var pressedContainer = Ext.getCmp(id);
		this.fireEvent("blockLongPressCommand", this, pressedContainer);
	}
});
