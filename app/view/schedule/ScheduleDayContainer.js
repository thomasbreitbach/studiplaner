/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleDayContainer', {
	extend: 'Ext.Container',
	xtype: 'scheduledaycontainer',
	times: ['8:00 - 9:30',  '9:45 - 11:15', '11:30 - 13:00', '14:00 - 15:30', '15:40 - 17:10', '17:20 - 18:50', '19:00 - 20:30'],
	name: null,
	phaseId: null,
	weekdayId: null,
	blockCls: null,

	requires: [
		'Ext.Menu',
		'Ext.dataview.List'
	],
	  
  	config: {
		scrollable: 'vertical',		
		layout: {
        	type: 'vbox',
        	align: 'center'
    	}
  	},

  	initialize: function(){
		this.callParent(arguments);
		var header = {
			xtype: 'container',
			html: '<div class="schedule-weekday-header">' + this.name + '</div>',
            height: 40
		}
		
		var array = new Array();
		array[0] = header;
		
		for(var i=0; i<this.times.length; i++){
			array[i+1] = {
				xtype: 'container',
				itemId: this.getItemId() +'-blockId-' +i,
				phaseId: this.phaseId,
				weekdayId: this.weekdayId,
				blockId: i,
				name: this.name + ' - ' + (i+1) + '. Block (' + this.times[i] + ')',
				height: 100,
				width: '100%',
				cls: this.blockCls,
				html: '<span class="schedule-block-time">' + this.times[i] + '</span>',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				listeners: [
					{
						element: 'element',
						event: 'longpress',
						fn: this.onBlockLongPress,
						scope: this
					}
				]
			}
		}
		this.add(array);
	},
	
	onBlockLongPress: function (event, container, options, eOpts) {
		console.log("onBlockLongPress");
		var id = eOpts.firingArguments[0].delegatedTarget.id; //find container id
		var pressedContainer = Ext.getCmp(id);
		this.fireEvent("blockLongPressCommand", this, pressedContainer);
	}
});
