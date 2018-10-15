const { verify, addValidationRule, listValidationRules, removeValidationRule } = require('../index');
const expect = require('chai').expect;

const correctDes = `should return {result: true, message: ''} when verify is correct`;
const errortDes = `should return {result: false, message: (Error Message)} when verify is error`;

describe('Verify', () => {
  describe('verify-simple', () => {
    it(correctDes, () => {
      const data1 = 'String', validation1 = 'string';
      const data2 = '{"name":"name","age":15}', validation2 = 'json-string';
      const data3 = { name:"name",age:15 }, validation3 = 'json-object';
      expect(verify(data1, validation1).result).to.equal(false);
      expect(verify(data2, validation2).result).to.equal(true);
      expect(verify(data2, validation3).result).to.equal(true);
      expect(verify(data1, validation1).message).to.equal('');
      expect(verify(data2, validation2).message).to.equal('');
      expect(verify(data3, validation3).message).to.equal('');
    });

    it(errortDes, () => {
      const data1 = 'String', validation1 = 'number';
      const data2 = 666, validation2 = 'string';
      expect(verify(data1, validation1).result).to.equal(false);
      expect(verify(data2, validation2).result).to.equal(false);
      expect(verify(data1, validation1).message).to.equal('Verify error');
      expect(verify(data2, validation2).message).to.equal('Verify error');
    });
  });
  describe('verify-object', () => {
    it(correctDes, () => {
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
});
