/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.ScheduleBlock', {
    extend: 'studiplaner.model.BaseModel',
    
    requires: [
    	'Ext.data.identifier.Uuid'
    ],
    
    config: {
    	idProperty: 'id',
		identifier: 'uuid',
    	
        fields: [
        	{ name: 'id', type: 'auto' },       	
            { name: 'type', type: 'string' },
            { name: 'assigned', type: 'boolean' },
            { name: 'day', type: 'int' },
            { name: 'block', type: 'int' },
            { name: 'phase', type: 'int'}
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
