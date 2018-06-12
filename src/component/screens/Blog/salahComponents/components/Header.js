import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../constants/colors';

export default class Header extends React.Component {
    _formatDate = date => {
        var monthNames = [
            "Januari", "Februari", "Maret",
            "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober",
            "November", "Desember"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    _formatDateHijri = date => {
        var monthNames = [
            "Muharram", "Shafar", "Rabi’ul Awwal",
            "Rabi’ul Akhir", "Jumadil Awwal", "Jumadil Akhir", "Rajab",
            "Sya’ban", "Ramadhan", "Syawal",
            "Dzulqa’dah", "Dzulhijjah"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    render() {
        const today = this._formatDate(new Date());
    
        return (
            <View style={styles.container}>
           
                <Text style={styles.locationText}>{this.props.location}</Text>
                  <Text style={styles.locationText}>{this.props.jamatTime}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 25
    },
    dateText: {
        fontSize: 16,
        color: colors.greyish_brown
    },
    locationText: {
        fontSize: 12,
        color: colors.brownish_grey
    }
})