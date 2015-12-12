//TODO: exponential points added for long  + (fastest path) - chosen path[array].length
/*
    dice/ stamps:foot
                     \stepping
    
    
*/

// the game's canvas element
// the canvas 2d context
// an image containing all sprites

// true when the spritesheet has been downloaded
var spritesheetLoaded = false;

// the world grid: a 2d array of tiles
var world = [[]];

// size in the world in sprite tiles
var worldWidth = 49;
var worldHeight = 17;

// size of a tile in pixels
var tileWidth = 32;
var tileHeight = 32;

// start and end of path
var pathStart = [worldWidth,worldHeight];
var pathEnd = [0,0];
var currentPath = [];

// the html page is ready
function deploy()
{
	inserted = false;
	console.log('Page loaded.');
	canvas = document.getElementById('gameCanvas');
	canvas.width = worldWidth * tileWidth;
	canvas.height = worldHeight * tileHeight;
	spriteCanvas.width = canvas.width;
	spriteCanvas.height = canvas.height;
	depthCanvas.width = canvas.width;
	depthCanvas.height = canvas.height;
	if (!canvas) alert('Blah!');
	ctx = canvas.getContext("2d");
	spritectx = spriteCanvas.getContext('2d');
	depthctx = depthCanvas.getContext('2d');
	if (!ctx) alert('Hmm!');
	spritesheet = new Image();
	spritesheet.src =  'data:image/png;base64,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';
	spritesheet.onload = loaded;
}

// the spritesheet is ready
function loaded()
{
	console.log('Spritesheet loaded.');
	spritesheetLoaded = true;
	createWorld();
}

// fill the world with walls
function createWorld()
{
	console.log('Creating world...');

	// create emptiness
	//CHANGED:2dmatrix /w if statement check
	world.map
	for (var x=0; x < worldWidth; x++)
	{
		world[x] = [];

		for (var y=0; y < worldHeight; y++)
		{
			world[x][y] = 0;
		}
	}

	// scatter some walls
	/*
	CHANGED:addWall method => ( {   amount:this.amount, type:this.type(color) })
	        implement subtype \ add implementation for size parsing
	                            | implementation to subsist through iterable types
	
	asIF: generate map:type => findPath.result
	*/
	for (var x=0; x < worldWidth; x++)
	{
		for (var y=0; y < worldHeight; y++)
		{
			if (Math.random() > 0.75)
			world[x][y] = 1;
		}
	}

	// calculate initial possible path
	// note: unlikely but possible to never find one...
	/*
	  current path is the array which contains our path output
        \ implement method for current path
        |   include type, method/ intel%ai(this[class])
                            \   which could include a draw point(pathEnd) || method pathEnd
    */
	currentPath = [];
	//CHANGED: test,    int:method \  check:[pass]
	function rand(a){
	    return Math.floor(Math.random()*a)
	}
	while (currentPath.length === 0)
	{
		pathStart = [rand(worldWidth),
		            rand(worldHeight)];
		pathEnd =   [rand(worldWidth),
		            rand(worldHeight)];
		            
	//check for type of world here in testpass	           
		if (world[pathStart[0]][pathStart[1]] === 0)
		currentPath = findPath(world,pathStart,pathEnd);
	}
	// method step or changes
	redraw();
    tree();
	sprite();
    
    //stepsPath()
}
function redraw()
{
    
	if (!spritesheetLoaded) return;

	console.log('redrawing...');

	var spriteNum = 0;

// clear the screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//draw Background
	for (var x=0; x < worldWidth; x++)
	{
		for (var y=0; y < worldHeight; y++)
		{

			// choose a sprite to draw
			
			switch(world[x][y])
			{
			case 1:
				spriteNum = 1;
				break;
			default:
				spriteNum = 0;
				break;
			}
//TODO: split and sort ctx group
			/*
			
[00],[01],[02],[03],[04],
[05],[06],[07],[08],[09],
[10],[11],[12],[13],[14]
		ctx[Math.floor(x/)][Math.floor(y/)][0]	draw image
			*/
			ctx.drawImage(
			/*     img  */  spritesheet,        //   image || null
			/*     sx   */  spriteNum*tileWidth,//*  switch()
			/*     sy   */  0,                  //   null
			/*  swidth  */  tileWidth,          //   null || const
			/*  sheight */  tileHeight,         //   null || const
			/*     x    */  x*tileWidth,        //*  for()
			/*     y    */  y*tileHeight,       //*  for()
			/*   width  */  tileWidth,          //   null || const
			/*   height */  tileHeight);        //   null || const

		}
	}

// draw the foreground path
	console.log('Current path length: '+currentPath.length);
	for (rp=0; rp<currentPath.length; rp++)
	{
		switch(rp)
		{
		case 0:
			spriteNum = 2; // start
			break;
		case currentPath.length-1:
			spriteNum = 3; // end
			break;
		default:
			spriteNum = 4; // middle 
			break;
		}

		ctx.drawImage(spritesheet,
		spriteNum*tileWidth, 0,
		tileWidth, tileHeight,
		currentPath[rp][0]*tileWidth,
		currentPath[rp][1]*tileHeight,
		tileWidth, tileHeight);
	}		
}

