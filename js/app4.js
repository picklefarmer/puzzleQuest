App.CCComponent = Ember.Component.extend(App.Level,{
	tagName:"canvas",
	attributeBindings:["id","style","square:width","square:height"],
	classNameBindings:['content'],
	layer:"",
	square:function(){
return this.get('size')*this.get('ratio')
	}.property(),
	ctx:function(){	    
	  var ctx;
//	  console.log(this.get('context'))
//this.set('parentView.'+this.get('content')+"Ctx",this.get('element').getContext('2d'))
//console.log(this.get('parentView')	 ) 
this.set('ctx',this.get('element').getContext('2d'))	
	    ctx = this.get('ctx')
	    ctx.lineWidth = 7;
      ctx.strokeStyle = "orange"
	  ctx.clearRect(0,0,400,400)
	  console.log('clear')
      ctx.globalAlpha = 1 || .85
	}.on('didInsertElement'),
	style:function(){
			var prop = this.get('square')+'px;'
			return "position:absolute;height:"+prop+'width:'+prop}.property('square'),
	didInsertElement:function(){
	 //   console.log(' insert')
	  
		var xy = this.get('parentView.content')
		App.Canvas.content[xy.x][xy.y].pushObject(this)
	},
	character:function(a,b,c){
		var _ = this.get('size');
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;
		ctx.drawImage(App.Canvas.ZAM,a,0,32,32,b,c,_,_)
	},
/*	paint:function(a,b,c,d){
		var _ = this.get('size'); 
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;
		//ctx.drawImage(App.Canvas.ground,32*c,0,32,32,b*_,a*_,_,_)
    ctx.drawImage(App.Canvas.NW,24*b,24*a,24,24,(b%d)*_,(a%d)*_,_,_)
	},
*/
paint:function(a,b,x,y,e){
		var _ = this.get('size');
	   var d = this.get('ratio');	
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1;

	   try{
	  ctx.drawImage(App.Canvas.NW,a*16,b*16,16,16,(x%d)*_,(y%d)*_,_,_) 
       }catch(z){
         console.warn(a,b,x,y,e)
       }
},
	draw:function(a,b,c,d){
		var _ = this.get('size');
		var ctx = this.get('ctx');
		ctx.fillStyle = c;
		ctx.globalAlpha = 1||d;
	//	ctx.strokeText(c,b*11,a*11+9);
		ctx.fillRect(b*_,a*_,_,_)
	},
	debugtext:function(a,b,c,d){
	    var _ = this.get('size');
		var ctx = this.get('ctx');
		ctx.globalAlpha = 1  ;
		ctx.font = d+"px Helvetica"
		ctx.strokeText(a,c*_+2,b*_+_/2)
	}
})

// App.LayerView = Ember.CollectionView.extend(
//   App.Level,{
//     
//  tagName:['div'],
//  itemViewClass:App.CCComponent,
//  content:['treeDoc','spriteDoc','depthDoc','gameDoc'],
//  attributeBindings:["style"],
//  style:function(){
//          var size = this.get('size')+"px";
//      return "height:"+size+";width:"+size
//  }.property('size'),
//  square:function(){
//  var one = 95 || 32*App.__container__.lookup('controller:world').ratio
//          console.log(one)
//          return one
//  }.property(),
//  didInsertElement:function() {
//          var one = this.get('OBJ.x')
//  var one = App.Canvas.content[one].pushObject(Em.A());
//  },
//      
// })

