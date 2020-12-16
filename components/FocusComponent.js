import * as React from 'react';
import { Text, View, StyleSheet, 
  ImageBackground, TouchableOpacity, 
  Image, Platform } from 'react-native';
import moment from "moment";
import CheckBox from '@react-native-community/checkbox';

let interval = []

let counter = 0

const image = { uri: "https://i.pinimg.com/originals/c2/dd/7b/c2dd7bf1a4602978cb41f154d551a5ff.jpg" };

class FocusComponent extends React.Component {

  constructor(props) {
    console.log(props)
    super(props)
    let propsMin = parseInt(props.navigation.state.params.minute)
    let propsSec = props.navigation.state.params.second
    let propsTask = props.navigation.state.params.task
    let propsData = props.navigation.state.params.data
    let propsChecked = props.navigation.state.params.checked
    let propsId = props.navigation.state.params.id
    this.state = {
      eventDate:moment.duration().add({days:0,hours:0,minutes:propsMin,seconds:propsSec}),
      days:0,
      hours:0,
      data: propsData,
      mins: propsMin,
      secs: propsSec,
      task: propsTask,
      id: propsId,
      checked: propsChecked,
      OS: Platform.OS,
    }  
  }

  componentDidMount() {

  }

  stopTimer=()=> {
    counter = 0
    for (let i = 0; i < interval.length; i++) {
        clearInterval(interval[i])
    }
  }

  startTimer=()=>{
    counter += 1
    if (counter === 1) {
      const x=setInterval(()=>{
      let {eventDate} = this.state
      if(eventDate <=0){
        clearInterval(x)
      }
      else {
        eventDate = eventDate.subtract(1,"s")
        const days = eventDate.days()
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
          days,
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)
    interval.push(x)
    }
  }

  resetTimer=()=> {
    counter = 0
    for (let i = 0; i < interval.length; i++) {
        clearInterval(interval[i])
    }
    this.setState({
      eventDate:moment.duration().add({days:0,hours:0,minutes:25,seconds:0}),
      days: 0,
      hours: 0,
      mins: 25,
      secs: "00"
    })
  }

  render() {
    const { mins, secs } = this.state
  
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image} imageStyle={{opacity:0.8}}>
          <View style={styles.back}>
            <TouchableOpacity onPress={() => {  counter = 0
                                                for (let i = 0; i < interval.length; i++) {
                                                            clearInterval(interval[i])
                                                        }
                                                  console.log(this.state.mins)
                                                  console.log(this.state.secs)
                                                  console.log(this.state.id)
                                                let data = this.state.data
                                                for (let i = 0; i<data.length; i++) {
                                                  if (data[i].id === this.state.id) {
                                                    data[i].minute = this.state.mins
                                                    data[i].second = this.state.secs,
                                                    data[i].checked =  this.state.checked
                                                  }
                                                }
                                                console.log(data)
                                                this.props.navigation.navigate('Dashboard', 
                                                {array:data})}
                                                }>
              <Image
                source={require('../assets/back.png')}
                style={styles.backBtn}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.top}>
            <TouchableOpacity onPress={this.startTimer}>
              <Image
                source={require('../assets/start.png')}
                style={styles.controlBtn}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stopTimer}>
              <Image
                source={require('../assets/stop.png')}
                style={styles.controlBtn}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.resetTimer}>
              <Image
                source={require('../assets/reset.png')}
                style={styles.controlBtn}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.middle}>
            <Text style={styles.timer}>{ `${mins} : ${secs}`}</Text>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity>
              
            </TouchableOpacity>
            {
              this.state.OS === "android" && 
              <CheckBox
                value={this.state.checked}
                tintColors={{ true: 'white', false: 'white' }}
                onValueChange={() => this.setState({
                  checked: !this.state.checked
                })}
              />
              }
            {
              this.state.OS === "windows" && <Text>Windows</Text>
              }
            {
              this.state.OS === "ios" && <Text>IOS</Text>
              }
            <Text style={styles.task}>{this.state.task}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  back: {
    position: "relative",
    bottom: 150,
    left: 65
  },
  top: {
    marginRight: 60,
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 80
  },
  middle: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 75
  },
  bottom: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    bottom: 75
  },
  timer: {
    fontFamily: 'Roboto',
    fontSize: 80,
    color: "white",
    fontWeight: "bold"
  },
  controlBtn: {
    height: 30,
    width: 30,
    marginRight: 10
  },
  backBtn: {
    position: "relative",
    right: 50,
    bottom: 30,
    height: 80,
    width: 120
  },
  task: {
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    color: "white",
    marginLeft: 10
  }
});

export default FocusComponent;