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
				items: [{
						xtype: 'panel',
						title: 'gauge',
						itemId: 'gaugechart',
						width: (96*window.innerWidth)/100,
						height: (65*window.innerHeight)/100
						//~ margin: '-45px 0 20px 0'
					}
				]
			}, {
				xtype: 'fieldset',
				itemId: 'ratioFieldset',
				items: [{
						xtype: 'panel',
						title: 'ratio',
						itemId: 'ratiochart',
						width: (96*window.innerWidth)/100,
						height: (65*window.innerHeight)/100
						//~ margin: '-85px 0 20px 0'
					}	
				]
			}
    	]
  	}
});
