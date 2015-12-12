App.WorldController = Ember.Controller.extend({
	init:function(){
		var height = this.get('height')			
		var width =  this.get('width')			
		//var orientation = width > height	
		var ratio = this.get('ratio');
		var canvasWidth =  Math.floor((width-1)/ratio);
		var canvasHeight = Math.floor((height-1)/ratio);
		var total = canvasHeight * canvasWidth;
		var terrain = this.get('gamelayer')
		var gen = function (e,f,g,s){
			var h = e[e.length-1];
			h.length <= g ? h.push([h.length%(g+1)]) : (e.push([0]),s ? App.Canvas.content.pushObject(Ember.A()):null);
			return (e[f] && e[f][g] )? e : gen(e,f,g,s)
		    }
		    this.set('world',gen([[0]],canvasHeight,canvasWidth,true));
		    this.set('terrastantiate',gen([[0]],height-1,width-1));
		},
		itemController:'canvas',
		unit:function(g){
			var ratio = 9;
			var s = Math.floor(g/ratio);
			return s;
		},
		terrain:function(){
			var world = this.get('terrastantiate')
			world = world.map(function(e){
				return e.map(function(f){
					return ~~(Math.random()*1.25);		
				})
			})
			this.set('terrain',world)
			return world
		 }.property('terrastantiate'),
		gamelayer:function(){
			var ratio = this.get('ratio')
			var unit = function(g,m){
					var s = Math.floor(g/ratio);
					return m ? s*m:s;
				}
			var land = this.get('terrain');
				land.map(function(e,g){
					e.map(function(f,d){
						var set = App.Canvas.content;
						var paint = set[unit(g)][unit(d)][0];
						f ? paint.paint((g%9),(d%9),1):paint.paint((g%9),(d%9),0)
					})		
				})
		 },
 		 pathlayer:function(){
		    this.path()
			var path = this.get('currentpath');
			var set = App.Canvas.content;
			var ratio = this.get('ratio')
			var size = this.get('size')* ratio
			var unit = function(g,m){
					var s = Math.floor(g/ratio);
					return m ? s*m:s;
			}
			set.map(function(e){e.map(function(f){
				f[1].ctx.clearRect(0,0,size,size)	
			})})

			path.map(function(e,f){
				var x = e[1],y = e[0];
				
				set[unit(y)][unit(x)][1].draw(y%9,x%9 ,"yellow",0.5)
			})
		 },		 
		 path:function(){
			var	currentPath = [],pathS,pathE,
				H = this.get('height'),W = this.get('width'),
				world = this.get('terrain'),
				findPath = this.get('pathfinder');

				function rand(a){
					var aler = Math.floor(Math.random()*a)
				//		console.log(a,aler)
						return aler;
					}
					while (currentPath.length === 0)
					{
					pathS = [rand(H),rand(W)];
					pathE = [rand(H),rand(W)];
					if (world[pathS[0]][pathS[1]] === 0){
					currentPath = findPath(world,pathS,pathE,H,W);
					this.set('currentpath',currentPath);
					}
				}
				currentPath.map(function(e){
					world[e[0]][e[1]] = 2;
				})
				console.log(world)
		 },
		 width : 54,
		 height : 27,
		 ratio:9,
		 size : 32,
		 componentSize:function(){
		 	this.set('componentSize',this.get('size')*this.get('ratio'))
		 }.property(),
		// start and end of path
		})
