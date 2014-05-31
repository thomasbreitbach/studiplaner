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
	],
	  
  	config: {
		layout: {
        	type: 'fit',
    	}
  	},

	initialize: function(){
		var menuButton = {
            xtype: "button",
        	iconCls: 'list',
        	ui: 'action',
        	handler: this.onMenuButtonTap,
        	scope: this
		};
		var toggleButton = {
            xtype: "button",
        	iconCls: '',
        	ui: 'action',
        	text: 'Verteilung',
        	handler: this.onToggleButtonTap,
        	scope: this
		};
		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Workload',
		    docked: "top",
		    items: [
				menuButton,
		        { xtype: 'spacer' },
		        toggleButton
		    ]
		};
		
		var chartContainer = {
			xtype: 'chartcontainer'
		}
		
		this.fireEvent('buildCharts', this);
		
		this.add([topToolbar, chartContainer]);
	},
	
	//Listener functions    
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
	
	onToggleButtonTap: function () {
        console.log("flipChartCommand");
    	this.fireEvent("flipChartCommand", this);
	}
});
