import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUPUSER_USER_FAIL,
    SIGNUPUSER_USER_SUCCESS,
    USERINFO_FETCH_SUCCESS,
    USER_LOG_OUT,
    UPDATE_USER_NAME,
    UPDATE_USER_NAME_SUCCESS,
    UPDATE_USER_EMAIL,
    UPDATE_USER_EMAIL_SUCCESS,
    UPDATE_USER_EMAIL_FAIL,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PASSWORD_FAIL,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_FAIL,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    SET_USER_TOKEN
} from "./types";
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';


export const signUpUser = ({fullname, email, password}) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            const uid = user.uid;
            firebase.database().ref('userInfo/' + uid).set({
                    fullname : fullname,
                    profileImage: 'http://servotech.in/wp-content/uploads/2016/10/user-icon-placeholder.png'
            }).then (
                (userInfo) => signupUserSuccess(dispatch, userInfo, user, {email, password})
            )
        })
        .catch(() => signupUserfail(dispatch));
    }
}


export const signupUserfail = (dispatch) => {
    dispatch({
        type: SIGNUPUSER_USER_FAIL
    });
};


export const signupUserSuccess = (dispatch, userInfo,user, {email, password}) => {

    dispatch({
        type: SIGNUPUSER_USER_SUCCESS,
        payload: {
            user
        }
    });
    const status = 'signUp';
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
        (user) => loginUserSuccess(dispatch, user, status)
        )
        .catch(() => loginUserFail(dispatch));
}


export const loginUser = ({ email, password }) => {
    const status = 'login';
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => loginUserSuccess(dispatch, user, status))
            .catch(() => loginUserFail(dispatch));
            
    };
};

export const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};

export const setAuthToken = (dispatch, token) => {
    dispatch({
        type: SET_USER_TOKEN,
        token
    })
}

export const handleAuth = () => {
    console.log('handle auth is running')
    return (dispatch) => {
        AsyncStorage.getItem('as:auth:token', (error, token) => {
            if (token) {
                console.log('token', token)
                setAuthToken(dispatch, token)
            }
        })

        AsyncStorage.getItem('as:auth:user', (error, user) => {
            if (user) {
                var user = JSON.parse(user)
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user
                });

                console.log(user)
                firebase.database().ref('userInfo/' + user.uid)
                .on('value', snapshot=> {                           
                    dispatch ({type: USERINFO_FETCH_SUCCESS, payload: snapshot.val()});
                });                
            }
        })        
    }
}


export const loginUserSuccess = (dispatch, user, status) => {   
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
   
    const { currentUser } = firebase.auth();
   
    currentUser.getIdToken()
        .then(data => {
                console.log(data)
                console.log(JSON.stringify(user))
                AsyncStorage.setItem('as:auth:token', data);
                AsyncStorage.setItem('as:auth:user', JSON.stringify(user));

                if (status === 'login') {
                    setAuthToken(dispatch, data)
                    Actions.lightbox();
                } else if (status === 'signUp') {
                  
                    Actions.successScreen();
                }
            }
        );
   
};

 export const fetchUserInfo = (uid) => {
   
    return (dispatch) => {
        firebase.database().ref('userInfo/' + uid)
        .on('value', snapshot=> {
            dispatch ({type: USERINFO_FETCH_SUCCESS, payload: snapshot.val()});
        });
    };
}

export const logOutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(()=> {
                dispatch({type: USER_LOG_OUT});
                AsyncStorage.removeItem('as:auth:user');
                AsyncStorage.removeItem('as:auth:token');
                Actions.auth();
            }).catch(()=> {
                console.log('error');
            });
    }
};


export const updateUserName = ({ name, image, userId}) => {
    console.log(name, 'name');
    
    return (dispatch) => {
        dispatch({ type: UPDATE_USER_NAME });
        firebase.database().ref('userInfo/' + userId).set({
            fullname: name,
            profileImage: image
        }).then((userInfo) => updateUserNameSuccess(dispatch, userInfo));
    }
};

export const updateUserNameSuccess = (dispatch, userInfo) => {
    dispatch({ type: UPDATE_USER_NAME_SUCCESS, payload: userInfo });
};


export const updateUserEmail = ({email}) => {
    return (dispatch) => {
        dispatch({type: UPDATE_USER_EMAIL})
        var user = firebase.auth().currentUser;
        console.log(user, email, 'em'); 
        user.updateEmail(email)
        .then(() => {
            firebase.auth().signOut()
                .then(() => {
                    dispatch({ type: USER_LOG_OUT });
                    AsyncStorage.removeItem('as:auth:user');
                    Actions.auth();
                }).catch(() => {
                    console.log('error');
                });
        })
        .catch(() => updateUserEmailFail(dispatch));
    }
};

export const updateUserEmailFail = (dispatch) => {
    dispatch({
        type: UPDATE_USER_EMAIL_FAIL
    });
};


export const updateUserPassword = ({ password }) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_USER_PASSWORD })
        var user = firebase.auth().currentUser;
        console.log(user, password, 'em');
        user.updatePassword(password)
        .then(() => {
            firebase.auth().signOut()
                .then(() => {
                    dispatch({ type: USER_LOG_OUT });
                    AsyncStorage.removeItem('as:auth:user');
                    Actions.auth();
                }).catch(() => {
                    console.log('error');
                });
        })
        .catch(() => updateUserPasswordFail(dispatch));
    }
};

export const updateUserPasswordFail = (dispatch) => {
    dispatch({
        type: UPDATE_USER_PASSWORD_FAIL
    });
};


export const uploadUserPhoto = ({ name, imageUri}) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: UPLOAD_PROFILE_IMAGE });
        this.uploadImage(imageUri)
            .then(url =>
                firebase.database().ref('userInfo/' + currentUser.uid).set({
                    fullname: name,
                    profileImage: url 
                })
                    .then((userInfo) => updateProfileImageSuccess(dispatch, userInfo))
            )
            .catch(error => uploadProfileImageFail(dispatch, error));
    };
};

export const updateProfileImageSuccess = (dispatch, userInfo) => {
    dispatch({ type: UPLOAD_PROFILE_IMAGE_SUCCESS, payload: userInfo });
};


export const uploadProfileImageFail = (dispatch, error) => {
    dispatch({
        type: UPLOAD_PROFILE_IMAGE_FAIL,
        payload: error
    });
};


uploadImage = (uri) => {
    return new Promise((resolve, reject) => {
        const uploadUri = uri;
        let uploadBlob = null;
        let mime = 'image/jpg';
        const imageRef = firebase.storage().ref('uploads').child(uiqueID());

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            });
    });
}

uiqueID = () => {
    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
