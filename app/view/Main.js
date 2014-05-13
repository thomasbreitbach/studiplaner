Ext.define('studiplaner.view.Main', {
  extend: 'Ext.Panel',
  xtype: 'main',
  requires: ['studiplaner.form.ModuleForm'],
  
  config: {
    items: [{
        title: 'Home',
        iconCls: 'home',
        html: ['MainView. Content here.'],
        styleHtmlContent: true
      }, {
        xtype: 'titlebar',
        title: 'Studiplaner THM',
        docked: 'top',
        items: [{
            align: 'left',
            name: 'nav_btn',
            iconCls: 'list',
            ui: 'plain'
          }
        ]
      }
    ]
  }
});