/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.Modules", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.Module",
        proxy: {
            type: 'localstorage',
            id: 'modules-store'
        },
        sorters: [{ property: 'name', direction: 'DESC'}],
        grouper: {
            sortProperty: "name",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.name) {
                    return record.data.name.toString();
                } else {
                    return '';
                }
            }
        }
    }
});