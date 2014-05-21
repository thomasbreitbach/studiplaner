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
    
    activateWorkForm: function (record) {
    	console.log("activateWorkForm");
    	
    	//~ TODO Performance! 
    	this.getWorkForm().destroy();
    	Ext.create('studiplaner.form.WorkForm');
    	
    	var workForm = this.getWorkForm();
    	
    	//set form fields
    	workForm.setRecord(record);
    	
    	
    	//~ //Change behaviour in edit mode
    	//~ var submitButton = moduleForm.getComponent('addButton');
    	//~ var topToolbar = moduleForm.getComponent('topToolbar');
    	//~ var bottomToolbar = moduleForm.getComponent('bottomToolbar');
    	//~ if(record.data.name.length > 0){
			//~ //edit mode
			//~ submitButton.setText("Ändern");
			//~ topToolbar.setTitle(record.data.name);
			//~ bottomToolbar.show();
		//~ }else{
			//~ //new mode
			//~ submitButton.setText("Hinzufügen");
			//~ topToolbar.setTitle("Neues Modul");
			//~ bottomToolbar.hide();
		//~ }
		
    	Ext.Viewport.animateActiveItem(workForm, this.slideLeftTransition);
	},
	
	activateWorkList: function () {
		console.log("activateWorkList");
		console.log(this.getWorkListContainer());
	    Ext.Viewport.animateActiveItem(this.getWorkListContainer(), this.slideRightTransition);
	},
     
    onNewWorkCommand: function () {
	    console.log("onNewModuleCommand");
	
	    var newWork = Ext.create("studiplaner.model.Work", {
	        name: "",
	        location: "",
	    });
	
	    this.activateWorkForm(newWork);
	},
	
    //~ onEditModuleCommand: function (list, record) {
        //~ console.log("onEditModuleCommand");
        //~ this.activateModuleForm(record);
    //~ },
    //~ 
    //~ onSaveModuleCommand: function () {
	    //~ console.log("onSaveModuleCommand");
		//~ 
	    //~ var moduleForm = this.getModuleForm();
		//~ console.log(moduleForm);
	    //~ var currentModule = moduleForm.getRecord();
	    //~ var newValues = moduleForm.getValues();
	    //~ console.log(newValues);
//~ 
	    //~ // Update the current note's fields with form values.
	    //~ // SegmentedButton values are saven on toggle
	    //~ currentModule.set("name", newValues.name);
	    //~ currentModule.set("ects", newValues.ects);
	    //~ currentModule.set("sws", newValues.sws);
	//~ 
	    //~ var errors = currentModule.validate();
	//~ 
	    //~ if (!errors.isValid()) {
	        //~ Ext.Msg.alert('Wait!', errors.getByField("name")[0].getMessage(), Ext.emptyFn);
	        //~ currentModule.reject();
	        //~ return;
	    //~ }
	//~ 
	    //~ var modulesStore = Ext.getStore("Modules");
	//~ 
	    //~ if (null == modulesStore.findRecord('id', currentModule.data.id)) {
	        //~ modulesStore.add(currentModule);
	    //~ }
	//~ 
	    //~ modulesStore.sync();	
	    //~ modulesStore.sort([{ property: 'name', direction: 'DESC'}]);
	//~ 
	    //~ this.activateModulesList();
	//~ },
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

    launch: function () {
        this.callParent();
        //load Store
        var store = Ext.getStore("Work");
        store.load();
        
        console.log("launch");
    },
    
    init: function () {
        this.callParent();
        console.log("init");
    }
});
