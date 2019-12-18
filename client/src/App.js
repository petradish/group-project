import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from '../src/components/Popup'
import './App.css';
import SingleProject from './components/SingleProject';
import {getAllProjects, selectProject} from './store'
import socket from '../src/socket'


class App extends Component {
  constructor (){
    super()
    this.state = {
      isSelected: false,
      showPopup: true,
      name: 'student',
    }
    this.togglePopup = this.togglePopup.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleSelect(id, numStudents, name){
    if (numStudents < 4) {
      this.props.chooseProject({id: id, name: this.state.name})
      socket.emit('select-project', {name: this.state.name, project: name})
      alert(`You chose well! Let's see who else joins your group on ${name}`)
      this.setState({
          isSelected: true
      })
    } else {
      alert('The group is now full! Choose another!')
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
       console.log(`${data.project} was chosen by ${data.name}`)
       this.props.getProjects()
   })
  }
  
render() { 
  return (
    <React.Fragment>
    {this.state.showPopup ?
      <Popup
       closePopup={this.togglePopup}
      />
      : (<h1>
       Hi, {this.state.name}! Choose your topic quickly!</h1>)
    }  
    
    <div className="App">
      {this.props.projects.length ? this.props.projects.map((project) => {
        return <SingleProject key={project.id} id={project.id} student={this.state.name} users={project.users} name={project.name} numStudents={project.numStudents} isSelected={this.state.isSelected} selectProject={this.handleSelect}/>
      })
    : 'Loading Project Name' }
    </div>
    </React.Fragment>
  );
}
}

const mapStateToProps = state => ({
  name: state.name,
  projects: state.project
})
const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(getAllProjects()),
  chooseProject: (project) => dispatch(selectProject(project))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
