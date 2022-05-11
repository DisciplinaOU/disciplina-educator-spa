#Educator FairCV creator

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### ENV

All dev env variables stored in [this](./.env.development) file

REACT_APP_CONTRACT_X_ADDRESS - stores address of smart contract
REACT_APP_AAA - stores url of AAA service
REACT_APP_EDUCATOR - stores url of educator service
REACT_APP_STATUS - stores current status of application. Set is as "COMING_SOON" to display this state

⚠️ Variables with PROXY postfix serve only to handle requests as proxy url pattern 
To change them look at `package.json` scripts section. 
