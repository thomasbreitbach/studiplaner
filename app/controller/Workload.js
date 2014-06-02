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
            workloadContainer: "workloadcontainer",
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
	buildGaugeChart: function(container){
		console.log("buildGaugeChart");
		new Highcharts.Chart({	
			chart: {
				renderTo: this.getWorkloadContainer().down('#gaugechart').element.dom,
				type: 'gauge',
				plotBackgroundColor: null,
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			},
			title: {
				text: ''
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
	
	buildRatioChart: function(container){
		console.log("buildRatioChart");
		return new Highcharts.Chart({
			chart: {
				renderTo: container.down('#ratiochart').element.dom,
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false
			},
			title: {
				text: 'Workload-Verteilung',
				align: 'center',
				verticalAlign: 'middle',
				y: -80
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
				type: 'pie',
				name: 'ratio',
				innerSize: '50%',
				data: [
					['Studium',   45.0],
					['Beruf',       26.8]
				]
			}]
		});
	},
	
	setGaugeChartData: function(presencePerWeek, selfStudyPerWeek, workloadPerWeek){
		console.log("setChartData: " + presencePerWeek + " " + selfStudyPerWeek + " " + workloadPerWeek);
		var moduleForm = this.getWorkloadContainer();
		//update ratio serie
		moduleForm.chart.get('ratio').setData([
					['Anwesenheit', presencePerWeek],
					['Selbststudium', selfStudyPerWeek],
				], true, false, true);
		//set workload title
		moduleForm.chart.setTitle({
				text: '~' + workloadPerWeek + WORKLOAD_STRING,
				align: 'center',
				verticalAlign: 'middle',
				y: 85
		});
	},
	
	//************
	//**COMMANDS**
	//************ 	
    onBuildChartsCommand: function(container){
		console.log("onBuildChartsCommand");
		container.down('#chartcontainer').gaugeChart = this.buildGaugeChart(container);
		container.down('#chartcontainer').ratioChart = this.buildRatioChart(container);
	},
	
	onflipCardCommand: function(container){
		console.log("onflipCardCommand");		
		var chartContainer = container.down('#chartcontainer');
		var toggleButton = container.down('#toggleButton');
		var activeItem = chartContainer.getActiveItem().getItemId();

		switch(activeItem){
		case "gaugechart":
			chartContainer.setActiveItem(1);
			toggleButton.setText("Stunden");
			break;
		case "ratiochart":
			chartContainer.setActiveItem(0);
			toggleButton.setText("Verteilung");
			break;
		}
	},
	
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
