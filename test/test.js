const { verify, addValidationRule, listValidationRules, removeValidationRule } = require('../index');
const expect = require('chai').expect;

const verifyCorrectDes = `Should return {result: true, message: ''} when verify is correct`;
const verifyErrorDes = `Should return {result: false, message: (Error Message)} when verify is error`;

const defaultRulesString = "email,string,number,array,json-string,json-object";
const defaultRulesArray = '["email", "string", "number", "array", "json-string", "json-object"]';
const rulesArrayAfterAdded = '["email", "string", "number", "array", "json-string", "json-object", "test"]';

describe('Verify', () => {
  describe('verify-simple', () => {
    it(verifyCorrectDes, () => {
      const data1 = 'String', validation1 = 'string';
      const data2 = '{"name":"name","age":15}', validation2 = 'json-string';
      const data3 = { name: "name", age: 15 }, validation3 = 'json-object';
      const data4 = 'test@gmail.com', validation4 = 'email';
      expect(verify(data1, validation1).result).to.equal(true);
      expect(verify(data2, validation2).result).to.equal(true);
      expect(verify(data3, validation3).result).to.equal(true);
      expect(verify(data4, validation4).result).to.equal(true);
      expect(verify(data1, validation1).message).to.equal('');
      expect(verify(data2, validation2).message).to.equal('');
      expect(verify(data3, validation3).message).to.equal('');
      expect(verify(data4, validation4).message).to.equal('');
    });
    it(verifyErrorDes, () => {
      const data1 = 'String', validation1 = 'number';
      const data2 = 666, validation2 = 'string';
      const data3 = 'error_email_1', validation3 = 'email';
      const data4 = 'error_email_2@', validation4 = 'email';
      const data5 = 666, validation5 = 'email';
      expect(verify(data1, validation1).result).to.equal(false);
      expect(verify(data2, validation2).result).to.equal(false);
      expect(verify(data3, validation3).result).to.equal(false);
      expect(verify(data4, validation4).result).to.equal(false);
      expect(verify(data5, validation5).result).to.equal(false);
      expect(verify(data1, validation1).message).to.equal('Verify error');
      expect(verify(data2, validation2).message).to.equal('Verify error');
      expect(verify(data3, validation3).message).to.equal('Verify error');
      expect(verify(data4, validation4).message).to.equal('Verify error');
      expect(verify(data5, validation5).message).to.equal('Verify error');
    });
  });
  describe('verify-object', () => {
    it(verifyCorrectDes, () => {
      const data1 = {
        name: 'Name',
        age: 19,
        grade: {
          first: 99,
          second: 89
        }
      },
      validation1 = {
        name: 'string',
        age: 'number',
        grade: 'json-object'
      };
      expect(verify(data1, validation1).result).to.equal(true);
      expect(verify(data1, validation1).message).to.equal('');
    });
  });
  describe('verify-array', () => {
    it(verifyCorrectDes, () => {
      const data1 = [1, 2, 3, 4], validation1 = 'array';
      expect(verify(data1, validation1).result).to.equal(true);
      expect(verify(data1, validation1).message).to.equal('');
    })
  });
  describe('list-validation-rules', () => {
    it(`Should return ${defaultRulesArray} when verify is correct`, () => {
      expect(listValidationRules().join(',')).to.equal(defaultRulesString);
    });
  });
  describe('add-validation-rule', () => {
    it(`Should return ${rulesArrayAfterAdded} when verify is correct`, () => {
      const name = 'test', validation = () => {};
      expect(addValidationRule(name, validation).join(',')).to.equal(defaultRulesString + "," + name);
    });
  });
});
