class CalcController {
  constructor() {

    this._displayCalcEl = document.querySelector('#display');
    this.buttonsClickEvent();
    this._operation = [];

  }

  isOperator(value) {
    return (['+', '-', '/', '*' ].indexOf(value) > -1);
  }

  pushOperator(value) {
    this._operation.push(value);
  }


  getLastOperation() {
    return this._operation[this._operation.length-1];
  }

  setlastOperation(value) {
    this._operation[this._operation.length-1] = value;
  }

  addOperation(value) {

    if(this._operation.length > -1) {
      //É um operador?
      if(this.isOperator(value)){
        if(this.isOperator(this.getLastOperation())) {
          this._operation[this._operation.length-1] = value;

        } else {
          this.pushOperator(value);

        }

      } else if (!isNaN(this.getLastOperation())) {
        let newValue = parseFloat(this.getLastOperation().toString() + value.toString());
        this.setlastOperation(newValue);
        console.log('caiu aqui a');
      }
      //Caso primeiro Número
      else {
        this.pushOperator(value);
        console.log('caiu aqui b');

      }
    }

  }

  // case Botões
  exectBtn(value) {

    switch (value) {
      case 'CE':

        break;
      case 'C':

        break;
      case '←':

        break;

      case '%':

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
