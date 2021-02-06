import React, {Component} from 'react';
import {connect} from 'react-redux'
import './App.css';
import {getAllProjects, me} from './store'
import Routes from './Routes';

class App extends Component {

  componentDidMount(){
    this.props.getProjects()
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
  projects: state.project,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  getProjects: () => dispatch(getAllProjects()),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
