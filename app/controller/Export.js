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
    //**COMMANDS***
    //*************
    onGenerateMail: function () {
		console.log("onShowExportForm");
		var newMail = Ext.create("studiplaner.model.ExportMail", {
			scheduling: "Balbalbal"
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
