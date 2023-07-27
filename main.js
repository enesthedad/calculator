const btns = document.querySelectorAll('.button');
const screen = document.getElementById('screen');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const equalBtn = document.getElementById('equal');
const plusMinusBtn = document.getElementById('plus-minus');
const sqrtBtn=document.getElementById('sqrt');
const dotBtn=document.getElementById('dot');
const percent = document.getElementById('percent');
const pow= document.getElementById('pow');
const backspace=document.getElementById('backspace');
const operateBtns=document.querySelectorAll('.operate-button');
const clearscreen = document.getElementById('clear');
const history = document.getElementById('history')

let operate = '';
let memNumber='';
let num1,num2;

const equality = function(a,b){
  if(operate=='plus'){
    a=a +b;
    return a;
  }else if(operate=='minus'){
    a = a-b;    
    return a;
    
  }else if(operate=='multiply'){
    a = a*b;   
    return a;
    
  }else if(operate=='divide'){
    if(b==0){
      screen.textContent=''
      screen.textContent+='Division by zero!';
    }
    a = a/b;  
    return a;
    
  }else if(operate=='pow'){
    a = Math.pow(a,b);  
    return a;
  }
}
const resetCalc = function(){
   screen.textContent='';
   history.textContent='';
   operate = '';
   num1=0;
   num2=0;
}
const resetConsts = function(){
   operate = '';
   num1=0;
   num2=0;
}
btns.forEach(function(btn){
  btn.addEventListener('click',function(){
    if(screen.textContent=='Infinity'||screen.textContent=='Invalid Number!'){
      screen.textContent='';
       
    }
    screen.textContent+=btn.textContent;
  })
})
clearscreen.addEventListener('click',resetCalc);

equalBtn.addEventListener('click',function(){
  num2 = Number(screen.textContent);
  num1 = equality(num1,num2);
  historyCreater(num2,'=',num1);
  
  screen.textContent=num1;
  resetConsts();
})
plusMinusBtn.addEventListener('click',function(){
  const firstValue =screen.textContent;
  screen.textContent='';
  screen.textContent+=(firstValue*-1);
})
sqrtBtn.addEventListener('click',function(){
  const firstValue =screen.textContent;
  screen.textContent='';
  screen.textContent+=(Math.sqrt(firstValue)).toFixed(2);
})
percent.addEventListener('click',function(){
  const firstValue =screen.textContent;
  screen.textContent='';
  screen.textContent+=(firstValue/100).toFixed(2);
})
dotBtn.addEventListener('click',function(){
  if(!screen.textContent.includes('.')){
    screen.textContent+='.';
  }
})
backspace.addEventListener('click',function(){
    let removed = screen.textContent.slice(0,-1);    
    screen.textContent=removed;
 })
operateBtns.forEach(function(btn){
  btn.addEventListener('click',function(){
  if(operate==''){
    
    num1=Number(screen.textContent);
    if(num1){
    screen.textContent='';
    operate=btn.id;
    historyCreater(num1,operate);
  }
  else{
     screen.textContent='';
     screen.textContent='Invalid Number!'
  }
  }else{
    
    num2 = Number(screen.textContent);
   
    num1=equality(num1,num2);
    operate=btn.id;
    historyCreater(num2,operate);
    screen.textContent='';
    
  }
})
})
const historyCreater= function(num='',oper='',equal=''){
  let switcher=false;
  let toggle=true;
  let operationSign='';
  if(oper == 'plus'){
    operationSign='+';
  }else if(oper == 'minus'){
    operationSign='-';
  }else if(oper == 'multiply'){
    operationSign='x';
  }else if(oper == 'divide'){
    operationSign='÷';
  }else if(oper == 'pow'){
    operationSign='^';
  }else if(oper == '='){
    if(toggle){
      operationSign=`= ${equal}|`;
      toggle=false;
      switcher=true;
    }
  }
  if(toggle==true){
    if(switcher==false){
      history.textContent += `${num} ${operationSign} `
    
    }else{
      history.textContent += ` ${operationSign} `
      switcher=false;
    }
  }else{
    
    history.textContent += `${num} ${operationSign} `
    operationSign=''
    toggle = true;
  }
}