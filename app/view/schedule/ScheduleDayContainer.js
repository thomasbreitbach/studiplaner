/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleDayContainer', {
	extend: 'Ext.Container',
	xtype: 'scheduledaycontainer',
	blocks: ['8:00 - 9:30',  '9:45 - 11:15', '11:30 - 13:00', '14:00 - 15:30', '15:40 - 17:10', '17:20 - 18:50', '19:00 - 20:30'],
	name: null,
	id: null,

	requires: [
		'Ext.Menu',
		'Ext.dataview.List'
	],
	  
  	config: {
		scrollable: 'vertical',
		layout: {
        	type: 'fit'
    	}
  	},

  	initialize: function(){
		this.callParent(arguments);
		
		var header = {
			html: '<div class="schedule-weekday-header">' + this.name + '</div>',
            height: 40
		}
		
		var array = new Array();
		array[0] = header;
		//~ for(var i=0; i<this.blocks.length; i++){
			//~ array[i+1] = {
				//~ html: this.blocks[i]
			//~ }
		//~ }
		this.add(array);
	}
});
