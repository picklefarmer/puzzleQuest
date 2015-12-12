App.SpriteController = Ember.Controller.extend(
	App.Level,{
		needs:["world","light"],
	worldBinding:'controllers.world',
	lightBinding:'controllers.light',
	spritelayer:function sprite(){
		console.log('begin')
	var set = App.Canvas.content,
		main = this,
		self = this,
		ratio = this.get('ratio'),
		size = this.get('size'),size
		width = this.get('width')/ratio,
		time = this.get('time'),
		lantern = function(_){
		   // console.log(_)
			main.get('light').lantern(_)
		},   
		resetworld = this.get('world.loader'),
		currentPath = this.get('world.currentpath'),
	
        r = 0,s = 0,o = 0,
        hold = time,
        dire = {},
	   	index =[  [-1,0], //"south"
                  [0,1],  //"west"
                  [1,0],  //"north"
                  [0,-1], //"east"
                ];
                console.log('begin 2 ')
  for(o=0;o<16;o+=4){
    (function(o,s){
         Object.defineProperty(dire,index[s],{
         set:function(_){
					 var j = index[s];
					 set[_.a]
		    	    [_.b]
			  		  [1]
			    .character(
	      /*dire*/ o*32+(_.j?32:0),// 
	      /* X  */  _.d*size+(_.j?j[1]*size/2:0),// 
	      /*  Y */  _.c*size+(_.j?j[0]*size/2:0))
						_.j=true;
   }})}(o,s));s++
   }function drawChar(_,e,et,$,half,light){   
	var O  =  {
			   c:	e[0]%ratio,
			   d:	e[1]%ratio,
			   a:	self.unit(e[0]),
			   b:	self.unit(e[1]),
			   e:	self.unit($[2][0]),
			   f:	self.unit($[2][1]),
		   get g(){	return this.a*width+this.b+1},
		   get h(){	return this.e*width+this.f+1},
		   get i(){ var index = App.Canvas.index, 
				    g = this.g,h=this.h,
				   	current = g-h
					next = index[g]-index[h];
					return current === next
		   },j:false
	}
	time = e[2]?hold*1.5:hold;

	var lock = ((O.a === O.e) && (O.b === O.f)) || O.i;

	clear (et[0],et[1]) 	
	dire[[_[0],_[1]]] = O;
Em.run.later(function(){	
   
	clear (e[0],e[1]) 	
	dire[[half[0],half[1]]] = O
	if(lock)lantern(light)
	
},time/2)
		lantern($)
	return lock ? false : $[5];

	
	}function clear(a,b){
		var _ = size,ctx,elem;
	try{ctx  =  set[self.unit(a)][self.unit(b)][1];
   		ctx.ctx.clearRect((b%ratio)*size-size/2,(a%ratio)*size-size/2,_+size,_+size/2);
		}
	catch(err){}
	}function direction(c,p){
      return[ ~~(c[0]>p[0]) ||	 //north
              -~~(c[0]<p[0])||0 , //east
              ~~(c[1]>p[1]) ||    //west
              -~~(c[1]<p[1])||0 //south
    	     ]
    }function getArgs(e,f,g,self){
	 var map,cP = currentPath,g;
         if(!g){map =  [	 
         		 		e,              //  0  
 		         	 	cP[f-1]  || 0,  //  +1 
	 	            cP[f+1]  || 0,  //  -2 
		            cP[f-2]  || 0,  //  -1 
	   	          cP[f-3]  || 0,  //  +2 
						cP.length - f
		 ]}else{
				 g = g.length;
				 map = [	 
		    			cP[g-f]    || 0,  //  0  
 		        	cP[g-f+1]  || 0,  //  +1 
	 	          cP[g-f-1]  || 0,  //  -2 
		          cP[g-f+2]  || 0,  //  -1 
	   	        cP[g-f+3]  || 0,  //  +2 
						g-f         			    
				 		]	
		 }return map;
	}function go(F,S,self){
	   
		if((F+1 === currentPath.length)&&(S !== true))
		{
   App.Canvas.incrementProperty('level',1);  
	       return
	   }else{
	   Ember.run.later(
		function(){
	   var serve = func(F,S);
   		   serve ? go(serve,!S) : go(++F,S,self);
	   },time)
   }
    }
    function func(F,S,self){
       var _,$,f;
	   var g = S ? currentPath : null;
	   var e = currentPath[F] || 0; 
	   
	   if(e === 0 ){return 1}
	   
		f = currentPath[F+1] || 0;
    	_ = getArgs(e,F,g);
		$ = getArgs(f,F+1,g)
			return drawChar(direction(_[0],_[1]),_[0],_[1],_,direction($[0],$[1]),$)
	}
	go(0,0,this)

  }
})
