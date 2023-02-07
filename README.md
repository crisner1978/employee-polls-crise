# Employee Polls Project React, Redux Toolkit and Firebase
Voting app for users to create, vote and compete for the number one spot as the most active user answering and creating new polls.

## This project was created using the following tool chains:
- [Create React App](https://github.com/facebook/create-react-app)
- [Redux](https://redux.js.org/) 
- [Redux Toolkit](https://redux-toolkit.js.org/) template.
- [headlesUI](https://headlessui.com/)
- [heroicons](https://heroicons.com/)
- [moment](https://momentjs.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/en/main)

### To Get Started
Copy and paste into your favorite Code Editor\
Be sure you are are cloning it into the directory you want this project to live.

```
git clone https://github.com/crisner1978/employee-polls-crise.git
```

### After Cloning the repository
The next step is to install the project.\
If using `npm` input the following into your terminal

```
npm install
```

If you would like to use `yarn`\
Please delete the package-lock.json\ 
Then input the following in your terminal.

```
yarn
```

### Once Installed, you can start the application by entering the following in your terminal
- npm `npm start`
- yarn `yarn start`

This Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### To Run the TESTS
You can run npm or yarn. Whichever package manager you chose when installing the application, be sure to use the same to run the tests.
```
npm test
```

```
yarn test
```

This Launches the Test Runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Ready to go to Production?
You can build the application by running `npm run build`.\
This command builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## More Project Details - Employee Polls Project
This is the starter code for the final assessment project for Udacity's React & Redux course.

The _DATA.js file represents a fake database and methods that let you access the data. The only thing you need to edit in the _DATA.js file is the value of avatarURL. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the Create React App to bootstrap the project.

### Data
There are two types of objects stored in our database:

Users
Questions
Users
Users include:

#### Attribute	Type	Description
id	String	The user’s unique identifier
password	String	The user’s password in order to log in the application
name	String	The user’s first name and last name
avatarURL	String	The path to the image file
questions	Array	A list of ids of the polling questions this user created
answers	Object	The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either 'optionOne' or 'optionTwo' since each question has two options.
Questions
Questions include:

#### Attribute	Type	Description
id	String	The question’s unique identifier
author	String	The author’s unique identifier
timestamp	String	The time when the question was created
optionOne	Object	The first voting option
optionTwo	Object	The second voting option
Voting Options
Voting options are attached to questions. They include:

#### Attribute	Type	Description
votes	Array	A list that contains the id of each user who voted for that option
text	String	The text of the option
Your code will talk to the database via 4 methods:

_getUsers()
_getQuestions()
_saveQuestion(question)
_saveQuestionAnswer(object)
_getUsers() Method
Description: Get all of the existing users from the database.
Return Value: Object where the key is the user’s id and the value is the user object.

_getQuestions() Method
Description: Get all of the existing questions from the database.
Return Value: Object where the key is the question’s id and the value is the question object.

_saveQuestion(question) Method
Description: Save the polling question in the database. If one of the parameters are missing, an error is thrown. Parameters: Object that includes the following properties: author, optionOneText, and optionTwoText. More details about these properties:

#### Attribute	Type	Description
author	String	The id of the user who posted the question
optionOneText	String	The text of the first option
optionTwoText	String	The text of the second option
Return Value: An object that has the following properties: id, author, optionOne, optionTwo, timestamp. More details about these properties:

#### Attribute	Type	Description
id	String	The id of the question that was posted
author	String	The id of the user who posted the question
optionOne	Object	The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option
optionTwo	Object	The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option
timestamp	String	The time when the question was created
_saveQuestionAnswer(object) Method
Description: Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown. Parameters: Object that contains the following properties: authedUser, qid, and answer. More details about these properties:

#### Attribute	Type	Description
authedUser	String	The id of the user who answered the question
qid	String	The id of the question that was answered
answer	String	The option the user selected. The value should be either "optionOne" or "optionTwo"
