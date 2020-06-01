import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Vibration, TextInput } from 'react-native';
import PropTypes from 'prop-types'

class Counter extends React.Component {

  render() {
	if (this.props.isStart & !this.props.isBreak) {
	  return (
		<View style={styles.row}>
			<Text style={styles.timer}>Work:    {this.props.min} Min: {this.props.sec} Sec</Text>
		</View>
	  );
	} if (this.props.isStart & this.props.isBreak) {
	  return (
		<View style={styles.row}>
			<Text style={styles.timer}>Break:	{this.props.min} Min: {this.props.sec} Sec</Text>
		</View>
	  );
	} else {
	  return (
	  <View style={styles.row}>
		<Text style={styles.timer}>Input the timings below and press start to begin timing.</Text>
	  </View>
	  );
	}
  }
  
}

const initialState = {
	  isStart: false,
	  isPause: false,
	  workTime: '00',
	  breakTime: '00',
	  min: '00',
	  sec: '00',
	  timer: 0,
	  isBreak: false
	};
		

export default class App extends React.Component {
	
	
  constructor() {
	super();
	this.state = initialState;
  }
 

  componentDidMount() {
    this.interval = setInterval(this.incrementCount, 1000)
  }
  
  incrementCount = () => {
	if (this.state.isStart) {
		this.setState(prevState => ({timer: prevState.timer - 1}));
		let seconds = this.state.timer % 60;
		
		let minutes = Math.floor(this.state.timer / 60);
		if (seconds < 10) {
			seconds = '0' + String(seconds);
		}
		if (minutes < 10) {
			minutes = '0' + String(minutes);
		}
		this.setMin(minutes);
		this.setSec(seconds);
		if (this.state.timer == 0 & this.state.isBreak) {
			console.log("finished")
			this.setState({timer: parseInt(this.state.workTime) * 60});
			this.setIsBreak(false);
			this.vibrate();
		} else if (this.state.timer == 0 & !this.state.isBreak) {
			console.log("break time")
			this.setState({timer: parseInt(this.state.breakTime) * 60});
			this.setIsBreak(true);
			this.vibrate();
		}
	} 
  }
  
  setWorkTime(input) {
	this.setState({workTime: input})
	this.setState({timer: parseInt(input) * 60})
  }
  
  setBreakTime(input) {
	this.setState({breakTime: input})
  }
  
  setIsPause() {
	  this.setState({isPause: !this.state.isPause})
	  if (this.state.isPause) {
		this.interval = setInterval(this.incrementCount, 1000);
	  } else {
		clearInterval(this.interval);
	}
  }
  
  setIsStart(input) {
	  this.setState({isStart: input})
  }
  
  setMin(input) {
	this.setState({min:input})
  }
  
  setSec(input) {
	this.setState({sec:input})
  }
  
  setIsBreak(input) {
	this.setState({isBreak: input})
  }
  
  resetState() {
	this.setState(initialState);
	this.workTimeInput.clear();
	this.breakTimeInput.clear();
  }
  
  vibrate() {
	Vibration.vibrate([500, 500, 500]);
  }
  
  render() {
  return (
      <View style={styles.container}> 
	    <View style={styles.row}>
			<View>
				<Counter sec={this.state.sec}
				min={this.state.min}
				isStart={this.state.isStart}
				isBreak={this.state.isBreak}
				/>
			</View>
		</View>
		<View style={styles.row}>
			<View>
				<Text style={{padding: 10, fontSize: 16}}>
					Work Time (Minutes):
				</Text>
			</View>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Work Time"
					onChangeText={workTime => this.setWorkTime(workTime)}
					defaultValue={this.state.workTime}
					ref={input => { this.workTimeInput = input }}
				/>
			</View>
		</View>
		<View style={styles.row}>
			<View>
				<Text style={{padding: 10, fontSize: 16}}>
					Break Time (Minutes):
				</Text>
			</View>
			<View>
				<TextInput
					style={styles.input}
					placeholder="Break Time"
					onChangeText={breakTime => this.setBreakTime(breakTime)}
					defaultValue={this.state.breakTime}
					ref={input => { this.breakTimeInput = input }}
				/>
			</View>
		</View>
		<View style={styles.row}>
			<View style={styles.buttonContainer}>
				<Button title="Start" onPress={isStart => this.setIsStart(true)}/>
			</View>
			<View>
				<Button title="Pause/Continue" onPress={isPause => this.setIsPause()}/>
			</View>
			<View style={styles.buttonContainer}>
				<Button title="Reset" onPress={ () => this.resetState()}/>
			</View>
		</View>
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
  row: {
	   justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
		margin: 10
  },
  input: {
	borderWidth: 1,
    borderColor: '#777',
    flex: 1, 
	height: 42, 
	fontSize:16, 
	paddingLeft: 15
  },
  buttonContainer: {
	margin: 20
  },
  timer : {
	padding: 10,
	fontSize: 20
  }	  
});