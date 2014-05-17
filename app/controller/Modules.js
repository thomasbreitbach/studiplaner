/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Modules", {
    extend: "Ext.app.Controller",
    
    requires: ['Ext.ComponentQuery'],
    
    config: {
        refs: {
            modulesListContainer: "moduleslistcontainer",
            moduleForm: "moduleform"
        },
        control: {
            modulesListContainer: {
            	// The commands fired by the modules list container.
                newModuleCommand: "onNewModuleCommand",
                editModuleCommand: "onEditModuleCommand",
                // swipeNoteCommand: "onSwipeNoteCommand"
            },
            moduleForm: {
		        // The commands fired by the note editor.
		        saveModuleCommand: "onSaveModuleCommand",
		        deleteModuleCommand: "onDeleteModuleCommand",
		        backToHomeCommand: "onBackToHomeCommand",
		        segmentedButtonCommand: "onSegmentedButtonCommand"
		    }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    activateModuleForm: function (record) {
    	console.log("activateModuleForm");
    	
    	var moduleForm = this.getModuleForm();
    	
    	//set form fields
    	moduleForm.setRecord(record);
    	
    	//set typButton	
    	var typeButton = moduleForm.getComponent('typeButton');
    	typeButton.setPressedButtons([record.data.type]);
    	
    	//set interestButton
    	var interestButton = moduleForm.getComponent('interestButton');
    	interestButton.setPressedButtons([record.data.interest]);

		//set severityButton
    	var severityButton = moduleForm.getComponent('severityButton');
    	severityButton.setPressedButtons([record.data.severity]);   	
    	
    	//Change behaviour in edit mode
    	var submitButton = moduleForm.getComponent('addButton');
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
	    Ext.Viewport.animateActiveItem(this.getModulesListContainer(), this.slideRightTransition);
	},
     
    onNewModuleCommand: function () {
	    console.log("onNewModuleCommand");
	
	    var newModule = Ext.create("studiplaner.model.Module", {
	        type: 0,
	        name: "",
	        ects: "",
	        sws: "",
	        interest: null,
	        severity: null,
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
		console.log(moduleForm);
	    var currentModule = moduleForm.getRecord();
	    var newValues = moduleForm.getValues();
	    console.log(newValues);

	    // Update the current note's fields with form values.
	    // SegmentedButton values are saven on toggle
	    currentModule.set("name", newValues.name);
	    currentModule.set("ects", newValues.ects);
	    currentModule.set("sws", newValues.sws);
	
	    var errors = currentModule.validate();
	
	    if (!errors.isValid()) {
	        Ext.Msg.alert('Wait!', errors.getByField("name")[0].getMessage(), Ext.emptyFn);
	        currentModule.reject();
	        return;
	    }
	
	    var modulesStore = Ext.getStore("Modules");
	
	    if (null == modulesStore.findRecord('id', currentModule.data.id)) {
	        modulesStore.add(currentModule);
	    }
	
	    modulesStore.sync();	
	    modulesStore.sort([{ property: 'name', direction: 'DESC'}]);
	
	    this.activateModulesList();
	},
	
	onSwipeNoteCommand: function(list, record){
		console.log("onSwipeNoteCommand");
		
		Ext.Msg.confirm('Löschen?', 'Möchtest du den Eintrag löschen', function(btn){
			if(btn == 'yes'){
				var notesStore = Ext.getStore("Notes");
				notesStore.removeAt(record);
				notesStore.sync();
			}else{
				return false;
			}
		});		
	},
	
	onDeleteModuleCommand: function () {
	    console.log("onDeleteNoteCommand");
	
		var moduleForm = this.getModuleForm();
		var currentModule = moduleForm.getRecord();
		var controller = this;
		
		Ext.Msg.confirm('Löschen?', 'Möchtest du das Modul ' + currentModule.data.name + ' löschen?', function(btn){
			if(btn == 'yes'){
				var modulesStore = Ext.getStore("Modules");		
				modulesStore.remove(currentModule);
				modulesStore.sync();
				
				controller.activateModulesList();
			}else{
				return false;
			}
		});  
	},
	
	onBackToHomeCommand: function () {
		console.log("onBackToHomeCommand");
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
		currentModule.set(attribute, button.value);
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
