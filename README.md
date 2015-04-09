# TypeScript and AngularJS

This is a demo application showing how to build an AngularJS application with TypeScript. It relies heavily on John Papa's
[AngularJS styleguide](https://github.com/johnpapa/angular-styleguide).

## About This Application

+ Folder layout is by feature (dashboard, todo, settings, etc.), not by type (controllers, models, services, etc.). The
    exception to this is the `services` folder, which is for services that are consumed by multiple features.
+ Tests are kept next to the files they are meant to test.
+ [tsd](https://github.com/DefinitelyTyped/tsd) is used to download TypeScript definition files. These files are kept in
    `scripts/typings`.
+ The `scripts/typings/all.d.ts` is used as a shortcut for having lots of references at the top of your `*.ts` files.

### app.auth

Files necessary for authorization. Traditionally, and API would be used to support authentication. Writing an API is 
beyond the scope of this example, so the password is simply checked in memory. As long as your password contains the 
string `password`, it should succeed.

### app.layout

This is for primary layout components.

### app.services

### app.todo

### app.welcome

This is the welcome page for the application.

### app.widgets

Widgets are for parts of the application UI that do not belong to any one place in particular. Examples of widgets include
breadcrumbs, bulletin notices, help topics, or settings. These types of items can appear on the screen regardless of which
section of the application the user is working under.

## Running the Application

I am assuming that you have [NodeJS](https://nodejs.org) already installed. The commands shown below are for Mac/Linux.
Omit the `sudo` if you are running on Windows.

```
$ sudo npm install -g bower grunt-cli karma-cli
$ npm install
$ bower install
$ grunt build:dev
$ vagrant up
```

The application runs inside a [Vagrant](https://www.vagrantup.com) virtual machine. Run `vagrant up` from the project 
root. From there, you  should be able to navigate to [http://localhost:8080](http://localhost:8080) to see the 
application run.

If you make changes to the code, you will need to run `grunt build:dev` to transpile the TypeScript to JavaScript and concatenate the results into a single `app.js` file.

## Running Tests

Unit tests are run with [Karma](http://karma-runner.github.io/0.12/index.html). You will first need to transpile the
TypeScript to JavaScript, then run the tests.

```
$ grunt ts
$ karma start
```

When developing, I have two terminal windows open at all times.  The first window is running `grunt watch`. This is 
watching all `*.ts` files for modifications and creating the corresponding `*.js` files. It is then watching all 
`*.js` files for modifications and concatenating them into a single `app.js` file.

The second terminal window is running `karma` (via the `karma start` command).

