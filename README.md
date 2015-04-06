# TypeScript and AngularJS

This is a demo application showing how to build an AngularJS application with TypeScript. It relies heavily on John Papa's
[AngularJS styleguide](https://github.com/johnpapa/angular-styleguide).

## Running the Application

First, you will need to transpile the TypeScript to JavaScript.

```
$ grunt ts
```

Next, you will need to concatenate the JS into a single file.

```
$ grunt concat
```

## Running Tests

```
$ karma start
```
