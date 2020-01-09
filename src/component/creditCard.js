import React from 'react';

export default class CreditCard extends React.Component {
  constructor() {
    super();

    this.state = {
      ccNumber: ""
    }
  }

  render() {
    return (
      <p>
        Credit Card Number <br />
        <input type="text" onChange={e => {this.validateCCNumber(e.target.value)}} value={this.state.ccNumber}></input>
      </p>
    )
  }

  // Validates the credit card number
  validateCCNumber(ccNum) {
    let formattedCCNum = this.formatVisaMastercardNum(ccNum);
    if (Number(formattedCCNum) || formattedCCNum === "") {
      if(this.isMastercard(formattedCCNum) || this.isVisa(formattedCCNum)) {
        ccNum = this.formatVisaMastercardString(formattedCCNum);
      } else if (this.isAmex(formattedCCNum)) {
        ccNum = this.formatAmexString(formattedCCNum);
      } else {
        this.toggleInvalidCCNum();
      }

      this.setState({ ccNumber: ccNum });
    } else {
      console.log("not valid");
    }
  }

  // Verifies cc number starts with 5
  isMastercard(ccNum) {
    return ccNum.startsWith("5");
  }

  // Verifies cc number starts with 4
  isVisa(ccNum) {
    return ccNum.startsWith("4");
  }

  // Verifies cc number starts with 37
  isAmex(ccNum) {
    return ccNum.startsWith("37");
  }

  // Inform the user that the cc number is not valid
  toggleInvalidCCNum() {
    console.log("Invaid");
  }

  // Properly formats a Visa or Mastercard cc Number
  formatVisaMastercardString(ccNum) {
    let ccNumArray = ccNum.split('');
    if (ccNumArray.length > 4) {
      ccNumArray.splice(4, 0, ' ');
    }

    if (ccNumArray.length > 9) {
      ccNumArray.splice(9, 0, ' ');
    }

    if (ccNumArray.length > 14) {
      ccNumArray.splice(14, 0, ' ');
    }

    return ccNumArray.join('');
  }

  // Properly formats Visa or Mastercard cc number to check if it's a number
  formatVisaMastercardNum(ccNum) {
    let ccNumArray = ccNum.split('');

    while (ccNumArray.indexOf(' ') !== -1) {
      ccNumArray.splice(ccNumArray.indexOf(' '), 1, '');
    }

    return ccNumArray.join('');
  }

  formatAmexString(ccNum) {
    let ccNumArray = ccNum.split('');
    if (ccNumArray.length > 4) {
      ccNumArray.splice(4, 0, ' ');
    }

    if (ccNumArray.length > 11) {
      ccNumArray.splice(11, 0, ' ');
    }

    return ccNumArray.join('');
  }
}
