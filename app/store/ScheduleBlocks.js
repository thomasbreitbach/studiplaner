/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.ScheduleBlocks", {
    extend: "Ext.data.Store",  
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.ScheduleBlock",
        autoLoad: false,      
        proxy: {
            type: 'localstorage',
            id: 'scheduleBlock-store'
        },
        sorters: [{ property: 'type', direction: 'ASC'}],
        grouper: {
            sortProperty: "type",
            direction: "ASC",
            groupFn: function (record) {
				//~ console.log(record.ModuleBelongsToInstance);
                if (record && record.data.type) {
					if(record.data.type === 'presence'){
						return 'Anwesenheit';
					}else{
						return 'Selbststudium';
					}
                } else {
                    return '';
                }
            }
        }
    }
});
