/**
 * @author Thomas Breitbach
 */
 Highcharts.setOptions({
	colors: ['#80ba24', ' #4a5c66']
});
 
 Ext.define('studiplaner.view.workload.WorkloadContainer', {
	extend: 'Ext.Container',
	xtype: 'workloadcontainer',

	requires: [
		'Ext.Menu',
		'studiplaner.view.workload.ChartContainer'
	],

  	config: {
		layout: {
        	type: 'fit',
    	},
    	scrollable:'vertical',
    	items: [
			{
        		xtype: "toolbar",
        		docked: "top",
        		itemId: 'topToolbar',
        		cls: 'two-buttons',
        		title: "Workload",
        		items: [
        			{
        				xtype: "button",
        				ui: "action",
        				text: '',
        				iconCls: 'list',
        				itemId: "menuButton"
        			}, {
        				xtype: "spacer"
        			}, {
        				xtype: "button",
        				ui: "action",
        				text: "Verteilung",
        				iconCls: '',
        				itemId: "toggleButton"
        			}
        		]
        	}, {
				xtype: 'chartcontainer',
				itemId: 'chartcontainer'
			}
    	],
    	listeners: [
			{
				delegate: "#menuButton",
        		event: "tap",
        		fn: "onMenuButtonTap"
			}, {
				delegate: "#toggleButton",
        		event: "tap",
        		fn: "onToggleButtonTap"
			}, {
				delegate: '#numberfield_ects',
				event: 'change',
				fn: 'onNumberFieldChange'
			}, {
				delegate: '#numberfield_sws',
				event: 'change',
				fn: 'onNumberFieldChange'
			}
        ]        
  	},

	initialize: function(){
		if(this.down('#chartcontainer').gaugeChart == null ||
			this.down('#chartcontainer').ratioChart == null)
				this.fireEvent('buildChartsCommand', this);
	},
	
	//Listener functions    
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	
	onToggleButtonTap: function () {
        console.log("flipChartCommand");
    	this.fireEvent("flipChartCommand", this);
	},
});
