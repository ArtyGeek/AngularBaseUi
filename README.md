# Base-UI AngularJS Project

1) Clone porject 
```
git clone https://github.com/Kolya91/base-ui.git
```
2) Install `node` and `npm`
3) Go to project folder 
```
cd path/to/base-ui
```
4) Install modules 
```
npm install
```
5) Then install bower components 
```
bower install
``` 
or if you have already installed
```
bower update
````
If you have some issue with bower try install bower global
```
npm install bower -g
```
6) Build the project 
```
gulp build
``` 
or 
```
gulp live
```
and project will be rebuild automatically.

7) Start server (simple localhost) for use application in browser 
```
node server.js
```
8) Browse application `http://localhost:7007/#/`

By default application will be built to _/build_ folder. Build folder doesn't appear in commit. You can change it in `.gitignore` file.

### Next TODOs:
1. Add unit tests base structure
2. Add livereload
3. Finish with production task (minified files)

#### Note: _Project should be rebuild after adding new files_ 
(`gulp build` or `gulp live`)

#### This project is in progress!!!
