/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.ModulesList", {
    extend: "Ext.List",
    alias: "widget.moduleslist",
    
    config: {
        loadingText: "Lade Module...",
        emptyText: '</pre> <div class="notes-list-empty-text">Aktuell liegen keine MOdule vor.</div> <pre>',
        onItemDisclosure: true,
        grouped: true,
        //TODO
        itemTpl: '</pre><div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div><pre>',
    }
});