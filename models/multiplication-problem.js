class MultiplicationProblem{

	myInstanceName;

	operandOneDigits;
	operandTwoDigits;

	resultDigits;

	operandOneNumericValue;
	operandTwoNumericValue;

	answerValue;
	answerString;
	answerValueDigits;

	operandOneValueDigits;
	operandTwoValueDigits;

	operandOneString;
	operandTwoString;

	partialAnswerValueDigits;
	carryValueDigits;

	constructor(whoAmI){
		this.operandOneDigits=4;
		this.operandTwoDigits=3;

		this.myInstanceName=whoAmI;
		this.operandOneNumericValue=this.randomOperand(this.operandOneDigits);
		this.operandTwoNumericValue=this.randomOperand(this.operandTwoDigits);
		this.answerValue=this.operandOneNumericValue*this.operandTwoNumericValue;

		var counter;

		this.resultDigits=this.operandOneDigits+this.operandTwoDigits;

		this.answerValueDigits=new Array();
		this.operandOneValueDigits=new Array();
		this.operandTwoValueDigits=new Array();

		//Create the 2 two dimensional arrays- outer dimension
		this.partialAnswerValueDigits=new Array();
		this.carryValueDigits=new Array();

		//Create the 2 two dimensional arrays- inner dimension
		for(verticalCounter=0;verticalCounter<this.operandTwoDigits;verticalCounter++){
			this.partialAnswerValueDigits[verticalCounter]=new Array();
			this.carryValueDigits[verticalCounter]=new Array();
		}

		var verticalCounter;
		var horizontalCellCounter;

		//initialize the 2 two dimensional arrays
		for(verticalCounter=0;verticalCounter<this.operandTwoDigits;verticalCounter++){
			for(horizontalCellCounter=0;horizontalCellCounter<this.resultDigits;horizontalCellCounter++){
				this.partialAnswerValueDigits[verticalCounter][horizontalCellCounter]=0;
				this.carryValueDigits[verticalCounter][horizontalCellCounter]=0;
			}
		}

		for(counter=0;counter<this.resultDigits;counter++){
			this.answerValueDigits.push(0);
			this.operandOneValueDigits.push(0);
			this.operandTwoValueDigits.push(0);
		}

		this.answerString=this.numberToPaddedString(this.answerValue,this.resultDigits).replaceAll(' ','0');

		this.operandOneString=this.numberToPaddedString(this.operandOneNumericValue,this.resultDigits).replaceAll(' ','0');
		this.operandTwoString=this.numberToPaddedString(this.operandTwoNumericValue,this.resultDigits).replaceAll(' ','0');

		for(counter=0;counter<this.resultDigits;counter++){
			this.answerValueDigits[counter]=parseInt(this.answerString[counter]);

			this.operandOneValueDigits[counter]=parseInt(this.operandOneString[counter]);
			this.operandTwoValueDigits[counter]=parseInt(this.operandTwoString[counter]);
		}

		// populate the partial answer an carry arrays (two dimensional)
		var tempNumber;
		var op1;
		var op2;
		var storageColumn;
		var storageRow;
		var shifter;
		var carryStorageColumn;
		var digitCarry;
		var digitPartialAnswer;

		shifter=0;

		for(verticalCounter=(this.resultDigits-1);verticalCounter>this.operandTwoDigits;verticalCounter--){ 

			for(horizontalCellCounter=(this.resultDigits-1);horizontalCellCounter>=(this.resultDigits-this.operandOneDigits-1);horizontalCellCounter--){

				//this.partialAnswerValueDigits[verticalCounter][horizontalCellCounter]=verticalCounter+1;
				//this.carryValueDigits[verticalCounter][horizontalCellCounter]=verticalCounter+1;
				op2=this.operandTwoValueDigits[verticalCounter];
				op1=this.operandOneValueDigits[horizontalCellCounter];
				
				tempNumber= op1 * op2;

				storageRow=this.resultDigits- verticalCounter-1;

				storageColumn=horizontalCellCounter-shifter;
				carryStorageColumn=storageColumn-1;

				tempNumber+= this.carryValueDigits[storageRow][storageColumn];

				//storageColumn-=(this.resultDigits-verticalCounter+1);

				console.log('storageRow='+storageRow.toString()+' storageColumn='+storageColumn.toString() );
				
				digitCarry=Math.floor(tempNumber/10);
				digitPartialAnswer=tempNumber%10;

				this.partialAnswerValueDigits[storageRow][storageColumn]=digitPartialAnswer;
				
				this.carryValueDigits[storageRow][carryStorageColumn]=digitCarry;

				console.log('op1='+op1.toString()+' op2='+op2.toString()+' tempNumber='+tempNumber+toString()+' digitCarry='+digitCarry.toString()+' digitPartialAnswer='+digitPartialAnswer.toString() );

			}
			
			shifter++;
		} 

		console.log('partial answers=['+this.partialAnswerValueDigits.toString()+']  operandTwoValueDigits=['+this.operandTwoValueDigits.toString()+'] this.answerValue='+this.answerValue.toString()+' answerString=['+this.answerString+'] operandOneValueDigits=['+this.operandOneValueDigits.toString()+'] this.answerValueDigits=:: '+this.answerValueDigits.toString()+'  ::');

		for(verticalCounter=0;verticalCounter<this.operandTwoDigits;verticalCounter++){ 
			console.log('partial answers['+verticalCounter.toString()+']=['+this.partialAnswerValueDigits[verticalCounter].toString()+']');
		}

	}

randomOperand(numberOfDigits) {
	var fullNumber=0;
	var counter=0;
	var thisDigit=0;

	for (counter=0;counter<numberOfDigits;counter++){
		thisDigit=Math.floor(Math.random()*9+1);
		fullNumber=fullNumber*10;
		fullNumber=fullNumber+thisDigit;
	}
	return fullNumber;
}

emitContentTable(){
	console.log(this.operandOneValueDigits.toString());
	var contentTableString='';
	//console.log(this.resultDigits);
	
	//console.log('this.operandOneNumericValue=['+this.operandOneNumericValue.toString()+']');
	var operandOnePaddedString=this.numberToPaddedString(this.operandOneNumericValue,this.resultDigits);
	
	//console.log('this.operandTwoNumericValue=['+this.operandTwoNumericValue.toString()+']');
	var operandTwoPaddedString=this.numberToPaddedString(this.operandTwoNumericValue,this.resultDigits);

	contentTableString+='<center><table id="problemTable">';
	
	var horizontalCellCounter;

	var carryCounter;
	for(carryCounter=this.operandTwoDigits;carryCounter>=1;carryCounter--){
		
		contentTableString+='<tr id="CarryRow_'+carryCounter+'" >';

		for(horizontalCellCounter=0;horizontalCellCounter<this.resultDigits;horizontalCellCounter++){
			contentTableString+='<td ';
			contentTableString+=' class="inputCell inputCellBackground" ';
			contentTableString+='>';

			if(horizontalCellCounter<(this.resultDigits-carryCounter) ){
				contentTableString+='<input oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" min="0" max="9" maxlength="1" type="number" size="1" max="9" pattern="[0-9]*" class="carry'+carryCounter.toString();

				if( (  (this.resultDigits-horizontalCellCounter) % 3 )==1){
				contentTableString+=' operandUnits';
				} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==2){
				contentTableString+=' operandTens';
				} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==0){
				contentTableString+=' operandHundreds';
				}

				contentTableString+='" id="carry_Row_'+carryCounter+'_'+horizontalCellCounter+'" ';

				//contentTableString+=' id="carry_Row_'+carryCounter+'_'+horizontalCellCounter+'" ';
				//arguments:   [2]==which row, [3]==which column
				// this.carryValueDigits[storageRow][carryStorageColumn]=digitCarry;


			contentTableString+=' onblur="';
			contentTableString+='var thisId=this.id;console.log(thisId);console.log(\'this.value=\'+this.value);';
			contentTableString+='var thisValue=0;thisValue=parseInt(\' \'+this.value);console.log(thisValue);';
			contentTableString+='var thisRow;var thisColumn;';
			contentTableString+='var nameParts;var verticalCounter;var HorizontalCounter;';
			contentTableString+='nameParts=thisId.split(\'_\');'+'console.log(nameParts);';
			contentTableString+='var thisRow=parseInt(nameParts[2]);'+'var rowName;rowName=\'CarryRow_\'+thisRow;'+
					'thisColumn=parseInt(nameParts[3]);'+
					'console.log(\'481:: rowName=\'+rowName);';
			for(var innerCounter=1;innerCounter<=this.operandTwoDigits;innerCounter++){
				contentTableString+='document.getElementById(\'CarryRow_'+innerCounter+'\').style.opacity=\'1.00\';';
				contentTableString+='document.getElementById(\'partialAnswerInput_Row_'+innerCounter+'\').style.opacity=\'1.00\';';
			}
			contentTableString+='console.log(\'Bottom of onblur()\')';
			contentTableString+='" ';


			contentTableString+=' onfocus="';
			contentTableString+='var thisId=this.id;console.log(thisId);console.log(\'this.value=\'+this.value);';
			contentTableString+='var thisValue=0;thisValue=parseInt(\' \'+this.value);console.log(thisValue);';
			contentTableString+='var thisRow;var thisColumn;';
			contentTableString+='var nameParts;var verticalCounter;var HorizontalCounter;';
			contentTableString+='nameParts=thisId.split(\'_\');'+'console.log(nameParts);';
			contentTableString+='var thisRow=parseInt(nameParts[2]);'+'var rowName;rowName=\'CarryRow_\'+thisRow;'+
					'thisColumn=parseInt(nameParts[3]);'+
					'console.log(\'481:: rowName=\'+rowName);';
			for(var innerCounter=1;innerCounter<=this.operandTwoDigits;innerCounter++){
				contentTableString+='document.getElementById(\'CarryRow_'+innerCounter+'\').style.opacity=\'0.33\';';
				contentTableString+='document.getElementById(\'partialAnswerInput_Row_'+innerCounter+'\').style.opacity=\'0.33\';';
			}
			contentTableString+='document.getElementById(rowName).style.opacity=\'1.00\';';
			contentTableString+='rowName=\'partialAnswerInput_Row_\'+thisRow;'+
					'document.getElementById(rowName).style.opacity=\'1.00\';';
			contentTableString+='console.log(\'Bottom of onfocus()\')';
			contentTableString+='" ';



				contentTableString+=' onchange="';
				contentTableString+='var thisId=this.id;console.log(thisId);';
				contentTableString+='var thisValue=parseInt(this.value);console.log(thisValue);';
				contentTableString+='var thisRow;var thisColumn;';
				contentTableString+='var nameParts;'+
					'nameParts=thisId.split(\'_\');'+
					'console.log(nameParts);'+
					'thisColumn=parseInt(nameParts[3]);'+
					'thisRow=parseInt(nameParts[2]);'+
					'thisRow--;'+
					'console.log(\'522: \'+'+this.myInstanceName+'.carryValueDigits[thisRow].toString() +\' :: \'+'+this.myInstanceName+'.carryValueDigits[thisRow][thisColumn].toString());'+
					'var calculatedValue;'+
					'calculatedValue='+this.myInstanceName+'.carryValueDigits[thisRow][thisColumn];'+
					'console.log(calculatedValue);'+
					'var numbersMatch;'+
					'numbersMatch=false;'+
					'if(calculatedValue==thisValue){numbersMatch=true};'+
					'if(numbersMatch){this.style.background=\'#d0ffd0\';this.readOnly=true; }'+
					'console.log(\'numbersMatch=\'+numbersMatch.toString() );';
				//contentTableString+='console.log(\'thisRow=[\'+thisRow.toString()+\'] thisColumn=[\'+thisColumn.toString()+\'] calculatedValue=[\'+calculatedValue.toString()+\'] thisValue=[\'+thisValue.toString()+\']\');';
				contentTableString+='" ';

				contentTableString+=' placeholder="#">';

			}

			contentTableString+='</td>';
		}

		contentTableString+='</tr>';
	}

	contentTableString+='<tr>';
	contentTableString+='<td colspan=20><hr></td>';
	contentTableString+='</tr>';

	contentTableString+='<tr>';
	for(horizontalCellCounter=0;horizontalCellCounter<this.resultDigits;horizontalCellCounter++){
		contentTableString+='<td ';
		contentTableString+=' class="presentationTable ';
		contentTableString+='operandOne ';
		if( (  (this.resultDigits-horizontalCellCounter) % 3 )==1){
				contentTableString+='operandUnits';
		} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==2){
				contentTableString+='operandTens';
		} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==0){
				contentTableString+='operandHundreds';
		}
		contentTableString+='" ';
		var thisId;
		thisId='operand_one_'+horizontalCellCounter.toString();
		//console.log(thisId);
		contentTableString+=' id="'+thisId+'" ';

		contentTableString+='>';
		contentTableString+=operandOnePaddedString[horizontalCellCounter];
		contentTableString+='</td>';
	}
	contentTableString+='</tr>';
	
	//Put in that rascally multiplication sign
	// this.resultDigits=this.operandOneDigits+this.operandTwoDigits;
	operandTwoPaddedString=this.setCharAt(operandTwoPaddedString,(this.resultDigits-this.operandTwoDigits-2),'x');

	contentTableString+='<tr>';
	for(horizontalCellCounter=0;horizontalCellCounter<this.resultDigits;horizontalCellCounter++){
		contentTableString+='<td ';
		contentTableString+=' class="presentationTable ';
		if(horizontalCellCounter==(this.resultDigits-this.operandTwoDigits-2)){
			contentTableString+='operandMultiplier';
		}else{
			contentTableString+='operandTwo ';

			if( (  (this.resultDigits-horizontalCellCounter) % 3 )==1){
				contentTableString+='operandUnits';
			} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==2){
				contentTableString+='operandTens';
			} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==0){
				contentTableString+='operandHundreds';
			}


		}
		
		contentTableString+='" ';
		contentTableString+=' id="operand_two_'+horizontalCellCounter.toString()+'" ';
		contentTableString+='>';
		contentTableString+=operandTwoPaddedString[horizontalCellCounter];
		contentTableString+='</td>';
	}
	contentTableString+='</tr>';

	contentTableString+='<tr>';
	contentTableString+='<td colspan=20><hr></td>';
	contentTableString+='</tr>';	

	for(carryCounter=1;carryCounter<=this.operandTwoDigits;carryCounter++){
		contentTableString+='<tr id="partialAnswerInput_Row_'+carryCounter+'" >';
		for(horizontalCellCounter=0;horizontalCellCounter<this.resultDigits;horizontalCellCounter++){
			contentTableString+='<td ';
			contentTableString+=' class="inputCell inputCellBackground" ';
			contentTableString+='>';

			contentTableString+='<input  oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" min="0" max="9" maxlength="1" type="number" size="1" max="9" pattern="[0-9]*" class="carry'+carryCounter.toString();
			if( (  (this.resultDigits-horizontalCellCounter) % 3 )==1){
				contentTableString+=' operandUnits';
			} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==2){
				contentTableString+=' operandTens';
			} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==0){
				contentTableString+=' operandHundreds';
			}

			contentTableString+='" placeholder="#"';

			contentTableString+=' id="partialAnswerInput_Row_'+carryCounter+'_'+horizontalCellCounter+'" ';

			var checkAmount=(this.resultDigits-carryCounter);
			//console.log('checkAmount='+checkAmount.toString() );

			if( horizontalCellCounter > checkAmount ){
				contentTableString+=' value="0" ';
			}
			
			contentTableString+=' onblur="';
			contentTableString+='var thisId=this.id;console.log(thisId);console.log(\'this.value=\'+this.value);';
			contentTableString+='var thisValue=0;thisValue=parseInt(\' \'+this.value);console.log(thisValue);';
			contentTableString+='var thisRow;var thisColumn;';
			contentTableString+='var nameParts;var verticalCounter;var HorizontalCounter;';
			contentTableString+='nameParts=thisId.split(\'_\');'+'console.log(nameParts);';
			contentTableString+='var thisRow=parseInt(nameParts[2]);'+'var rowName;rowName=\'CarryRow_\'+thisRow;'+
					'thisColumn=parseInt(nameParts[3]);'+
					'console.log(\'481:: rowName=\'+rowName);';
			for(var innerCounter=1;innerCounter<=this.operandTwoDigits;innerCounter++){
				contentTableString+='document.getElementById(\'CarryRow_'+innerCounter+'\').style.opacity=\'1.00\';';
				contentTableString+='document.getElementById(\'partialAnswerInput_Row_'+innerCounter+'\').style.opacity=\'1.00\';';
			}
			contentTableString+='console.log(\'Bottom of onblur()\')';
			contentTableString+='" ';


			contentTableString+=' onfocus="';
			contentTableString+='var thisId=this.id;console.log(thisId);console.log(\'this.value=\'+this.value);';
			contentTableString+='var thisValue=0;thisValue=parseInt(\' \'+this.value);console.log(thisValue);';
			contentTableString+='var thisRow;var thisColumn;';
			contentTableString+='var nameParts;var verticalCounter;var HorizontalCounter;';
			contentTableString+='nameParts=thisId.split(\'_\');'+'console.log(nameParts);';
			contentTableString+='var thisRow=parseInt(nameParts[2]);'+'var rowName;rowName=\'CarryRow_\'+thisRow;'+
					'thisColumn=parseInt(nameParts[3]);'+
					'console.log(\'481:: rowName=\'+rowName);';
			for(var innerCounter=1;innerCounter<=this.operandTwoDigits;innerCounter++){
				contentTableString+='document.getElementById(\'CarryRow_'+innerCounter+'\').style.opacity=\'0.33\';';
				contentTableString+='document.getElementById(\'partialAnswerInput_Row_'+innerCounter+'\').style.opacity=\'0.33\';';
			}
			contentTableString+='document.getElementById(rowName).style.opacity=\'1.00\';';
			contentTableString+='rowName=\'partialAnswerInput_Row_\'+thisRow;'+
					'document.getElementById(rowName).style.opacity=\'1.00\';';
			contentTableString+='console.log(\'Bottom of onfocus()\')';
			contentTableString+='" ';


			contentTableString+=' onchange="';
			contentTableString+='var thisId=this.id;console.log(thisId);';
			contentTableString+='var thisValue=parseInt(this.value);console.log(thisValue);';
			contentTableString+='var thisRow;var thisColumn;';
			contentTableString+='var nameParts;'+
					'nameParts=thisId.split(\'_\');'+
					'console.log(nameParts);'+
					'thisColumn=parseInt(nameParts[3]);'+
					'thisRow=parseInt(nameParts[2]);'+
					'var rowName;rowName=\'CarryRow_\'+thisRow;'+
					'console.log(\'rowName=\'+rowName);'+
					'thisRow--;'+
					'console.log(\'522: \'+'+this.myInstanceName+'.partialAnswerValueDigits[thisRow].toString() +\' :: \'+'+this.myInstanceName+'.partialAnswerValueDigits[thisRow][thisColumn].toString());'+
					'var calculatedValue;'+
					'calculatedValue='+this.myInstanceName+'.partialAnswerValueDigits[thisRow][thisColumn];'+
					'console.log(calculatedValue);'+
					'var numbersMatch;'+
					'numbersMatch=false;'+
					'if(calculatedValue==thisValue){numbersMatch=true};'+
					'if(numbersMatch){this.style.background=\'#d0ffd0\';this.readOnly=true; }'+
					'console.log(\'numbersMatch=\'+numbersMatch.toString() );';
			//contentTableString+='console.log(\'thisRow=[\'+thisRow.toString()+\'] thisColumn=[\'+thisColumn.toString()+\'] calculatedValue=[\'+calculatedValue.toString()+\'] thisValue=[\'+thisValue.toString()+\']\');';
			contentTableString+='" ';
			
			contentTableString+='>';

			contentTableString+='</td>';
		}
		contentTableString+='</tr>';
	}

	contentTableString+='<tr>';
	contentTableString+='<td colspan=20><hr></td>';
	contentTableString+='</tr>';	

	contentTableString+='<tr>';
	for(horizontalCellCounter=0;horizontalCellCounter<this.resultDigits;horizontalCellCounter++){
		contentTableString+='<td ';
		contentTableString+=' class="inputCell inputCellBackground" ';
		contentTableString+='>';
		contentTableString+='<input '+
			'oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" '+
			' min="0" max="9" maxlength="1" type="number" size="1" max="9" pattern="[0-9]*" class="answer ';
		if( (  (this.resultDigits-horizontalCellCounter) % 3 )==1){
				contentTableString+=' operandUnits';
		} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==2){
				contentTableString+=' operandTens';
		} else if( (  (this.resultDigits-horizontalCellCounter) % 3 )==0){
				contentTableString+=' operandHundreds';
		}
		contentTableString+='" placeholder="#" ';

		//contentTableString+='" onchange="console.log(this.value.toString());" ';

		contentTableString+=' onchange="';
			contentTableString+='var thisId=this.id;console.log(thisId);';
			contentTableString+='var thisValue=parseInt(this.value);console.log(thisValue);';
			contentTableString+='var thisRow;var thisColumn;';
			contentTableString+='var nameParts;'+
					'nameParts=thisId.split(\'_\');'+
					'console.log(nameParts);'+
					'thisColumn=parseInt(nameParts[1]);'+
					'console.log(\'532: thisColumn=[\'+thisColumn.toString()+\']\');'+
					'var calculatedValue;'+
					'calculatedValue='+this.myInstanceName+'.answerValueDigits[thisColumn];'+
					'console.log(calculatedValue);'+
					'var numbersMatch;'+
					'numbersMatch=false;'+
					'if(calculatedValue==thisValue){numbersMatch=true};'+
					'if(numbersMatch){this.style.background=\'#d0ffd0\';this.readOnly=true; }'+
					'console.log(\'numbersMatch=\'+numbersMatch.toString() );';
			//contentTableString+='console.log(\'thisRow=[\'+thisRow.toString()+\'] thisColumn=[\'+thisColumn.toString()+\'] calculatedValue=[\'+calculatedValue.toString()+\'] thisValue=[\'+thisValue.toString()+\']\');';
			contentTableString+='" ';

		contentTableString+=' id="answerInput_'+horizontalCellCounter+'" ';
		contentTableString+=' >';
		contentTableString+='</td>';
	}
	contentTableString+='</tr>';	

	contentTableString+='</table>';
	
	//console.log(contentTableString);
	
	return contentTableString;
}

numberToPaddedString(operand,numberOfDigits){
	var paddedString='';
	var originalStringPosition=0;

	for(var counter=0;counter<numberOfDigits;counter++){
		paddedString+=' ';
	}

	var operandAsString=operand.toString();
	//console.log('operandAsString=['+operandAsString+']');
	var opStringLength=operandAsString.length;
	//console.log('opStringLength=['+opStringLength.toString()+']' );

	var startingValue=numberOfDigits-opStringLength;
	//console.log('startingValue=['+startingValue.toString()+']');
	originalStringPosition=0;
	for(counter=startingValue;counter<numberOfDigits;counter++){

		//console.log('counter=['+counter+']');
		
		//console.log('originalStringPosition=['+originalStringPosition.toString()+']');
		paddedString=this.setCharAt(paddedString,counter,operandAsString[originalStringPosition]);

		//console.log(operandAsString[counter-opStringLength+1]);
		originalStringPosition++;
	}

	return paddedString;
}

setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

}
