<TextInput
  style={{height: 40, width:250, borderColor: 'gray', borderWidth: 1}}
  onChangeText={(text) => this.setState({text})}
  value={this.state.text}
  />
  <Button
  style={{height: 40, width:100, borderColor: 'gray', borderWidth: 1}}
    title="POST"
    onPress={() => this.write(this.state.text)} />

    <Button
    style={{height: 40, width:100, borderColor: 'gray', borderWidth: 1}}
      title="GET"
      onPress={() => this.read()}
       />
