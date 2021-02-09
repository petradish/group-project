import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './Popup'
import Topic from './Topic';
import {getAllTopics, logout, me, selectTopic} from '../store'
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
        if (this.props.topics.find(it => it.students?.includes(this.props.user))) {
            alert('You already chose a topic');
            return;
        }
        if (students?.length < maxStudents) {
            this.props.chooseTopic({id: id, student: this.props.user});
            socket.emit('select-topic', {name: this.props.user.name, topic: name});
            alert(`You chose well! Your topic for Black History Month is: ${name}`);
        } else {
            alert('The topic is already taken! Choose another!');
        }
    }
  
    componentDidMount() {
        this.props.getTopics();
        socket.on('select-topic', (data) => {
            if (data.students.length < data.maxStudents) {
              timer = setTimeout(() => this.props.getTopics(), 1000);
            }
            // TODO - remove for production
           console.log(`${data.topic} was chosen by ${data.name}`);
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
            {this.props.topics.length ? this.props.topics.map((topic) => {
              return <Topic
                  key={topic.id}
                  id={topic.id}
                  name={topic.name}
                  students={topic.students}
                  maxStudents={topic.maxStudents}
                  selectTopic={this.handleSelect}
                  />
            })
          : 'Loading Topic Name' }
          </div>
          </React.Fragment>
      );
    }
}

const mapStateToProps = state => ({
    topics: state.topic,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(me()),
    getTopics: () => dispatch(getAllTopics()),
    chooseTopic: (topic) => dispatch(selectTopic(topic)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
