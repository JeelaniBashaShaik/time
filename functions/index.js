const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request')

admin.initializeApp(functions.config().firebase);

    exports.sendNotificationsOnPost = functions.firestore
        .document('posts/{pushId}')
        .onCreate((change, context) => {
          /*   console.log(change, 'change');
            console.log(change['_fieldsProto'], 'post data')
            const postData = change.after.data();
            let postType = '';
            if(postData['postType'] === 'textPost') {
                postType = `${postData['postText']}`;
            }else if(postData['postType'] === 'imagePost') {
                postType = `${postData['postedBy']} has posted a new image`;
            } */
            const postData = change['_fieldsProto'];
            let postType = '';
            if(postData['postType']['stringValue'] === 'textPost') {
                postType = `${postData['postText']['stringValue']}`;
            }else if(postData['postType']['stringValue'] === 'imagePost') {
                postType = `${postData['postedBy']['stringValue']} has posted a new image`;
            }
            const payload = {
                "notification": {
                    "title": `New Post from Time`, 
                    "body": postType,
                    "icon": postData['photoUrl']['stringValue'],
                    "sound": 'default'
                   }
            }
            console.log(payload,'payload');
            let tokensList = [];
            const db = admin.firestore();
            db.collection('fcmTokens').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let tokenData = doc.data();
                    let key = Object.keys(tokenData);
                    tokensList.push(tokenData[key]);
                });
                const response =  admin.messaging().sendToDevice(tokensList, payload);
                return '';
            }).catch(error => {
                console.log(error);
            }) 
            return 0;        
        });

    

  


  //https://fcm.googleapis.com/fcm/send