App.CCComponent = Ember.Component.extend(App.Level,{
	tagName:"canvas",
	attributeBindings:["id","style","square:width","square:height"],
	classNameBindings:['content'],
	layer:"",
	square:function(){
return this.get('size')*this.get('ratio')
	}.property(),
	ctx:function(){
	this.set('ctx',this.get('element').getContext('2d'))	
	}.on('didInsertElement'),
	style:function(){
			var prop = this.get('square')+'px;'
			return "position:absolute;height:"+prop+'width:'+prop}.property('square'),
	didInsertElement:function(){
		var xy = this.get('parentView.OBJ')
		App.Canvas.content[xy.x][xy.y].pushObject(this)
	},

	character:function(a,b,c){
		var _ = this.get('size');
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;
		ctx.drawImage(App.Canvas.ZAM,a,0,32,32,b,c,_,_)
	},
	paint:function(a,b,c,d){
		var _ = this.get('size'); 
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;
		ctx.drawImage(App.Canvas.ground,32*c,0,32,32,b*_,a*_,_,_)
	},
	draw:function(a,b,c,d){
		var _ = this.get('size');
		var ctx = this.get('ctx');
		ctx.fillStyle = c;
		ctx.globalAlpha = d;
	//	ctx.strokeText(c,b*11,a*11+9);
		ctx.fillRect(b*_,a*_,_,_)
	},
	debugtext:function(a,b,c,d){
	    var _ = this.get('size');
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1  ;
		ctx.font = "12px Verdana"
		ctx.strokeText(a,c*_+2,b*_+_/2)
	}
})

App.CanvsView = Ember.View.extend(
	App.Level,{
	tagName:"li",
	templateName:'canvs',
	
	classNames:["ui-state-default"],
	attributeBindings:['style','id:name','port'],
	style:function(){
		var one = this.get('ratio')*this.get('size')+"px"
		return  "width:"+one+";height:"+one;
	}.property(),
	id:function(){ return this.get('content.id')}
		.property('content'),
port:function(){
    // console.log(this)
            this.set('port',this.get('contentIndex'))
        }.property('contentIndex'),
	fallin:function(){
			var number  = this.get('content.id');
			var charater = this.get('contentIndex')
	App.Canvas.index.set(number.toString(),charater)
		
	}.on('didInsertElement')
})

App.CView = Ember.CollectionView.extend(
  App.Level,{
	tagName:'ul',
	itemViewClass:App.CanvsView,
	attributeBindings:['style'],
	style:function(){
			return	"width:"+ (this.get('width')
					* this.get('size')+60)+'px'
	}.property(),
	didInsertElement:function(){
	    var om = this.content
	    this.$().sortable({
	          
	           update:function(e,f,g){
	               om.arrayContentWillChange()
	               console.log(om)
	               $(this).children().map(function(e,f){
	               App.Canvas.index[$(f).attr('name')] = e + 1 })
	               }}).disableSelection()
	      
	    }
})

App.LayerView = Ember.CollectionView.extend(
  App.Level,{
	tagName:['div'],
	itemViewClass:App.CCComponent,
	content:['treeDoc','spriteDoc','depthDoc','gameDoc'],
	attributeBindings:["style"],
	style:function(){
			var size = this.get('size')+"px";
		return "height:"+size+";width:"+size
	}.property('size'),
	square:function(){
	var one = 95 || 32*App.__container__.lookup('controller:world').ratio
			console.log(one)
			return one
	}.property(),
	didInsertElement:function()	{
			var one = this.get('OBJ.x')
	var one = App.Canvas.content[one].pushObject(Em.A());
	},	
})
App.BufferView = Ember.CollectionView.extend({
		tagName : 'section',
		content : [0],
		template: Ember.Handlebars.compile(" "),
		itemViewClass : Ember.View.extend(App.Level,{
			tagName:'canvas',
			attributeBindings:["style","X:width","Y:height"],
			style:function(){
					
					return "width:"+this.get('X')+"px;height:"+this.get('Y')+"px"
			}.property('X','Y'),
			X:function(){
				return this.get('width')*
					   this.get('size');
			}.property(),
			Y:function(){
				return this.get('height')*
					   this.get('size');
			}.property(),
			context:function(){
			var one = this.get('element')	
			   App.Canvas.buffer.pushObject([one.getContext('2d'),one])
			   return one;
			}.on('didInsertElement')
		}),
		isVisible:false
})

App.CanvasController = Ember.ArrayController.extend({
	content:function(e){
		var world = this.get('world.world')
		var orn = world.reduce(function(a,b){
				return a.concat(b)
		});
		orn = orn.map(function(e,f){
				return {x:e[0],y:e[1],id:f+1}
		})
		function shuffle(o){ //v1.0
         for(var j, x, i = o.length; i; j = 
             Math.floor(Math.random() * i),
             x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
        
//		return orn
		return shuffle(orn)
	}.property(),
	needs:"world",
	world:Ember.computed.alias('controllers.world'),
	keeping:"things",
	init:function(){
			var om  = this.get('world')
			var ol = App.__container__.lookup('controller:sprite')
	setTimeout(function(){
			om.gamelayer();
			om.pathlayer();
			ol.spritelayer()
	},100)
	}
	
})
App.IndexRoute = Ember.Route.extend({
	controllerName:'canvas',
})




