/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.WorkingTime', {
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
            { name: 'day', type: 'int' },
            { name: 'begin', type: 'date' },
            { name: 'end', type: 'date' },
            { name: 'work_id', type: 'auto'}
        ],
		
		belongsTo: [
			{
				model: 'studiplaner.model.Work',
				name: 'Work',
				primaryKey: 'id',
				foreignKey: 'work_id',
				foreignStore: 'Works'
			}
		],
		
		proxy: {
    		type: 'localstorage',
    		id: 'workingTimes-store'
		}
    }
});
