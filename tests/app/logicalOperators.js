if ( typeof window === 'undefined' ) {
  require('../../app/logicalOperators');
  var expect = require('chai').expect;
}

describe('logical operators', function(){
  it('Work with logical OR', function() {
    expect(logicalOperatorsAnswers.or(false, true)).to.be.ok;
    expect(logicalOperatorsAnswers.or(true, false)).to.be.ok;
    expect(logicalOperatorsAnswers.or(true, true)).to.be.ok;
    expect(logicalOperatorsAnswers.or(false, false)).not.to.be.ok;
    expect(logicalOperatorsAnswers.or(3, 4)).to.not.eq(7);
  });

  it('Work with logical AND', function() {
    expect(logicalOperatorsAnswers.and(false, true)).not.to.be.ok;
    expect(logicalOperatorsAnswers.and(false, false)).not.to.be.ok;
    expect(logicalOperatorsAnswers.and(true, false)).not.to.be.ok;
    expect(logicalOperatorsAnswers.and(true, true)).to.be.ok;
    expect(logicalOperatorsAnswers.and(3, 4)).to.be.ok;
  });
});
