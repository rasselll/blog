



import React, { Component } from 'react';
import { View, Text, FLatList, FlatList, RefreshControl, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import color from '../../../assets/color';
import moment from "moment";
import {Actions} from 'react-native-router-flux';

import {connect, Connect} from 'react-redux';
import {Editpost} from '../../../store/actions';
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
import ImagePicker from 'react-native-image-picker';

class FullBlog extends Component {

  constructor(props) {
    super(props)


    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  


    this.state = {
      imageUrl: props.values.imageUrl,
      blogDescription: props.values.blogDescription,
      creatorInfo: props.values.creatorInfo,
      createdAt: props.values.createdAt,
      ownerId: props.myOwnerID,
      key: props.myblogKey
    };
  };


  render() {

       return (
        <View style={styles.container}>




          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              initialTitleHTML={this.state.ownerId}
              contentPlaceholder={'Say something nice :)'}
              titlePlaceholder={'Add a title'}
              initialContentHTML={this.state.blogDescription}
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
  title="POST CONTENT"
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
alert(this.state.ownerId);

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
            const blogKey = this.state.key;
            const ownerId = this.state.ownerId;

            this.props.shareStory(description, imageUri, userInfo, imageArray, blogKey, ownerId);




//alert(imageArray.length);


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
        shareStory: (description, imageUri, userInfo, imageArray, blogKey, ownerId) => dispatch(Editpost(description, imageUri, userInfo, imageArray, blogKey, ownerId))
    };
};

export default connect(mapStateToProps, mapDispatchTOProps)(FullBlog);