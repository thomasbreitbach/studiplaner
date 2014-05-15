/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Modules", {
    extend: "Ext.app.Controller",
    
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
		        // deleteNoteCommand: "onDeleteNoteCommand",
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
    	console.log(record);
    	
    	var moduleForm = this.getModuleForm();
    	
    	//set form fields
    	moduleForm.setRecord(record);
    	
    	//set typButton	
    	var typeButton = moduleForm.getItems().items[1];
    	typeButton.setPressedButtons([record.data.type]);
    	
    	//set interestButton
    	var interestButton = moduleForm.getItems().items[4];
    	interestButton.setPressedButtons([record.data.interest]);

		//set severityButton
    	var severityButton = moduleForm.getItems().items[6];
    	severityButton.setPressedButtons([record.data.severity]);
  	
    	Ext.Viewport.animateActiveItem(moduleForm, this.slideLeftTransition);
	},
	activateModulesList: function () {
	    Ext.Viewport.animateActiveItem(this.getModulesListContainer(), this.slideRightTransition);
	},
     
    onNewModuleCommand: function () {
	    console.log("onNewModuleCommand");
	
		var now = new Date();
	    var moduleId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
	
	    var newModule = Ext.create("studiplaner.model.Module", {
	        type: "normal",
	        name: "",
	        ects: "",
	        sws: "",
	        interest: "",
	        severity: "",
	    });
	
	    this.activateModuleForm(newModule);
	},
	
    onEditModuleCommand: function (list, record) {
        console.log("onEditModuleCommand");
        console.log(record);
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
	    var modulesStore = Ext.getStore("Notes");
	
		console.log(currentModule);
		modulesStore.removeAt(currentModule);
	    // notesStore.remove(currentNote);
	    modulesStore.sync();
	
	    this.activateModulesList();
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
		console.log(currentModule);
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
