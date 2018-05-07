# Ranger.js

Ranger.js is a small library for working with ranges of numbers in Javascript.

Ranger provides all the utility methods you'd expect, like clamp, wrap, map, and random.
These methods are available statically, as well as through a `Range` object that can be instantiated for repeated use.

Ranger's main feature is the ability to provide a 'curve' function to certain methods, which will affect how numbers are distributed.

    import ranger from 'ranger';
        
    // this will return a float between 20 and 40
    // when called repeatedly, the distribution of numbers will be approximately linear. 
    ranger.random(20, 40);
        
    // just an arbitrary easing function    
    function expoEaseOut(x) {
      return 1.0 - Math.pow(2.0, -10.0 * x);
    }
        
    // this will also return a float between 20 and 40
    // but the distribution will be heavily skewed towards the higher end of the range
    ranger.random(20, 40, expoEaseOut);

The curve can be any function that takes a float between 0.0 and 1.0, and returns a transformed float.
Easing functions are a good example of this, but there are many others.

Curves can be applied to `random`, `randomInt`, `map`, `divide`, among others.

Being able to apply easing any value in your application is a powerful way to give yourself more control over the output.

Ranger does not ship with any curves itself, but there are plenty of sources for them.
//
//
//

If you are using GSAP, you can access its easing functions directly like this:

    ranger.random(20, 40, Expo.easeOut.getRatio);

## Usage

## Documentation



## Build

## Build examples

## License

[MIT](LICENSE).
