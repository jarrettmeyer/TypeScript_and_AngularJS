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

```
$ karma start
```
