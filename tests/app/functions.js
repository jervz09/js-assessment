if ( typeof window === 'undefined' ) {
  require('../../app/functions');
  var expect = require('chai').expect;
}

describe('functions', function() {
  var sayItCalled = false;
  var sayIt = function(greeting, name, punctuation) {
    sayItCalled = true;
    return greeting + ', ' + name + (punctuation || '!');
  };

  beforeEach(function () {
    sayItCalled = false;
  });

  it('Use an array as arguments when calling a function', function() {
    var result = functionsAnswers.argsAsArray(sayIt, [ 'Hello', 'Ellie', '!' ]);
    expect(result).to.eql('Hello, Ellie!');
    expect(sayItCalled).to.be.ok;
  });

  it('Return a function from a function', function() {
    expect(functionsAnswers.functionFunction('Hello')('world')).to.eql('Hello, world');
    expect(functionsAnswers.functionFunction('Hai')('can i haz funxtion?')).to.eql('Hai, can i haz funxtion?');
  });

  it('Use closures', function () {
    var arr = [ Math.random(), Math.random(), Math.random(), Math.random() ];
    var square = function (x) { return x * x; };

    var funcs = functionsAnswers.makeClosures(arr, square);
    expect(funcs).to.have.length(arr.length);

    for (var i = 0; i < arr.length; i++) {
      expect(funcs[i]()).to.eql(square(arr[i]));
    }
  });

  it('Create a "partial" function', function() {
    var partial = functionsAnswers.partial(sayIt, 'Hello', 'Ellie');
    expect(partial('!!!')).to.eql('Hello, Ellie!!!');
    expect(sayItCalled).to.be.ok;
  });

  it('Use arguments', function () {
    var a = Math.random();
    var b = Math.random();
    var c = Math.random();
    var d = Math.random();

    expect(functionsAnswers.useArguments(a)).to.eql(a);
    expect(functionsAnswers.useArguments(a, b)).to.eql(a + b);
    expect(functionsAnswers.useArguments(a, b, c)).to.eql(a + b + c);
    expect(functionsAnswers.useArguments(a, b, c, d)).to.eql(a + b + c + d);
  });

  it('Apply functions with arbitrary numbers of arguments', function () {
    (function () {
      var a = Math.random();
      var b = Math.random();
      var c = Math.random();

      var wasITake2ArgumentsCalled = false;
      var iTake2Arguments = function (firstArgument, secondArgument) {
        expect(arguments.length).to.eql(2);
        expect(firstArgument).to.eql(a);
        expect(secondArgument).to.eql(b);

        wasITake2ArgumentsCalled = true;
      };

      var wasITake3ArgumentsCalled = false;
      var iTake3Arguments = function (firstArgument, secondArgument, thirdArgument) {
        expect(arguments.length).to.eql(3);
        expect(firstArgument).to.eql(a);
        expect(secondArgument).to.eql(b);
        expect(thirdArgument).to.eql(c);

        wasITake3ArgumentsCalled = true;
      };

      functionsAnswers.callIt(iTake2Arguments, a, b);
      functionsAnswers.callIt(iTake3Arguments, a, b, c);

      expect(wasITake2ArgumentsCalled).to.be.ok;
      expect(wasITake3ArgumentsCalled).to.be.ok;
    }());
  });

  it('Create a "partial" function for variable number of applied arguments', function () {
    var partialMe = function (x, y, z) {
      return x / y * z;
    };

    var a = Math.random();
    var b = Math.random();
    var c = Math.random();
    expect(functionsAnswers.partialUsingArguments(partialMe)(a, b, c)).to.eql(partialMe(a, b, c));
    expect(functionsAnswers.partialUsingArguments(partialMe, a)(b, c)).to.eql(partialMe(a, b, c));
    expect(functionsAnswers.partialUsingArguments(partialMe, a, b)(c)).to.eql(partialMe(a, b, c));
    expect(functionsAnswers.partialUsingArguments(partialMe, a, b, c)()).to.eql(partialMe(a, b, c));
  });
});
