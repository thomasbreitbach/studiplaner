/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.ScheduleCarousel", {
    extend: "Ext.carousel.Carousel",
    alias: "widget.schedulecarousel",
    
    config: {
		fullscreen: true,
		direction: 'horizontal',
		itemLength: window.innerWidth-60,
		defaults: {
			styleHtmlContent: true
		},
		items: [{
				html : 'Montag',
				style: 'background-color: #759E60'
			},
			{
				html : 'Dienstag',
				style: 'background-color: #5E99CC'
			},
			{
				html : 'Mittwoch',
				style: 'background-color: #702097'
			},
			{
				html : 'Donnerstag',
				style: 'background-color: #5454C9'
			},
			{
				html : 'Freitag',
				style: 'background-color: #35B795'
			},
			{
				html : 'Samstag',
				style: 'background-color: #DE21C9'
			},
			{
				html : 'Sonntag',
				style: 'background-color: #D7C941'
			}
		]
    }
});
