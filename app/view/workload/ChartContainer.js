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
				xtype: 'panel',
				title: 'gauge',
				itemId: 'gaugechart',
				width: '100%',
				height: '100%',
				margin: '-45px 0 20px 0'
			}, {
				xtype: 'panel',
				title: 'ratio',
				itemId: 'ratiochart',
				width: '100%',
				height: '110%',
				margin: '-85px 0 20px 0'
				
			}
    	]
  	}
});