// handle click events on the canvas
function canvasClick(e)
{
	var x;
	var y;

	// grab html page coords
	if (e.pageX != undefined && e.pageY != undefined)
	{
		x = e.pageX;
		y = e.pageY;
	}
	else
	{
		x = e.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	}

	// make them relative to the canvas only
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	// return tile x,y that we clicked
	var cell =
	[
	Math.floor(x/tileWidth),
	Math.floor(y/tileHeight)
	];
	//TODO: set token/ as 

	// now we know while tile we clicked
	console.log('we clicked tile '+cell[0]+','+cell[1]);
    //init pathEnd || test pass
	pathStart = pathEnd;
	pathEnd = cell;

	// calculate path
	//CHANGED: findPath as method
	currentPath = findPath(world,pathStart,pathEnd);
	/*
	   cue and iterate through currentPath[Array]/type
	*/
	redraw();
}

// world is a 2d array of integers (eg world[10][15] = 0)
//CHANGED: as method wakable becomes type(s)
function findPath(world, pathStart, pathEnd)
{
	// shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	var maxWalkableTileNum = 0;

	/*
	//CHANGED: encapsulation method set range { x:type.pos.x + this.range,
	                                            y:type.pos.y + this.range,
	                                            a:type.pos.x - this.range,
	                                            b:type.pos.y - this.range}
	
	*/
	var worldSize =	worldWidth * worldHeight;

	var distanceFunction = ManhattanDistance;

	/*
	 alternate heuristics, depending on your game:
	*/


/*
    
    linear movement
     - no diagonals 
     - just cardinal
            directions (SEWN)
    
*/
	function ManhattanDistance(Point,Goal){
		
		var bold = [6];
		var a,b,x,y;
		x = Point.x;
		y = Point.y;
		a = Goal.x;
		b = Goal.y;
		return abs(x - a) + abs(y - b);
	}
	

    //CHANGED: method neigbor  => this.type /= canWalkHere
	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
//NOTE:excellent syntax to note
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		//findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}
    

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y)
	{
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.y + (Point.x * worldHeight),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}

	function calculatePath()
	{
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
//return=> { x:clickedX, y:clickedY, value:world[index], f:costPath, g:costDistance}  
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
//NOTE: new syntax ; or as similar   /; l++||!
//CHANGED: generate lazy path ala remove max 
    // add trees around each bordering
    // add town at points which share border with only one path include consecutive(include diagonal)
                                    
/*transistor*/	while(length = Open.length)
		                {
        			max = worldSize-worldSize + 2;
        			min = -1;/*
        			 console.log("transistor")
        			*/
/*circuit*/	        for(i = 0; i < length; i++)
        			{
        			    //console.log(max)
/*gate of costPath*/    if(Open[i].f < max)
        				{
        					max = Open[i].f;
        					min = i;
        				}
        			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

} // end of findPath() function

/*

ctx.fillRect(0,0,162,32)
ctx.save()
ctx.globalCompositeOperation = "destination-in"
ctx.drawImage(spritesheet,0,0)
ctx.restore()

ctx.fillRect(0,32,162,32)

ctx.globalCompositeOperation = "destination-out"
ctx.drawImage(spritesheet,0,32)
*/


//TODO: SAMPLE MAP
function sprite(){
    var ZAM = new Image(),
//   www.lostdecadegames.com/
		DAWN = new Image(),
        bin = [start,end],
        a = 0,s = 0,o = 0,
        dire = {}, dust={}, index =[  
                            [0,-1], //"south"
                            [1,0],  //"west"
                            [0,1],  //"north"
                            [-1,0], //"east"
                          ], block = [
                            [0,0],//block
                            [1,0],//crate
                            [2,0],//brick
                            [3,0],//left
                            [4,0],//right
                            [1,1],//
                            [3,1],
                            [4,1]
                          
                          ];
        time = 133;
        spritectx.font = "26px sans-serif";
    ZAM.src = "data:image/png;base64,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";
    DAWN.src = "art/buildings/dawnblocker_ortho.png"
    ZAM.onload=function(){
        for(o=0;o<16;o+=4){
            (function(o){
            Object.defineProperty(dire,index[s],{
                set:function(XY){
                    var x = XY[0]*32,y = XY[1]*32+(XY[2]||0);
                    spritectx.drawImage(ZAM,o%16*32,0,32,32,x,y,32,32)}
                });
            }(o))
            s++
        }
    
    }
    DAWN.onload=function(){
         s = 0;
         for(o=0;o<block.length;o++){
                (function(o){
                Object.defineProperty(dust,block[o],{
                    set:function(XY){
                        var x = XY[0]*32,y = XY[1]*32;
                        ctx.drawImage(DAWN,
                            (block[o][0]*17)+4+0 || (132),
                            (block[o][1]*31)+12+ 168|| (336)
                            ,
                            16,16,x,y,32,32)}
                    });
                }(o))
                s++
            }stepsPath();
    }
   
    spritectx.globalAlpha = .5;
    
    function drawChar(e,f,g){   var rad,e,et,et0,et1,et2,g;
       
         if(!g){ 
            e   =   e                       //  0  
            et  =   currentPath[f-1]  || 0  //  +1 
            et0 =   currentPath[f-3]  || 0  //  -2 
            et1 =   currentPath[f-2]  || 0  //  -1 
            et2 =   currentPath[f+1]  || 0  //  +2 
            }else{            
            g   =   g.length            
            e   =   currentPath[g-f-1]|| 0  //  0 
            et  =   currentPath[g-f]	|| 0  //  +1
            et0 =   currentPath[g-f+2]|| 0  //  -2
            et1 =   currentPath[g-f+1]|| 0  //  -1  
            et2 =   currentPath[g-f-2]|| 0  //  +2
            }
            
            rad = depthctx.createRadialGradient(e[0]*32+16,
                                                e[1]*32+16,
                                                32,
                                                e[0]*32+16,
                                                e[1]*32+16,
                                                41);
            rad.addColorStop(0,"rgba(0,0,0,1)");
            rad.addColorStop(.7,"rgba(0,0,0,.5)");
            rad.addColorStop(1,"rgba(0,0,0,0)");
            /*
                
            */
//TODO:add shade :hangout
            spritectx.clearRect(et[0]*32,et[1]*32,32,32);
            spritectx.globalAlpha = 1;
            dire[[  ~~(e[0]>et[0]) ||
                    -~~(e[0]<et[0])||0 ,
                    ~~(e[1]>et[1]) ||
                    -~~(e[1]<et[1])||0 ]]
                    =  [e[0],e[1],e[2]] ;
                    depthctx.fillStyle="black"
                    if(et[3]){
                    depthctx.globalAlpha = et[3];
                    depthctx.clearRect(et[0]*32,et[1]*32,32,32)
                    depthctx.fillRect(et[0]*32,et[1]*32,32,32)
                    }
                    if(et0[3]){
                        depthctx.globalAlpha = et0[3];
                        depthctx.clearRect(et0[0]*32,et0[1]*32,32,32)
                    depthctx.fillRect(et0[0]*32,et0[1]*32,32,32)
                    }
                    if(et1[3]){
                        depthctx.globalAlpha = et1[3];
                        depthctx.clearRect(et1[0]*32,et1[1]*32,32,32)
                    depthctx.fillRect(et1[0]*32,et1[1]*32,32,32)
                    }
                    if(et2[3]){
                        depthctx.globalAlpha = et2[3];
                    depthctx.clearRect(et2[0]*32,et2[1]*32,32,32)
                    depthctx.fillRect(et2[0]*32,et2[1]*32,32,32)
                    }

                     //TODO:implement trail
                    //for(et=0;et<16;et++){}setTimeout(,300)
                    //console.log(e[0]>et[0],e[1]>et[1])


                  
                  
                    depthctx.save()
                    depthctx.globalCompositeOperation = "destination-out";
                    depthctx.globalAlpha = 1;
                    depthctx.beginPath()                    
                    depthctx.fillStyle = rad;
                    depthctx.arc((e[0])*32+16, e[1]*32+16, 78, 0, 2*Math.PI, true);
                    depthctx.fill();
                    depthctx.restore();
    };  
    
    function crunch(){
        o++;
        console.log(o)
        
        catchA=g.slice(f+1,g.length-1);
        //console.log(catchA)
        /*
        new array with index(f(slice)).call(callee.some)
        */
        
        fun = arguments.callee;
        console.log(fun)
        bin[0] = function(){catchA.some(fun)}
        bin[1] = function(){catchA.some(fun)}
        return true;
    }
    function start(){
            var o = 0;
          
            currentPath.some(function(e,f,g){
                var catchA,fun,route = currentPath;
                
                    setTimeout(function(){
                        drawChar(e,f,null);
                    
                    },f*time)
            })
    }

    function end(){
            currentPath.forEach(function(e,f,g){
                setTimeout(function(){
                    drawChar(e,f,g);
                    
                 },f*time)  
            })
    }  
    
    function stepsPath(){
              var depth = 0 ;
              currentPath.forEach(function(e,f){

                  var et = currentPath[f-1] || [0,0],step,step2,stepb,ax,ay,bx,by,cx,cy,dx,dy;
                  var perif = [[0,1],[1,0],[1,1],
						  	   [-1,-1],[-1,1],[-1,0],
							   [1,-1],[0,-1]];
                   spritectx.fillStyle="black"
                   //TODO:implement trail
                  //for(et=0;et<16;et++){}setTimeout(,300)
                  //console.log(e[0]>et[0],e[1]>et[1])
                  var round;
                  
                  function solve(m){
                      perif.forEach(function(o){
                          var a = o[0]+e[0], b = o[1]+e[1];
                          if(world[a]&& (!(world[a][b] === 1))){
                              round = currentPath.some(function(h){
                                   if((h[0] === a) && (h[1] === b)){
                                    //    console.log("true",h[0],a)
                                        return true
                                        }
                              })
                               //console.log(round + " round")
                               if(!round){
                               dust[[2,0]] =  [a,b]
                               }else if(null){
                           
                           
                               }
                           
                          }
                      
                      })
                  }  
                  solve(1)
                  
                  //console.log(world[e[0]][e[1]])
                  
            
                  
                  //treeCtx.globalAlpha = 1;
                  
                  //spritectx.fillRect(e[0]*32,e[1]*32,32,32);
                  
                  stepb =currentPath[f-1];
                      if(stepb){
                    ax=stepb[0];ay=stepb[1];
                      }
                    bx = e[0];by = e[1];
                  step = currentPath[f+1];
                      if(step){
                    cx = step[0];cy = step[1];
                      }
                  step2 = currentPath[f+2];
                      if(step2){
                    dx = step2[0];dy = step2[1];      
                      }
                    
                         //add depth ctx
                          //add edge beneath stones.
                    depthctx.globalAlpha = depth;
                    e[3] = depth;
                    depthctx.fillRect(e[0]*32,e[1]*32,32,32);
                  
                    if(stepb && step2){
                      
                        if(e[2] !== 1){
//  horizontal
                            if(         (cy === dy)
                            &&          (by === cy)
                            ){
                            
                            dust[[4,0]] =  [cx,cy]
                              
                              step[2]= 1; 
                              if(bx < cx){
                              depth += depth === 1 ? 0 : 0.10;
                            }else{
                              depth -= depth === 1 ? 0 : 0.10;
                                }
                                if(stepb[2] !== 1){
                                    
                                    dust[[1,1]] = [bx,by];    
                         
                                }
//  vertical
                            }else if(   (cx === dx)
                            &&          (bx === cx)){
                            
                                
                            dust[[3,1]]  = [cx,cy];
                                                         
                              step[2]= 1; 
                              if(by < cy){
                              depth += depth === 1 ? 0 : 0.10;
                                }else{
                                    depth -= depth === 1 ? 0 : 0.10;
                                }
                                if(stepb[2] !== 1){
                                  
                                    dust[[1,1]] = [bx,by];    
                              }
//  default
                            }else{
                      
                            dust[[1,1]] = [bx,by];    
                                  step[2] = 0;
                            }
                        }else if(e[2] === 1){
//  horizontal
                            if(         (by === ay)
                            &&          (by === cy)){
                             
                            
                            dust[[3,0]] =  [cx,cy]
                              if(bx > cx){
                              depth -= depth === 0 ? 0 : .1
                          }else{
                              depth += depth === 0 ? 0 : .1
                              
                          }
                              step[2] = 0;
//  vertical
                            }else if(   (bx === ax)
                                    &&  (bx === cx)){

                            
                             dust[[4,1]] =  [cx,cy]
                                
                                if(by < cy){
                                depth -= depth === 0 ? 0 : .1
                            }else{
                                depth += depth === 0 ? 0 : .1
                                
                            }
                                
                                step[2] = 0;
                            
//  default
                            }else{
                        
                                  dust[[0,0]] = [bx,by];    
                                  step[2] = 0;   
                            }
                        }else{
                        
                              dust[[1,1]] = [bx,by];    
                              step[2] = 0;    
                            }
                        }
                      
              })
      }
    
 //   end()
    function pongPing(){
        
          //  time = currentPath.length*130
        setTimeout(function(){
            bin[++a%2]();
          //  pathStart = pathEnd;
          //  pathEnd =   [Math.floor(Math.random()*worldWidth),
        	//            Math.floor(Math.random()*worldHeight)];
            //currentPath = findPath(world,pathStart,pathEnd)
            //redraw()
            pongPing()
            },currentPath.length*time)
        
    }
    bin[0]()
    pongPing()
    
  //TODO:redraw
  /*
    //Math.floor(Math.random()*a)
    
  */
console.log("exucute")
}
    //*    1/,   2/_/,    3/_/,    4/_//,   5/,  6/   *//
    
    // handle click events on the canvas
    // the spritesheet is ready

function tree(){
    treeDoc.height = worldHeight*32;
    treeDoc.width = worldWidth*32;
    treeCtx = treeDoc.getContext('2d');
    var tree = new Image();
    tree.src = "art/trees/tree_19.png";
    
	treeDoc.addEventListener("click", canvasClick, false);
    tree.onload = function(a){
        for (var x=0; x < worldWidth; x++)
    	{
    		for (var y=0; y < worldHeight; y++)
    		{
         //           console.log(world[x][y]===0)
    			// choose a sprite to draw
                if((world[x][y]!==1)&& !currentPath.some(function(e){
                   return ((e[0] === x && e[1] === y) || (Math.sin(Math.random()*(worldWidth*0.02305)) <= 0))
                })){
                treeCtx.globalAlpha = 1 
                treeCtx.drawImage(tree,x*32-16,y*32-16)
                }
    		
			}
		}
    ctx.putImageData(convolute(
        ctx.getImageData(0,0,
            worldWidth*32,
            worldHeight*32),
            [ -4/9, 1/9, 5/9,
            -2/9, 1/9,5/9,
            1/9, 1/9, 1/9 ]
        ),0,0)
	   
    treeCtx.putImageData(threshold(treeCtx.getImageData(0,0,worldWidth*32,worldHeight*32),112),0,0)
    
    }

}
/*EMBER.dataObect.extend(){}
tile = {
        world : [[]],
        squareSize:16,
        tileSize:32,
        get worldWidth(){   return this.squareSize  ;},
        get worldHeight(){  return this.squareSize  ;},
        get tileHeight(){   return this.tileSize    ;},
        get tileWidth(){    return this.tileSize    ;},
        get pathStart(){    return [ this.worldWidth ,
                            this.worldHeight ]      ;},
        pathEnd : [0,0],
        currentPath : [], 
 tile};*/
var threshold = function(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};
var convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = treeCtx.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};
