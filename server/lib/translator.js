export default (lang) => {
    var translations;

    function format() {
        var args = [];
        var a;
        var fmt;

        for (a in arguments) {
            args.push(arguments[a]);
        }

        if (args.length === 1) { return args[0]; }

        fmt = args.shift();

        if (args.length === 1 && typeof args[0] === 'object') {
            return fmt.replace(/%\(\s*([^)]+)\s*\)s/g, (m, v) => {
                return String(args[0][v.trim()]);
            });
        }

        return fmt.replace(/%s/g, () => {
            return String(args.shift());
        });
    }

    try {
        if (typeof lang === 'object') {
            translations = lang;
        }
        else {
            translations = require('../../public/js/' + lang + '/messages.json').messages;
        }

        return (word) => {
            var args = arguments;
            if (args.length === 0) { return ""; }
            args[0] = translations[word] && translations[word][1] || word;
            return format.apply(this, args);
        };
    } catch (e) {
        return (word) => {
            var util = require('util');
            return util.format.apply(this, arguments);
        };
    }
};