App.CanvsView = Ember.ContainerView.extend(
	App.Level,{
	tagName:"li",
	childViews:['treeDoc','spriteDoc','depthDoc','gameDoc'],
	    pos:function(){
        var ratio = this.get('ratio'),
            size = this.get('size')*ratio;
        return "left:"+ (this.get('x') * size) + "px;"
      +      "top:" + (this.get('y')  * size) + "px"
    }.property('x','y'),
    spriteDoc:App.CCComponent,  
    treeDoc:App.CCComponent,
    depthDoc:App.CCComponent,
    gameDoc:App.CCComponent,
    x:function(){
        return this.get('content.X')
        }.property('content.X'),
    y:function(){
        return this.get('content.Y')
        }.property('content.Y'),
    mouseDown:function(){
		this.drawArrow("start")
		this.toggleProperty('controller.drag')
    },
	touchMove:function(f){
	    return true
	},
	drawArrow:function(f){
		this.get('controller').send(f,this,this.get('x'),this.get('y'),this.get('ID'))
		},     
	clearBuff:function(){   
	  var prop = this;          
	     for(var alpha = 10;alpha > 0;alpha--)
	     Em.run.later(function(){    
	         prop.decrementProperty('controller.lineObject.alpha',.1)
            //  console.log(prop.get('controller.lineObject.alpha'))
           }, alpha*50);
	     this.toggleProperty('controller.fade')
	        
	},
    spriteDocCtx:function(e,ctx){
var ctx =  this.get('spriteDoc').getContext('2d')
	ctx.lineWidth = 7;
    ctx.strokeStyle = "orange"
    ctx.clearRect(0,0,400,400)
   console.log('sprite clear')	
	 return ctx;
 }.property('spriteDoc'),

	//	arrow:function(i,j){
//	    if(this.get('controller.treeReady')){      
//	      console.warn('read only')
//	    var buff = this.get('controller.tree')
//	    var amount =this.get('size')*this.get('ratio');
//	   this.get('spriteDoc.ctx').clearRect(0,0,amount,amount)
//	  this.get('spriteDoc.ctx').drawImage(buff, this.get('x')*amount,this.get('y')*amount,amount,amount,0,0,amount,amount)
//   
//	    this.set('controller.treeReady',false)
//	    }
//	}.observes('controller.treeReady') ,
 
	fadeOutBuff:function(){
	  if(this.get('controller.fade')===true)return
	    this.clearBuff();
	}.observes('controller.fade'),
	mouseEnter:function(){
	   var om =  this.get('spriteDoc.ctx')
	   var fig = this.get('size')*this.get('ratio')
	   if(this.get('controller.drag'))return
	   this.drawArrow('line') 
	   om.strokeRect(0,0,fig,fig)	   
	},
	mouseLeave:function(){
	   var om =  this.get('spriteDoc.ctx')
	   om.clearRect(0,0,313,313)	   
	},
    mouseUp:function(){
     	this.drawArrow('end')      	
		this.toggleProperty('controller.drag')   
		this.toggleProperty('controller.fade') 
    },
	touchStart:function(){
	    console.log("touch")
		this.drawArrow('start')
	},
	touchEnd:function(){
		this.drawArrow('end')
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
		
//	console.log('fall')
	this.set('ID',x+y*this.get('parentView.content').length+1)
	this.set('content.X',x )
	this.set('content.Y',y )
	
			var one = this.get('content.x')
	var one = App.Canvas.content[one].pushObject(Em.A());
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
                console.log('element')
				this.set('controller.temp',null)
                this.get('controller.controllers.world').loader()
            })
	}.observesBefore('content.[]'),
	didInsertElement:function(){
    console.log("on ready",this.get('controller.temp'))
	    this.set('controller.canvas',this)
	}
	    
})

App.BuffView = Ember.CollectionView.extend({
		tagName : 'section',
		content : [0],
	//	template: Ember.Handlebars.compile(" "),
	    
		itemViewClass : Ember.View.extend(App.Level,{
			tagName:'canvas',
			attributeBindings:["style","X:width","Y:height"],
			style:function(){
					
					return "pointer-events:none;width:"+this.get('X')+"px;height:"+this.get('Y')+"px"
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
			 
			var one = this.get('element');
		this.set('controller.tree',one)
			 App.Canvas.buffer.pushObject([one.getContext('2d'),one])
			   return one;
			}.on('didInsertElement')
		}),
		isVisible:true,
	der:function(){
  
	}.on('didInsertElement')
})

