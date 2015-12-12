App.WorldController.reopen({
lakelayer:function(){
 	var world = this.get('terrain'),
		height = this.get('height'),
		ratio = this.get('ratio'),
		op = App.__container__.lookup('controller:step'),
		width = this.get('width'),
		pebble = (function ripple(){
			var y = Math.floor(Math.random()*					height)
			var x = Math.floor(Math.random()*					width)
			return world[y][x] === 0 ? [y,x] : ripple()	
		}()),
		seed = 9,
		ripples=[[-1,-1],//0,7
			    [-1,0] ,//1,6
			    [-1,1] ,//2,5
			    [0, -1],//3,4
			    [0, 1] ,//4,3
			    [1, -1],//5,2
			    [1, 0] ,//6,1
			    [1,1 ]],//7,0
		pond =  [],			
		unit = function(g,m){
				var s = Math.floor(g/9);
				return m ? s*m:s;
		},
	space  = world
	space.unshift([])
	space = space.reduce(function(a,b,c,d){
			return a.concat(b.map(function(e,f){
						return [e,c-1,f]
				}))	
	}).filter(function(e){
		return	e.shift() === 0
	});

op.blocklayer("",space)	
space.forEach(function(e,f){
	var pit = function(x,y){if( y!==0)return world[y+1][x]}
			var x = e[1];
			var y = e[0];
		if(!pit(x,y-1)&&!pit(x+1,y)&&!pit(x-1,y))
App.Canvas.content[unit(y)][unit(x)][2]
			.debugtext(f,y%ratio,x%ratio,"blue",0.55)
})
	console.log(space)
		pond.push(pebble.toString())
//		draw(pebble,0,7);
 },
  pathlayer:function(){
	    this.path()
	    console.log('d')
		//var path = this.get('currentpath');
		var set = App.Canvas.content;
		var ratio = this.get('ratio')
		
		var size = this.get('size')* ratio
		set.map(function(e){e.map(function(f){
			f[1].ctx.clearRect(0,0,size,size)	
		})})

		// path.map(function(e,f){
		//            var x = e[1],y = e[0];
		//            })
			
	 }
})