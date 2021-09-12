A Simple Notepad App 

As the name suggests, this application is for creating, updating and viewing notes. An event comprises of 4 parameters:

_id → UUID generated by the server during event creation (String)
title → Name of the note (String)
content → content of the note
lastModified → The last edited time of the note 


The application is split into two components: Backend server API and Frontend visualizing application. Backend server is written in Typescript using Node JS Express framework. And the frontend app is based on React JS. For the data storage, MongoDB Atlas cloud based NoSQL database is used.

I chose React JS for the frontend application because I have been working with React in the recent months and I am quite comfortable with this.

Requirements

For development, you will only need Node.js and a node global package manager npm, installed in your environment.

Node

Node installation on Windows

Just go on official Node.js website and download the installer. Also, be sure to have node available in your PATH.

Node installation on Mac

You can download node installer .pkg from official node JS website .
If you prefer to use packaging manager homebrew. Using homebrew:

brew install node

Other Operating Systems

You can find more information about the installation on the official Node.js website and the official NPM website.

If the installation was successful, you should be able to run the following command.

  node -v
  v14.17.1

  npm -v
  6.14.13

