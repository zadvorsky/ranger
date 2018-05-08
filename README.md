# Ranger

Ranger.js is a small, standalone library for working with ranges of numbers in Javascript.

Ranger provides all the utility methods you'd expect, including `clamp`, `wrap`, `map`, and `random`.
These methods are available statically, as well as through a `Range` object that can be instantiated for repeated use.

Ranger's main feature is the ability to provide a 'curve' function to certain methods, which will affect how numbers are distributed.

    import ranger from '@zadvorsky/ranger';
        
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
Easing functions are a good example of this, but there are many [others](https://pbs.twimg.com/media/DRJY_inVoAA5t7A.jpg:large).

Curves can be applied to `random`, `randomInt`, `map`, `divide`, among others.

Being able to apply easing any value in your application is a powerful way to give yourself more control over the visual output.

Ranger does not ship with any curves itself, but there are plenty of sources for them.
* [https://gist.github.com/gre/1650294](https://gist.github.com/gre/1650294)
* [https://github.com/danro/easing-js](https://github.com/danro/easing-js)
* [https://github.com/component/ease](https://github.com/component/ease)

If you are using GSAP, you can access its easing functions directly like this:

    ranger.random(20, 40, Expo.easeOut.getRatio);

## Usage

For the browser version, include `dist/ranger.umd.js` in a script tag.

For usage with NPM, run `npm install --save @zadvorsky/ranger`.

    import ranger, { Range } from '@zadvorsky/ranger';
    
    // creates a range {min: 0, max: 100}    
    const range1 = new Range(0, 100);
        
    range1.random(); // returns a float between range.min and range.max
    range1.contains(101) // returns false
    
    // Range has chainable transformation methods
    // this line creates a range of {min: -10, max: 10} 
    const range2 = range.clone().set(-1, 1).scale(10);
    
    // maps a value from range 2 to range 1    
    range2.map(-5, range1); // returns 25     
        
    // static method
    ranger.map(-5, range2, range1) // same as above
        
    // crates a range with expoEaseOut as the default curve.  
    const range3 = new Range(0, 100, expoEaseOut);
        

## Documentation

Documentation can be found [here](http://ranger-docs.surge.sh/).

Examples can be found [here](http://ranger-examples.surge.sh/).

## Build

To build locally, run

    npm install
    npm run dev

This project uses Rollup to bundle the library.

## Build examples

To build the es6 example application, run

    cd examples/es6
    npm install
    npm run start
    
The example application uses WebPack 4. It has a bunch of boilerplate code, and uses GSAP for animations.

The actual example code can be found in `examples/es6/src/js/examples`.

## License

[MIT](LICENSE).
