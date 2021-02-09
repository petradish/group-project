import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './Popup'
import Topic from './Topic';
import {getAllTopics, logout, me, selectTopic} from '../store'

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
        const {user, selectedTopic} = this.props;
        if (selectedTopic) {
            alert('You already chose a topic');
            return;
        }
        if (!isFull) {
            this.props.chooseTopic({id: id, student: user});
            alert(`You chose well! Your topic for Black History Month is: ${name}`);
        } else {
            alert('The topic is already taken! Choose another!');
        }
    }
  
    componentDidMount() {
        this.props.getTopics();
        this.props.getUser();
    }

    render() {
        const {allTopics} = this.props;
        return (
            <React.Fragment>
                {this.state.showPopup ? <Popup closePopup={this.closePopup} /> : null}
                <div>
                    <h1>Hi, {this.props.user.name}! Choose your BHM topic</h1>
                    <button onClick={this.logout} className={'logout-button'}>Logout</button>
                </div>
                <div className="App">
                    {allTopics?.length ? allTopics?.map((topic) => {
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
    allTopics: state.topic.allTopics,
    user: state.user,
    selectedTopic: state.topic.selectedTopic
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(me()),
    getTopics: () => dispatch(getAllTopics()),
    chooseTopic: (topic) => dispatch(selectTopic(topic)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
