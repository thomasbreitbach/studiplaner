/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.SlideMenu', {
	xtype: 'slidemenu',
	singleton: true,
	requires: ['Ext.Menu'],

	constructor: function(config) {
		this.initConfig(config);
	},
	
	setMenu: function (){	
		Ext.Viewport.setMenu(this.createMenu('left'), {
			side: 'left',
			cover: false
		})
	},

    createMenu: function(side){
        var items = [
            {
                xtype: 'list',
                itemTpl: new Ext.XTemplate(
					'<div class="x-button x-iconalign-center x-button-plain x-layout-box-item x-stretched">',
						'<span class="x-button-icon x-shown {iconCls}"></span>',
						'<span class="x-button-label" style="text-align: left !important; margin-left: 1em;">{title}</span>',
					'</div>'
				),
                width: 250,
                height: '100%',
                margin: '0 0 0 0',
                cls: 'slidemenu',
                scrollable: true,
                data: [
                    {
						title: 'Modulverwaltung',
						iconCls: 'modules',
						itemId: 'modules'
					}, {
						title: 'Arbeitsstellen', 
						iconCls: 'briefcase',
						itemId: 'work'
					}, {
						title: 'Workload', 
						iconCls: 'dashboard',
						itemId: 'workload'
					}, {
						title: 'Wochenplan',
						iconCls: 'calendar',
						itemId: 'calendar'
					}, 
					//~ {
						//~ title: 'Assistent',
						//~ iconCls: 'magic',
						//~ itemId: 'assistent'
					//~ }, 
					//~ {
						//~ title: 'Export',
						//~ iconCls: 'upload',
						//~ itemId: 'export'
					//~ },
					{
						title: 'Impressum',
						iconCls: 'info',
						itemId: 'imprint'
					}
                ],
                listeners: {
					itemtap: { fn: this.onListItemTap, scope: this }
				}
            }
        ];
        return Ext.create('Ext.Menu', {
            style: 'padding: 0',
            items: items
        });
    },
    
    onListItemTap: function (list, index, target, record, evt, options){
		Ext.Viewport.fireEvent('slideMenuCommand', this, record);
	}
});
