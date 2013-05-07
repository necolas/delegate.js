var expect = chai.expect;

describe('delegate()', function () {
    var evt;
    var delegateTargetElem;
    var targetElem;

    before(function () {
        // create fixture
        var fixture = document.createElement('div');
        fixture.id = 'fixture';
        fixture.innerHTML = '' +
        '<div id="delegateTarget" class="delegator">' +
            '<span id="target">Link text</span>' +
        '</div>';
        document.body.appendChild(fixture);

        // store references to each element
        delegateTargetElem = document.getElementById('delegateTarget');
        targetElem = document.getElementById('target');

        // create event (constructors not supported in Safari 5)
        evt = document.createEvent('Event');
        evt.initEvent('click', true, true);
    });

    describe('.on(type, selector, callback)', function () {
        var calls = [];

        before(function () {
            // delegate an event listener
            delegate(document).on('click', '.delegator', function (e) {
                calls.push('success');
            });
        });

        beforeEach(function () {
            calls = [];
        });

        describe('when the event is dispatched to the delegator', function () {
            it('fires the event handler', function () {
                delegateTargetElem.dispatchEvent(evt);
                expect(calls).to.eql(['success']);
            });

            it('includes the correct `delegateTarget` on the event object', function () {
                delegate(document).on('click', '.delegator', function (e) {
                    expect(e.delegateTarget).to.equal(delegateTargetElem);
                    // remove the event listener, we no longer need it
                    this.removeEventListener('click', arguments.callee, false);
                });
                // dispatch the event to the delegator
                delegateTargetElem.dispatchEvent(evt);
            });
        });

        describe('when the event is dispatched to a child of the delegator', function () {
            it('fires the event handler', function () {
                targetElem.dispatchEvent(evt);
                expect(calls).to.eql(['success']);
            });

            it('includes the correct `delegateTarget` on the event object', function () {
                delegate(document).on('click', '.delegator', function (e) {
                    expect(e.delegateTarget).to.equal(delegateTargetElem);
                    // remove the event listener, we no longer need it
                    this.removeEventListener('click', arguments.callee, false);
                });
                // dispatch the event to a child of the delegator
                targetElem.dispatchEvent(evt);
            });
        });

        describe('when the event is dispatched to a parent of the delegator', function () {
            it('does not fire the event handler', function () {
                document.dispatchEvent(evt);
                expect(calls).to.eql([]);
            });
        });
    });

    describe('.once(type, selector, callback)', function () {
        var arr;
        var handler;

        beforeEach(function () {
            arr = [];
            handler = function (e) {
                arr.push('success');
            }
            delegate(document).once('click', '.delegator', handler);
        });

        it('adds a one-off callback', function () {
            targetElem.dispatchEvent(evt);
            targetElem.dispatchEvent(evt);
            expect(arr).to.eql(['success']);
        });

        it('can be removed with `off()`', function () {
            delegate(document).off('click', handler);
            targetElem.dispatchEvent(evt);
            expect(arr).to.eql([]);
        });
    });

    describe('.off(type, callback)', function () {
        it('removes the event handler', function () {
            var arr = [];
            var handler = function (e) {
                arr.push('success');
            }
            delegate(document).on('click', '.delegator', handler);
            delegate(document).off('click', handler);
            targetElem.dispatchEvent(evt);
            expect(arr).to.eql([]);
        });
    });
});
