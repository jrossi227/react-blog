var request = require('superagent'),
    config = require('../config');

var IncludeHandler = (function() {

    
    var _handleInclude = function(type, path, cb) {

        var executeCallback = function(type, data) {
            if(typeof cb != 'undefined') {
                cb(type, data);
            }
        };

        switch(type) {
            case 'html':

                request
                    .get(config.baseUrl+path)
                    .end(function(err, res){
                        executeCallback(type, res.text);
                    });
                break;

            default:
                executeCallback(type, null);
                break;
        }
    };
    
    return {
        handleInclude: _handleInclude
    };

})();

module.exports = IncludeHandler;