(function (global) {
    "use strict";

    var _ = global._;

    var defined    = {},
        predefined = {},
        waiting    = {};

    var req = global.req = function (name, args) {

        if (typeof args === 'function') {
            args = [args];
        }

        var dependencies = args.slice(0, -1),
            factory      = args.slice(-1)[0],
            preparation  = [];

        if (_.some(dependencies, function (dependency) {
            if (defined[dependency] === undefined) {
                addWaiting(dependency);
                return true;
            }
            preparation.push(defined[dependency]);
        })) {
            return false;
        }

        defined[name] = factory.apply(null, preparation);
        after(name);
        return true;

        function addWaiting(dependency) {
            if (predefined[dependency] === undefined) {
                predefined[dependency] = {};
            }
            predefined[dependency][name] = true;
            waiting[name] = args;
        }

    };

    function after(name) {
        if (predefined[name] === undefined) {
            return;
        }
        _.forEach(predefined[name], function (isWaiting, waitingName) {
            if (defined[waitingName] !== undefined) {
                return;
            }
            if (req(waitingName, waiting[waitingName])) {
                delete(waiting[waitingName]);
            }
        });
        delete(predefined[name]);
    }

})(window);
