import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './Popup'
import SingleProject from './SingleProject';
import {getAllProjects, logout, me, selectProject} from '../store'
import socket from '../../src/socket'

let timer = null;
class Home extends Component {
    constructor (){
        super();
        this.state = {showPopup: true};
        this.handleSelect = this.handleSelect.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.logout = this.logout.bind(this);
    }

    closePopup() {
        this.setState({
            showPopup: false
        });
    }

    logout(){
        this.props.logout();
    }

    handleSelect({id, name, students, maxStudents}) {
        if (this.props.projects.find(it => it.students[0] === this.props.user.name)) {
            alert('You already chose a project');
            return;
        }
        if (students.length < maxStudents) {
            this.props.chooseProject({id: id, name: this.props.user.name});
            socket.emit('select-project', {name: this.props.user.name, project: name});
            alert(`You chose well! Your topic for Black History Month is: ${name}`);
        } else {
            alert('The project is already taken! Choose another!');
        }
    }
  
    componentDidMount() {
        this.props.getProjects();
        socket.on('select-project', (data) => {
            if (data.students.length < data.maxStudents) {
              timer = setTimeout(() => this.props.getProjects(), 1000);
            }
            // TODO - remove for production
           console.log(`${data.project} was chosen by ${data.name}`);
        });
        this.props.getUser();
    }

    componentWillUnmount() {
      clearTimeout(timer);
    }

    render() {
      return (
          <React.Fragment>
          {this.state.showPopup ? <Popup closePopup={this.closePopup} /> : null}

          <div>
            <h1>Hi, {this.props.user.name}! Choose your BHM topic</h1>
            <button onClick={this.logout} className={'logout-button'}>Logout</button>
          </div>
          <div className="App">
            {this.props.projects.length ? this.props.projects.map((project) => {
              return <SingleProject
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  students={project.students}
                  maxStudents={project.maxStudents}
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
    projects: state.project,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(me()),
    getProjects: () => dispatch(getAllProjects()),
    chooseProject: (project) => dispatch(selectProject(project)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
