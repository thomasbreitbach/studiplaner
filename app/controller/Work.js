/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Work", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'studiplaner.form.WorkForm'
    ],
    
    config: {
        refs: {
			workForm: "workform",
            workListContainer: "worklistcontainer"
        },
        control: {
            workForm: {
		        // The commands fired by the note editor.
		        saveWorkCommand: "onSaveWorkCommand",
		        deleteWorkCommand: "onDeleteWorkCommand",
		        backToHomeCommand: "onBackToHomeCommand",
		        delWorkingTimeCommand: "onDelWorkingTimeCommand",
		        addWorkingTimeCommand: "onAddWorkingTimeCommand"        
		    },
            workListContainer: {
            	// The commands fired by the modules list container.
                newWorkCommand: "onNewWorkCommand",
                editWorkCommand: "onEditWorkCommand"
            }            
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    //************
	//**HELPER**
	//************
    addWorkingTimeToFieldset: function(id){
		var workForm = this.getWorkForm();
		var d = new Date();
		var dplus2h = new Date();
		dplus2h.setHours((d.getHours()+4));
		var label = {
			title: 'times',
			html: ['Arbeitszeit'],
			styleHtmlContent: true,
		};	
		var delButton = {
			xtype: 'button',
			iconCls: 'delete',
            iconMask: true,
            itemId: ''+id,
            handler: workForm.onDeleteWorkingTimeButtonTap,
        	scope: workForm,
            ui: 'plain',
            width: '40px',
            height: '40px'
		};
		var hbox = Ext.create('Ext.Container', {
			height: '60px',
			layout:{
				type:'hbox',
				align:'center',
				pack:'center'
			}	
		});
		hbox.add([label, { xtype: 'spacer' }, delButton]);
		var weekday = {
			xtype: 'selectfield',
			label: 'Tag',
			itemId: 'day' + id,
			usePicker: 'true',
			options: [{
				text: 'Montag',
				value: 0
			}, {
				text: 'Dienstag',
				value: 1
			}, {
				text: 'Mittwoch',
				value: 2
			}, {
				text: 'Donnerstag',
				value: 3
			}, {
				text: 'Freitag',
				value: 4
			}, {
				text: 'Samstag',
				value: 5
			}, {
				text: 'Sonntag',
				value: 6
			}]
		
		};
		var begin = {
			xtype: 'timepickerfield',
			label: 'Beginn',
			itemId: 'beginTime' + id,
			value: d,
			dateFormat: 'H:i',
			picker: {
				useMeridiem: false,
				startHour: 1,
				endHour: 24,
				startMinute: 0,
				endMinute: 59,
				hourText: 'Stunde',
				minuteText: 'Minute',
				slotOrder: [
					'hour',
					'minute'
				]
			}
		};
		var end = {
			xtype: 'timepickerfield',
			label: 'Ende',
			itemId: 'endTime' + id,
			dateFormat: 'H:i',
			value: dplus2h,
			picker: {
				useMeridiem: false,
				startHour: 1,
				endHour: 24,
				startMinute: 0,
				endMinute: 59,
				hourText: 'Stunde',
				minuteText: 'Minute',
				slotOrder: [
					'hour',
					'minute'
				]
			}
		};
		
		var fieldset = Ext.create('Ext.form.FieldSet', {
        		itemId: "timeData"+id,
        });
		fieldset.add([hbox, weekday, begin, end]);		
		
		workForm.down('#timeContainer').add(fieldset);	
		workForm.counter++;
		return fieldset;
	},
    
    activateWorkForm: function (record) {
    	console.log("activateWorkForm");      	  	
    	var workForm = this.getWorkForm();
    	var counter = workForm.counter;
    	
    	//reset counter
    	counter = 0;
    	 	
    	//set form fields
    	workForm.setRecord(record);
    	
    	//set working times
    	var timeContainer = workForm.down('#timeContainer');
    	timeContainer.removeAll(true, true);
    	var times = record.workingTimes();
    	times.load(); //important!
    	console.log(times);
    	if(times.getTotalCount() > 0){
			for(var i=0; i<times.data.length; i++){
				var workingTime = times.data.items[i].data;			
				var fieldset = this.addWorkingTimeToFieldset(i);
				counter++;
				
				fieldset.down('#day'+i).setValue(workingTime.day);
	
				var begin = new Date(workingTime.begin);
				fieldset.down('#beginTime'+i).setValue(begin);
				
				var end = new Date(workingTime.end);
				fieldset.down('#endTime'+i).setValue(end);				
			}
    	}else{
			this.addWorkingTimeToFieldset(workForm.counter);
		}
		
    	//Change behaviour in edit mode
    	var submitButton = workForm.getComponent('addButton');
    	var topToolbar = workForm.getComponent('topToolbar');
    	var deleteButton = workForm.down('#deleteButton');
    	if(record.data.name.length > 0){
			//edit mode
			submitButton.setText("Ändern");
			topToolbar.setTitle(record.data.name);
			deleteButton.show();
		}else{
			//new mode
			submitButton.setText("Hinzufügen");
			topToolbar.setTitle("Neues Arbeitsstelle");
			deleteButton.hide();
		}	
    	Ext.Viewport.animateActiveItem(workForm, this.slideLeftTransition);
	},
	
	activateWorkList: function () {
		console.log("activateWorkList");
	    Ext.Viewport.animateActiveItem(this.getWorkListContainer(), this.slideRightTransition);
	},
	
	millisToHours: function(millis){
		return (millis/1000/60/60);
	},
	
	calculateWorkloadPerWeek: function(begins, ends) {
		var workload = 0;
		if(begins instanceof Array && ends instanceof Array){
			for(var i=0; i<begins.length; i++){
				var begin = begins[i].getTime();
				var end = ends[i].getTime();
				
				if(begin < end){
					workload += (end-begin);
				}
			}
		}	
		return this.millisToHours(workload);
	},

	//************
	//**COMMANDS**
	//************   
    onNewWorkCommand: function () {
	    console.log("onNewWorkCommand");
	    var newWork = Ext.create("studiplaner.model.Work", {
	        name: "",
	        location: "",
	        workload: 0
	    });
	    this.activateWorkForm(newWork);
	},
	
    onEditWorkCommand: function (list, record) {
        console.log("onEditWorkCommand");
        this.activateWorkForm(record);
    },
    
    onSaveWorkCommand: function () {
	    console.log("onSaveWorkCommand");
	    
	    var workForm = this.getWorkForm();
		console.log(workForm.getValues());
	    var currentWork = workForm.getRecord();
	    var workingTimes = currentWork.workingTimes();
	    var newValues = workForm.getValues();
	    console.log(currentWork);

	    currentWork.set("name", newValues.name);
	    currentWork.set("location", newValues.location);
	    
	    //Validate!	
		var errors = currentWork.validate();
	    if (!errors.isValid()) {
	        Ext.Msg.alert('Hoppla!', errors.getByField("name")[0].getMessage(), Ext.emptyFn);
	        currentWork.reject();
	        return;
	    }
	    
	    var begins=[] , ends=[];
	    
	    workingTimes.removeAll(true, true); //TODO Performance!
	    var picker = newValues.picker
	    if(typeof picker != 'undefined'){					
			for(var i = 0; i<picker.length; i=i+3){			
				var begin = newValues.picker[i+1];
				var end = newValues.picker[i+2];
				
				if(begin.getTime() <  end.getTime()){
					begins.push(begin);
					ends.push(end);
						
					workingTimes.add({
						'day': newValues.picker[i],
						'begin': begin,
						'end': end,
					});
				}else{
					Ext.Msg.alert('Fehlerhafte Arbeitszeiten', "Der Beginn deiner Arbeitszeit muss vor dem Ende liegen. Bitte überprüfe deine Eingabe!", Ext.emptyFn);
					return;
				}
			}
		}	    
	
	    var workStore = Ext.getStore("Work");
	    if (null == workStore.findRecord('id', currentWork.data.id)) {
	        workStore.add(currentWork);
	    }
	    
	    //calc workload
	    var workload = this.calculateWorkloadPerWeek(begins, ends);
	    currentWork.set("workload", Math.round(workload));
	    
	    workingTimes.sync();
	    workStore.sync();	
	    workStore.sort([{ property: 'name', direction: 'DESC'}]);
	    this.activateWorkList();
	},
	
	onDeleteWorkCommand: function () {
	    console.log("onDeleteWorkCommand");
	
		var workForm = this.getWorkForm();
		var currentWork = workForm.getRecord();
		var controller = this;
		
		Ext.Msg.confirm('Löschen', 'Möchtest du die Arbeitsstelle "' + currentWork.data.name + '" wirklich löschen?', function(btn){
			if(btn == 'yes'){
				var workStore = Ext.getStore("Work");		
				workStore.remove(currentWork);
				var workingTimes = currentWork.workingTimes();
				workingTimes.removeAll(true, true)
				
				workingTimes.sync();
				workStore.sync();
				
				controller.activateWorkList();
			}else{
				return false;
			}
		});  
	},
	
	onBackToHomeCommand: function () {
		console.log("onBackToHomeCommand");
		this.activateWorkList();
	},	
	onAddWorkingTimeCommand:function(){	
		var workForm = this.getWorkForm();
		this.addWorkingTimeToFieldset(workForm.counter);
	},	
	onDelWorkingTimeCommand: function(form, button){
		console.log('onDelWorkingTimeCommand');
		var id = button.getItemId();
		var workForm = this.getWorkForm();
		var timeContainer = workForm.down('#timeContainer');
		var remove = workForm.down('#timeData'+id);
		timeContainer.remove(remove, true);
	},
	
	//------------------------------
    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Work");
        store.load();
        var store_wt = Ext.getStore("WorkingTime");
        store_wt.load();

        console.log("launch");
    },    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
