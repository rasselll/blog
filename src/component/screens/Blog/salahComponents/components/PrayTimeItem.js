import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../constants/colors';


export default class PrayTimeItem extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.prayName}>{this.props.name}</Text>
                    <Text style={styles.prayTime}>{this.props.time}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image style={styles.icon} resizeMode="contain" source={this.props.icon} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 20,
        backgroundColor: 'white',
        marginBottom: 2
    },
    prayName: {
        fontSize: 16,
        color: colors.brownish_grey
    },
    prayTime: {
        fontSize: 20,
        color: colors.brownish_grey
    },
    icon: {
        width: 45,
        height: 40
    }
})