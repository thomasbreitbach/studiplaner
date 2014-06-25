/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Schedule", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.form.ModuleForm'
    ],
    
    config: {
        refs: {
            scheduleContainer: "schedulecontainer"
        },
        control: {
            scheduleContainer: {
            	// The commands fired by the schedule container.
                toggleModulesMenuCommand: "onToggleModulesMenuCommand"
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    
    //***********
    //**HELPER***
    //***********
    activateModuleForm: function (record) {
    	console.log("activateModuleForm");
    	var moduleForm = this.getModuleForm();
    	if(moduleForm.chart == null) moduleForm.chart = this.buildChart();
    	
    	//set form fields
    	moduleForm.setRecord(record);
    	
    	//set typeButton	
    	var typeButton = moduleForm.down('#typeButton');
    	typeButton.setPressedButtons([record.data.type]);
    	
    	//set interestButton
    	var interestButton = moduleForm.down('#interestButton');
    	interestButton.setPressedButtons([record.data.interest]);

		//set severityButton
    	var severityButton = moduleForm.down('#severityButton');
    	severityButton.setPressedButtons([record.data.severity]);   	
    	
    	//Change behaviour in edit mode
    	var submitButton = moduleForm.down('#addButton');
    	var topToolbar = moduleForm.getComponent('topToolbar');
    	var bottomToolbar = moduleForm.getComponent('bottomToolbar');
    	if(record.data.name.length > 0){
			//edit mode
			submitButton.setText("Ändern");
			topToolbar.setTitle(record.data.name);
			bottomToolbar.show();
		}else{
			//new mode
			submitButton.setText("Hinzufügen");
			topToolbar.setTitle("Neues Modul");
			bottomToolbar.hide();
		}
		
    	Ext.Viewport.animateActiveItem(moduleForm, this.slideLeftTransition);
	},
	
	activateModulesList: function () {
		console.log("activateModulesList");
	    Ext.Viewport.animateActiveItem(this.getModulesListContainer(), this.slideRightTransition);
	},
	
	setChartData: function(presencePerWeek, selfStudyPerWeek, workloadPerWeek){
		console.log("setChartData: " + presencePerWeek + " " + selfStudyPerWeek + " " + workloadPerWeek);
		var moduleForm = this.getModuleForm();
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
	
	calculateWorkloadPerWeek: function(ects, hPerEcts, weeksPerSem, interest, severity) {
		switch(interest){
		case 0:
			interest = 0.9;
			break;
		case 1:
			break;
		case 2:
			interest = 1.1;
			break;
		}
		
		switch(severity){
		case 0:
			severity = 0.9;
			break;
		case 1:
			break;
		case 2:
			severity = 1.1;
			break;
		}
		
		var workload = (ects * hPerEcts / weeksPerSem) * interest * severity;
		console.log(workload);
		console.log(Math.round(workload));
		return Math.round(workload);
	},
    
    buildChart: function(){
		return new Highcharts.Chart({ 
			chart: {
				renderTo: this.getModuleForm().down('#chart').element.dom,
				backgroundColor:'rgba(255, 255, 255, 0.1)',
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			},			
			title: {
				text: '0' + WORKLOAD_STRING,
				align: 'center',
				verticalAlign: 'middle',
				y: 85
			},		
			tooltip: {
				pointFormat: 'Anteil: <b>{point.percentage:.1f}%</b>'
			},			
			exporting: { enabled: false },
			credits: false,			
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
				id: 'ratio',
				name: 'Ratio Anwesenheit/Selbststudium',
				innerSize: '50%',
				data: [
					['Anwesenheit',   1],
					['Selbststudium',       1],
				]
			}]
		});
	},
    
    //*************
    //**COMMANDS***
    //*************
    onToggleModulesMenuCommand: function () {
		console.log("onToggleModulesMenuCommand");
		if(Ext.Viewport.getMenus().right.isHidden()){
			Ext.Viewport.showMenu('right');
		}else{
			Ext.Viewport.hideMenu('right');
		}
	},

    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Modules");
        store.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
