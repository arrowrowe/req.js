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
    return function (food) { return eat(food) && say(food + ' yummy!'); };
}]);

req('say', ['want', function (want) {
    console.log('Init say');
    return function (word) { return want('say', word); };
}]);

req('eat', ['want', function (want) {
    console.log('Init eat');
    return function (food) { return want('eat', food); };
}]);

req('want', function () {
    console.log('Init want');
    return function (verb, detail) {
        console.log('Want to ' + verb + ' "' + detail + '".');
        return true;
    };
});
```

Output:

```
Init want
Init say
Init eat
Init enjoy
Init parrot
Want to say "Hello!".
Want to eat "carrot".
Want to eat "corn".
Want to say "corn yummy!".
```
