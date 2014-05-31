/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Workload", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
    ],
    
    config: {
        refs: {
            workListContainer: "workloadcontainer"
        },
        control: {
            workloadContainer: {
            	// The commands fired by the modules list container.
                flipChartCommand: "onflipCardCommand",
                buildChartsCommand: 'onBuildChartsCommand'
            }            
        }
    },

    
    //************
	//**HELPER**
	//************
	buildGaugeChart: function(){
		return new Highcharts.Chart({	
			chart: {
				renderTo: this.getWorkloadContainer().down('#gaugechart').element.dom,
				type: 'gauge',
				plotBackgroundColor: null,
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			},
			title: {
				text: 'Speedometer'
			},
			exporting: { enabled: false },
			credits: false,	
			pane: {
				startAngle: -150,
				endAngle: 150,
				background: [{
					backgroundColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, '#FFF'],
							[1, '#333']
						]
					},
					borderWidth: 0,
					outerRadius: '109%'
				}, {
					backgroundColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, '#333'],
							[1, '#FFF']
						]
					},
					borderWidth: 1,
					outerRadius: '107%'
				}, {
					// default background
				}, {
					backgroundColor: '#DDD',
					borderWidth: 0,
					outerRadius: '105%',
					innerRadius: '103%'
				}]
			},
			   
			// the value axis
			yAxis: {
				min: 0,
				max: 80,
				
				minorTickInterval: 'auto',
				minorTickWidth: 1,
				minorTickLength: 10,
				minorTickPosition: 'inside',
				minorTickColor: '#666',
		
				tickPixelInterval: 30,
				tickWidth: 2,
				tickPosition: 'inside',
				tickLength: 10,
				tickColor: '#666',
				labels: {
					step: 2,
					rotation: 'auto'
				},
				title: {
					text: 'Arbeiststunden<br/>pro Woche'
				},
				plotBands: [{
					from: 0,
					to: 35,
					color: '#DDDF0D' // yellow
				}, {
					from: 35,
					to: 45,
					color: '#55BF3B' // green
				}, {
					from: 45,
					to: 80,
					color: '#DF5353' // red
				}]        
			},
		
			series: [{
				name: 'Workload',
				data: [40],
				tooltip: {
					valueSuffix: ' Std./Woche'
				}
			}]
		
		});
	},
	
	buildRatioChart: function(){
		return new Highcharts.Chart({
			chart: {
				renderTo: this.getWorkloadContainer().down('#ratiochart').element.dom,
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false
			},
			title: {
				text: 'Workload-<br/>Verteilung',
				align: 'center',
				verticalAlign: 'middle',
				y: 50
			},
			exporting: { enabled: false },
			credits: false,
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: true,
						distance: -50,
						style: {
							fontWeight: 'bold',
							color: 'white',
							textShadow: '0px 1px 2px black'
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
			series: [{
				type: 'ratio',
				name: 'Arbeitstunden',
				innerSize: '50%',
				data: [
					['Studium',   45.0],
					['Beruf',       26.8]
				]
			}]
		});
	},
	
	//************
	//**COMMANDS**
	//************ 	
    onBuildChartsCommand: function(){
		this.buildGaugeChart();
		this.buildRatioChart();
	}
	
	//------------------------------
    launch: function () {
        this.callParent();
        console.log("launch");
    },    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
