App.CCComponent = Ember.Component.extend(App.Level,{
	tagName:"canvas",
	attributeBindings:["id","style","square:width","square:height"],
	classNameBindings:['content'],
	layer:"",
	square:function(){
return this.get('size')*this.get('ratio')
	}.property(),
	ctx:function(){
	    
    	this.set('parentView.parentView.'+this.get('content'),this.get('element').getContext('2d'))
	this.set('ctx',this.get('element').getContext('2d'))	
	}.on('didInsertElement'),
	style:function(){
			var prop = this.get('square')+'px;'
			return "position:absolute;height:"+prop+'width:'+prop}.property('square'),
	didInsertElement:function(){
	    console.log(' insert')
	    
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
	var one = 95 ||     32*App.__container__.lookup('controller:world').ratio
			console.log(one)
			return one
	}.property(),
	didInsertElement:function()	{
			var one = this.get('OBJ.x')
	var one = App.Canvas.content[one].pushObject(Em.A());
	},
		
})

App.CanvsView = Ember.View.extend(
	App.Level,{
	tagName:"li",
	templateName:'canvs',
    pos:function(){
        var ratio = this.get('ratio'),
            size = this.get('size')*ratio;
        return "left:"+ (this.get('x') * size) + "px;"
      +      "top:" + (this.get('y')  * size) + "px"
    }.property('x','y'),
    
    x:function(){
        return this.get('content.X')
        }.property('content.X'),
    y:function(){
        return this.get('content.Y')
        }.property('content.Y'),
    mouseDown:function(){
		this.start("start")
    },
	touchMove:function(f){
	    return true
	},
	start:function(f){
			console.log(f)
		this.get('controller').send(f,this,this.get('x'),this.get('y'),this.get('ID'))
		},
	spriteDoc:function(e,ctx){
	    ctx.lineWidth = 7;
	    ctx.strokeStyle = "orange"
	    ctx.globalAlpha = .85
	    return ctx;
	}.property(),
	arrow:function(){
	    var buff = App.Canvas.buffer[0][1];
	    var amount =this.get('size')*this.get('ratio');
	    this.get('spriteDoc').drawImage(buff, this.get('x')*amount,this.get('y')*amount,amount,amount,0,0,amount,amount)
	}.observes('spriteDoc'),
	mouseEnter:function(){
	   var om =  this.get('spriteDoc')
	   var fig = this.get('size')*this.get('ratio')
	
	   om.strokeRect(0,0,fig,fig)
	 console.log(this)
	   
	},
	mouseLeave:function(){
	   var om =  this.get('spriteDoc')
	   om.clearRect(0,0,313,313)
	  
	   
	},
    mouseUp:function(){
     	this.start('end') 
    },
	touchStart:function(){
	    console.log("touch")
		this.start('start')
	},
	touchEnd:function(){
		this.start('end')
	},
	classNames:["drag"],
	attributeBindings:['style','id:name'],

	style:function(){
		return this.get('pos');
	}.property('pos'),
	id:function(){ return this.get('content.id')}
		.property('content'),
    ID:function(a,b){
        App.Canvas.index.set(this.get('id').toString(),b)
        return b
    }.property(),
	fallin:function(){
			var number  = this.get('content.id'),
			 x = this.get('contentIndex'),
			 y = this.get('parentView.contentIndex');
			// this.set('ID',5)
	console.log('fall')
	this.set('ID',x+y*this.get('parentView.content').length+1)
	this.set('content.X',x )
	this.set('content.Y',y )
		
	}.on('didInsertElement')
})

App.CanvasView = Ember.CollectionView.extend(
  App.Level,{
	tagName:'ul',
	contentBinding:'controller',
	itemViewClass:Ember.CollectionView.extend({	  
	    itemViewClass:App.CanvsView,
	}),
	attributeBindings:['style'],
	style:function(){
			return	"width:"+ (this.get('width')
					* this.get('size')+60)+'px'
	}.property(),
    cln:function(){
            Ember.run.scheduleOnce('afterRender',this,function(){
                this.get('controller.controllers.world').dawnLoad()
            })
	}.observesBefore('content.[]')
	
	    
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
			}.property('width'),
			Y:function(){
				return this.get('height')*
					   this.get('size');
			}.property('height'),
			context:function(){
			var one = this.get('element')	
			   App.Canvas.buffer.pushObject([one.getContext('2d'),one])
			   return one;
			}.on('didInsertElement')
		}),
		isVisible:false
})

App.CanvasController = Ember.ArrayController.extend({
	model:function(){
			console.log("content")
		var world = this.get('world')
		console.log(world)
	   
		world = world.map(function(a,b){
		    return a.map(function(e,f){
				return {x:e[0],y:e[1],id:b*a.length+f+1}
			})
		})
		function shuffle(o){ //v1.0
         for(var j, x, i = o.length; i; j = 
             Math.floor(Math.random() * i),
             x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
		return world
		return world.map(function(a){return shuffle(a)})
	}.property('world'),
	actions:{
		start:function(a,b,c,d){
        this.set('temp',a)
        this.set('x',b)
        this.set('y',c)
       this.set('id',d)
		},
		end:function(a,b,c,d){
      this.set('temp.x',b)
      this.set('temp.y' ,c)
      this.set('temp.ID' ,d)
	  this.set('temp',a)
      this.set('temp.x',this.get('x'))
      this.set('temp.y',this.get('y'))
      this.set('temp.ID',this.get('id'))
		}
	},

	needs:["world"],
	world:Ember.computed.alias('controllers.world.model'),
    
   
})

App.IndexRoute = Ember.Route.extend({
	controllerName:'canvas',
   actions:{
       add:function(){
           var cors = App.Canvas;
           cors.set('height',cors.height+8)
       }
   }
})




