Ext.define('studiplaner.form.ModuleForm', {
    extend: 'Ext.form.Panel',
    xtype: 'moduleform',
    
    config: {
        title: 'ModuleForm',
        
        items: [
            {
                name: 'name',
                xtype: 'textfield',
                label: 'Name'
            },
            {
                name: 'ects',
                xtype: 'textfield',
                label: 'Ects'
            },
            {
                name: 'sws',
                xtype: 'textfield',
                label: 'Sws'
            },
            {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm'
            }
        ]        
    }
});