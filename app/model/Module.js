/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.Module', {
    extend: 'studiplaner.model.BaseModel',
    
    requires: [
    	'Ext.data.identifier.Uuid',
    	'Ext.data.Field'
    ],
    
    config: {
    	idProperty: 'id',
		identifier: 'uuid',
    	
        fields: [
        	{ name: 'id', type: 'auto' },
            { name: 'type', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'ects', type: 'int' },
            { name: 'sws', type: 'int' },
            { name: 'workload', type: 'float'},
            { name: 'presencePerWeek', type: 'float'},
            { name: 'selfStudyPerWeek', type: 'float'},
            { name: 'interest', type: 'float' },   
			{ name: 'severity', type: 'float' }
        ],
        
        hasMany: {
				model: 'studiplaner.model.ScheduleBlock',
				name: 'scheduleBlocks',
				primaryKey: 'id',
				foreignKey: 'module_id',
				foreignStore: 'Modules'
		},
        
        validations: [{
	    		type: 'presence',
			    field: 'name',
			    message: "Bitte gib einen Modulnamen an."
		    }
		]
    }
});
