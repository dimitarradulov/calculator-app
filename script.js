'use strict';

const currOperand = document.querySelector('.current-operand');
const prevOperand = document.querySelector('.previous-operand');
const calculator = document.querySelector('.calculator-grid');

const caluclatorApp = () => {
  const operations = (operand, num1, num2) => {
    let result;

    if (!num1 && !num2) return undefined;

    if (!num2) num2 = num1;

    switch (operand) {
      case 'add':
        result = Number(num1) + Number(num2);
        break;
      case 'subtract':
        result = Number(num1) - Number(num2);
        break;
      case 'multiply':
        result = Number(num1) * Number(num2);
        break;
      case 'division':
        result = Number(num1) / Number(num2);
        break;
      default:
        break;
    }
    return result;
  };

  const setCurrOperandAndCurrNum = (
    currOperandValue = '0',
    currNumValue = ''
  ) => {
    currOperand.textContent = currOperandValue;
    currNum = currNumValue;
  };

  let currNum = '';
  let previousNum;
  let operand;
  let operationCounter = 0;

  calculator.addEventListener('click', (e) => {
    if (e.target.dataset.number) {
      if (prevOperand.textContent && operationCounter < 1) operationCounter++;

      currNum += e.target.textContent;
      currOperand.textContent = currNum;
    }

    if (e.target.dataset.operand) {
      if (operationCounter === 1) {
        currOperand.textContent = `${operations(
          operand,
          previousNum,
          currNum
        )}`;
        operationCounter = 0;
      }

      currNum = '';

      operand = e.target.dataset.operand;
      previousNum = currOperand.textContent;
      prevOperand.textContent = `${currOperand.textContent} ${e.target.textContent}`;
    }

    if (e.target.dataset.equal) {
      currOperand.textContent = `${
        operations(operand, previousNum, currNum) ?? currOperand.textContent
      }`;
      prevOperand.textContent = '';
      currNum = '';
      previousNum = '';
      operationCounter = 0;
    }

    if (e.target.dataset.clear) {
      currOperand.textContent = '0';
      prevOperand.textContent = '';
      currNum = '';
      previousNum = '';
      operationCounter = 0;
    }

    if (e.target.dataset.delete) {
      if (currOperand.textContent === '0') return (currNum = '');

      if (currOperand.textContent.length === 1) {
        return setCurrOperandAndCurrNum();
      }

      const withoutLastChar = currOperand.textContent.slice(0, -1);
      setCurrOperandAndCurrNum(withoutLastChar, withoutLastChar);
    }

    if (e.target.dataset.decimal) {
      if (currOperand.textContent.includes('.')) return;

      setCurrOperandAndCurrNum(
        currOperand.textContent + '.',
        currOperand.textContent + '.'
      );
    }
  });
};

caluclatorApp();
