/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.controller.Export", {
    extend: "Ext.app.Controller",
    
    requires: [
		'Ext.ComponentQuery',
		'Ext.util.DelayedTask'
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
		var schedulingTxt = this.buildSchedulingTxt();
		var newMail = Ext.create("studiplaner.model.ExportMail", {
			subject: "Studiplaner - Semesterplanung",
			scheduling: schedulingTxt
	    });
	    
	    this.getExportForm().setRecord(newMail);
	},
      
    onSendMailCommand: function () {
		console.log("onSendMailCommand");
		var form = this.getExportForm();
		var currentMail = form.getRecord();
		var formValues = form.getValues();
		currentMail.set(formValues);
		
		var errors = currentMail.validate();

		if (!errors.isValid()) {
		  var errorMsg = "";
		  errors.each(function (errorObj) {
			errorMsg += errorObj.getMessage() + "<br>"; 
		  });
		  Ext.Msg.alert("Hoppla!", errorMsg);
		}else{

			Ext.Viewport.setMasked({ 
				xtype: 'loadmask',
				message: "Sende E-Mail…",
			});

			// send mail
			Ext.Ajax.request({
				url: '../mail.php',
				method: 'post',
				params: formValues,
				scope: this,
				success: function(r, o){
					Ext.Viewport.unmask();
					if (r.status == 200) {
						Ext.Msg.alert("E-Mail wurde gesendet!");
					}else {
						Ext.Msg.alert("Beim Senden der E-Mail ist ein Fehler aufgetreten!\n\nStatus: " + r.status + "\nStatustext: " + r.statusText);
					}
				},
				failure: function(r, o) {
					Ext.Viewport.unmask();
					console.log('server-side failure with status code ' + r.status);
					Ext.Msg.alert("Beim Senden der E-Mail ist ein Fehler aufgetreten!\n\nStatus: " + r.status + "\nStatustext: " + r.statusText);
				}
			});
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
