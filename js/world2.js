App.WorldController = Ember.Controller.extend(
  App.Level,{	
      needs:['step','sprite','tree','game'],
	generate:function(e,f,g,s,o){
		var h = e[e.length-1];	
			h.length <= g ? 
			h.push([o,h.length%(g+1)]) :  
		   (e.push([Ember.A([++o,0])]),s ? 
	App.Canvas.content.pushObject(Ember.A()):null);
	return (e[f] && e[f][g] )? e :  
	       this.generate(e,f,g,s,o)

	},
	dawntrue:false,
	treetrue:false,
	gametrue:false,
	dawn:function(){
        var self = this;
   		var a = new Image();
   	 	a.src = "art/buildings/dawnblocker_ortho.png";
   		a.onload = function(){  			
   		    self.set('dawn',a)    
   		    self.set('dawntrue',true)   
   		    }   
   		}.on('init'),
  game:function(){
		var self = this;
		var a = new Image();
		a.src = "art/buildings/final.jpg";
		a.onload = function(){
			self.set('gametrue',true)
			self.set('game',a)
		}
	}.on('init'),
	tree:function(){
       var self = this; 
       var a = [];    
       for(var i = 1;i<30;i++){
   	     a.push((i>9?i:0+""+i))
   		}
   		a =a.map(function(e,f){
   		f = new Image();
   		f.src = "art/trees/tree_"+e+".png"
   		return f;
   		})
   	a[1].onload = function(){
   		self.set('treetrue',true)
		self.set('tree',a)
    };                  
	}.on('init'),         
	loaded:Ember.computed.and('dawntrue',"treetrue",'gametrue'),
	loader:function(){if(this.get('loaded') ){ console.log('dawnload')      
     this.get('controllers.game').gamelayer(this.get('game'))
 this.get('controllers.tree').treelayer(this.get('tree'))
     this.get('controllers.step').blocklayer(this.get('dawn')) 	    
     this.get('controllers.sprite').spritelayer()
	   }
	}.observes('dawntrue','treetrue','gametrue'),
 	begin:function(){
	   
	   App.Canvas.set('content',[Em.A()])
       App.Canvas.set('index',Em.Object.create({}))
	},
    model:function(){       
        console.log('model')
        this.begin()
	    var W = this.unit(this.get('width')-1),
            H = this.unit(this.get('height')-1),
            result = this.generate([[[0,0]]],H,W,true,0);          
        return result;
	}.property("land"),
	land:function(a,b,c){
			//console.log(a,b,c);
			return b}.property(),
    gameOn:function(){
        console.log('land')
        var H = this.get('height') - 1,
            W = this.get('width') - 1 ; 
        this.set('land',this.generate([[0]],H,W))
    }.observes("resetlevels"),
    currentpath:function(){
       
        console.log('currentpath')
        return this.get('path')
    }.property('path'),
	terrain:function(){
	    console.log("terrain")
	    //var world = this.get('land'),
	    	var lvl = this.get('resetlevels')%36
	    	var world = App.Canvas.layers[lvl],land = [];
	    /*	
				world = world.map(function(e){
				return e.map(function(f){
					return ~~(Math.random()*1.215);		
				})
			})      
			*/
		world.forEach(function(e,f){
			var rowd = Math.floor(f/20); 
		 	if(!land[rowd]){land[rowd] = [~~!e]}else{land[rowd].push(~~!e)}		
		//	console.log(land[rowd])
			})      
	      // console.log(land)	       
			return land; 
			//		return world 
	}.property('land'),
	 path:function(){
	     console.log("path")
		var	currentPath = [],pathS,pathE,
		H = this.get('height'),
		W = this.get('width'),
		world = this.get('terrain'),
		findPath = this.get('pathfinder')
		max = this.get('max'),runner = 1;

		function rand(a){
    	  var aler = Math.floor(Math.random()*a)
		  //console.log(a,aler)   
		 
		  return aler;
		}
		while ((currentPath.length === 0) || (currentPath.length <= max))
		{
			pathS = [rand(H),rand(W)];
			pathE = [rand(H),rand(W)];
			if (world[pathS[0]][pathS[1]] === 0){
			currentPath = findPath(world,pathS,pathE,H,W,this.get('squiggle'));
			
			}
			runner++
			if(runner%100 === 0){max -= 10}
		}	
		//this.set('currentpath',currentPath);
	//	this.gamelayer()
		console.log("Path:",currentPath.length)
		    currentPath.map(function(e){
		                     world[e[0]][e[1]] = 2;
		                 });   
		return currentPath;
	 }.property('terrain'),	 
})
