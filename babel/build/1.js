"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data1, data2, data3;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return $.ajax({ url: "1.txt", dataType: 'json' });

                case 2:
                    data1 = _context.sent;
                    _context.next = 5;
                    return $.ajax({ url: "2.txt", dataType: 'json' });

                case 5:
                    data2 = _context.sent;
                    _context.next = 8;
                    return $.ajax({ url: "3.txt", dataType: 'json' });

                case 8:
                    data3 = _context.sent;

                    console.log(data1, data2, data3);

                case 10:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();