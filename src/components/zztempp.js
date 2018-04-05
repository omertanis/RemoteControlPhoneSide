import { NavigationActions } from 'react-navigation';
// olan sayfadan oncekileri siler atar
this.props
           .navigation
           .dispatch(NavigationActions.reset(
             {
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'ConnectPage'})
                ]
              }));


                  <View style={styles.slider}>
                      <Slider
                        value={this.state.valueSlider}
                        minimumValue=5
                        maximumValue=20
                        onValueChange={value => this.setState({valueSlider:value})}
                        onSlidingComplete={this.degistirOnClick.bind(this)}
                      />
                      <Text>
                        Value: {this.state.valueSlider}
                      </Text>
                    </View>

WifiOperations.send


componentDidMount(){
  WifiOperations.connect(this.props.navigation.state.params.ip)
}
// on success içerisine

this.toggleModal(!this.state.modalVisible)
