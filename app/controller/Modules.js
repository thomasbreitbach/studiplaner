/**
 * @author Thomas Breitbach
 */
const H_PER_ECTS = 25;
const H_PER_SWS = 0.75;
const WEEKS_PER_SEM = 17;
const H_PER_BLOCK = 1.5;
const WORKLOAD_STRING = ' Arbeitsstunden/Woche';

Ext.define("studiplaner.controller.Modules", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.form.ModuleForm'
    ],
    
    config: {
        refs: {
            modulesListContainer: "moduleslistcontainer",
            moduleForm: "moduleform"
        },
        control: {
            modulesListContainer: {
            	// The commands fired by the modules list container.
                newModuleCommand: "onNewModuleCommand",
                editModuleCommand: "onEditModuleCommand"
                // swipeNoteCommand: "onSwipeNoteCommand"
            },
            moduleForm: {
		        saveModuleCommand: "onSaveModuleCommand",
		        deleteModuleCommand: "onDeleteModuleCommand",
		        backToHomeCommand: "onBackToHomeCommand",
		        segmentedButtonCommand: "onSegmentedButtonCommand",
		        numberFieldChangedCommand: "onNumberFieldChangedCommand"
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
		
		moduleForm.getScrollable().getScroller().scrollToTop();
    	Ext.Viewport.animateActiveItem(moduleForm, this.slideLeftTransition);
	},
	
	activateModulesList: function () {
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
	
	getValueForInterestId: function (interest) {
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
		return interest;
	},
	
	getValueForSeverityId: function (severity) {
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
		return severity;
	},
	
	getMessageForSegmentedButtonId: function (id){
		var message = 'Durch deine Wahl hast du den Workload für dieses Modul ';
		switch(id){
		case 0:
			message += 'um 10% verringert.';
			break;
		case 1:
			message += 'nicht beeinflusst.';
			break;
		case 2:
			message += 'um 10% erhöht.';
			break;
		}
		return message;		
	},
	
	calculateWorkloadPerWeek: function(ects, hPerEcts, weeksPerSem, interest, severity) {
		var interest = this.getValueForInterestId(interest);	
		var severity = this.getValueForSeverityId(severity);
		
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
    onNewModuleCommand: function () {
	    console.log("onNewModuleCommand");
	    var newModule = Ext.create("studiplaner.model.Module", {
	        type: 0,
	        name: "",
	        ects: null,
	        sws: null,
	        workload: null,
	        interest: 1,
	        severity: 1
	    });
	    this.activateModuleForm(newModule);
	},
	
    onEditModuleCommand: function (list, record) {
        console.log("onEditModuleCommand");
        this.activateModuleForm(record);
    },
    
    onSaveModuleCommand: function () {
	    console.log("onSaveModuleCommand");
		
	    var moduleForm = this.getModuleForm();
	    var currentModule = moduleForm.getRecord();
	    var scheduleBlocks = currentModule.scheduleBlocks();
	    var store_sb = Ext.getStore("ScheduleBlocks");
	    var newValues = moduleForm.getValues();

	    // Update the current module's fields with form values.
	    // Hint: SegmentedButton values are saved on toggle
	    currentModule.set("name", newValues.name);
	    currentModule.set("ects", newValues.ects);
	    currentModule.set("sws", newValues.sws);
	    currentModule.set("workload", moduleForm.workloadPerWeek);
	    currentModule.set("presencePerWeek", moduleForm.presencePerWeek);
	    currentModule.set("selfStudyPerWeek", moduleForm.selfStudyPerWeek);
	
		//Validate!
	    var errors = currentModule.validate();
	    if (!errors.isValid()) {
	        Ext.Msg.alert('Hoppla!', errors.getByField("name")[0].getMessage(), Ext.emptyFn);
	        currentModule.reject();
	        return;
	    }
	    
	    //calculate and store schedule blocks
	    scheduleBlocks.removeAll(); //TODO Performance!
	    var presenceBlocksCount = moduleForm.presencePerWeek/H_PER_BLOCK;
	    var selfStudyBlocksCount = moduleForm.selfStudyPerWeek/H_PER_BLOCK;
	    
	    for(var i=0;i<presenceBlocksCount;i++){
			scheduleBlocks.add({
				type: 'presence',
				phase1assigendTo: null,
				phase2assigendTo: null,
				phase3assigendTo: null,
				module_id: currentModule.get('id')
			});
		}
		for(var i=0;i<selfStudyBlocksCount;i++){
			scheduleBlocks.add({
				type: 'self',
				phase1assigendTo: null,
				phase2assigendTo: null,
				phase3assigendTo: null,
				module_id: currentModule.get('id')
			});
		}
		
	    var modulesStore = Ext.getStore("Modules");	
	    if (null == modulesStore.findRecord('id', currentModule.data.id)) {
	        modulesStore.add(currentModule);
	    }	
	    
	    modulesStore.sync();
	    scheduleBlocks.sync();
	    /*
	     * Important!
	     * Load new data into ScheduleBlocks-Store
	     * to see all data in studiplaner.view.schedule.BlocksList
	     * 
	     * The use of scheduleBlocks.sync(); alone doesn't work
	     * because scheduleBlocks is another store instance which holds 
	     * only blocks of the current module and does not 
	     * have any connection to the list.
	     */
        store_sb.load();
	    
	    this.activateModulesList();
	},
	
	onDeleteModuleCommand: function () {
		var moduleForm = this.getModuleForm();
		var currentModule = moduleForm.getRecord();
		var scheduleBlocks = currentModule.scheduleBlocks();
		var controller = this;
		
		Ext.Msg.show({
			title: 'Modul löschen?',
			message: 'Möchtest du das Modul "' + currentModule.data.name + '" wirklich löschen?',
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
					scheduleBlocks.removeAll();
					scheduleBlocks.sync();
					//del module
					var modulesStore = Ext.getStore("Modules");		
					modulesStore.remove(currentModule);
					modulesStore.sync();
						
					controller.activateModulesList();
				}else{
					return false;
				}
			}
		});
	},
	
	onBackToHomeCommand: function () {
		this.activateModulesList();
	},
	
	onSegmentedButtonCommand: function (form, container, button) {
		console.log('onSegmentedButtonCommand');

		var moduleForm = this.getModuleForm();
		var currentModule = moduleForm.getRecord();
		
		var segmentedButton = container.getItemId();
		var attribute;
		switch(segmentedButton){
			case "typeButton":
				console.log("typeButton");
				attribute = "type";
				break;
			case "interestButton":
				console.log("interestButton");
				attribute = "interest";
				break;
			case "severityButton":
				console.log("severityButton");
				attribute = "severity";
				break;
		}	
		
		//calc workload
		if(attribute == "interest" || attribute == "severity"){
			var interest = moduleForm.down('#interestButton').getPressedButtons()[0].value;
			var severity = moduleForm.down('#severityButton').getPressedButtons()[0].value;
			var ects = moduleForm.down('#numberfield_ects').getValue();		
			if(ects != null){
				workloadPerWeek = this.calculateWorkloadPerWeek(ects, H_PER_ECTS, WEEKS_PER_SEM, interest, severity);
				moduleForm.workloadPerWeek = workloadPerWeek;
				
				moduleForm.chart.setTitle({
					text: '~' + workloadPerWeek + WORKLOAD_STRING,
					align: 'center',
					verticalAlign: 'middle',
					y: 85 
				});
			}
			
			//show info dialog
			var message = this.getMessageForSegmentedButtonId(button.value);
			console.log(localStorage.show_workload_info);
			if(typeof localStorage.show_workload_info == 'undefined'){
				Ext.Msg.show({
					title:    'Info', 
					message:	message +  
								'<br/><br/><input type="checkbox" id="show_workload_info" /> Nicht wieder anzeigen!',
					buttons:  Ext.Msg.OK,
					fn: function(btn) {
						if( btn == 'ok') {
							if (Ext.get('show_workload_info').dom.checked){
								//do not show again
								localStorage.show_workload_info = false;
							}
						}
					}
				});	//msg
			}
		}//if calc workload
		
		currentModule.set(attribute, button.value);
	},
	
	onNumberFieldChangedCommand: function(moduleForm, field, newValue, oldValue, eOpts){
		console.log("--> onNumberFieldChangedCommand <--");
		var ects = 0;
		var sws = 0;
		var otherField;
		var workloadPerWeek = 0;
		var presencePerWeek = 1;
		var selfStudyPerWeek = 1;
		
		if(field.getItemId() === 'numberfield_ects'){
			if(newValue != "") ects = parseInt(newValue);	
			otherField = moduleForm.down('#numberfield_sws').getValue();
			if(otherField != null) sws =  otherField;
		}else{
			if(newValue != "") sws = parseInt(newValue);
			otherField = moduleForm.down('#numberfield_ects').getValue();
			if(otherField != null) ects = otherField;
		}
				
		//calc workload
		if(ects != 0 || sws != 0){
			var interest = moduleForm.down('#interestButton').getPressedButtons()[0].value;
			var severity = moduleForm.down('#severityButton').getPressedButtons()[0].value;
			
			workloadPerWeek = this.calculateWorkloadPerWeek(ects, H_PER_ECTS, WEEKS_PER_SEM, interest, severity);
			presencePerWeek = sws * H_PER_SWS;
			selfStudyPerWeek = workloadPerWeek - presencePerWeek;
		}		
		
		//set series data
		this.setChartData(presencePerWeek, selfStudyPerWeek, workloadPerWeek);
		
		//store workload
		moduleForm.workloadPerWeek = workloadPerWeek;
		moduleForm.selfStudyPerWeek = selfStudyPerWeek;
		moduleForm.presencePerWeek = presencePerWeek;	
	},

    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Modules");
        store.load();
        var store_sb = Ext.getStore("ScheduleBlocks");
        store_sb.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
