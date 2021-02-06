import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './Popup'
import '../App.css';
import SingleProject from './SingleProject';
import {getAllProjects, me, selectProject} from '../store'
import socket from '../../src/socket'

let timer = null;
class Home extends Component {
  constructor (){
    super()
    this.state = {
      isSelected: false,
      showPopup: true
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  closePopup() {
    this.setState({
      showPopup: false
    })
  }

  handleSelect(id, numStudents, name){
    if (this.props.projects.find(it => it.users[0] && it.users[0].name === sessionStorage.getItem('name'))) {
      alert('You already chose a project');
      return;
    }
    if (numStudents < 1) {
      this.props.chooseProject({id: id, name: this.state.name})
      socket.emit('select-project', {name: this.state.name, project: name, numStudents: numStudents})
      alert(`You chose well! Your topic for Black History Month is: ${name}`)
      this.setState({
          isSelected: true
      })
    } else {
      alert('The project is already taken! Choose another!')
    }
  }

  componentDidUpdate(prevProps, prevState){
      if (prevState.name !== sessionStorage.getItem('name')){
          this.setState({
          name: sessionStorage.getItem('name')
      })
    }
  }
  
  componentDidMount(){
    this.props.getProjects()
    socket.on('select-project', (data) => {
      if (data.numStudents < 1){
        timer = setTimeout(() => this.props.getProjects(), 1000)
      }
       console.log(`${data.project} was chosen by ${data.name}`)
   });
    this.props.getUser();
  }
  componentWillUnmount(){
    clearTimeout(timer);
  }
render() {
  return (
    <React.Fragment>
    {this.state.showPopup ?
      <Popup closePopup={this.closePopup} />
      : (<h1>Hi, {this.props.user.name}! Choose your BHM topic</h1>)}

    <div className="App">
      {this.props.projects.length ? this.props.projects.map((project) => {
        return <SingleProject
            key={project.id}
            id={project.id}
            student={this.state.name}
            users={project.users}
            name={project.name}
            numStudents={project.numStudents}
            isSelected={this.state.isSelected}
            selectProject={this.handleSelect}
            />
      })
    : 'Loading Project Name' }
    </div>
    </React.Fragment>
  );
}
}

const mapStateToProps = state => ({
  name: state.name,
  projects: state.project,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  getProjects: () => dispatch(getAllProjects()),
  chooseProject: (project) => dispatch(selectProject(project))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
