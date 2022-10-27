# Article Eurisko Mobility 

A React Native expo-app that allows the user to scroll between articles and read them.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the required packages.

```bash
npm install
```

## Usage
To start the application.
```bash

# Connect both your computer and mobile phone to the same Wi-fi network
run the following:
$ expo start

## If you faced problems with running the app this could be related to the network 
$ expo-cli start --tunnel

# If an error occured you'll need to install @ngrok in order for the tunnel to work
$ npm i ngrok 
--or specify the version 
$ npm install @expo/ngrok@^4.1.0
```

## Launch the app
Once the QR code appears on your screen, open your mobile phone camera and scan it. 

(Note: you need to install expo go first)

## Login
Login page will appears. Enter your credentials to view the articles. 

Once you are logged in, your token will be saved in your storage.

## Articles Page
Each Card Displays the title of the article, the publisher and date of publish. If you wish to read more about the article tap on the card to get more thorough details.


As you scroll, more articles will be fetched.

## Logout
You can find on the top of your screen a logout button that lets you sign out and destroys your current token.

## Routing
Each screen is stacked on top of the other, meaning navigating back and forth will be depending on each screen.