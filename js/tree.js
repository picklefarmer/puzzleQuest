App.TreeController = Ember.Controller.extend(
App.Level,{
	needs:["world","canvas"],
	world:Ember.computed.alias('controllers.world'),
	canvas:Ember.computed.alias('controllers.canvas'),
	treelayer: function(tree){
	    
			var self = this,
			single,   
			numOfTrees = 29,
			ratio = this.get('ratio'),
			world = this.get('world.terrain'),	
	   		worldWidth = this.get('width'),	
	   		worldHeight = this.get('height'),
			size = this.get('size'),
			bufferCTX = this.get('canvas.tree').getContext('2d'),
			bufferIMG = this.get('canvas.tree'),
			currentPath = this.get('world.currentpath');
			
	treeCtx = function(_,b){
			return App.Canvas.content[self.unit(_[1])][self.unit(_[0])][b].ctx
	 	};

   for (var x=0; x < worldWidth; x++)
   		{for (var y=0; y < worldHeight; y++)
    		{// choose a sprite to draw
             	if((world[y][x]===0)){
	 single =  tree[Math.floor(Math.random()*numOfTrees)]
	  bufferCTX.drawImage(single,x*size-(size/2),y*size-(size/2),single.naturalWidth*(size/32),single.naturalHeight*(size/32))
			}
		}
	}
	//this.toggleProperty('canvas.treeReady')
    for (var x = 0; x < worldWidth; x+=ratio){
        for(var y = 0; y < worldHeight; y+=ratio){
            treeCtx([x,y],3).drawImage(bufferIMG,x*size,y*size,size*ratio,size*ratio,0,0,size*ratio,size*ratio)
            }
        } 
	   	bufferCTX.clearRect(0,0,worldWidth*size,worldHeight*size)
	
    }
})
