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
    	}
  	},

	initialize: function(){	
		var gauge = {
			xtype: 'panel',
			title: 'gauge',
			itemId: 'gaugechart',
			width: '95%',
			height: '300px',
		};
		var ratio = {
			xtype: 'panel',
			title: 'ratio',
			itemId: 'ratiochart',
			width: '95%',
			height: '300px',
		}
	
		this.add([gauge, ratio]);
	}
});
