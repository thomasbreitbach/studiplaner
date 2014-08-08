/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.BlocksList", {
    extend: "Ext.List",
    alias: "widget.blockslist",

    config: {
		itemHeight: 70,
        emptyText: '</pre> <div class="notes-list-empty-text">Für diese Phase liegen noch keine Module/Blöcke vor.</div> <pre>',
        onItemDisclosure:false,
        grouped: true,
        ui: 'round',
        itemTpl: 	'</pre>'+
						'<div class="blocklist-row-1">'+
							'<span >{Module.name}</span>'+
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
							'<span class="blocklist-assigendTo">'+
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
								'<tpl if="phase1AssignedTo == null && phase2AssignedTo == null && phase3AssignedTo == null">'+
									'nein'+
								'</tpl>'+
							'</span>'+
						'</div>'+
					'<pre>'					
    }
});
