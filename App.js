import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ListView } from 'react-native';

import { VictoryAxis, VictoryArea, VictoryChart, VictoryStack, VictoryTheme } from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data1992 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data1993 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data1994 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data1995 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      myData:[
        {quarter: 1, earnings: 18000},
        {quarter: 2, earnings: 13250},
        {quarter: 3, earnings: 15000},
        {quarter: 4, earnings: 12000}
      ],
      counter: 1
    }
  }

  componentDidMount() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=3bb30a697c7ac119276f24df9ba8c42f')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.list),
          newData: ds.cloneWithRows(responseJson.list)
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }


    return (
      <View style={styles.container}>
        <Text>Native mobile vizualizations</Text>
        <Text style={styles.text}>stacked bar</Text>

        <VictoryChart >
             <VictoryArea
               data={this.state.myData}
               x={"quarter"}
               y={"earnings"}
             />

         </VictoryChart>



         <Text>Weather Feed</Text>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => <Text>{rowData.dt}, {rowData.dt_txt} :: {this.state.counter++}</Text>}
         />




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
