
/**
 * 
 * { test函数 }
 *
 * @param{<object>}oj{ parameter_description }
 * @param{<string>}k{ parameter_description }
 * @return{array}{ description_of_the_return_value }
 */
 var ans   = document.querySelector('.cashow-answer');
 var input = document.querySelector('.cashow-input');

 console.log(ans.innerHTML);
 var butList = document.querySelectorAll('button');
 console.log(butList);  
 var  ansValue = "0";
 var  inputValue = "0";
 var maxLength = 8;                                                              
//left 为 0时，输入不应该响应的值数组
var firstInputArr = ['0','AC','CE','+','-','*','/']; 
var headnumArr = ['0','1','2','3','4','5','6','7','8','9','.'];

var signal = ['+','-','*','/'];
var restnumArr = headnumArr.concat(signal);
for (var i = 0; i < butList.length; i++) {
	if(butList[i].value !== 'whitesapce') {
		butList[i].onclick = function(e) {
			ansValue = (ans.innerHTML).trim();	
			inputValue = (input.value).trim();
			var currentValue = this.value.trim();
			if(ansValue.length===8) {
				inputValue = '0';
				ansValue = '0';
				input.value = '越界';
				ans.innerHTML = '请AC重置';
				return ;

			}
			switch(currentValue){
				case 'AC':
						ans.innerHTML = '0';
						input.value = '0';

						ansValue = '0';
						inputValue = '0';
						console.log('AC重置被点击');
						break;

				case 'CE':
				        // ansValue
						// inputValue
						// 1 1. 1.2 
						// 正则表达得到全部数据到CEArr数组中
						if(inputValue!=='0') {

							//var re = /\d+(\.\d*)?/g;

							var re = inputValue.includes('=')?/[+\-\*\/\=]?\d+(\.)?\d*/g:/\d+(\.\d*)?/g;
							//带符号的数值
							//‘12+12=24’=> 12，+12，=24
							var CEArr = inputValue.match(re);

							//递减(点击一次删除一组数字的右边）
							inputValue = inputValue.slice(0,inputValue.lastIndexOf(CEArr[CEArr.length-1]));
							console.log('inputValue', inputValue);
							ansValue = '0';

							ans.innerHTML = ansValue;
							input.value = inputValue||'0';
							 //input 绑定readonly,
							//设置input中的值时，要模拟手动输入
							//文本在输入框中居右显示，
							//多余的文本应该在左边隐藏。
							//也就是触发一次focus事件。
							input.focus();
					    }
					    console.log('CE回退被点击');
					    break;
			    case '=':
						if ( !inputValue.includes('=') && inputValue!=='0') {
						  //处理12+ 的情况
						    inputValue =signal.includes(inputValue.slice(-1))?inputValue.slice(0,-1):inputValue;
							console.log('inputValue',inputValue);
							
						    var re1 = /[+\-\*\/]?\d+(\.\d*)?/g;
						   	var opArr = inputValue.match(re1);
						   	console.log('opArr',opArr);
						   	ansValue = operation(opArr);

						   	ans.innerHTML = ansValue;
						   	input.value = input.value+'='+ansValue;
						   	input.focus();
						}
						console.log('等号被点击');
						break;
				case '.':
				        //第一次开始和下一轮开始
						if(inputValue === '0' || inputValue.includes('=') ) {
						    inputValue = '0.';
						   	ansValue ='0.';
						}
						
					    else if( /\d+(\.\d*)?/.test(ansValue)&&!ansValue.includes('.') ) {
				   	        inputValue += currentValue;
				   	        ansValue += currentValue;

						}

						input.value = inputValue;
						ans.innerHTML = ansValue;
						input.focus();

						console.log('小数点被点击');
						break;

			    case '0':
				        if( inputValue.includes('=') ) {
				            inputValue = '0';
				        	ansValue = '0';
				        	console.log('ansValue为符号位或者有inputValue含= 重置点击 0');
						}
						//下一步输入0.4的情况
				        else if( signal.includes(ansValue) ) {
				        	inputValue += '0';
				        	ansValue = '0'; 

				        }
						//ansValue 为数值
						//
	                    else if( /\d+(\.\d*)?/.test(ansValue)&&ansValue!=='0' ) {
	                    	inputValue += currentValue;
	                    	ansValue += currentValue;
	                    	console.log('ansValue为实数添加 0');   

	                    }
	                    input.value = inputValue;
	                    ans.innerHTML = ansValue;
	                    input.focus();
	                    break;
                case '+':
                case '-':
                case '*':
                case '/':
					    if( inputValue.includes('=') ) {
							//上一步的结果作为输入值的初始值在+当前值
							inputValue = ansValue+currentValue;
					    	ansValue = currentValue;
						}
						else if( /\d+(\.\d*)?/.test(ansValue) && ansValue!=='0'||ansValue==='0' && inputValue!=='0' ) {
					    	ansValue = currentValue;
					    	inputValue += currentValue;
						}
 
						ans.innerHTML = ansValue;
						input.value = inputValue;
						input.focus();
						break;

		        case '1':
		        case '2':
		        case '3':
		        case '4':
		        case '5':
		        case '6':       
		        case '7':       
		        case '8':       
				case '9':
			
				        if(inputValue ==='0' || inputValue.includes('=')) {
				            inputValue = currentValue;
				        	ansValue = currentValue;

						}
						//包含符号或执行回退出现ans为0，inputValue不为0 的情况
				        else if( signal.includes(ansValue) || ansValue ==='0' ){
				        	inputValue += currentValue;
				        	ansValue = currentValue;

				        }
				        //为实数 
				        else if(/\d+(\.\d*)?/.test(ansValue) && ansValue!=='0') {
				        	inputValue += currentValue;
				        	ansValue += currentValue;

				        }
				        input.value = inputValue;
				        ans.innerHTML = ansValue;
				        console.log(currentValue+'被点击');
				        input.focus();
				        break;


			  }//switch 结束

        };//onclick 结束

    }//whitespace 结束	
}//for 循环结束




