import admin from 'firebase-admin';
import dotenv from 'dotenv';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
})

export default admin