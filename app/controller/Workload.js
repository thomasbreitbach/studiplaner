/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Workload", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.controller.App',
		'studiplaner.view.workload.OverviewList'
    ],
    
    config: {
        refs: {
            workloadContainer: "workloadcontainer",
            workloadOverviewListContainer: "workloadoverviewlistcontainer"
        },
        control: {
            workloadContainer: {
            	// The commands fired by the modules list container.
                flipChartCommand: "onflipCardCommand",
                buildChartsCommand: 'onBuildChartsCommand',
                updateChartDataCommand: 'onUpdateChartDataCommand',
                overviewListCommand: 'onOverviewListCommand'
            },
			workloadOverviewListContainer: {
				backCommand: 'onOverviewListContainerBackCommand',
				editListCommand: 'onEditListCommand',
				deleteModuleCommand: 'onDeleteModuleCommand',
				deleteWorkCommand: 'onDeleteWorkCommand'
			}     
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
 
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
				text: '0',
				align: 'center',
				verticalAlign: 'middle',
				y: 50,
				style: {
					'fontSize': '35px'
				}
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
					text: 'Arbeitsstunden<br/>pro Woche'
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
				id: 'workload',
				data: [40],
				tooltip: {
					valueSuffix: ' Std./Woche'
				}
			}]
		});
		
	
	},
	
	buildRatioChart: function(){
		console.log("buildRatioChart");
		return new Highcharts.Chart({
			chart: {
				renderTo: this.getWorkloadContainer().down('#ratiochart').element.dom,
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false
			},
			title: {
				text: 'Workload-Verteilung',
				align: 'center',
				verticalAlign: 'top',
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
				type: 'pie',
				name: 'ratio',
				id: 'ratio',
				innerSize: '50%',
				data: [
					['Studium', 1],
					['Beruf', 1]
				]
			}]
		});
	},
	
	setGaugeChartData: function(workloadPerWeek){
		console.log("setGaugeChartData: " + workloadPerWeek);
		var gaugeChart = this.getWorkloadContainer().down('#chartcontainer').gaugeChart;
		//update workload serie
		gaugeChart.get('workload').setData([
				workloadPerWeek
			], true, false, true);
				
		gaugeChart.setTitle({
			text: workloadPerWeek.toString(),
			align: 'center',
			verticalAlign: 'middle',
			y: 65,
			style: {
				'fontSize': '2.0em'
			}
		});
		
	},
	
	setRatioChartData: function(study, job){
		console.log("setRatioChartData: " + study + " " + job);
		//update ratio serie
		this.getWorkloadContainer().down('#chartcontainer').ratioChart.get('ratio').setData([
					['Studium', study],
					['Beruf', job],
				], true, false, true);
	},
	
	//************
	//**COMMANDS**
	//************ 	
    onBuildChartsCommand: function(container){
		console.log("onBuildChartsCommand");
		this.getWorkloadContainer().down('#chartcontainer').gaugeChart = this.buildGaugeChart();
		this.getWorkloadContainer().down('#chartcontainer').ratioChart = this.buildRatioChart();
	},
	
	onflipCardCommand: function(container){
		console.log("onflipCardCommand");		
		var chartContainer = container.down('#chartcontainer');
		var toggleButton = container.down('#toggleButton');
		var activeItem = chartContainer.getActiveItem().getItemId();

		switch(activeItem){
		case "gaugeFieldset":
			chartContainer.setActiveItem(1);
			toggleButton.setText("Stunden");
			break;
		case "ratioFieldset":
			chartContainer.setActiveItem(0);
			toggleButton.setText("Verteilung");
			break;
		}
	},
	
	onUpdateChartDataCommand: function(){
		console.log("onUpdateChartDataCommand");
		var jobWorkload = 0;
		var studyWorkload = 0;
		
		var workStore = Ext.getStore("Work");
		var modulesStore = Ext.getStore("Modules");
		
		var work = workStore.getData().items;
		for(var i=0; i<work.length; i++){
			jobWorkload += work[i].data.workload;
		}	
		
		var modules = modulesStore.getData().items;
		for(var i=0; i<modules.length; i++){
			studyWorkload += modules[i].data.workload;
		}
		
		this.setGaugeChartData(jobWorkload+studyWorkload);
		
		if(jobWorkload == 0 && studyWorkload == 0){
			jobWorkload = 1;
			studyWorkload = 1;
		}
		this.setRatioChartData(studyWorkload, jobWorkload);
	},
	
	onOverviewListCommand: function () { 
		console.log("onOverviewListCommand");
		overviewListContainer = this.getWorkloadOverviewListContainer();
		Ext.Viewport.animateActiveItem(overviewListContainer, this.slideLeftTransition);
	},
	
	//*********************
	//**OverviewContainer**
	//*********************
	onOverviewListContainerBackCommand: function () {
		console.log("onOverviewListContainerBackCommand");
		workloadContainer = this.getWorkloadContainer();
		Ext.Viewport.animateActiveItem(workloadContainer, this.slideRightTransition);
	},
	onEditListCommand:function () {
		console.log("onEditListCommand");
		var container = this.getWorkloadOverviewListContainer(),
			editButton = container.down('#editButton'),
			worklist = container.down('#workList'),
			worklistViewItems = worklist.getViewItems()
			moduleslist = container.down('#modulesList'),		
			moduleslistViewItems = moduleslist.getViewItems();

		if(container.inEditMode){
			//disable edit mode
			container.inEditMode = false;
			worklist.addCls('overview-list-hidden-disclosure');
			moduleslist.addCls('overview-list-hidden-disclosure');
			editButton.removeCls('x-button-pressing');


			for(var i=0; i < worklistViewItems.length; i++){
				worklistViewItems[i].innerHtmlElement.dom.children[0].children[1].className += " list-item-workload-nopad";
			}		
			for(var i=0; i < moduleslistViewItems.length; i++){
				moduleslistViewItems[i].innerHtmlElement.dom.children[0].children[1].className += " list-item-workload-nopad";
			}		
		}else{		
			//enable edit mode
			container.inEditMode = true;
			worklist.removeCls('overview-list-hidden-disclosure');
			moduleslist.removeCls('overview-list-hidden-disclosure');
			editButton.addCls('x-button-pressing');		
			
			for(var i=0; i < worklistViewItems.length; i++){
				worklistViewItems[i].innerHtmlElement.dom.children[0].children[1].className = "list-item-workload";
			}
			for(var i=0; i < moduleslistViewItems.length; i++){
				moduleslistViewItems[i].innerHtmlElement.dom.children[0].children[1].className = "list-item-workload";
			}		
		}
		console.log(container.inEditMode);
	},
	onDeleteModuleCommand: function (list, record) {
		console.log("onDeleteModuleCommand");
		var container = this.getWorkloadOverviewListContainer();
		if(container.inEditMode){
			Ext.Msg.show({
				title: 'Modul löschen?',
				message: 'Möchtest du das Modul "' + record.data.name + '" wirklich löschen?',
				buttons: [{
					itemId: 'no',
					text: 'Nein',
					ui: 'action'
				}, {
					itemId: 'yes',
					text: 'Ja',
					ui: 'action'
				}],		
				fn: function(text,btn) {
					if(text == 'yes'){
						var modulesStore = Ext.getStore("Modules");		
						modulesStore.remove(record);
						modulesStore.sync();
						
						studiplaner.app.getController('Workload').onUpdateChartDataCommand(); 
					}else{
						return false;
					}
				}
			});
		}	
	},
	onDeleteWorkCommand: function (list, record) {
		console.log("onDeleteWorkCommand");
		var container = this.getWorkloadOverviewListContainer();

		if(container.inEditMode){
			Ext.Msg.show({
				title: 'Arbeitsstelle löschen?',
				message: 'Möchtest du die Arbeitsstelle "' + record.data.name + '" wirklich löschen?',
				buttons: [{
					itemId: 'no',
					text: 'Nein',
					ui: 'action'
				}, {
					itemId: 'yes',
					text: 'Ja',
					ui: 'action'
				}],		
				fn: function(text,btn) {
					if(text == 'yes'){
						var workStore = Ext.getStore("Work");		
						workStore.remove(record);
						workStore.sync();
						
						studiplaner.app.getController('Workload').onUpdateChartDataCommand();  
					}else{
						return false;
					}
				}
			});
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
