import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  clearButton = 'AC';




  constructor() { }

  ngOnInit() {
  }



  setNumber(number: string) : void{

    this.clearButton = 'C';
    if(this.waitForSecondNumber)
    {
      this.currentNumber = number;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = number: this.currentNumber = this.currentNumber + number;
      this.currentNumber = this.MakeCommaSeparators(this.currentNumber);
    }
  }


  private doCalculation(oprator , secondOperand) : number{
    switch (oprator ){
      case '+':
      return this.firstOperand += secondOperand;
      case '-':
      return this.firstOperand -= secondOperand;
      case '*':
      return this.firstOperand *= secondOperand;
      case '/':
      return this.firstOperand /= secondOperand;
      case '=':
      return secondOperand;
    }
  }


  private MakeCommaSeparators(resultNumber: string) : string{

      let numberWithoutCommas='';
      for(let i=0;i<resultNumber.length;i++){
         if(resultNumber.charAt(i) != ','){
           numberWithoutCommas += resultNumber.charAt(i)
         }
      }
      console.log(numberWithoutCommas);
      let parts=numberWithoutCommas.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");


  }


  toggleSign() : void
  {
       let currentNum = this.getCurrentNumber() * -1;

       if(this.currentNumber == this.firstOperand)
          this.firstOperand = currentNum;

       let currentNumString = String(currentNum);
       this.currentNumber = this.MakeCommaSeparators(currentNumString);
  }


  makePercent() :void{

    if(this.currentNumber === '0')
          return;

      let currentNum = this.getCurrentNumber() / 100;

      if(this.currentNumber == this.firstOperand)
         this.firstOperand = currentNum;

      let currentNumString = String(currentNum);
      this.currentNumber = this.MakeCommaSeparators(currentNumString);
  }


  private getCurrentNumber() : number{
    return Number(parseFloat(this.currentNumber.replace(/,/g, '')));

  }

  makeOperation(currentOperator: string) : void{


    if(this.firstOperand === null){
      this.firstOperand = this.getCurrentNumber();

    }else if(this.operator && !this.waitForSecondNumber){

      const CalculatedResult = this.doCalculation(this.operator , this.getCurrentNumber())
      let filterdResult = this.removeTrailingZeros(String(CalculatedResult.toFixed(6)));
      this.currentNumber = this.MakeCommaSeparators(filterdResult);
      this.firstOperand = Number(filterdResult);

    }
    this.operator = currentOperator;
    this.waitForSecondNumber = true;



  }

  private removeTrailingZeros(str : string) : string{

    if(!str.includes('.'))
       return str;
    let parts=str.toString().split(".");
    let temp ='';
    if( parts[1].charAt(parts[1].length-1) === '0' ){
      for(let i=parts[1].length - 1;i>=0 && parts[1].charAt(i) === '0' ;i--){
        temp = parts[1].slice(0,i);
      }
    }else{
      temp = parts[1];
    }
    return parts[0].concat('.' + temp);
  }



  clear() : void{
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    this.clearButton = 'AC';
  }

  makeDecimal() : void{
    if(!this.currentNumber.includes('.')){
      this.currentNumber += '.';
    }
  }


}
