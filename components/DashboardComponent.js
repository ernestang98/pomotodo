import * as React from 'react';
import { Image, Text, View, StyleSheet, ImageBackground, Platform,
  FlatList, TouchableOpacity, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

const image = { uri: "https://archziner.com/wp-content/uploads/2020/01/black-and-white-photo-of-a-snowy-mountain-landscape-red-aesthetic-wallpaper-full-moon-in-the-black-sky.jpg" };

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props)
    console.log(props.navigation.state.params)
    if (props.navigation.state.params === undefined) {
      this.state = {
        itemList: [],
        newItem: '',
        OS: Platform.OS
      }
    }
    else {
      this.state = {
      itemList: props.navigation.state.params.array,
      newItem: '',
      OS: Platform.OS
      }
    }
  }

  saveData = async() => {
    alert("Saving...")
    try {
      await AsyncStorage.setItem('itemList', JSON.stringify(this.state.itemList))
      alert("Success!")
    }
    catch (e) {
      alert("Error encountered: " + e)
    }
  }

  loadData = async() => {
    alert("Loading...")
    try {
      const data = await AsyncStorage.getItem('itemList')
      console.log(data)
      alert("Success!")
      if (data === null) {
        this.setState({
          itemList: [
            {id: 1, task: "Task 1", checked: true, minute: 25, second: "00"},
            {id: 2, task: "Task 2", checked: false, minute: 25, second: "00"},
            {id: 3, task: "Task 3", checked: false, minute: 25, second: "00"},
          ]
        })
        console.log(this.state.itemList)
      }
      else {
        this.setState({
          itemList: JSON.parse(data)
        })
      }
    }
    catch(e) {
      alert("Error encountered: " + e)
    }
  }

  componentDidMount() {
    console.log(this.state)
  }

  extractId = (id) => {
    for (let i = 0; i < this.state.itemList.length; i++) {
      if (this.state.itemList[i].id === id) {
        console.log("________")
        console.log(this.state.itemList[i].checked)
        return this.state.itemList[i].checked
      }
    }
  }

  updateCheckedState = (id) => {
    for (let i = 0; i < this.state.itemList.length; i++) {
      if (this.state.itemList[i].id === id) {
        this.state.itemList[i].checked = !this.state.itemList[i].checked
    }
  }
}

  renderItem = ({ item }) => {
    return <View style={styles.data}>
                <View style={{flexDirection: "row", marginLeft: 20}}>
                  {
                    this.state.OS === "android" && 
                    <CheckBox
                      value={this.extractId(item.id) === true}
                      tintColors={{ true: 'black', false: 'black' }}
                      onValueChange={()=>this.updateCheckedState(item.id)}
                    />
                  }
                  {
                    this.state.OS === "windows" && <Text>Windows</Text>
                  }
                  {
                    this.state.OS === "ios" && <Text>IOS</Text>
                  }
                  <View style={styles.task}>
                    <TouchableOpacity onPress={()=>{
                                                console.log(item.id)
                                                for (let i = 0; i < this.state.itemList.length; i++) {
                                                  if (this.state.itemList[i].id === item.id) {
                                                    let data = this.state.itemList[i]
                                                    console.log(data)
                                                    this.props.navigation.navigate('Focus', {
                                                      minute: data.minute,
                                                      second: data.second,
                                                      task: data.task,
                                                      data: this.state.itemList,
                                                      id: item.id,
                                                      checked: data.checked
                                                    })
                                                  }
                                                }
                                                }}>
                      <Text>{item.task}</Text>
                    </TouchableOpacity>         
                  </View>
                </View>

                <View style={styles.editDelete}>
                  <View style={styles.edit}>
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

  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image} imageStyle={{opacity:0.5}}>
          <View style={styles.addLoad}> 
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('CreateUpdate', {
                                    itemList:this.state.itemList,
                                    buttonType: "add"
                                    })}}>
              <Image
                source={require('../assets/plus.png')}
                style={styles.controlBtn}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.saveData()}>
            <Image
                source={require('../assets/save.png')}
                style={styles.controlBtn}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.loadData()}>
            <Image
                source={require('../assets/load.png')}
                style={styles.controlBtn}
                />
            </TouchableOpacity>     
          </View>
        <View style={styles.header}>
          <TextInput style={styles.input} placeholder={"Search..."}
          onChange={this.handleChange}/>
        </View>
        <FlatList
          style={styles.flatList}
          data={this.state.itemList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}  
        />
        </ImageBackground>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 5,
    marginBottom: 5
  },
  header: {
    flexDirection:"row",
    justifyContent:"center",
    marginTop: 30
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  flatList: {
    marginTop: 30
  },
  input: {
    height: 40, borderColor: 'gray', borderWidth: 1,
    padding: 10, width: 300,
    borderRadius: 30, borderWidth: 2,
    borderColor: "black"
  },
  task: {
    justifyContent: "center"
  },
  edit: {
    marginRight: 15
  },
  addLoad: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    marginTop: 30,
  },
  editDelete: {
    flexDirection: "row",
    marginRight: 25
  },
  controlBtn: {
    height: 40,
    width: 40,
    marginRight: 10
  }
});

export default DashboardComponent;