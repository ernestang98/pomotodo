import * as React from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';

const image = { uri: "https://cdn.wallpapersafari.com/34/21/pUSiGt.jpg" };

class CreateUpdateComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      itemList: this.props.navigation.state.params.itemList,
      input: "",
      buttonType: this.props.navigation.state.params.buttonType
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image} imageStyle={{opacity:0.3}}>
          <View style={styles.createUpdate}>
            <TextInput style={styles.input} placeholder={"Add a task"}
                       value={this.state.input} onChangeText={(searchtext) => this.setState({ input: searchtext })}/>
            <TouchableOpacity onPress={() => {
                          let arr = this.state.itemList
                          let temp = []
                          let largest = 0;
                          for (let i = 0; i<this.state.itemList.length; i++) {
                            if (parseInt(this.state.itemList[i].id)>largest) {
                              largest = this.state.itemList[i].id;
                            }
                          }
                          if (this.state.input !== "") {
                            arr.push({id: largest+1, 
                                    task: this.state.input, 
                                    checked: false, 
                                    minute: 25, 
                                    second: "00"
                                    })
                            this.props.navigation.navigate('Dashboard', {array: arr})
                          } 
                          else {
                            this.props.navigation.navigate('Dashboard', {array: this.state.itemList})
                          }
                          
                          }
                          }>
              {this.state.input !== "" && <Image
                source={require('../assets/plus.png')}
                style={styles.controlBtn}
                />}
              {this.state.input === "" && <Image
                source={require('../assets/return.png')}
                style={styles.controlBtn}
                />}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  input: {
    marginRight: 10,
    height: 40, borderColor: 'gray', borderWidth: 1,
    padding: 10, width: 200,
    borderRadius: 30, borderWidth: 2,
    borderColor: "black"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  createUpdate: {
    justifyContent: "center",
    flexDirection: "row"
  },
  controlBtn: {
    height: 40,
    width: 40,
    marginRight: 10
  }
});

export default CreateUpdateComponent;