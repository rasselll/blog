import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from './salahComponents/components/Header';
import PrayTimeLists from './salahComponents/components/PrayTimeLists';
import colors from './salahComponents/constants/colors';




export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
          <Header  />
          <PrayTimeLists />


    

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pale_grey,
    padding: 15,
  },
  configContainer: {
    alignItems: 'flex-end',
    paddingBottom: 15
  },
  locationSelector: {
    marginBottom: 10
  }
});
