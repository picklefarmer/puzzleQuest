 /*NOTES

startX: 0,
startY: 0,
endX  : 4,
endY  : 2,

deltaX: Math.abs(startY - endY),  // 4
deltaY : Math.abs(startX - endX), // 2

  
[   [null,3],
    [1,R],
    [R,2],
    [2,R],
    [R,1],
    [3,R],
    [R,0],
    [null,R]  ]

[   [null,3],
    [3,R],
    [R,1],
    [null,(R,4)],
    [R,1],
    [2,R],
    [R,6],
    [0,R],
    [(R,3)0,R],
    [null,R]  ]



  check differece
  get difference   
  
  add difference to smaller variable
  
  



*/




 function rows(difference,row,collumn){  
   var differenceInt = difference + 1;
 
   while(differenceInt)    {
     function(differenceInt,row){
       collumn+differenceInt,row
     }    
     differenceInt--         
   }
   collumn += difference + 1;  
   return collumn;
 }             
 
 function collumns(Y){
    var row = Y, collumn = 0;
     while(row){
      collumn = rows(difference,row,collumn)
      row--
    }
 }
 
 var difference =  Math.abs(X/Y)                  
 
 
 X :5 ,Y :4  :"Y,X","X,Y"
              [0,0],[0,1],
              [1,1],[1,2],
              [2,2],[2,3],
              [3,3],[3,4]
                   
 X :7,Y  :3  :
              [0,0],[0,1],[0,2],
              [1,2],[1,3],[1,4],
              [2,4],[2,5],[2,6]    
              
 X :7,Y  :2  :      
              [0,0],[0,1],[0,2],[0,3],
              [1,3],[1,4],[1,5],[1,6]
              
 X :8,Y  :6  : 
              [0,0],[0,1],
              [1,1],[1,2],
              [2,2],[2,3],
              [3,4],[3,5],
              [4,5],[4,6],
              [5,6],[5,7],


































*/