/**
 * Lockable Carousel. Solution by
 * https://stackoverflow.com/users/124568/jtymann
 * 
 */
Ext.define('studiplaner.view.LockableCarousel', {
    extend: 'Ext.Carousel',
    alias: "widget.lockablecarousel",
    initialize: function () {
       this.onDragOrig = this.onDrag;
       this.onDrag = function (e) { if(!this.locked){this.onDragOrig(e);} }
    },
    locked: false,
    lock: function () { this.locked = true; },
    unlock: function () { this.locked = false; }
});
