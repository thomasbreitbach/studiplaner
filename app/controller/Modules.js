/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Modules", {
    extend: "Ext.app.Controller",
    H_PER_ECTS: 30,
	H_PER_SWS: 0.75,
	WEEKS_PER_SEM: 23,
	H_PER_BLOCK: 1.5,
	WORKLOAD_STRING: ' Arbeitsstunden/Woche',
    
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
    	console.log(record);
    	var me = this,
			moduleForm = me.getModuleForm();
    	if(moduleForm.chart == null) moduleForm.chart = me.buildChart();
    	
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
    	var submitButton = moduleForm.down('#addButton'),
			topToolbar = moduleForm.getComponent('topToolbar'),
			bottomToolbar = moduleForm.getComponent('bottomToolbar');
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
    	Ext.Viewport.animateActiveItem(moduleForm, me.slideLeftTransition);
	},
	
	activateModulesList: function () {
	    Ext.Viewport.animateActiveItem(this.getModulesListContainer(), this.slideRightTransition);
	},
	
	setChartData: function(presencePerWeek, selfStudyPerWeek, workloadPerWeek){
		console.log("setChartData: " + presencePerWeek + " " + selfStudyPerWeek + " " + workloadPerWeek);
		var me = this,
			moduleForm = me.getModuleForm();
		//update ratio serie
		moduleForm.chart.get('ratio').setData([
					['Anwesenheit', presencePerWeek],
					['Selbststudium', selfStudyPerWeek]
				], true, false, true);
		//set workload title
		moduleForm.chart.setTitle({
				text: '~' + workloadPerWeek + me.WORKLOAD_STRING,
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
		var me = this;
		var interest = me.getValueForInterestId(interest);	
		var severity = me.getValueForSeverityId(severity);
		
		var workload = Math.round(ects * hPerEcts / weeksPerSem) * interest * severity;
		console.log(workload);
		console.log(Math.round(workload));
		return Math.round(workload);
	},
    
    buildChart: function(){
		var me = this;
		return new Highcharts.Chart({ 
			chart: {
				renderTo: me.getModuleForm().down('#chart').element.dom,
				backgroundColor:'rgba(255, 255, 255, 0.1)',
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			},			
			title: {
				text: '0' + me.WORKLOAD_STRING,
				align: 'center',
				verticalAlign: 'middle',
				y: 85
			},		
			tooltip: {
				pointFormat: 'Anteil: <b>{point.percentage:.1f}%</b><br>' +
							'Absolut: <strong>{point.y:.1f} Std./Woche</strong>'
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
					['Anwesenheit', 1],
					['Selbststudium', 1]
				]
			}]
		});
	},
	
	checkInputVal: function (input, ll, ul) {
		var parsed = parseFloat(input);
		if(isNaN(parsed)) return 0;
		if(parsed < ll || parsed > ul)  return 0;
		return parsed;
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
	    var me = this;
		
	    var moduleForm = me.getModuleForm();
	    var currentModule = moduleForm.getRecord();
	    var scheduleBlocks = currentModule.scheduleBlocks();
	    var store_sb = Ext.getStore("ScheduleBlocks");
	    var newValues = moduleForm.getValues();
	    var updateSheduleBlocks = false;
	    
	    if(newValues.ects != currentModule.get('ects') || 
			newValues.sws != currentModule.get('sws')){
			updateSheduleBlocks = true;
		}

	    // Update the current module's fields with form values.
	    // Hint: SegmentedButton values have been saved on toggle
	    currentModule.set("name", newValues.name);
	    currentModule.set("ects", newValues.ects);
	    currentModule.set("sws", newValues.sws);
	    currentModule.set("workload", moduleForm.workloadPerWeek);
	    currentModule.set("presencePerWeek", moduleForm.presencePerWeek);
	    currentModule.set("selfStudyPerWeek", moduleForm.selfStudyPerWeek);
	
		//Validate!
	    var errors = currentModule.validate();
	    console.log(errors)
	    if (!errors.isValid()) {
			errors.each(function (item, index, length){
				Ext.Msg.alert('Hoppla!', item.getMessage(), Ext.emptyFn);
			});
	        
	        currentModule.reject();
	        return;
	    }
	    
	    if(updateSheduleBlocks){
			//calculate and store schedule blocks
			scheduleBlocks.removeAll(); //TODO https://github.com/thomasbreitbach/studiplaner/issues/9
			var presenceBlocksCount = Math.round(moduleForm.presencePerWeek/me.H_PER_BLOCK);
			var selfStudyBlocksCount = Math.round(moduleForm.selfStudyPerWeek/me.H_PER_BLOCK);
			
			
			for(var i=0;i<presenceBlocksCount;i++){
				scheduleBlocks.add({
					type: 'presence',
					phase1assigendTo: null,
					phase2assigendTo: null,
					phase3assigendTo: null
				});
			}
			for(var i=0;i<selfStudyBlocksCount;i++){
				scheduleBlocks.add({
					type: 'self',
					phase1assigendTo: null,
					phase2assigendTo: null,
					phase3assigendTo: null
				});
			}
		}
		
	    var modulesStore = Ext.getStore("Modules");	
	    if (null == modulesStore.findRecord('id', currentModule.data.id)) {
	        modulesStore.add(currentModule);
	    }	
	    
	    
	    
	    modulesStore.sync();
	    
	    scheduleBlocks.sync();
	    console.log("before sync");
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
	    store_sb.clearFilter();
        store_sb.load();
        studiplaner.app.getController('Schedule').filterBlocksList(0);
	    
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
			fn: function(text, btn) {
				if(text == 'yes'){
					//del related schedule blocks
					scheduleBlocks.removeAll();			
					scheduleBlocks.sync();
					
					//del module
					var modulesStore = Ext.getStore("Modules");		
					modulesStore.remove(currentModule);
					modulesStore.sync();
					
					//load new data
					var store_sb = Ext.getStore("ScheduleBlocks");
					store_sb.load();
						
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
		var me = this;
		var moduleForm = me.getModuleForm();
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
			var interest = moduleForm.down('#interestButton').getPressedButtons()[0].config.value;
			var severity = moduleForm.down('#severityButton').getPressedButtons()[0].config.value;
			var ects = moduleForm.down('#numberfield_ects').getValue();		
			
			if(ects != null){
				workloadPerWeek = me.calculateWorkloadPerWeek(ects, me.H_PER_ECTS, me.WEEKS_PER_SEM, interest, severity);
				moduleForm.workloadPerWeek = workloadPerWeek;
				
				moduleForm.chart.setTitle({
					text: '~' + moduleForm.workloadPerWeek + me.WORKLOAD_STRING,
					align: 'center',
					verticalAlign: 'middle',
					y: 85 
				});
			}
			
			//show info dialog
			var message = me.getMessageForSegmentedButtonId(button.config.value);
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
					},
					showAnimation: {
						duration: 450
					} 
				});	//msg
			}
		}//if calc workload
		
		currentModule.set(attribute, button.config.value);
	},
	
	onNumberFieldChangedCommand: function(moduleForm, field, newValue, oldValue, eOpts){
		console.log("--> onNumberFieldChangedCommand <--");
		var ects = 0;
		var sws = 0;
		var otherField;
		var workloadPerWeek = 0;
		var presencePerWeek = 1;
		var selfStudyPerWeek = 1;
		var me = this;
		
		if(field.getItemId() === 'numberfield_ects'){
			ects = me.checkInputVal(newValue, 0, 50);	
			otherField = moduleForm.down('#numberfield_sws').getValue();
			if(otherField != null) sws =  otherField;
		}else{
			sws = me.checkInputVal(newValue, 0, 50);
			otherField = moduleForm.down('#numberfield_ects').getValue();
			if(otherField != null) ects = otherField;
		}
				
		//calc workload
		if(ects != 0 || sws != 0){
			var interest = moduleForm.down('#interestButton').getPressedButtons()[0].config.value;
			var severity = moduleForm.down('#severityButton').getPressedButtons()[0].config.value;
			console.log(me);
			workloadPerWeek = me.calculateWorkloadPerWeek(ects, me.H_PER_ECTS, me.WEEKS_PER_SEM, interest, severity);
			presencePerWeek = sws * me.H_PER_SWS;
			selfStudyPerWeek = workloadPerWeek - presencePerWeek;
		}		
		
		//set series data
		me.setChartData(presencePerWeek, selfStudyPerWeek, workloadPerWeek);
		
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
    },
    
    init: function () {
        this.callParent();
    }
});
