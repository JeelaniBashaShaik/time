const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.fcmSend = functions.database.ref('/posts').onCreate(event => {
    const message = event.data.val()
    const userId = event.params.userId

    const payload = {
        notification: {
            title: 'Someone posted',
            body: 'pe pe pe',
            icon: 'https://media.cdnandroid.com/5b/84/c7/34/1a/imagen-new-video-mr-bean-2018-0thumb.jpg'
        }
    };
    
    admin.database().ref(`/fcmTokens/${userId}`)
    .once('value')
    .then(token => token.val())
    .then(userFcmToken => {
        return admin.messaging().sendToDevice(userFcmToken, payload)
    })
    .then(res => {
        console.log('sent', res);
    })
})