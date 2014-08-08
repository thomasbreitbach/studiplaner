/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Export", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery'
    ],
    
    config: {
        refs: {
            exportForm: "exportform",
        },
        control: {
            exportForm: {
				generateMail: "onGenerateMail",
                sendMailCommand: "onSendMailCommand",
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    //*************
    //***HELPER****
    //*************
    buildSchedulingTxt: function (){
		var txt = "";
		var workload = 0;
		var modulesStore = Ext.getStore("Modules");
		var modules = modulesStore.getData().items;
		
		txt += "Module:\n"
		for(var i = 0; i < modules.length; i ++){
			var module = modules[i].data;
			txt += module.name + ", " + module.workload + " Std./Woche\n";
			workload += module.workload;
		}	
		
		var worksStore = Ext.getStore("Works");
		var works = worksStore.getData().items;
		
		txt += "\nArbeitsstellen:\n"
		for(var i = 0; i < works.length; i ++){
			var work = works[i].data;
			txt += work.name + ", " + work.workload + " Std./Woche\n";
			workload += work.workload;
		}
		
		txt += "\nWorkload gesamt:\n" + workload + " Std./Woche";

		return txt;
	},
    
    //*************
    //**COMMANDS***
    //*************
    onGenerateMail: function () {
		console.log("onShowExportForm");
		var schedulingTxt = this.buildSchedulingTxt();
		var newMail = Ext.create("studiplaner.model.ExportMail", {
			scheduling: schedulingTxt
	    });
	    
	    this.getExportForm().setRecord(newMail);
	},
      
    onSendMailCommand: function () {
		console.log("onSendMailCommand");
		var form = this.getExportForm();
		var currentMail = form.getRecord();
		currentMail.set(form.getValues());
		
		var errors = currentMail.validate();

		if (!errors.isValid()) {
		  var errorMsg = "";
		  errors.each(function (errorObj) {
			errorMsg += errorObj.getMessage() + "<br>"; 
		  });
		  Ext.Msg.alert("Hoppla!", errorMsg);
		}else{
			// send mail
		}
	},

	//--------------------------------
    launch: function () {
        this.callParent();
    },
    
    init: function () {
        this.callParent();
    }
});
