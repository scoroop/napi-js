/**
 * Created by kozervar on 2016-07-19.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var generateFileHashes = function generateFileHashes(options, files) {
    if (options.verbose) {
        _utils.logger.info('--------------------------------');
        _utils.logger.info('Generate file hash');
        _utils.logger.info('--------------------------------');
    }
    if (files.length === 0) _utils.logger.info('No files found!');else if (options.verbose) {
        _utils.logger.info('Files found: ');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var file = _step.value;

                _utils.logger.info(file);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    var promises = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var file = _step2.value;

            promises.push((0, _utils.hash)(file));
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return Promise.all(promises);
};

var makeHttpRequests = function makeHttpRequests(options, fileHashes) {
    if (options.verbose) {
        _utils.logger.info('--------------------------------');
        _utils.logger.info('Make HTTP request');
        _utils.logger.info('--------------------------------');
    }
    var promises = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = fileHashes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var fh = _step3.value;

            if (options.verbose) {
                _utils.logger.info('Downloading subtitles for file [%s] with hash [%s]', fh.file, fh.hash);
            }
            var httpRequest = new _utils.HttpRequest(options, fh);
            promises.push(httpRequest.request());
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return Promise.all(promises);
};

var parseHttpResponse = function parseHttpResponse(options, filesWithHash) {
    if (options.verbose) {
        _utils.logger.info('--------------------------------');
        _utils.logger.info('Parse HTTP response');
        _utils.logger.info('--------------------------------');
    }
    var promises = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = filesWithHash[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var fileWithHash = _step4.value;

            var p = (0, _utils.XML2JSON)(options, fileWithHash).catch(function (err) {
                if (options.verbose) {
                    _utils.logger.info('Error in HTTP response: ', err.err);
                }
                return err.fileWithHash;
            });
            promises.push(p);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return Promise.all(promises);
};

function download(o) {
    return new Promise(function (resolve, reject) {
        (0, _utils.glob)(o.files).then(function (files) {
            return generateFileHashes(o, files);
        }).then(function (fileHashes) {
            return makeHttpRequests(o, fileHashes);
        }).then(function (filesWithHash) {
            return parseHttpResponse(o, filesWithHash);
        }).then(function (responses) {
            resolve(responses);
        }).catch(function (err) {
            reject(err);
        });
    });
}

exports.default = download;
//# sourceMappingURL=data:application/json;base64,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LENBQVI7QUFNQSxxQkFBUyxJQUFULENBQWMsQ0FBZDtBQUNIO0FBZnFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZ0J0RCxXQUFPLFFBQVEsR0FBUixDQUFZLFFBQVosQ0FBUDtBQUNILENBakJEOztBQW1CQSxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUI7QUFDakIsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3BDLHlCQUFLLEVBQUUsS0FBUCxFQUNLLElBREwsQ0FDVSxVQUFDLEtBQUQ7QUFBQSxtQkFBVSxtQkFBbUIsQ0FBbkIsRUFBc0IsS0FBdEIsQ0FBVjtBQUFBLFNBRFYsRUFFSyxJQUZMLENBRVUsVUFBQyxVQUFEO0FBQUEsbUJBQWUsaUJBQWlCLENBQWpCLEVBQW9CLFVBQXBCLENBQWY7QUFBQSxTQUZWLEVBR0ssSUFITCxDQUdVLFVBQUMsYUFBRDtBQUFBLG1CQUFrQixrQkFBa0IsQ0FBbEIsRUFBcUIsYUFBckIsQ0FBbEI7QUFBQSxTQUhWLEVBSUssSUFKTCxDQUlVLFVBQUMsU0FBRCxFQUFjO0FBQ2hCLG9CQUFRLFNBQVI7QUFDSCxTQU5MLEVBT0ssS0FQTCxDQU9XLGVBQU07QUFDVCxtQkFBTyxHQUFQO0FBQ0gsU0FUTDtBQVVILEtBWE0sQ0FBUDtBQVlIOztrQkFFYyxRIiwiZmlsZSI6ImRvd25sb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGtvemVydmFyIG9uIDIwMTYtMDctMTkuXG4gKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7IGxvZ2dlciwgaGFzaCwgZ2xvYiwgSHR0cFJlcXVlc3QsIFhNTDJKU09OIH0gZnJvbSAnLi91dGlscyc7XG5cblxudmFyIGdlbmVyYXRlRmlsZUhhc2hlcyA9IGZ1bmN0aW9uIChvcHRpb25zLCBmaWxlcykge1xuICAgIGlmKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgICBsb2dnZXIuaW5mbygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ0dlbmVyYXRlIGZpbGUgaGFzaCcpO1xuICAgICAgICBsb2dnZXIuaW5mbygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICB9XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgbG9nZ2VyLmluZm8oJ05vIGZpbGVzIGZvdW5kIScpO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgICBsb2dnZXIuaW5mbygnRmlsZXMgZm91bmQ6ICcpO1xuICAgICAgICBmb3IgKHZhciBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbyhmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIGZvciAodmFyIGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChoYXNoKGZpbGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbnZhciBtYWtlSHR0cFJlcXVlc3RzID0gZnVuY3Rpb24gKG9wdGlvbnMsIGZpbGVIYXNoZXMpIHtcbiAgICBpZihvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdNYWtlIEhUVFAgcmVxdWVzdCcpO1xuICAgICAgICBsb2dnZXIuaW5mbygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICB9XG4gICAgdmFyIHByb21pc2VzID0gW107XG4gICAgZm9yICh2YXIgZmggb2YgZmlsZUhhc2hlcykge1xuICAgICAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbygnRG93bmxvYWRpbmcgc3VidGl0bGVzIGZvciBmaWxlIFslc10gd2l0aCBoYXNoIFslc10nLCBmaC5maWxlLCBmaC5oYXNoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaHR0cFJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3Qob3B0aW9ucywgZmgpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKGh0dHBSZXF1ZXN0LnJlcXVlc3QoKSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG52YXIgcGFyc2VIdHRwUmVzcG9uc2UgPSBmdW5jdGlvbiAob3B0aW9ucywgZmlsZXNXaXRoSGFzaCkge1xuICAgIGlmKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgICBsb2dnZXIuaW5mbygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1BhcnNlIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG4gICAgfVxuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIGZvciAodmFyIGZpbGVXaXRoSGFzaCBvZiBmaWxlc1dpdGhIYXNoKSB7XG4gICAgICAgIHZhciBwID0gWE1MMkpTT04ob3B0aW9ucywgZmlsZVdpdGhIYXNoKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oJ0Vycm9yIGluIEhUVFAgcmVzcG9uc2U6ICcsIGVyci5lcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVyci5maWxlV2l0aEhhc2g7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHApO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuZnVuY3Rpb24gZG93bmxvYWQobykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGdsb2Ioby5maWxlcylcbiAgICAgICAgICAgIC50aGVuKChmaWxlcyk9PiBnZW5lcmF0ZUZpbGVIYXNoZXMobywgZmlsZXMpKVxuICAgICAgICAgICAgLnRoZW4oKGZpbGVIYXNoZXMpPT4gbWFrZUh0dHBSZXF1ZXN0cyhvLCBmaWxlSGFzaGVzKSlcbiAgICAgICAgICAgIC50aGVuKChmaWxlc1dpdGhIYXNoKT0+IHBhcnNlSHR0cFJlc3BvbnNlKG8sIGZpbGVzV2l0aEhhc2gpKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlcyk9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnI9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=