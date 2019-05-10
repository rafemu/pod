"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
/**
 * Function to add user
 * @param request
 * @param response
 */
exports.add = (request, response) => __awaiter(this, void 0, void 0, function* () {
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
        const decodedToken = yield firebase_admin_1.auth().verifyIdToken(idToken);
        const ownerId = decodedToken.uid;
        const ownerData = yield firebase_admin_1.firestore().collection('Users').doc(ownerId).get();
        if (ownerData.get('role') !== 'Administrator') { // checking user record if it contain role Administrator
            throw new Error("You are not authorized to create a User. Only administrator can do the same");
        }
        const credentials = { email: request.body.email, password: request.body.password };
        // Creating the user with email and password
        const userRecord = yield firebase_admin_1.auth().createUser(credentials);
        // // Creating user record
        yield firebase_admin_1.firestore().collection("Users").doc(userRecord.uid).set({
            uId: userRecord.uid,
            firstName: request.body.firstName,
            surName: request.body.surName,
            designation: request.body.designation || '',
            role: request.body.role,
            email: request.body.email,
            phone: request.body.phone || '',
            companyId: request.body.companyId,
            createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
            lastUpdatedAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
        });
        return response.status(200).json({
            userId: userRecord.uid,
            message: 'User created'
        });
    }
    catch (error) {
        return response.status(500).json({
            message: error.message
        });
    }
});
//# sourceMappingURL=user.js.map