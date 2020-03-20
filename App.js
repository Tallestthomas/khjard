import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      apiKey: '',
      tasks: []
    };
  }

  handleOnChange = event => {
    this.setState({apiKey: event.target.value});
  }

  fetchTasks = () => {
    const { apiKey } = this.state;

    fetch('https://inthe.am/api/v2/tasks/', {
      mode: 'cors',
      headers: new Headers({
        'Authorization': `Token ${apiKey}`
      })
    })
      .then(res => {
        if(res.ok) return res.json();
        throw 'Error fetching ' + res.status;
      })
      .then(tasks => this.setState({tasks}))
      .catch(err => console.error(err));
  }

  render() {
  return (
    <View style={styles.container}>
      <Button onPress={this.fetchTasks} title="Fetch" />
        { this.state.tasks.map(task => {
          return(
            <View>
              <Text>{task.description}</Text>
            </View>
          ) ;
        })
        }
    </View>
  )
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
