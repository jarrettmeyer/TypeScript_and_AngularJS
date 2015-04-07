# TypeScript and AngularJS

This is a demo application showing how to build an AngularJS application with TypeScript. It relies heavily on John Papa's
[AngularJS styleguide](https://github.com/johnpapa/angular-styleguide).

## About This Application

### app.layout

This is for primary layout components.

### app.widgets

Widgets are for parts of the application UI that do not belong to any one place in particular. Examples of widgets include
breadcrumbs, bulletin notices, help topics, or settings. These types of items can appear on the screen regardless of which
section of the application the user is working under.

## Running the Application

First, you will need to transpile the TypeScript to JavaScript.

```
$ grunt ts
```

Next, you will need to concatenate the JS into a single file.

```
$ grunt concat
```

Alternatively, you can do all of this in a single step with grunt.

```
$ grunt build:dev
```

## Running Tests

Unit tests are run with [Karma](http://karma-runner.github.io/0.12/index.html). You will first need to transpile the
TypeScript to JavaScript, then run the tests.

```
$ grunt ts
```

```
$ karma start
```

When developing, I have two terminal windows open at all times. 

The first window is running `grunt watch`. This is watching all `*.ts` files for modifications and creating the
corresponding `*.js` files. It is then watching all `*.js` files for modifications and concatenating them into a
single `app.js` file.

The second terminal window is running `karma` (via the `karma start` command).

