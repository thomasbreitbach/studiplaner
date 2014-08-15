/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.schedule.ScheduleBlock', {
	extend: 'Ext.Container',
	xtype: 'scheduleblock',
	  
  	config: {
		layout: 'fit',
		cls: 'schedule-block',
		style: 'backrgound-color',
		name: null,
		type: null,
		scheduleBlockId: null
  	},
  	
  	initialize: function(){
		var me = this;
		me.callParent(arguments);
		
		if(me.getType() === 'presence'){
			me.setStyle('background-color: rgba(128, 186, 36, 0.8);');
		}else{
			me.setStyle('background-color: rgba(72, 92, 102, 0.8);');
		}
		
		var content = '<h1>' + me.getName() + '</h1>';
		var typ = (me.getType() === 'self') ? "Selbststudium" : "Anwesenheit";
		content += '<p class="schedule-block-type">' + typ + '</p>'; 
						
		me.setHtml(content);
	}
});
