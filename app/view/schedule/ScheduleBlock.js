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
			this.setStyle('background-color: rgba(128,186,36, 0.5');
		}else{
			this.setStyle('background-color: rgba(72,92,102, 0.5');
		}
		
		var content = '<p>Name: ' + this.getName() + '</p>' +
						'<p>Typ: ' + this.getType() + '</p>'; 
						
						
		
		this.setHtml(content);
	}
});
