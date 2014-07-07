/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.BlocksList", {
    extend: "Ext.List",
    alias: "widget.blockslist",

    config: {
		itemHeight: 70,
        emptyText: '</pre> <div class="notes-list-empty-text">Bevor der Wocheplan angelegt werden kann, musst du zuerst in der Modulverwaltung deine Module eintragen.</div> <pre>',
        
        
        itemTpl: 	'</pre>'+
						'<div id="{id}">'+
							'<span >{Module.name}</span>'+
							'<span class="blocklist-assigned">'+
								'zugewiesen: '+
								'<tpl if="assigned">'+
									'ja'+
								'<tpl else>'+
									'nein'+
								'</tpl>'+
							'</span>'+
						'</div>'+
						'<div class="blocklist-row-2">'+
							'<span >'+
								'<tpl switch="type">'+
									'<tpl case="self">'+
										'Selbststudium'+
									'<tpl case="presence">'+
										'Anwesenheit'+
								'</tpl>'+
							'</span>'+
							'<span class="blocklist-assigendTo">{day} - {block}</span>'+
						'</div>'+
					'<pre>'					
    }
});
