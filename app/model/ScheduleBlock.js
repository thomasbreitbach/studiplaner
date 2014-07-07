/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.ScheduleBlock', {
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
            { name: 'type', type: 'string' },
            { name: 'phase1AssignedTo', type: 'string' },
            { name: 'phase2AssignedTo', type: 'string' },
            { name: 'phase3AssignedTo', type: 'string' }
        ],
        
		belongsTo: [
			{
				model: 'studiplaner.model.Module',
				name: 'Module',
				primaryKey: 'id',
				foreignKey: 'module_id',
				foreignStore: 'Modules'
			}
		],
		
		proxy: {
    		type: 'localstorage',
    		id: 'scheduleBlock-store'
		}
    }
});
