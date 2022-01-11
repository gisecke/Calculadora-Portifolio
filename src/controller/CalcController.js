class CalcController {
  constructor() {

    this._displayCalcEl = document.querySelector('#display');
    this.buttonsClickEvent();
    this._operation = [];
    this._firstNumber = '';
    this._lastOperator = '';
    this._lastNumber = '';

  }



  clearEntry() {
    this._operation.pop();
    this.setLastNumberToDisplay();

  }

  clearAll() {
    this._operation = [0];
    this._lastOperator = '';
    this._firstNumber = '';
    this._lastNumber= '';
    this.setLastNumberToDisplay();
  }

  backspace() {
    let lastNumber = this.getLastOperation();
    if (!this.isOperator(lastNumber)) {
      let splitLastNumber = lastNumber.toString().split('');
      splitLastNumber.pop();
      this.setlastOperation(parseFloat(splitLastNumber.join('')));
      this.setLastNumberToDisplay();
    }
  }

  //cálculo porcentagem
  calcPercent() {
    if (this._operation.length == 1 && this._lastOperator) {
      this._operation = [this._operation/100];

    } else if (this._operation.length == 2) {
        if (this.getLastOperation() == '*' || this.getLastOperation() == '/' ) {
          this._lastNumber = this._operation[0]/100;
          this.pushOperator(this._lastNumber);
        } else {
          this._lastNumber = this._operation[0]*this._operation[0]/100;
          this.pushOperator(this._lastNumber);
        }
      } else if (this._operation.length == 3) {
          if (this.getLastOperator() == '*' || this.getLastOperator() == '/' ) {
            this._lastNumber = this.getLastOperation()/100;
            this.setlastOperation(this._lastNumber);
          } else {
            this._lastNumber = this.getLastOperation()*this.getLastOperation/100;
            this.setlastOperation(this._lastNumber);
          }
        } else {
      this.clearAll();
    }
    this.setLastNumberToDisplay();
  }

//retorna boolean se é um operador
  isOperator(value) {
    return (['+', '-', '/', '*' ].indexOf(value) > -1);
  }

//adicionar operação
  pushOperator(value) {
    this._operation.push(value);
  }

// get and set da última operação
  getLastOperation() {
    return this._operation[this._operation.length-1];
  }

  getLastOperator() {
    for (var i = this._operation.length; i >= 0; i--) {
      if(this.isOperator(this._operation[i])) {
        return this._operation[i];
        break;
      }
    }
  }

  getLastOperations() {
    this._lastNumber = this.getLastOperation();
    this._lastOperator = this.getLastOperator();
  }
  setlastOperation(value) {
    this._operation[this._operation.length-1] = value;
  }

  /******/

  setLastNumberToDisplay() {


    if (!this.isOperator(this.getLastOperation())) {
      this.displayCalc = this.getLastOperation();
    } else {
      this.displayCalc = this._operation[this._operation.length-2];
    }
  }

  calc() {
        //se for apenas um número e o operador
    if(this.isOperator(this.getLastOperation()) && this._operation.length < 3) {
      this._lastOperator = this.getLastOperation();
      this._firstNumber = this._operation[0].toString();
      let mathExpression = this._operation;
      mathExpression.push(this._firstNumber);
      mathExpression = mathExpression.join('');
      this._operation = [eval(mathExpression)];
    }
    //repetição do igual
    else if (this._firstNumber && this._lastOperator) {
      let mathExpression = [this._operation[0], this._lastOperator, this._firstNumber];
      this._operation = [eval(mathExpression.join(''))];
    } //repetição do igual depois da operação
    else if (this._lastNumber || this._lastOperator) {
      //depois de apertar o igual e somar ou subtrair
      if (this._operation.length == 3) {
        this.getLastOperations();
        this._operation = [eval(this._operation.join(''))];
      } else {
        let mathExpression = [this._operation[0], this._lastOperator, this._lastNumber];
        this._operation = [eval(mathExpression.join(''))];
      }
    } else {
    this.getLastOperations();
      let mathExpression = [this._operation[0], this._lastOperator, this._lastNumber];
      this._operation = [eval(mathExpression.join(''))];

    }
    this.setLastNumberToDisplay();

  }

  addOperation(value) {

    if(this._operation.length > -1) {
      //É um operador?
      if(this.isOperator(value)){
        if (this._operation.length > 2){
          this.calc();
          this.pushOperator(value);
        } else if(this.isOperator(this.getLastOperation())) {
          this.setlastOperation(value);
        } else {
          this.pushOperator(value);

        }

      } else if (!isNaN(this.getLastOperation())) {
        let newValue = parseFloat(this.getLastOperation().toString() + value.toString());
        this.setlastOperation(newValue);

      }
      //Caso primeiro Número
      else {
        this.pushOperator(value);


      }
    }

      this.setLastNumberToDisplay();

  }

  // case Botões
  exectBtn(value) {

    switch (value) {
      case 'CE':
        this.clearEntry();
        break;
      case 'C':
        this.clearAll();
        break;
      case '←':
        this.backspace();
        break;

      case '%':
      this.calcPercent();
        break;
      case '√':

        break;
      case 'x²':

        break;
      case '¹/x':

        break;

      case 'CE':

        break;

      case '±':

        break;
      case ',':

        break;
      case '=':
        this.calc();
        break;

        //Operações Matemáticas
      case 'X':
        value = "*"
        this.addOperation(value);
        break;
      case '÷':
        value = "/"
        this.addOperation(value);
        break;
      case '+':
        this.addOperation(value);
        break;
      case '-':
        this.addOperation(value);
        break;

        //Números
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        value = parseInt(value);
        this.addOperation(value);

        break;

      default:
        this.setError();

    }

  }
  //Listener Botões
  buttonsClickEvent() {
    let buttons = document.querySelectorAll(".row > button");

    buttons.forEach((btn, index) => {

      btn.addEventListener('click', e => {
        let textBtn = buttons[index].innerText;
        this.exectBtn(textBtn);

      });
    });
  }

  setError() {
    this.displayCalc = "ERROR";
  }


  get displayCalc () {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc (value) {
    this._displayCalcEl.innerHTML = value;
  }
}
