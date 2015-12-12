App = Ember.Application.create({});
App.CCComponent = Ember.Component.extend({
	tagName:"canvas",
	attributeBindings:["id","style","size:width","size:height"],
	classNameBindings:['layer'],
	id:function(layer){
		this.set('id',this.get('row')+"_"+this.get('col')+"|"+this.get('layer'))
	}.property('layer'),
	layer:"",
	size:function(){
		return 32*9
	}.property(),
	ctx:function(){
	this.set('ctx',this.get('element').getContext('2d'))	
	}.on('didInsertElement'),
	style:"border:none;position:absolute;height:95px;width:95px",
	didInsertElement:function(){
	var x = this.get('col').toString()
	var y = this.get('row').toString()
	App.Canvas.content[y][x].pushObject(this)
		//App.Canvas.content[this.get('mid')].pushObject(this)
	},
	character:function(a,b,c){
		var _ = 32 
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;
		ctx.drawImage(App.Canvas.ZAM,a,0,_,_,b,c,_,_)
	},
	paint:function(a,b,c,d){
		var _ = 32 
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;
		ctx.drawImage(App.Canvas.ground,32*c,0,_,_,b*32,a*32,_,_)
	},
	draw:function(a,b,c,d){
		var _ = 32;
		var ctx = this.get('ctx');
		ctx.fillStyle = c;
		ctx.globalAlpha = 1;
	//	ctx.strokeText(c,b*11,a*11+9);
		ctx.fillRect(b*32,a*32,_,_)
	},
	debugtext:function(a,b,c,d){
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1  ;
		ctx.strokeText(c,b*10.5,a*10.5+9)
	}
})

App.LayerView = Ember.View.extend({
	templateName:'layer'
})
App.CanvsView = Ember.View.extend({
	templateName:'canvs',
	bindAttributes:"X:width , Y:height",

})
App.VView = Ember.CollectionView.extend({
	tagName:'ul',
	itemViewClass: App.CanvsView,
	content:[1,2,3,4,5]})

App.CView = Ember.CollectionView.extend({
	tagName:'ul',
	itemViewClass: App.LayerView,
	content:[1,2,3,4,5]
})
App.CLayerComponent = Ember.Component.extend({
	tagName:['li'],
	layers:['treeDoc','spriteDoc','depthDoc','gameDoc'],
	attributeBindings:["style"],
	style:function(){
			var size = this.get('size')+"px";
		return "height:"+size+";width:"+size+";display:inline-block"
	}.property('size'),
	size:95,
	y:function(){
		return this.get('big').indexOf(this.get('row'))
	}.property('row'),
	didInsertElement:function()	{
//		this.$().draggable({ grid: [ 95, 95 ] });
		App.Canvas.content[this.get('y')].pushObject(Em.A())
		//console.log("outer:"+row,"inner:"+this.get('col'))
	},	
})

App.CanvasController = Ember.ArrayController.extend({
	content:function(e){
		var world = this.get('world.world')
		return world 
	}.property(),
	needs:"world",
	world:Ember.computed.alias('controllers.world'),
	keeping:"things",
	init:function(){
			var om  = this.get('world')
			var ol = App.__container__.lookup('controller:sprite')
			var ov = App.__container__.lookup('controller:tree')
			var op = App.__container__.lookup('controller:step')
	setTimeout(function(){
			$('#sortable').swappable({
									  items:'.itemClass',
//									  grid:[95,95]
									})
			om.gamelayer();
			om.pathlayer();
			ov.treelayer();
			op.blocklayer();
			ol.spritelayer()
	},100)
	}
	
})
App.IndexRoute = Ember.Route.extend({
	controllerName:'canvas',
})




