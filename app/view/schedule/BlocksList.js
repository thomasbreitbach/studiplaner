/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.BlocksList", {
    extend: "Ext.List",
    alias: "widget.blockslist",

    config: {
		loadingText: "Lade Module...",
		itemHeight: 70,
        emptyText: '</pre> <div class="notes-list-empty-text">Bevor der Wocheplan angelegt werden kann, musst du zuerst in der Modulverwaltung deine Module eintragen.</div> <pre>',
        onItemDisclosure:false,
        grouped: true,
        
        itemTpl: 	'</pre>'+
						'<div>'+
							'<span >{Module.name}</span>'+
							'<span class="blocklist-assigned">'+
								'zugewiesen: '+
								'<tpl if="phase1AssignedTo">'+
									'P1 '+
								'</tpl>'+
								'<tpl if="phase2AssignedTo">'+
									'P2 '+
								'</tpl>'+
								'<tpl if="phase3AssignedTo">'+
									'P3 '+
								'</tpl>'+
								'<tpl if="!phase3AssignedTo && !phase2AssignedTo && !phase3AssignedTo">'+
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
