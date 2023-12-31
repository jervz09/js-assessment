if ( typeof window === 'undefined' ) {
  require('../../app/objects');
  var expect = require('chai').expect;
}

describe('objects and context', function() {
  var a;
  var b;
  var C;

  beforeEach(function() {
    a = {
      name: 'Matt',
      greeting: 'Hello',
      sayIt: function() {
        return this.greeting + ', ' +
                this.name + '!';
      }
    };

    b = {
      name: 'Rebecca',
      greeting: 'Yo'
    };

    C = function(name) {
      this.name = name;
      return this;
    };
  });

  it('Alter the context in which a method runs', function() {
    // define a function for fn so that the following will pass
    expect(objectsAnswers.alterContext(a.sayIt, b)).to.eql('Yo, Rebecca!');
  });

  it('Iterate over an object\'s "own" properties', function() {
    // define a function for fn so that the following will pass
    C = function() {
      this.foo = 'bar';
      this.baz = 'bim';
    };

    C.prototype.bop = 'bip';

    var obj = new C();

    expect(objectsAnswers.iterate(obj)).to.eql([ 'foo: bar', 'baz: bim' ]);
  });
});
