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
    	
    	var typeButton = moduleForm.down('#typeButton'),
			interestButton = moduleForm.down('#interestButton'),
			severityButton = moduleForm.down('#severityButton');
    	
    	typeButton.setPressedButtons([record.data.type]);
    	interestButton.setPressedButtons([record.data.interest]);
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
	
	activateModulesList: function (deletedBlocks) {
	    Ext.Viewport.animateActiveItem(this.getModulesListContainer(), this.slideRightTransition);
	    
	    if(deletedBlocks){
			Ext.Msg.alert(
				'Änderung im Stundenplan!', "Auf Grund der Moduländerungen musste(n) " + 
				deletedBlocks + 
				" zugewiesene(s) Modul(e) im Stundenplan gelöscht werde.",
				Ext.emptyFn
			);
		}
	},
	
	setChartData: function(presencePerWeek, selfStudyPerWeek, workloadPerWeek){
		console.log("setChartData: " + presencePerWeek + " " + selfStudyPerWeek + " " + workloadPerWeek);
		var me = this,
			mf = me.getModuleForm();
		//update ratio serie
		mf.chart.get('ratio').setData([
					['Anwesenheit', presencePerWeek],
					['Selbststudium', selfStudyPerWeek]
				], true, false, true);
		//set workload title
		mf.chart.setTitle({
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
		var me = this,
			interest = me.getValueForInterestId(interest),
			severity = me.getValueForSeverityId(severity),
			workload = Math.round(ects * hPerEcts / weeksPerSem) * interest * severity;
		console.log("Workload: " + workload);
		console.log("Workload (round): " + Math.round(workload));
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
				text: '0' + this.WORKLOAD_STRING,
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
	
	getValue: function (id, item){
		var mf = this.getModuleForm();
		if(item == 'field')
			return mf.down(id).getValue();
		if(item == 'segButton')
			return mf.down(id).getPressedButtons()[0].config.value;
	},
	
	generateScheduleBlocks: function (scheduleBlocks){
		var me = this,
			mf = me.getModuleForm(),
			presenceBlocksCount = Math.round(mf.presencePerWeek/me.H_PER_BLOCK),
			selfStudyBlocksCount = Math.round(mf.selfStudyPerWeek/me.H_PER_BLOCK),
			deletedBlocksInSchedule = 0;
		
		var presence = new Array(),
			self = new Array;
		for(var i=0; i<scheduleBlocks.data.length; i++){
			var block = scheduleBlocks.getAt(i);
			if(block.get('type') == 'presence') presence.push(block);
			else self.push(block);
		}
		
		var presenceDiff = presenceBlocksCount - presence.length,
			selfDiff = selfStudyBlocksCount - self.length;
		
		if(presenceDiff>0){
			//delete blocks
			for(var i=0;i<presenceDiff;i++){
				scheduleBlocks.add({
					type: 'presence',
					phase1assigendTo: null,
					phase2assigendTo: null,
					phase3assigendTo: null
				});
			}
		}else if(presenceDiff<0){
			//delete blocks
			var presenceAbs = Math.abs(presenceDiff),
				deleted = 0;
			for(var i = 0; i < presence.length && deleted < presenceAbs; i++){
				//try to delete unallocated blocks
				var block = presence[i];
				if(	block.get('phase1AssignedTo') === null &&
					block.get('phase2AssignedTo') === null &&
					block.get('phase3AssignedTo') === null)
				{
						scheduleBlocks.remove(block);
						deleted++;
				}
			}
			for(; deleted < presenceAbs; deleted++){
				scheduleBlocks.remove(presence[deleted]);
				deletedBlocksInSchedule++;
			}
		}
		
		if(selfDiff>0){
			//delete blocks
			for(var i=0;i<selfDiff;i++){
				scheduleBlocks.add({
					type: 'self',
					phase1assigendTo: null,
					phase2assigendTo: null,
					phase3assigendTo: null
				});
			}
		}else if(selfDiff<0){
			//delete blocks
			var selfAbs = Math.abs(selfDiff),
				deleted = 0;
			for(var i = 0; i < self.length && deleted < selfAbs; i++){
				//try to delete unallocated blocks
				var block = self[i];
				if( block.get('phase1AssignedTo') === null &&
					block.get('phase2AssignedTo') === null &&
					block.get('phase3AssignedTo') === null)
				{
					scheduleBlocks.remove(block);
					deleted++;
				}
			}
			for(; deleted < selfAbs; deleted++){
				scheduleBlocks.remove(self[deleted]);
				deletedBlocksInSchedule++;
			}
		}
		return deletedBlocksInSchedule;
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
	    var me = this,
			moduleForm = me.getModuleForm(),
			currentModule = moduleForm.getRecord(),
			scheduleBlocks = currentModule.scheduleBlocks(),
			store_sb = Ext.getStore("ScheduleBlocks"),
			newValues = moduleForm.getValues(),
			updateShedBlocks = false,
			deletedBlocks = 0;
			
	    if(newValues.ects != currentModule.get('ects') || 
			newValues.sws != currentModule.get('sws')){
			updateShedBlocks = true;
		}

	    // Update the current module's fields with form values.
	    currentModule.set("name", newValues.name);
	    currentModule.set("ects", newValues.ects);
	    currentModule.set("sws", newValues.sws);
	    currentModule.set("workload", moduleForm.workloadPerWeek);
	    currentModule.set("presencePerWeek", moduleForm.presencePerWeek);
	    currentModule.set("selfStudyPerWeek", moduleForm.selfStudyPerWeek);
	    currentModule.set("type", me.getValue('#typeButton', "segButton"));
	    currentModule.set("interest", me.getValue('#interestButton', "segButton"));
	    currentModule.set("severity", me.getValue('#severityButton', "segButton"));
	
		//Validate!
	    var errors = currentModule.validate();
	    console.log("Error: " + errors)
	    if (!errors.isValid()) {
			errors.each(function (item, index, length){
				Ext.Msg.alert('Hoppla!', item.getMessage(), Ext.emptyFn);
			}); 
	        currentModule.reject();
	        return;
	    }
	    
	    if(updateShedBlocks){
			deletedBlocks = me.generateScheduleBlocks(scheduleBlocks);
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
	    store_sb.clearFilter();
        store_sb.load();
        studiplaner.app.getController('Schedule').filterBlocksList(0); 
        
        if(updateShedBlocks){
			//rebuild timetable - there could be changes
			studiplaner.app.getController('Schedule').rebuildSchedule();
		}
           
	    me.activateModulesList(deletedBlocks);
	},
	
	onDeleteModuleCommand: function () {
		var me = this,
			moduleForm = me.getModuleForm(),
			currentModule = moduleForm.getRecord(),
			scheduleBlocks = currentModule.scheduleBlocks();
		
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
						
					me.activateModulesList();
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
		var me = this,
			message = me.getMessageForSegmentedButtonId(button.config.value);
			segButtonId = container.getItemId(),
		me.updateForm();
		
		if(segButtonId == "interestButton" || segButtonId == "severityButton"){
			//~ //show info dialog
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
		}
	},
	
	onNumberFieldChangedCommand: function(moduleForm, field, newValue, oldValue, eOpts){
		this.updateForm();
	},
	
	updateForm: function (){
		var me = this,
			mf = me.getModuleForm(),
			ects = me.checkInputVal(me.getValue('#numberfield_ects', 'field'), 0, 50),
			sws = me.checkInputVal(me.getValue('#numberfield_sws', 'field'), 0, 50),
			interest = me.getValue('#interestButton', 'segButton'),
			severity = me.getValue('#severityButton', 'segButton'),
			workloadPerWeek = 0,
			presencePerWeek = 1,
			selfStudyPerWeek = 1;
			
		var typeButton = mf.down('#typeButton');
		var pressed = typeButton.getPressedButtons()[0];
		var type = pressed.getItemId(),
		
		workloadPerWeek = me.calculateWorkloadPerWeek(ects, me.H_PER_ECTS, me.WEEKS_PER_SEM, interest, severity);
		
		if(type == 'ov'){
			presencePerWeek = 0;
			selfStudyPerWeek = workloadPerWeek;
		}else{
			presencePerWeek = sws * me.H_PER_SWS;
			selfStudyPerWeek = workloadPerWeek - presencePerWeek;
		}
		
		//set series data
		if(workloadPerWeek == 0){
			me.setChartData(1, 1, 0);
		}else{
			me.setChartData(presencePerWeek, selfStudyPerWeek, workloadPerWeek);
		}
			
		//store workload
		mf.workloadPerWeek = workloadPerWeek;
		mf.selfStudyPerWeek = selfStudyPerWeek;
		mf.presencePerWeek = presencePerWeek;
	},
	//------------------
    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Modules")
			store_sb = Ext.getStore("ScheduleBlocks");
        store.load();
        store_sb.load();
    },
    init: function () {
        this.callParent();
    }
});
