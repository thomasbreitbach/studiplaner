Ext.define('studiplaner.view.Navigation', {
  extend: 'Ext.List',
  xtype: 'navigation',
  requires: ['Ext.data.Store'],
  
  config: {
    cls: 'nav-list',
    itemTpl: '{title}',
    data: [{
        title: 'Modulverwaltung'
      }, {
        title: 'Arbeitszeiten'
      }, {
        title: 'Workloadberechnung'
      }, {
        title: 'Wochenplan'
      }, {
        title: 'Assistent'
      }, {
        title: 'Export'
      }
    ]
  }
});