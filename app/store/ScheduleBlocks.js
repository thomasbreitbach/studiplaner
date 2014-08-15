/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.ScheduleBlocks", {
    extend: "Ext.data.Store",  
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.ScheduleBlock",
        autoLoad: true,      
        proxy: {
            type: 'localstorage',
            id: 'scheduleBlocks-store'
        },
        grouper: {
            sortProperty: "type",
            direction: "ASC",
            groupFn: function (record) {
                if (record && record.data.type) {
					if(record.data.type === 'presence'){
						return 'Anwesenheit';
					}else{
						return 'Selbststudium';
					}
                }
            }
        },
        sorters: [{
				// Sort by first letter of last name, in descending order
				sorterFn: function(record1, record2) {
					var	name1 = record1.getData(true).Module.name.substr(0, 1),
						name2 = record2.getData(true).Module.name.substr(0, 1);

					return name1 > name2 ? 1 : (name1 === name2 ? 0 : -1);
				},
				direction: 'ASC'
			}
		]
    }
});
