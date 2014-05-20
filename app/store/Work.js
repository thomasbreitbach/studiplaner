/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.Work", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.Work",
        proxy: {
            type: 'localstorage',
            id: 'work-store'
        },
        sorters: [{ property: 'name', direction: 'DESC'}],
        grouper: {
            sortProperty: "name",
            direction: "ASC",
            groupFn: function (record) {

                if (record && record.data.name) {
                    return record.data.name.charAt(0).toUpperCase();
                } else {
                    return '';
                }
            }
        }
    }
});
