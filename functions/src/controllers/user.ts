import { auth, firestore } from 'firebase-admin';

/**
 * Function to add user
 * @param request 
 * @param response 
 */
export const add = async (request, response) => {

    try {

        if (!request.headers.authorization) { // check if the request has a token
            throw new Error("No Auth token in Header");
        }

        if (!request.body.firstName ||
            !request.body.surName ||
            !request.body.role ||
            !request.body.email ||
            !request.body.password) { // check if request has all required fields
            throw new Error("Include 'firstName', 'surName', 'role', 'email', 'password' in Body");
        }

        const idToken = request.headers.authorization;
        const decodedToken = await auth().verifyIdToken(idToken);
        const ownerId = decodedToken.uid;

        const ownerData = await firestore().collection('Users').doc(ownerId).get();

        if (ownerData.get('role') !== 'Administrator') { // checking user record if it contain role Administrator
            throw new Error("You are not authorized to create a User. Only administrator can do the same");
        }

        const credentials = { email: request.body.email, password: request.body.password };
        // Creating the user with email and password
        const userRecord = await auth().createUser(credentials);

        // // Creating user record
        await firestore().collection("Users").doc(userRecord.uid).set({
            uId: userRecord.uid,
            firstName: request.body.firstName,
            surName: request.body.surName,
            designation: request.body.designation || '',
            role: request.body.role,
            email: request.body.email,
            phone: request.body.phone || '',
            companyId: request.body.companyId,
            createdAt: firestore.FieldValue.serverTimestamp(),
            lastUpdatedAt: firestore.FieldValue.serverTimestamp()
        });

        return response.status(200).json({
            userId: userRecord.uid,
            message: 'User created'
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message
        });
    }
}