# req.js

A mini dependency injection javascript lib within 60 lines. Need underscore defined globally.

Sample code:

```javascript
req('parrot', ['say', 'eat', 'enjoy', function (say, eat, enjoy) {
    console.log('Init parrot');
    say('Hello!');
    eat('carrot');
    enjoy('corn');
}]);

req('enjoy', ['eat', 'say', function (eat, say) {
    console.log('Init enjoy');
    return function (food) {
        eat(food);
        say(food + ' yummy!');
    };
}]);

req('say', ['want', function (want) {
    console.log('Init say');
    return function (word) { want('say', word); };
}]);

req('eat', ['want', function (want) {
    console.log('Init eat');
    return function (food) { want('eat', food); };
}]);

req('want', function () {
    console.log('Init want');
    return function (verb, detail) {
        console.log('Want to ' + verb + ' "' + detail + '".');
    };
});
```
