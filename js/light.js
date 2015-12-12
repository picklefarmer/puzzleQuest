App.LightController = Ember.Controller.extend(
	App.Level,{
	lantern :function(_){
	   // console.log('light')
		var ratio = this.get('ratio');
		var self = this;	
		var size = this.get('size');size
		
		var depthctx = function(a){
			return App.Canvas.content[self.unit(a[0])][self.unit(a[1])][2].ctx
		},
		d ;
//    spritectx.globalAlpha = .5;
		function spot(d){
		d.globalAlpha = 1
		var rad = d.createRadialGradient((_[0][1]%ratio)*size+size/2,
								 (_[0][0]%ratio)*size+size/2,size,
										 (_[0][1]%ratio)*size+size/2,
						 (_[0][0]%ratio)*size+size/2,size+size/2);
		      rad.addColorStop(0,				 "rgba(0,0,0,1)");
			rad.addColorStop(.7,			 "rgba(0,0,0,.5)");
		rad.addColorStop(1,				 "rgba(0,0,0,0)");
		d.fillStyle=		       "black";
		return rad;
	}function circle(mod){
		var d = depthctx(_[mod]);
			d.globalAlpha = _[mod][3];
			d.clearRect((_[mod][1]%ratio)*size,(_[mod][0]%ratio)*size,size,size)
			d.fillRect((_[mod][1]%ratio)*size,(_[mod][0]%ratio)*size,size,size);
	}function hole(mod){
		var d = depthctx(_[mod]),
		rad = spot(d);		
			
		d.globalAlpha = 1;
		d.save()
		d.globalCompositeOperation = "destination-out";
		d.beginPath()                    
		d.fillStyle = rad;
		d.arc(((_[0][1]%ratio))*size+size/2, (_[0][0]%ratio)*size/2+size/2, size*2+size/2, 0, 2*Math.PI, true);
		//if(!lock){d.clearRect((_[1][0]%ratio)*size,(_[1][1]%ratio)*size),size,size}
		d.fill();
		d.restore();
 	}

if(_[1][3]){circle(1)}
if(_[2][3]){circle(2)}
if(_[3][3]){circle(3)}
if(_[4][3]){circle(4)}	

hole(0)
}
})
