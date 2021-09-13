# A Simple Notepad App 

As the name suggests, this application is for creating, updating and viewing notes. A note comprises of 4 parameters:

* _id → UUID generated by the server during creating a note (String) 
* title → Name of the note (String)
* content → content of the note
* lastModified → The last edited time of the note 

The application is split into two components: Backend server API and Frontend visualizing application. Backend server is written in Typescript using Node JS Express framework. And the frontend app is based on React JS. For the data storage, MongoDB Atlas cloud based NoSQL database is used.

I chose React JS for the frontend application because I have been working with React in the recent months and I am quite comfortable with this.

# Requirements

For development, you will only need Node.js and a node global package manager npm, installed in your environment.

## Node

Node installation on Windows

Just go on official Node.js website and download the installer. Also, be sure to have node available in your PATH.

Node installation on Mac

You can download node installer .pkg from official node JS website .
If you prefer to use packaging manager homebrew. Using homebrew:

brew install node

## Other Operating Systems

You can find more information about the installation on the official Node.js website and the official NPM website.

If the installation was successful, you should be able to run the following command.

  node -v
  v14.17.1

  npm -v
  6.14.13

## Install package dependencies

Since the project is divided into server and frontend, both dependencies have to be installed separately. Inside the root folder (notes-app-task/) of the project, there are two sub folders, one for the backend (notes-app-task/server/) and another for the frontend (notes-app-task/client/). To install the dependencies for the first time, the following command has to be executed in both folders:

  npm install 

This will remove node_modules/ folder if already present and download all the dependencies in node_modules/ folder. For reinstalling dependencies in case of conflicts, you can run: 

  npm ci

## Starting the Application 

Running npm run start in both the folders (notes-app-task/server/ and notes-app-task/client/) will start the Notepad Application
  
## Using the application

To use the application via React JS frontend, you can go visit http://localhost:8000/ from the browser. In the home page, you will see a UI where the user can add and edit and delete notes.

