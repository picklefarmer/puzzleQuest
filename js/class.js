
App = Ember.Application.create({

mouseUp:function(){
	console.log('fifteen')
},
	touchMove:function(f){
		f.defaultPrevented()
	},

});

App.Level = Ember.Mixin.create({
      
		 width :20,
		 height:20,
		 shuffle:false,
		 squiggle:false, 
		 resetlevels: function(a,b,c){
		//	 console.log('reset',a,b,c)
			 return b || App.Canvas.level
		 }.property(),
		 ratio  : 5,
		 size   : 16,
		 time   : 180,     
		 keep:function(){
			this.set('resetlevels',App.Canvas.level)
		}.observes('App.Canvas.level'),
		 //animation Depth [numberofsteps]
		 max    : function(){ 
		   var om = this.get('resetlevels')
		     return this.get('width')*this.get('height')*.388
		 }.property('width','height'),
		
		 componentSize:function(){
			 	this.set('componentSize',
				this.get('size')*this.get('ratio'))
		 }.property(),
		unit:function(g,m){
		  
			var ratio = this.get('ratio')
			var s = Math.floor(g/ratio);
			return m? s*m:s;
		},


})
