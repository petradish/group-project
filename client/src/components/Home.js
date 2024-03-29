import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './app/Popup'
import Topic from './app/Topic';
import {getAllTopics, logout, selectTopic} from '../store'
import {sortBy} from 'lodash';
import {TitleBar} from './TitleBar';

class Home extends Component {
    constructor() {
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

    logout() {
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
    }

    render() {
        const {allTopics, project, user, logout} = this.props,
            columnNum = Math.ceil(Math.sqrt(allTopics.length));
        return (
            <div className='App'>
                {this.state.showPopup ? <Popup project={project} closePopup={this.closePopup}/> : null}
                <TitleBar user={user} logout={logout} text={`Choose your ${project.shortName ?? project.name} topic`} />
                <div className={`app-container-${columnNum > 5 ? 5 : columnNum}`}>
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
                        : 'Loading Topic Name'}
                </div>
            </div>
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
    getTopics: (projectId) => dispatch(getAllTopics(projectId)),
    chooseTopic: (topic) => dispatch(selectTopic(topic)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
