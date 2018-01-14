import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { Card } from './Card';
import {CardSection} from './CardSection';
import {Actions} from 'react-native-router-flux';


class ListView extends Component {

    onRowPress = () => {
        Actions.single_blog({ post: this.props.item })
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={this.onRowPress} >
                <View pointerEvent="box-only" >
                    <Card>
                        <CardSection>
                            <View style={styles.coverContainerStyle}>
                                <Image style={styles.coverImageStyle} source={{ uri: this.props.item.image }} />
                            </View>
                            <View style={styles.titleContainerStyle}>
                                <Text style={styles.titleStyle}>I have got a good cat. Her name is matilda. She is quite young for a cat. She is between 12 years old ...</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.profileContainer}>
                                    <View style={styles.profileImageContainer}>
                                        <Image source={{ uri: 'https://assets.vogue.com/photos/58916d1d85b3959618473e5d/master/pass/00-red-lipstick.jpg' }} style={styles.profileImageStyle} />
                                    </View>
                                    <View style={styles.nameContainerStyle}>
                                        <Text style={styles.nameStyle}>Blake Lively</Text>
                                    </View>
                                </View>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.timeStyle}>5 minutes ago</Text>
                                </View>
                            </View>
                        </CardSection>
                    </Card>
                </View>
            </TouchableNativeFeedback>
        );
    }
   
}

const styles = StyleSheet.create({
    coverContainerStyle : {
        width : '100%',
        height : 200
    },
    coverImageStyle :{
       height : '100%',
       width : '100%'
    },
    titleContainerStyle : {
        width :'100%',
        height : 80,
        marginTop : 30,
        paddingLeft : 10,
        paddingRight : 10,
        marginBottom : 10
    },
    titleStyle : {
        height: '100%',
        width: '100%',
        fontSize : 18
    },
    infoContainer : {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection : 'row',
        alignItems: 'center'
    },
    profileContainer : {
        width : '70%',
        height : '100%',
        flexDirection : 'row',
        alignItems : 'center'
    },
    profileImageContainer : {
        width : '30%',
        height : '100%'
    },
    profileImageStyle : {
        height : 40,
        width : 40,
        borderRadius : 50
    },
    nameContainerStyle : {
        width: '60%',
        height: '100%',
        marginTop :10,
        marginLeft : -15
    },
    nameStyle : {
        fontWeight : 'bold',
        fontSize : 20
    },
    timeContainer : {
        width: '30%',
        height: '100%',
        marginTop : -10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeStyle : {
        fontSize : 12,
        fontWeight : '100'
    }


});

export default ListView;