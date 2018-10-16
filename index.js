const validationRules = {
  'email': (input) => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(input),
  'string': (input) => typeof input === 'string',
  'number': (input) => typeof input === 'number',
  'array': (input) => input != null && typeof input != 'function' && (input.length > -1 && input.length % 1 == 0),
  'json-string': (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      return false;
    }
  },
  'json-object': (input) => {
    try {
      JSON.stringify(input);
      return true;
    } catch (error) {
      return false;
    }
  }
};

function verify (data, rules) {
  const value = { result: true, message: '' };
  if (typeof rules === 'string') {
    const result = verifyItem(data, rules);
    if (!result) {
      value.result = false;
      value.message = `Verify error`;
    }
  } else {
    for (let key in rules) {
      if (typeof rules[key] === 'string') {
        const result = verifyItem(data[key], rules[key]);
        if (!result) {
          value.result = false;
          value.message = `Verify field '${key}' error`;
          break;
        }
      } else {
        throw new Error('Rule type must be string');
      }
    }
  }
  return value;
}

function verifyItem (input, validations) {
  let result = true;
  if (!input) {
    throw new Error('Data can not be empty');
  }
  const validationsArr = validations.split(',');
  for (let i = 0; i < validationsArr.length; i++) {
    if (validationRules[validationsArr[i]]) {
      if (!validationRules[validationsArr[i]](input)) {
        result = false;
        break;
      }
    } else {
      throw new Error('Validation not found');
    }
  }
  return result;
}

function listValidationRules() {
  return Object.keys(validationRules);
}

function addValidationRule (validationName, validationFunction) {
  if (typeof validationFunction !== 'function') {
    throw new Error('Parameter mast be a function');
  }
  if (validationRules[validationName]) {
    return;
  }
  validationRules[validationName] = validationFunction;
  return listValidationRules();
}

function removeValidationRule (validationName) {
  if (validationRules[validationName]) {
    delete validationRules[validationName];
  }
  return listValidationRules();
}

module.exports = {
  verify,
  addValidationRule,
  listValidationRules,
  removeValidationRule
}