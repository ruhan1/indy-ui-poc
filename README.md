## This is a poc project for new indy ui with reactjs framework


### Set up project    
  * Need to install node & npm: `sudo dnf install node -y`   
  * After node installation, install yarn: `sudo npm install yarn --global`   
  * Make sure yarn installed: `yarn --version `   

### Install project dependencies
  * Download whole project  
  * Use yarn to install deps: `yarn install `  

### Start and see project result in dev mode
  * Run `yarn build`  
  * Run `yarn server`  
  * Now you can see project result through [http://localhost:3000](http://localhost:3000)   

### yarn scripts
  * build: compile sources and deploy all static files to `/build`  
  * compile: only compile sources to `build`  
  * dev: start webpack-dev-server to do front-end development   
  * server: start mock express server with all front-end code to do whole lifecycle debugging  

### Project structure
  * public: hold static files, like index.html entryfile, favicon  
  * src/client: client side sources  
  * src/server: a mock server using express.js to mock rest endpoints for client side data  
