import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './Popup'
import Topic from './Topic';
import {getAllTopics, logout, me, selectTopic} from '../store'
import {sortBy} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
    constructor (){
        super();
        this.state = {
            showPopup: true
        };
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

    handleSelect({id, name, isFull}) {
        const {user, selectedTopic, allTopics, project} = this.props;

        if (selectedTopic || allTopics.find(it => it.students.find(s => s.googleId === user.googleId))) {
            alert('You already chose a topic');
            return;
        }
        if (!isFull) {
            this.props.chooseTopic({id: id, student: user});
            alert(`You chose well! Your topic for ${project.name} is: ${name}`);
        } else {
            alert('The topic is already taken! Choose another!');
        }
    }
  
    componentDidMount() {
        this.props.getTopics(this.props.project.id);
        this.props.getUser();
    }

    render() {
        const {allTopics, project} = this.props;
        return (
            <React.Fragment>
                {this.state.showPopup ? <Popup project={project} closePopup={this.closePopup} /> : null}
                <div>
                    <h1>Hi, {this.props.user.name}! Choose your {project.shortName ?? project.name} topic</h1>
                    <button onClick={this.logout} className={'logout-button'}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        Logout
                    </button>
                </div>
                <div className="App">
                    {allTopics?.length ? allTopics?.map((topic) => {
                      return <Topic
                          key={topic.id}
                          id={topic.id}
                          name={topic.name}
                          students={topic.students}
                          maxStudents={project.maxStudents}
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
    allTopics: sortBy(state.topic.allTopics, 'name'),
    user: state.user,
    selectedTopic: state.topic.selectedTopic,
    project: state.project.project
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(me()),
    getTopics: (projectId) => dispatch(getAllTopics(projectId)),
    chooseTopic: (topic) => dispatch(selectTopic(topic)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
