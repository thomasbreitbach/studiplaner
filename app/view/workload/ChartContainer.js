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
						width: '96%',
						height: '340px'
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
						width: '96%',
						height: '340px',
						//~ margin: '-85px 0 20px 0'
					}	
				]
			}
    	]
  	}
});
