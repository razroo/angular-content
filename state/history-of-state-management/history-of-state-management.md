---
title: History of State Management
---

Having a history of state management puts into perspective why we need
state management. It also puts into perspective how much so things
change, and how important having a foundation in software is.

In particular, to be aware of alternatives and to help with learning new
concepts.

Jumping right in, jQuery can in more than a decade ago, dating back to
[2006](https://en.wikipedia.org/wiki/JQuery). Show, hide, remove, add,
as well as element selectors, were already present in [Version
1](http://api.jquery.com/category/version/1.0/). However, no one really
thought of it as state management.

 State Management with jQuery 
-----------------------------

A classic component, I remember that was always created with jQuery,
would be image sliders. In the more eloquent apps, they would use
singleton classes, perhaps
[prototypes](https://www.w3schools.com/js/js_object_prototypes.asp).
Variables would be cached by initializing once. Functions would be kept
small, and everything, including css, would have very unique
nomenclature([BEMCSS](http://getbem.com/introduction/) for instance).
Folder/file structure was important, but there wasn't really anything
like state management.

Ironically, many smaller websites at this time were more performant in
many ways. Why? Because, many intentionally kept them small, in order to
do more. 2015-2016 was a great year of performance, due to a growth
spurt in [browser
capabilities](https://chromereleases.googleblog.com/2015/03/stable-channel-update.html).
The change log for 2015, is the last time you will see google chrome
mentioning performance in it's logs.

### Jquery and Javascript example

The following is a great example of how jQuery and JavaScript \"state
management\" would work (updated to use es6). A file which would contain
values, would be used to create/add/delete/update across the app:

    // _elem.js file
    storeValues: [],
    storeColors: [],
    sassColorVariables: [],
    lessColorVariables: []

    // _grid.js file
    updateGridColor: () => {
      for(let x = 0; x < elem.s.columnCount; x++) {
        for(let y = 0; y < elem.s.rowCount; y++) {
          ctx.strokeStyle = `${elem.el.backgroundRed.value + 44}. ${elem.el.backgroundGreen.value + 44}. ${elem.el.backgroundBlue.value + 44}`;
          ctx.strokeRect(x * elem.s.pixSize, y * elem.s.pixSize, elem.s.pixSize, elem.s.pixSize);
          ctx.fillStyle = elem.el.backgroundHexColor.value;
          ctx.fillRect(x * elem.s.pixSize + 1, y * elem.s.pixSize + 1, elem.s.pixSize - 2, elem.s.pixSize - 2);
        }
      }

      for(let x = 0; x < elem.s.storeValues.length; x++){
        ctx.fillStyle = elem.s.storeValues[x][2];
        ctx.fillRect(parseFloat(elem.s.storeValues[x][0]) + 1, parseFloat(elem.s.storeValues[x][1]) + 1, elem.s.pixSize - 2, elem.s.pixSize - 2);
      }
    }

Above code taken from the
[https://github.com/CharlieGreenman/codeIllustrator](codeIllustrator)
repo.

 State Management with Backbone 
-------------------------------

Backbone applications to me were so funny, and still are. It literally
looked like a well architecture jQuery app minus routing. Which now that
I think about it, isn't funny. Backbone was a big step up. Routing was a
very nice touch that offered something like that out of the box.
Ultimately, there really was no concept of state management with
backbone either. However, I remember apps being highly functioning, and
unmanageable in many cases due to the bad architecture. A step up, of
course from badly engineered jQuery applications. So, no state
management at this point yet, still! However, using model, there was
somewhat a way to do this, that was baked into best practices:

      // note_model.js
    "use strict";
    APP.NoteModel = Backbone.Model.extend({
      // you can set any defaults you would like here
      defaults: {
        title: "",
        description: "",
        author: "",
        // just setting random number for id would set as primary key from server
        id: _.random(0, 10000)
      },
      //...
      // note_edit.js
      save: function (event) {
          event.stopPropagation();
          event.preventDefault();

          // update our model with values from the form
          this.model.set({
            title: this.$el.find('input[name=title]').val(),
            author: this.$el.find('input[name=author]').val(),
            description: this.$el.find('textarea[name=description]').val()
          });
      //...

This model would global, or per each component, and could be updated
using the above syntax.

 State Management with AngularJS 
--------------------------------

AngularJS was fantastic because it offered two way binding out of the
box. A lot of web applications need that. It also came hand in hand with
Jasmine unit testing, and event handling.

However, because it introduced services, it really was the first
framework to start boxing applications into, \"this is what front end
architecture should look like\", paving the way for state management.

Services, while mainly used for data, were also used different parts of
the application to interact with each other. Being that Angular
applications were Single Page Applications by default, this worked.
State was synonymous with services. If you wanted different components
to know about the data of service, you would have a setter and getter
for that service. The issue with this approach, is that there would be
4, or 5 services that would interact with each other, and it would cause
serious issues. In addition, in many applications, old code/bad
practices would use \$scope in the code base, causing some serious
performance issues. The following is what a sample service using a
factory would look like:

      var myApp = angular.module('myApp',[]);
      myApp.factory('myService', function() {
          var test = 5;
          var obj = {
              test : 5
          }

          return{
            setTestVal: function(val){
              test = val;
              obj.test = val;
            },
            getTestVal: function(){
              return test;
            },
            data : obj
          }


      });

      function MyCtrl($scope, myService) {
          $scope.test = myService.getTestVal();
          $scope.data = myService.data;
      }

      function SetCtrl($scope, myService){
          $scope.newTestVal = '';
          $scope.setTestVal = function(val){
            myService.setTestVal(val)
          }
      }

 State Management with React 
----------------------------

React came aroun and interested me atleast for two reasons. It offered
flexibility being a library and not a framework. Second, it was fast in
comparison to AngularJS. Flux came out, and was my first introduction to
a state management system. Redux came out 6 months after Flux already,
so admittedly, I only had a chance to work with Flux for a month, before
we already started moving to Redux. Flux was a bit difficult, and during
that month time, I remember my code reviews being rampant, with don't do
this, do that etc. Shortly after Flux, Redux came around, and for the
first time it felt like a mature state management system came around.

    // pixel-color-picker.js component
    handlePixelColorChange(e){
        const {dispatch} = this.props;
        this.setState({pixelHex: e.target.value}, function(){
            dispatch(PixelColor(this.state.pixelHex));
            dispatch(PixelColorRGB(hexToRgb(this.state.pixelHex).r,
             hexToRgb(this.state.pixelHex).g, hexToRgb(this.state.pixelHex).b));
        });
    // control-panel.js actions
    export function PixelColor(color){
      return{
        type: types.PIXEL\_COLOR,
        pixelHex: color
      }
    }

    // colorPicker.js reducer
    case types.PIXEL\_COLOR:
      return Object.assign({}, state, {
        pixelHex: action.pixelHex || state.pixelHex
      });

[^1]

 Reactive State Management with React and Angular 
-------------------------------------------------

Around this time \@ngrx/store came out, reactive programming became more
popular. Within the context of state, this meant redux-observable for
React, and \@ngrx/store for Angular. For Angular, this meant that state
is now cookie cutter. For React and Angular, it meant that users have
the ability to tie state into the rest of their application.

    Observable.merge
      // Create observable map for  when background hex changes, and use that
      // value to update store for backgroundColor
      this.changePixelColor$.map((value: any) => (
        PixelColor(value)
      )),
      this.changePixelColorRGB$.map((value: any) => (
        PixelColorRGB(value.pixelRed, value.pixelGreen,
          value.pixelBlue)
      ))
    )
    .subscribe((action)=>{
      store.dispatch(action)
    })

// code take from
[here](https://github.com/CharlieGreenman/angularPixel_illustrator)

 Hooks and Context with React + Vue 
-----------------------------------

Where we are at currently, is that new waves are being made with regards
to state management. State is being baked into frameworks in ways that
make it more lightweight, and easier to deal with. Vue and React now
have a feature called hooks, and context. These allow an app to have
state out of the box. Redux + Redux Observable still have they're place.
There are times where state is neccesary to allow components on
different pages interact with each other. Other times, it can be a way
of managing the data, to make sure the app is maintanable. If you see
your app heading in the direction of the latter. Redux + Redux
Observable is still reccomended.

    // theme-context.js

    // Make sure the shape of the default value passed to
    // createContext matches the shape that the consumers expect!
    export const ThemeContext = React.createContext({
      theme: themes.dark,
      toggleTheme: () => {},
    });

    // theme-toggler-button.js

    import {ThemeContext} from './theme-context';

    function ThemeTogglerButton() {
      // The Theme Toggler Button receives not only the theme
      // but also a toggleTheme function from the context
      return (
        <ThemeContext.Consumer>
          {({theme, toggleTheme}) => (
            <button
              onClick={toggleTheme}
              style={{backgroundColor: theme.background}}>
              Toggle Theme
            </button>
          )}
        </ThemeContext.Consumer>
      );
    }

    export default ThemeTogglerButton;

code take from [here](https://reactjs.org/docs/context.html)

 Final Words on State Management 
--------------------------------

One point I would like to end off on. I remember 5 years when all of the
frameworks were coming out, there was a developer who told me that if
you know what you are doing, really none of the frameworks are
necessary.

[^1]: code take from
    [here](https://github.com/CharlieGreenman/pixelLight)
