App.WorldController.reopen(
App.Level,{
pathfinder:function(world,pathStart, pathEnd,width,height,squiggle){
	var abs = Math.abs, max = Math.max, pow = Math.pow,sqrt = Math.sqrt,
    	maxWalkableTileNum = 0, worldSize= height * width,
	   	distanceFunction = ManhattanDistance;
		
	console.log("these")
	function ManhattanDistance(Point,Goal){
		var bold = [6];
		var a,b,x,y;
		x = Point.x;
		y = Point.y;
		a = Goal.x;
		b = Goal.y;
		return abs(x - a) + abs(y - b);}
	function Neighbours(x, y){
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < height && canWalkHere(x, S),
		myE = E < width && canWalkHere(E, y),
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
		return result;}
	function canWalkHere(x, y){
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));};
	function Node(Parent, Point){
		var newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * width),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0 };
			return newNode;	}
	function calculatePath(){
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]}),
			mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]}),
			AStar = new Array(worldSize),
	   		Open = [mypathStart], Closed = [],result = [],
			myNeighbours, myNode, myPath,
			length, max, min, i, j;

	 while(length = Open.length){max = squiggle?worldSize:4- 2;min = -1;
     for(i = 0; i < length; i++){
     if(Open[i].f < max){ max = Open[i].f; min = i;}}
	 	myNode = Open.splice(min, 1)[0];
	 if(myNode.value === mypathEnd.value){
	 	myPath = Closed[Closed.push(myNode) - 1];
	 do	{result.push([myPath.x, myPath.y]);}
	 while (myPath = myPath.Parent);
	 	AStar=Closed=Open=[];result.reverse();}
	 else{
	    myNeighbours = Neighbours(myNode.x, myNode.y);
	 for(i = 0, j = myNeighbours.length; i < j; i++){
     	myPath = Node(myNode, myNeighbours[i]);
	 if (!AStar[myPath.value]){
	 myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
	 myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
		Open.push(myPath);
		AStar[myPath.value] = true;}}
	 Closed.push(myNode);}}
	 return result;}
     return calculatePath();}
})
