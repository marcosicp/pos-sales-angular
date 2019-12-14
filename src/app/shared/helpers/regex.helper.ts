export default {
  alphaNumeric: /^[a-zA-Z0-9]*$/,
  lettersOnly: /^[a-zA-Z,.]*$/,
  lettersSpace: /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s\W]*$/,
  numbers: /^[0-9]*$/,
  numberDecimals: /^[0-9]*\.?[0-9]{0,2}$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
};
