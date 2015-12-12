var lot = {};

Object.defineProperty(lot,
	"tan",{
		set:function(a){
/*			add constructor specific variables
 				ie:  modify input to boolean specific value
					a[Object.keys(a)][value]+=1
					a[Object.keys(a)][value]-=1
				   function modifier(key){
				   		if(key[value]){
							key[value]++	
						}else{
				   			return key
						}	
					}
*/
			Object.defineProperty(this,
				a,{
				set:function(a){
					var name = Object.keys(a),
						key = modifier(a[name]);				
					Object.defineProperty(this,	name, key)
					}
				}
			)
		}
	}
)
