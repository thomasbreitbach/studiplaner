/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Workload", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.controller.App'
    ],
    
    config: {
        refs: {
            workloadContainer: 'workloadcontainer',
            workloadOverviewListContainer: 'workloadoverviewlistcontainer'
        },
        control: {
            workloadContainer: {
            	// The commands fired by the modules list container.
                flipChartCommand: 'onflipCardCommand',
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
						to: 29,
						color: '#DDDF0D' // yellow
					},{
						from: 29,
						to: 40,
						//~ color: '#DDDF0D' // yellow
						color: {
							linearGradient:  { x1: 0, x2: 0, y1: 0, y2: 1 },
							stops: [
								[0, '#55BF3B'], //green
								[1, '#DDDF0D'] //yellow
							]
						}
					}, {
						from: 40,
						to: 51,
						color: {
							linearGradient:  { x1: 0, x2: 0, y1: 0, y2: 1 },
							stops: [
								[0, '#55BF3B'], //green
								[1, '#DF5353'] //red
							]
						}
					}, {
						from: 51,
						to: 80,
						color: '#DF5353' // yellow
				}]        
			},	
			series: [{
				name: 'Workload',
				id: 'workload',
				data: [0],
				dataLabels: false,
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
				text: 'Workload-Verteilung',
				align: 'center',
				verticalAlign: 'top',
				y: 50
			},
			exporting: { enabled: false },
			credits: false,
			tooltip: {
				pointFormat: 'Anteil: <strong>{point.percentage:.1f}%</strong><br>'+
								'Absolut: <strong>{point.y:.1f} Std./Woche</strong>'
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
					['Beruf', job]
				], true, false, true);
	},
	
	setWorkloadInformationTxt: function(workload){
		var wlInfoFs = this.getWorkloadContainer().down('#workloadInfo');
		if(workload >= 0 && workload < 32){ //0 bis 31 zu gering
			wlInfoFs.setHtml("Dein wöchentlicher Workload ist gering. Du könntest etwas mehr tun.");
			wlInfoFs.setStyleHtmlCls(['workload-info-txt', 'workload-low']);
		} else if (workload > 34 && workload < 46){ //35 bis 45 --> gut
			wlInfoFs.setHtml("Dein wöchentlicher Workload liegt in einem guten Bereich!");
			wlInfoFs.setStyleHtmlCls(['workload-info-txt', 'workload-medium']);
		} else if ((workload > 45 && workload < 49) || (workload > 31 && workload < 45)){ 
			wlInfoFs.setHtml("Dein wöchentlicher Workload liegt gerade noch in einem guten Bereich!");
			wlInfoFs.setStyleHtmlCls(['workload-info-txt', 'workload-medium-high']);
		} else if (workload > 48){ //47 bis inf. --> zu hoch
			wlInfoFs.setHtml("Achtung, dein wöchentlicher Workload ist aktuell zu hoch!");
			wlInfoFs.setStyleHtmlCls(['workload-info-txt', 'workload-high']);
		}
	},
	
	//************
	//**COMMANDS**
	//************ 	
    onBuildChartsCommand: function(container){
		this.getWorkloadContainer().down('#chartcontainer').gaugeChart = this.buildGaugeChart();
		this.getWorkloadContainer().down('#chartcontainer').ratioChart = this.buildRatioChart();
	},
	
	onflipCardCommand: function(container){
		var chartContainer = container.down('#chartcontainer'),
			toggleButton = container.down('#toggleButton'),
			activeItem = chartContainer.getActiveItem().getItemId();

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
		var me = this,
			jobWorkload = 0,
			studyWorkload = 0,
			workStore = Ext.getStore("Works"),
			modulesStore = Ext.getStore("Modules"),
			work = workStore.getData().items,
			modules = modulesStore.getData().items;
			
		for(var i=0; i<work.length; i++){
			jobWorkload += work[i].data.workload;
		}	
		for(var i=0; i<modules.length; i++){
			studyWorkload += modules[i].data.workload;
		}
		
		var overallWorkload = jobWorkload+studyWorkload;
		if(overallWorkload < 81) this.setGaugeChartData(overallWorkload);
		else me.setGaugeChartData(80);
		
		if(jobWorkload == 0 && studyWorkload == 0){
			jobWorkload = 1;
			studyWorkload = 1;
		}
		
		me.setRatioChartData(studyWorkload, jobWorkload);
		me.setWorkloadInformationTxt(jobWorkload+studyWorkload);
	},
	
	onOverviewListCommand: function () { 
		overviewListContainer = this.getWorkloadOverviewListContainer();
		Ext.Viewport.animateActiveItem(overviewListContainer, this.slideLeftTransition);
	},
	
	//*********************
	//**OverviewContainer**
	//*********************
	onOverviewListContainerBackCommand: function () {
		workloadContainer = this.getWorkloadContainer();
		Ext.Viewport.animateActiveItem(workloadContainer, this.slideRightTransition);
	},
	onEditListCommand:function () {
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
	},
	onDeleteModuleCommand: function (list, record) {
		var me = this,
			container = me.getWorkloadOverviewListContainer();
		if(container.inEditMode){
			Ext.Msg.show({
				title: 'Modul löschen?',
				message: 'Möchtest du das Modul "' + record.get('name') + '" wirklich löschen?',
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
						//del related schedule blocks	
						record.scheduleBlocks().removeAll();			
						record.scheduleBlocks().sync();
						
						//del module
						var modulesStore = Ext.getStore("Modules");		
						modulesStore.remove(record);
						modulesStore.sync();
						
						//load new data
						var store_sb = Ext.getStore("ScheduleBlocks");
						store_sb.load();
						
						//update workload chart and schedule
						Ext.Viewport.fireEvent('moduleDeleted');
						me.onUpdateChartDataCommand();
					}else{
						return false;
					}
				}
			}, me);
		}	
	},
	onDeleteWorkCommand: function (list, record) {
		console.log("onDeleteWorkCommand");
		var me = this,
			container = me.getWorkloadOverviewListContainer();
			

		if(container.inEditMode){
			Ext.Msg.show({
				title: 'Arbeitsstelle löschen?',
				message: 'Möchtest du die Arbeitsstelle "' + record.get('name') + '" wirklich löschen?',
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
						record.workingTimes().removeAll();
						record.workingTimes().sync();
						
						var workStore = Ext.getStore('Works');		
						workStore.remove(record);
						workStore.sync();
						
						//update workload chart
						me.onUpdateChartDataCommand();
					}else{
						return false;
					}
				}
			}, me);
		}
	},
	
	//------------------------------
    launch: function () {
        this.callParent();
    },    
    init: function () {
        this.callParent();
    }
});
