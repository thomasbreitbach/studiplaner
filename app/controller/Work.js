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
    	console.log(record);
    	  	
    	var workForm = this.getWorkForm();
    	
    	//set form fields
    	workForm.setRecord(record);
    	
    	//set working times
    	var timeContainer = workForm.down('#timeContainer');
    	var times = record.data.workingTimes;
    	if(typeof times != 'undefined'){
			for(var i=0; i<times.length; i++){
				//~ var counter = workForm.counter;
				//~ this.addWorkingTimeToFieldset(counter);
				//~ console.log(workForm.down('#day'+i));
				//~ var day = this.getWorkForm().down('#day'+i);
				//~ day.setValue({value: times[i].day.getValue()});
				//~ console.log(fset);
				console.log(times[i]);
			}
    	}else{
			if(timeContainer.getItems().length == 0){
				this.addWorkingTimeToFieldset(workForm.counter);
			}
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
			topToolbar.setTitle("Neues Modul");
			deleteButton.hide();
		}	
    	Ext.Viewport.animateActiveItem(workForm, this.slideLeftTransition);
	},
	
	activateWorkList: function () {
		console.log("activateWorkList");
	    Ext.Viewport.animateActiveItem(this.getWorkListContainer(), this.slideRightTransition);
	},
	
	//************
	//**COMMANDS**
	//************   
    onNewWorkCommand: function () {
	    console.log("onNewWorkCommand");
	    var newWork = Ext.create("studiplaner.model.Work", {
	        name: "",
	        location: "",
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

	    currentWork.set("name", newValues.name);
	    currentWork.set("location", newValues.location);
	    
	    var picker = newValues.picker;
	    for(var i = 0; i<picker.length; i=i+3){
			workingTimes.add({
				'day': newValues.picker[i],
				'begin': newValues.picker[i+1],
				'end': newValues.picker[i+2],
			});
		}
	
	    var errors = currentWork.validate();
	
	    if (!errors.isValid()) {
	        Ext.Msg.alert('Hoppla!', errors.getByField("name")[0].getMessage(), Ext.emptyFn);
	        currentWork.reject();
	        return;
	    }
	
	    var workStore = Ext.getStore("Work");
	
	    if (null == workStore.findRecord('id', currentWork.data.id)) {
	        workStore.add(currentWork);
	    }	
	    
	    workingTimes.sync();
	    workStore.sync();	
	    workStore.sort([{ property: 'name', direction: 'DESC'}]);
	    this.activateWorkList();
	},
//~ 
	//~ 
	//~ onDeleteModuleCommand: function () {
	    //~ console.log("onDeleteNoteCommand");
	//~ 
		//~ var moduleForm = this.getModuleForm();
		//~ var currentModule = moduleForm.getRecord();
		//~ var controller = this;
		//~ 
		//~ Ext.Msg.confirm('Löschen', 'Möchtest du das Modul ' + currentModule.data.name + ' wirklich löschen?', function(btn){
			//~ if(btn == 'yes'){
				//~ var modulesStore = Ext.getStore("Modules");		
				//~ modulesStore.remove(currentModule);
				//~ modulesStore.sync();
				//~ 
				//~ controller.activateModulesList();
			//~ }else{
				//~ return false;
			//~ }
		//~ });  
	//~ },
	
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
	
	
    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Work");
        store.load();
        var store_wt = Ext.getStore('WorkingTime');
        store.load();
        
        console.log("launch");
    },    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
