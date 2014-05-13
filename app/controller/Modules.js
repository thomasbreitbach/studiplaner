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
		        backToHomeCommand: "onBackToHomeCommand"
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
    	moduleForm.setRecord(record); // load() is deprecated.
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
	        id: moduleId,
	        type: "",
	        name: "",
	        ects: "",
	        sws: "",
	        interest: 2,
	        severity: 2,
	    });
	
	    this.activateModuleForm(newModule);
	},
	
    onEditModuleCommand: function (list, record) {
        console.log("onEditNoteCommand");
        this.activateModuleForm(record);
    },
    
    onSaveModuleCommand: function () {
	    console.log("onSaveModuleCommand");
	
	    var moduleForm = this.getModuleForm();
	
	    var currentModule = moduleForm.getRecord();
	    var newValues = moduleForm.getValues();
	
	    // Update the current note's fields with form values.
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
	
	onDeleteNoteCommand: function () {
	    console.log("onDeleteNoteCommand");
	
	    var noteEditor = this.getNoteEditor();
	    var currentNote = noteEditor.getRecord();
	    var notesStore = Ext.getStore("Notes");
	
		console.log(currentNote);
		notesStore.removeAt(currentNote);
	    // notesStore.remove(currentNote);
	    notesStore.sync();
	
	    this.activateNotesList();
	},
	
	onBackToHomeCommand: function () {
		console.log("onBackToHomeCommand");
		this.activateModulesList();
	},
	    

    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Modules");
        console.log(store);
        store.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});