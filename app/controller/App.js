Ext.define('studiplaner.controller.App', {
  extend: 'Ext.app.Controller',
  config: {
    refs: {
      main: 'main',
      navigation: 'navigation',

      navBtn: 'button[name="nav_btn"]'
    },

    control: {
      navBtn: {
        tap: 'toggleNav'
      },

      navigation: {
        itemtap: function (list, index, target, record) {
          //todo: show content	
          console.log(record.data.title);
          switch(index){
          	case 1:
          		
          		break;
          	
          }
          this.toggleNav();
        }
      }
    }
  },

  /**
   * Toggle the slide navogation view
   */
  toggleNav: function () {
    var me = this,
      mainEl = me.getMain().element;

    if (mainEl.hasCls('out')) {
      mainEl.removeCls('out').addCls('in');
    } else {
      mainEl.removeCls('in').addCls('out');
    }
  }
});