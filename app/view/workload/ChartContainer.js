/**
 * @author Thomas Breitbach
 */
 Ext.define('studiplaner.view.workload.ChartContainer', {
	extend: 'Ext.Container',
	xtype: 'chartcontainer',
	gaugeChart: null,
	ratioChart: null,
	  
  	config: {
		layout: {
			type: 'card',
			animation: 'flip'
		},
	
    	items: [
			{
				xtype: 'fieldset',
				itemId: 'gaugeFieldset',
				margin: '0.5em 0.5em 0.2em 0.5em',
				items: [{
						xtype: 'panel',
						title: 'gauge',
						itemId: 'gaugechart',
						width: (96*window.innerWidth)/100,
						height: (65*window.innerHeight)/100,
						margin: '0 auto 0 auto'
					}
				]
			}, {
				xtype: 'fieldset',
				itemId: 'ratioFieldset',
				margin: '0.5em 0.5em 0.2em 0.5em',
				items: [{
						xtype: 'panel',
						title: 'ratio',
						itemId: 'ratiochart',
						width: (96*window.innerWidth)/100,
						height: (65*window.innerHeight)/100,
						margin: '0 auto 0 auto'
					}	
				]
			}
    	]
  	},
  	
  	initialize: function () {
        // Add a Listener. Listen for [Viewport ~ Orientation] Change.
        //~ Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 100 });
        this.callParent(arguments);
    },
    
    //~ handleOrientationChange: function(){
        //~ console.log('handleOrientationChange');
        //~ // Execute the code that needs to fire on Orientation Change.
        //~ var me = this,
			//~ gaugeChart = me.down('#gaugechart'),
			//~ ratioChart = me.down('#ratiochart'),
			//~ percent96 = (80*window.innerWidth)/100,
			//~ percent65 = (30*window.innerWidth)/100;
			//~ 
//~ 
		//~ gaugeChart.setHeight(percent65);
//~ 
		//~ ratioChart.setHeight(percent65);
    //~ }
});
