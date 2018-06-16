import React, { Component } from 'react';
import { View, Text, FLatList, FlatList, RefreshControl, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import color from '../../../assets/color';

import {Actions} from 'react-native-router-flux';

import {connect, Connect} from 'react-redux';
import {postStorymulti} from '../../../store/actions';
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
import ImagePicker from 'react-native-image-picker';


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }


    render() {
   
      
        return (
        <View style={styles.container}>




          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={'Title!!'}
              contentPlaceholder={'Say something nice :)'}
              titlePlaceholder={'Add a title'}
              initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p><img src="content://media/external/images/media/21260" width="200" height="200" />'}
              editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <RichTextToolbar
            getEditor={() => this.richtext}

            onPressAddImage={()=>{
        ImagePicker.showImagePicker({title: 'Pick an Image'}, res => {
            if (res.didCancel) {
                console.log('Cancled');
            }else if(res.error) {
                console.log('Error', res.error);
            }else {
                this.setState({
                    pickedImage: {
                        uri: res.uri,
                     


                    }
                });
             
 
                 this.richtext.insertImage({ src: res.uri, width:200, height:200 });
               
            }
        });
          }}
          />


          <Button
  onPress={this.getHTML}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
 

        </View>
        );
    }

      onEditorInitialized() {
    this.setFocusHandlers();
    //this.getHTML();
  }

  async getHTML() {
    var titleHtml = await this.richtext.getTitleHtml();
    var contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml);



var numofimg = (contentHtml.split('<img src="').length-1);


var results = [];

if(numofimg != 0){
var rgx = /<img src="([^"]+)"/g;
var match;

while (match = rgx.exec(contentHtml)) {
    results.push(match[1]);  // match[1] contains the captured group
}


    const description = contentHtml;
            const imageUri = "content://media/external/images/media/21260";
            const userInfo = this.props.userInfo;
            const imageArray = results.slice(0);
            this.props.shareStory(description, imageUri, userInfo, imageArray);


}


  
        
        

}



 
  

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }



onPressLearnMore(){

  
     var titleHtml =  this.richtext.getTitleHtml();
    var contentHtml =  this.richtext.getContentHtml();
    //a = titleHtml;
    alert(titleHtml + ' ' + contentHtml)
}


}



const styles= StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 40
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
    profileImageStyle: {
        height: 60,
        width: 60,
        borderRadius :30,
        marginLeft: 10
    },
        imageStyle :{
        height: '100%',
        width:'100%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,

    },
        imageStyle :{
        height: '100%',
        width:'100%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,

    },
    radius : {
        borderRadius: 5,
        marginLeft: -5,
        width: 40,
        height: 40,
    },
    imageContainerWidth: {
        width: '20%'
    },
    textContainer : {
       width: '60%',
       color: color.greyColor,
       fontSize: 17,
       fontWeight: '400',
       marginLeft: 10 
    },
    timeStampStyle : {
        color: color.greyColor,
        fontSize: 14,
        marginLeft: '22%'
    }
});


const mapStateToProps = ({auth, blog}) => {
    const { userInfo, user} = auth;
    const {loading} = blog;
    return {
        user, 
        userInfo,
        loading
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        shareStory: (description, imageUri, userInfo, imageArray) => dispatch(postStorymulti(description, imageUri, userInfo, imageArray))
    };
};

export default connect(mapStateToProps, mapDispatchTOProps)(Notifications);