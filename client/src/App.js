import React, {Component} from 'react';
import {connect} from 'react-redux'
import {me} from './store'
import Routes from './Routes';

class App extends Component {

  componentDidMount(){
    this.props.getUser();
  }

  render() {
    return (
        <div>
          <Routes />
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
