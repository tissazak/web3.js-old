var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index');
var web3 = new Web3();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'blockNumber';

var tests = [{
    result: '0xb',
    formattedResult: 11,
    call: 'eth_'+ method
}];

describe('web3.ele', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function () {
                
                // given
                var provider = new FakeHttpProvider();
                web3.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when 
                var result = web3.ele[method];
                
                // then
                assert.strictEqual(test.formattedResult, result);
            });
            
            it('async get property test: ' + index, function (done) {
                
                // given
                var provider = new FakeHttpProvider();
                web3.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when 
                web3.ele.getBlockNumber(function (err, result) {
                    assert.strictEqual(test.formattedResult, result);
                    done();
                });
                
            });
        });
    });
});

