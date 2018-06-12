import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import color from '../../../assets/color';
import moment from "moment";

class FullBlog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      imageUrl: props.values.imageUrl,
      blogDescription: props.values.blogDescription,
      creatorInfo: props.values.creatorInfo,
      createdAt: props.values.createdAt
    };
  };


  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <View>
          <Image source={{ uri: this.state.imageUrl }} style={{ height: 250, width: "100%" }} resizeMode="cover" />
          <View style={{ padding: 13 }}>
            <Text>{this.state.blogDescription}</Text>
          </View>
          <View style={{ padding: 13 }}>
            <Text>{"By: " + this.state.creatorInfo.userInfo.fullname}</Text>
            <Text>{moment(this.state.createdAt).fromNow()}</Text>
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2
  },
  coverContainer: {
    width: '100%',
    height: 250,
  },
  coverImageStyle: {
    height: '100%',
    width: null,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  profileContainer: {
    height: 70,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.borderBottomColor
  },
  profileInfoContainer: {
    height: '100%',
    width: '100%',
    marginBottom: 10
  },
  profileNameContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameStyle: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: color.fontColor,
    fontSize: 20,
  },
  timeStyle: {
    fontSize: 12,
    fontWeight: '100',
    marginLeft: 50,
    marginTop: -15,

  },
  profileImageStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginBottom: 10
  },
  moreIcon: {

  },
  descriptionContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    minHeight: 250
  },
  description: {
    width: '100%',
    fontSize: 18,
    color: '#323648'
  },
  ActivityContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
    marginTop: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#fff'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconLike: {
    marginRight: 7
  },
  likeTextStyle: {
    color: 'red',
    fontSize: 18,
  },
  iconComment: {
    color: '#b5b8bc',
    marginRight: 7
  },
  commentTextStyle: {
    color: '#b5b8bc',
    fontSize: 18,
  },
  modalinsideContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 20,
    color: '#000',
    marginLeft: 10
  },
  modalMain: {
    width: '100%',
    padding: 15,
    height: '100%',
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  }
});

export default FullBlog