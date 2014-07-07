/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.BlocksList", {
    extend: "Ext.List",
    alias: "widget.blockslist",

    config: {
		store: "ScheduleBlocks",
		itemHeight: 70,
        emptyText: '</pre> <div class="notes-list-empty-text">Bevor der Wocheplan angelegt werden kann, musst du zuerst in der Modulverwaltung deine Module eintragen.</div> <pre>',
        
        
        itemTpl: 	'</pre>'+
						'<div id="{id}">'+
							'<span >{Module.name}</span>'+
							'<span class="blocklist-assigned">zugew.: {assigned}</span>'+
						'</div>'+
						'<div class="blocklist-row-2">'+
							'<span >{type}</span>'+
							'<span class="blocklist-assigendTo">{day} - {block}</span>'+
						'</div>'+
					'<pre>'					
    }
});
