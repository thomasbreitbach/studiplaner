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
		scheduleBlockId: null,
  	},
  	
  	initialize: function(){
		this.callParent(arguments);
		
		if(this.getType() === 'presence'){
			this.setStyle('background-color: rgba(128, 186, 36, 0.8);');
		}else{
			this.setStyle('background-color: rgba(72, 92, 102, 0.8);');
		}
		
		var content = '<h4>' + this.getName() + '</h4>';
		var typ = (this.getType() === 'self') ? "Selbststudium" : "Anwesenheit";
		content += '<p class="schedule-block-type">' + typ + '</p>'; 
						
		this.setHtml(content);
	}
});
