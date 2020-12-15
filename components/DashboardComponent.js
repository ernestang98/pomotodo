import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props)
    console.log(props.navigation.state.params)
    if (props.navigation.state.params === undefined) {
      this.state = {
        itemList: [
          {id: 1, task: "Task 1", checked: false, minute: 25, second: "00"},
          {id: 2, task: "Task 2", checked: false, minute: 25, second: "00"},
          {id: 3, task: "Task 3", checked: false, minute: 25, second: "00"},
        ],
        newItem: ''
      }
    }
    else {
      this.state = {
      itemList: props.navigation.state.params.array,
      newItem: ''
      }
    }
  }

  renderItem = ({ item }) => {
    return <View style={styles.data}>

            <View style={{flexDirection: "row"}}>
                <Text>Checkbox</Text>
                <TouchableOpacity onPress={()=>{
                                          console.log(item.id)
                                          for (let i = 0; i < this.state.itemList.length; i++) {
                                            if (this.state.itemList[i].id === item.id) {
                                              let data = this.state.itemList[i]
                                              this.props.navigation.navigate('Focus', {
                                                minute: data.minute,
                                                second: data.second,
                                                task: data.task,
                                                data: this.state.itemList,
                                                id: item.id
                                              })
                                            }
                                          }
                                          }}>
                  <Text>{item.task}</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>

              <View>
                <TouchableOpacity>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity onPress={()=>this.deleteOperation(item.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
  };

  
  deleteOperation = (id) => {
    let array = []
    for (let i = 0; i < this.state.itemList.length; i++) {
      if (this.state.itemList[i].id !== id) array.push(this.state.itemList[i])
    }
    this.setState({
      itemList: array
    })
  }

  resetOperation = () => {
    this.setState({

    })
  }
  


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('CreateUpdate', {
                                  itemList:this.state.itemList,
                                  buttonType: "add"
                                  })}}>
            <Text>Add</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1 }} 
          onChange={this.handleChange}/>
        </View>
        <FlatList
          style={styles.flatList}
          data={this.state.itemList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}  
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: 20,
    },
  data: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection:"row",
    justifyContent:"center"
  }
});

export default DashboardComponent;