App.CanvasController = Ember.ArrayController.extend(App.Level,{

	model:function(){
	//		console.log("content")
		var world = this.get('world')
	//	console.log(world)
	   
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
	return !this.get('shuffle')?world:world.map(function(a){return shuffle(a)})
	}.property('world'),
	actions:{
	    line:function(a,b,c,d){
	      
	        var buff = this.get('tree'),arr = [],x,y,
	            ctx = buff.getContext('2d'),
		    offset = this.get('size')*this.get('ratio'),
	            startX = this.get('x')*offset+offset/2,
	            startY = this.get('y')*offset+offset/2,
	            endX = b*offset+offset/2,
	            endY = c*offset+offset/2,
	            angle = Math.atan2(startX-endX,startY-endY),
	            deltaX = Math.abs(this.get('x')-b)+1,
	            deltaY = Math.abs(this.get('y')-c)+1,
	            difference = Math.floor(deltaX/deltaY);  
	          
	            this.set('lineObject',{
	              alpha:1,
                  ctx:ctx,
                  startX:startX,
                  startY:startY,
                  endX:endX,
                  endY:endY,
                  angle:angle,
                  deltaX:deltaX,
                  deltaY:deltaY,
                  difference:difference})
             
                                                
	  },
		start:function(a,b,c,d){
        this.set('temp',a)
        this.set('x',b)
        this.set('y',c)
       this.set('id',d)
		},
		end:function(a,b,c,d){
				console.log('error_1')
	if(this.get('temp')){		
      this.set('temp.x',b)
      this.set('temp.y' ,c)
      this.set('temp.ID' ,d)
	this.set('temp',null) 
a.set('x',this.get('x'))
a.set('y',this.get('y'))
a.set('ID',this.get('id'))
	  
			}
		}
	},
  
 	  lineObject:function(a,b,c){
	console.log(a,b,c)	
 	    return b||c}.property(),
 	  buffArrow:function(){     
	
	 var _ = this.get('lineObject'),ctx = _.ctx,
 	 size = this.get('size');
	 ctx.globalAlpha = _.alpha;                                   
 	 ctx.clearRect(0,0,700,700);
         ctx.strokeStyle = "yellow";      
         ctx.lineCap = 'round';
         ctx.beginPath()

        ctx.moveTo(_.startX,_.startY)
         ctx.bezierCurveTo(_.startX,_.startY-40,_.endX,_.endY-40,_.endX,_.endY)

         ctx.stroke()
         ctx.beginPath()
         ctx.moveTo(_.endX,_.endY)

         ctx.strokeStyle = "red";
         ctx.fillStyle = "red"
         ctx.lineWidth = 3
         ctx.lineTo(_.endX+(size*Math.cos(_.angle-45)),
         _.endY-(size*Math.sin(_.angle-45))); 
         ctx.lineTo(_.endX-(size*Math.cos(_.angle+45)),
         _.endY+(size*Math.sin(_.angle+45)));
         ctx.lineTo(_.endX,_.endY)
         ctx.stroke()
         ctx.fill()
 	  }.observes('lineObject.alpha'),
	needs:["world"],
	world:Ember.computed.alias('controllers.world.model'),
    tree:function(a,b){
       // this.toggleProperty('treeReady')
        return b 
    }.property(),
    treeReady:false,
    drag:false,
    fade:false
   
})

App.IndexRoute = Ember.Route.extend({
	controllerName:'canvas',
   actions:{
       add:function(){
           var cors = App.Canvas;
           cors.incrementProperty('level')
       }
   },
  init: function(){
		  var self = this;
     $(document).mouseup(function(e) {
		if(self.get('controller.temp')){
       self.set('controller.temp',null)
		self.set('controller.drag',false)
		}else{
	   	console.log('keyNot')
	   }
     });
   },  
})




