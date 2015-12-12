App.StepController = Ember.Controller.extend(
	App.Level,	
		{
	needs:['world','sprite'],
	world:Ember.computed.alias('controllers.world'),
    block : function(){
       console.log('FINISH',this.get('currentpath'))
       	    this.blocklayer(this.get('controllers.world.dawn'))
       	    this.get('controllers.sprite').spritelayer()
    }.observes('controllers.world'),
	blocklayer:function(DAWN,a){
	    console.log('block')
		var	self = this,
			DAWN = DAWN || this.get('dawn') ,dust={},s = 0,
			ratio = self.ratio,
			size = self.size,
			currentPath = a || this.get('world.currentpath'),
			depthctx = function(_,b){
		 		return App.Canvas.content[self.unit(_[0])][self.unit(_[1])][b].ctx
		 	};
			block = [ 
	   	        [0,0],//block
           		[1,0],//crate
          		[2,0],//brick
          		[3,0],//left
           		[4,0],//right
          		[1,1],//
           		[3,1],
           		[4,1]
		        ];
   for(o=0;o<block.length;o++){
      (function(o){
			var ran  = function(a){return Math.floor(Math.random()*a)},
				one = ran(8);two = ran(2);
          Object.defineProperty(dust,block[o],{
          set:function(XY){
             var x = (XY[1]%ratio)*size,y = (XY[0]%ratio)*size,
             ctx = depthctx(XY,0);
			 if(XY[2]){
				 ctx.fillStyle = XY[2]
				 ctx.fillRect(x,y,size,size)
			 }else{
					 try{ 
	         ctx.drawImage(DAWN,
	            (block[o][0]*17+4)+(148*two),
	            (block[o][1]*31+13)+(46*one +10*one),
	             16,16,x,y,size,size)      
             }catch(e){
               console.log(DAWN,size,x,y,e)
             }
            }
		  }
		  });
        }(o))
		s++
   }
['green','red','yellow','blue','orange','purple'].forEach(function(color,f){
Object.defineProperty(dust,color,{
set:function(XY){
   var x = (XY[1]%ratio)*size,y = (XY[0]%ratio)*size,
     ctx = depthctx(XY,3);
//	 ctx.font = size/2+"pt Serif";
	 ctx.fillStyle = color;
	 ctx.globalAlpha = .5
	 ctx.fillRect(x,y,size,size)
	 
	 ctx.fillStyle = "black";
	 ctx.strokeText(color[0],x+14,y+22)
//	 ctx.fill()dd
}
})
})
stepsPath();
    function stepsPath(){
			var deep = 0,depth = 0;
            currentPath.forEach(function(e,f){
                var et = currentPath[f-1] || [0,0];

var _=[currentPath[f-1],currentPath[f],currentPath[f+1],currentPath[f+2]]

var $=function $( b , c, a, d){
		var e = d ? _[b ][~~! a] < _[c ][~~! a] 
				  : _[b ][~~! a] > _[c ][~~! a];
			 if(e){
				 if(depth < 10){
					    deep?deep--:null;
					 	depth ++ 
					 }
			 }else{ 
					 if(depth > 0){
						depth --
			 		 }else{
						deep++}	 
			}
}
var slot = function(arr,coor){
	return arr.every(function(e){return _[e][coor] === _[arr[0]][coor]})
}
var run = {
	0:currentPath[f-1],
	1:currentPath[f],
	2:currentPath[f+1],
	3:currentPath[f+2],
	slot : function(arr,coor){
		return arr.every(function(e){return this[e][coor] === this[arr[0]][coor]})
	},
	q:function(f,l){
        var f  = f.length === 1 ? (this[f][2]) : (this[f][0] && this[f][1] ? true : false)
		return f? this : l
	},
	y:function(s,l){
			var s = slot([s],0)
		return s? l: this
	},
	x:function(s,l){
			var s = slot([s],1)
		return s? l: this
	}
}
depthctx(e,2).globalAlpha =  depth/10;
_[1][3] = depth/10;
_[1][4] = deep;
depthctx(e,2).fillStyle = deep?"purple":"black";
//depthctx(e,2).fillRect((e[1]%ratio)*size,(e[0]%ratio)*size,size,size); 

depthctx(e,2).font = "20px Verdana"
//depthctx(e,2).strokeText(depth,(e[1]%ratio)*size,((e[0]%ratio)*size/2 ) +size/2);

if(!f)dust[4,1] = [_[1][0],_[1][1],"red"];
var c =  1;		     
if(_[3 ] && _[0])    
dust[			     
	_[1][2] !== 1 ? (     
 //if horizonta aligned in group of 3 check direction 
// V C23					                  bx < cx +  
(slot([2,1,0,3],1)) ? ($ (2,1,1,1), _[2][2] = 1, ['red'],[4,1] ) : (
// H C23			  		                  by < cy +  
( slot([2,1,0,3],0)) ? ($ (2,1,0,1), _[2][2] = 1,["orange"],[3,0]) : 
// 
(_[2][2] = 0, dust[2,2] = _[1] , ["blue"], [0,0]))):(
     _[1][2] === 1 ? (
// V 0C2                        bx > cx -
 slot([2,0,3,1],1) ? ( $ (2,1,1,0), _[2][2] = 1, ['yellow'], [3,1]) : (
// H 0C2                        by < cy - 
 slot([2,0,3,1],0) ? ( $ (2,1,0,0), _[2][2] = 1, ["purple"],[1,1]): 
//  
( dust[0,0] =_[1 ],_[1][2] = 0 , [2,0]) )):(dust[1,1] = _[1], _[2][2] = 0,  ["green"],[1,1] )) ] = [_[2][0],_[2][1]]; 

})}
}
})
 
