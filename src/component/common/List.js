import React, {Component} from 'react';
import {Image, StyleSheet, Dimensions, Text, TouchableNativeFeedback, View} from 'react-native';
import {Card, CardItem} from 'native-base'
import {Actions} from 'react-native-router-flux'
import moment from 'moment';
import color from '../../assets/color';
import style from './../../Utility/styles'

const {width, height}  = Dimensions.get('window')
class ListView extends Component {

    onRowPress = () => {
        Actions.single_blog()
    }

    render() {
        const {imageUrl, blogDescription, creatorInfo, createdAt} = this.props.item.values;
        return (
            <TouchableNativeFeedback onPress={this.onRowPress}>
                <View>
                    <Card>
                        <CardItem header>
                            <View style={styles.coverContainerStyle}>
                                <Image style={styles.coverImageStyle} source={{uri: imageUrl}}/>
                            </View>
                        </CardItem>
                        <CardItem cardBody>
                            <Text style={styles.titleStyle} numberOfLines={2}>{blogDescription}</Text>
                        </CardItem>
                        <CardItem footer>
                            <View style={styles.profileContainer}>
                                <View style={styles.profileImageContainer}>
                                    <Image source={{uri: creatorInfo.userInfo.profileImage}}
                                           style={styles.profileImageStyle}/>
                                </View>
                                <View style={styles.nameContainerStyle}>
                                    <Text style={[style.medium, styles.nameStyle]}>{creatorInfo.userInfo.fullname}</Text>
                                </View>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeStyle}>{moment(createdAt).fromNow()} </Text>
                            </View>
                        </CardItem>
                    </Card>
                </View>
            </TouchableNativeFeedback>
        );
    }

}

const styles = StyleSheet.create({
    coverContainerStyle: {
        width: '100%',
        height: 200
    },
    coverImageStyle: {
        height: '100%',
        width: '100%'
    },
    titleContainerStyle: {
        width: '100%',
        height: 80,
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
    },
    titleStyle: {
        height: '100%',
        width: '100%',
        padding: 10,
        fontSize: 18
    },
    infoContainer: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileContainer: {
        width: '70%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageContainer: {
        width: '30%',
        height: '100%'
    },
    profileImageStyle: {
        height: height /20,
        width: width / 13,
        borderRadius: 50
    },
    nameContainerStyle: {
        width: '60%',
        height: '100%',
        marginTop: 10,
        marginLeft: -15
    },
    nameStyle: {
        fontWeight: 'bold',
        color: color.fontColor,
    },
    timeContainer: {
        width: '30%',
        height: '100%',
        marginTop: -10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeStyle: {
        fontSize: 12,
        fontWeight: '100'
    }


});

export default ListView;