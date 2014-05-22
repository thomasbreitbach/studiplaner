/**
 * @author Thomas Breitbach
 */
var chart;
const H_PER_ECTS = 30;
const H_PER_SWS = 0.75;
const WEEKS_PER_SEM = 17;
const WORKLOAD_STRING = ' Arbeitsstunden/Woche';

Highcharts.setOptions({
	colors: ['#80ba24', ' #4a5c66']
});

Ext.define('studiplaner.form.ModuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.moduleform',
    
    requires: [
    	"Ext.form.FieldSet",
    	'Ext.SegmentedButton',
    	'Ext.field.Number'
    ],
    config: {
        title: 'ModuleForm',
        scrollable:'vertical',
        
        items: [
        	{
        		xtype: "toolbar",
        		docked: "top",
        		itemId: 'topToolbar',
        		title: "Neues Modul",
        		items: [
        			{
        				xtype: "button",
        				ui: "back",
        				text: 'Zurück',
        				iconCls: '',
        				itemId: "backButton"
        			}, {
        				xtype: "spacer"
        			}, {
        				xtype: "button",
        				ui: "action",
        				text: "",
        				iconCls: 'search',
        				itemId: "searchButton"
        			}
        		]
        	}, {
				xtype: 'segmentedbutton',
				itemId: 'typeButton',
				allowMultiple: false,
				layout:{
					type:'hbox',
					align:'center',
					pack:'center'
				},
				items: [
					{
						text: 'Normal',
						pressed: true,
						width: '32%',
						id: 'normal',
						value: 0
					},
					{
						text: 'Block',
						width: '32%',
						id: 'block',
						value: 1
					},
					{
						text: 'ohne Vorlesung',
						width: '32%',
						id: 'ov',
						value: 2
					}
				]
			
			},{
        		xtype: "fieldset",
        		itemId: "fields",
        		items: [
					 {
		                name: 'name',
		                xtype: 'textfield',
		                label: 'Name'
		            }, {
		                name: 'ects',
		                xtype: 'numberfield',
		                itemId: 'numberfield_ects',
		                label: 'ECTS'
		            }, {
		                name: 'sws',
		                xtype: 'numberfield',
		                label: 'SWS',
		                itemId: 'numberfield_sws'
		            },{
						xtype: 'panel',
						title: '',
						itemId: 'chart',
						width: '100%',
						height: '300px',
					},{
						title: 'yourInterest',
						html: ['Persönliches Interesse'],
						styleHtmlContent: true
					}, {
						xtype: 'segmentedbutton',
						itemId: 'interestButton',
						allowMultiple: false,
						layout:{
							type:'hbox',
							align:'center',
							pack:'center'
						},
						items: [
							{
								text: 'Hoch',
								id: 'interest_good',
								width: '33%',
								value: 0,
								iconCls: 'happy',
								iconMask: true
							},
							{
								text: 'Mittel',
								id: 'interest_medium',
								width: '33%',
								value: 1,
								iconCls: 'smiley',
								iconMask: true
							},
							{
								text: 'Niedrig',
								id: 'interest_bad',
								width: '33%',
								value: 2,
								iconCls: 'sad',
								iconMask: true
							}
						]
					
					}, {
						title: 'yourServerity',
						html: ['Eingeschätzter Schwierigkeitsgrad'],
						styleHtmlContent: true
					},  {
						xtype: 'segmentedbutton',
						itemId: 'severityButton',
						allowMultiple: false,
						layout:{
							type:'hbox',
							align:'center',
							pack:'center'
						},
						items: [
							{
								text: 'Hoch',
								id: 'severity_good',
								width: '33%',
								value: 0
							},
							{
								text: 'Mittel',
								id: 'severity_medium',
								width: '33%',
								value: 1
							},
							{
								text: 'Niedrig',
								id: 'severity_bad',
								width: '33%',
								value: 2
							}
						]
					
					},
        		]
        	},     {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm',
                itemId: "addButton",
            }, {
        		xtype: "toolbar",
        		docked: "bottom",
        		itemId: "bottomToolbar",
        		title: "",
        		items: [
        			{
        				xtype: "button",
        				ui: "action",
        				text: '',
        				iconCls: 'trash',
        				itemId: "deleteButton",
        			}
        		]
        	}
            
        ],
        listeners: [
        	{
        		delegate: "#backButton",
        		event: "tap",
        		fn: "onBackButtonTap"
        	}, {
        		delegate: '#addButton',
        		event: 'tap',
        		fn: 'onAddButtonTap'
        	}, {
				delegate: "#deleteButton",
        		event: "tap",
        		fn: "onDeleteButtonTap"
			}, {
				delegate: "#typeButton",
        		event: "toggle",
        		fn: "onSegmentedButtonToggle"
			}, {
				delegate: "#interestButton",
        		event: "toggle",
        		fn: "onSegmentedButtonToggle"
			}, {
				delegate: "#severityButton",
        		event: "toggle",
        		fn: "onSegmentedButtonToggle"
			}, {
				delegate: '#numberfield_ects',
				event: 'change',
				fn: 'onNumberFieldChange'
			}, {
				delegate: '#numberfield_sws',
				event: 'change',
				fn: 'onNumberFieldChange'
			}
        ]        
    },
    
    initialize: function(){
		this.callParent(arguments);
		
		chart = new Highcharts.Chart({
    
			chart: {
				renderTo: this.down('#chart').element.dom,
				backgroundColor:'rgba(255, 255, 255, 0.1)',
				plotBackgroundImage: null,
				plotBorderWidth: 0,
				plotShadow: false
			},
			
			title: {
				text: '0' + WORKLOAD_STRING,
				align: 'center',
				verticalAlign: 'middle',
				y: 85
			},
			
			tooltip: {
				pointFormat: 'Anteil: <b>{point.percentage:.1f}%</b>'
			},
			
			exporting: { enabled: false },
			credits: false,
			
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: true,
						distance: -50,
						style: {
							fontWeight: 'bold',
							color: 'white',
							textShadow: '0px 1px 2px black'
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
					
			series: [{
				type: 'pie',
				id: 'ratio',
				name: 'Ratio Anwesenheit/Selbststudium',
				innerSize: '50%',
				data: [
					['Anwesenheit',   1],
					['Selbststudium',       1],
				]
			}]
		
		});
	},
    
    //Listener functions
    onBackButtonTap: function(){
    	console.log("backToHomeCommand");
		this.fireEvent("backToHomeCommand", this);
    },
    onAddButtonTap: function(){
    	console.log('saveModuleCommand');
    	this.fireEvent('saveModuleCommand', this);
    }, 
    onDeleteButtonTap: function () {
	    console.log("deleteNoteCommand");
	    this.fireEvent("deleteModuleCommand", this);
	},
    onSegmentedButtonToggle: function (container, button, isPressed, eOpts){
		console.log("segmentedButtonCommand");
		if(isPressed){
			this.fireEvent('segmentedButtonCommand', this, container, button);
		}
	},
	onNumberFieldChange: function (field, newValue, oldValue, eOpts){
		console.log("onNumberFieldChange");
		
		//~ TODO	Performance	
		var ects = 0;
		var sws = 0;
		var field;
		
		if(field.getItemId() === 'numberfield_ects'){
			ects = parseInt(newValue);	
			field = this.down('#numberfield_sws').getValue();
			if(field != null) sws = field;
		}else{
			sws = parseInt(newValue);
			field = this.down('#numberfield_ects').getValue();
			if(field != null) ects = field;
		}
		
		var workloadPerWeek = Math.round(ects * H_PER_ECTS / WEEKS_PER_SEM);
		var presencePerWeek = sws * H_PER_SWS;
		var selfStudyPerWeek = workloadPerWeek - presencePerWeek;	

		chart.get('ratio').setData([
					['Anwesenheit', presencePerWeek],
					['Selbststudium', selfStudyPerWeek],
				], true, true, false);
		
		chart.setTitle(
			{
				text: '~' + workloadPerWeek + WORKLOAD_STRING,
				align: 'center',
				verticalAlign: 'middle',
				y: 85
			}
		);
	}
});
