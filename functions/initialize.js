const readline = require('readline-sync');
let admin = require('firebase-admin');

const serviceAccount = require('./keys/crew-9d52d-firebase-adminsdk-bzxqg-b52c8d57e1.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crew-9d52d.firebaseio.com'
});
const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);

readUserDetails();

/**
 * readUserDetails
 * This function is used to read user details in terminal
 */
function readUserDetails() {
  let userDetails = {};
  userDetails.firstName = readline.question('Your First name: ');
  userDetails.email = readline.question('Your email address: ');
  userDetails.password = readYourPassword();
  createUser(userDetails);
}

/**
 * createUser
 * This function is used to create firebase user
 * @param {Object} userDetails
 */
async function createUser(userDetails) {
  try {
    // Create user authentication
    const userRecord = await admin.auth().createUser(userDetails);
    // Creating user record
    await admin
      .firestore()
      .collection('Users')
      .doc(userRecord.uid)
      .set({
        uId: userRecord.uid,
        firstName: userDetails.firstName,
        role: 'Administrator',
        email: userDetails.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    console.log('Successfully created new user :)');
    process.exit();
  } catch (error) {
    if (error.errorInfo)
      console.log(':( Error creating new user:', error.errorInfo.message);
    else console.log(':( Error creating new user:', error);

    console.log('Please try again !');
    readUserDetails();
  }
}

/**
 * readYourPassword
 * This function is used to read you verified password
 */
function readYourPassword() {
  let pass = readline.question('Please enter your password: ', {
    hideEchoBack: true
  });
  let confirmPass = readline.question('Confirm Password: ', {
    hideEchoBack: true
  });
  pass = pass == confirmPass ? pass : null;
  if (pass) return pass;

  console.log(':( Oops, Passwords doesnt match.');
  console.log('Please try again !');
  readYourPassword();
}