/**
 * { 替换eval函数 }
 *
 * @param      {string}  fn  The function
 * @return     {<function>}  { 字符串执行}
 */
 function replaceEval(expression) {
 	var Fn = Function;
 	return new Fn('return '+expression)();
 }

 function operation(arr) {
 	var left =  arr[0];
 	arr.forEach(function(current,index,array){
 		console.log('current[0]',current[0]);
 		switch(current[0]){
 			case '+':
 			console.log('iteratorArr.left+',left,'right '+current.slice(1));
 			left = floatAdd(left,current.slice(1));
 			break;
 			case '-':
 			console.log('iteratorArr.left+',left,'right '+current.slice(1));
 			left = floatSub(left,current.slice(1));
 			break;
 			case '*':
 			console.log('iteratorArr.left+',left,'right '+current.slice(1));
 			left = floatMul(left,current.slice(1));
 			break;
 			case '/':
 			console.log('iteratorArr.left+',left,'right '+current.slice(1));
 			left = floatDiv(left,current.slice(1));
 			break;
 		}


 	});

 	return left;

 }


/**
 * 四则运算 
 * 利用填零实现浮点技术精度提升
 *
 */
 function floatAdd(arg1 , arg2) { 
 	var t1,t2,m;    
 	try {
 		t1 = arg1.toString().split(".")[1].length;
 	}catch( e ) {
 		t1 = 0;
 	}    
 	try {
 		t2 = arg2.toString().split(".")[1].length;
 	}catch( e ) {
 		t2 = 0;
 	} 
 	var inarg1 = arg1.toString().replace('.','');
 	var inarg2 = arg2.toString().replace('.','');	 
 	var max = Math.max(t1,t2);
 	if(t1 > t2){
 		inarg2 = addZero(inarg2,t1-t2);
 	}else{
 		inarg1 = addZero(inarg1,t2-t1);
 	}   
     
 	return (+inarg1 + (+inarg2)) /Math.pow(10,max);    
 } 




//减
function floatSub(arg1 , arg2) {    
	var t1,t2;    
	try{ 
		t1 = arg1.toString().split(".")[1].length;
	}catch(e){
		t1 = 0;
	}    
	try{ 
		t2 = arg2.toString().split(".")[1].length;
	} 
	catch(e){ 
		t2 = 0; 
	}   
	var inarg1 = arg1.toString().replace('.','');
	var inarg2 = arg2.toString().replace('.','');
      //arg1的零比arg2多 arg2加零
      max =Math.max(t1,t2);
      if(t1 > t2){
      	inarg2 = addZero(inarg2,t1-t2);
      }else{
      	inarg1 = addZero(inarg1,t2-t1);
      }   
      return (inarg1 - inarg2) / Math.pow(10,max);    
  }    



//除   
function floatDiv(arg1 , arg2) {
	if(arg2 === '0'){
		return '除数不能为0';
	}
	var t1 = 0,
	t2 = 0,
	r1,r2;     
	try {
		t1 = arg1.toString().split(".")[1].length;
	}catch(e){
		t1 = 0;

	}     
	try{ 
		t2 = arg2.toString().split(".")[1].length;
	}catch(e){
		t2 = 0;
	}     


	var inarg1 = arg1.toString().replace('.','');
	var inarg2 = arg2.toString().replace('.','');

      //arg1的零比arg2多 arg2加零
      if(t1 > t2){
      	inarg2 = addZero(inarg2,t1-t2);
      }else{
      	inarg1 = addZero(inarg1,t2-t1);
      }

      return  inarg1/inarg2;  
  }  


//乘    
function floatMul(arg1,arg2) {  
	if(arg1 === '0' || arg2 === '0'){
		return 0;
	}
	var t1 = 0;
	var t2 = 0;
	try { 
		t1 = arg1.toString().split(".")[1].length;
	}catch(e) {
		t1 = 0;
	}     
	try { 
		t2 = arg2.toString().split(".")[1].length;
	}catch(e){
		t2 = 0;
	}
	sup = t2+t1;
	var inarg1 = arg1.toString().replace('.','');
	var inarg2 = arg2.toString().replace('.','');

	return inarg2*inarg1/Math.pow(10,sup) ;     
}


function addZero(num,max){
	for(var i = 0; i < max; i++){
		num+='0';
	}
	return num;	
}

