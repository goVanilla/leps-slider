# leps-slider
> Light weight, easy to use and pure JavaScript slide show library

## Install
```javascript
bower install leps-slider
  ```
## How to use
Add script and style sheet to the layout file:<br>

```HTML
<link rel="stylesheet" href="path/to/leps-slider.css"><br>
<script src="path/to/leps-slider.js"></script><br>
  ```
### Basic usage
```HTML
<div id="lep-slider">
 ...
</div>
  ```
```javascript
var slider = new lepsSlider();
  ```
  The id attribute is enough and the children will be used as slide items.

### Define selectors
  You may define the css selectors of the wrapper
  ```HTML
<div id="my-wrapper">
 ...
</div>
  ```
  
  ```javascript
var slider = new lepsSlider({
  wrapper: '#my-wrapper'
});
  ```
  
### Dynamic items


## Options
All options must be passed as key-value pairs

  ```javascript

      wrapper: '#lep-slider',         // default velue, used in basic usage. could be css selector string or JS element
      animation: "fade",              // {string} - fade or slide
      easing: "ease",                 // {string} - Determines the easing method used in transitions. cubic buizier for example
      direction: 'ltr',               // {string} - rtl or ltr. defines the dirction of accending slide
      animationLoop: true,            // {boolean} - defines if animation will start from 1st slide after finished in last slide
      autoSlide: true,                // {boolean} - slide automatically or manually. if false, at least 1 navigator menu shold be present
      animationSpeed: 600,            // {number} - animation duration of each slide
      initDelay: 0,                   // {number} - delay of starting first slideShow in miliseconds
      slideDelay: 0,                  // {number} - delay of animation of each slide in milisecond
      randomize: false,               // {boolean}: Randomize slide order

      // Usability features
      pauseOnHover: false,            // {boolean} - pause slide show while oiinter is inside slider

      // Primary Controls
      indicatorsNav: true,            // {boolean} - Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      indicatorsNavContainer: "",     // {string|array} - Custom css class name(s) to be added to Navigation menu, could be array or space separated string of names
      directivesNav: true,            // {boolean} - Create navigation for previous/next navigation? (true/false)
      directivesContainer: "",        // {string|array} - Custom css class name(s) to be added to Navigation menu, could be array or space separated string of names
      pasueButton: true,              // {boolean} - Show pause button
      prevText: "Prev",               // {string} - Set the text for the "previous" directionNav item
      nextText: "Next",               // {string} - Set the text for the "next" directionNav item

      // Maual navigation
      keyboard: true,                 // {boolean} - Allow slider navigating via keyboard left/right keys

      currentSlide: 0
  ```
  
  
## Author
**Ali Haghighatkhah**

- [Github](https://github.com/alihaghighatkhah)
- [Personal page](http://colorofweb.com/)

**Special thanks to Afshin Mehrabani**
- [Github](https://github.com/afshinm)

## License
> Copyright (C) 2015 Ali Haghighatkhah (alihaghighatkhah@yahoo.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
