import React, {Component} from 'react';
import {connect} from 'react-redux'
import Popup from './Popup'
import Topic from './Topic';
import {getAllTopics, logout, me, selectTopic} from '../store'
import {sortBy} from 'lodash';

class CreateProject extends Component {
    constructor (){
        super();

        this.saveProject = this.saveProject.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.logout();
    }

    saveProject() {
       console.log('Save Project')
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Create a new project</h1>
                    <button onClick={this.logout} className={'logout-button'}>Logout</button>
                </div>
                <div className="create-project-container">
                    <div className={'project-swatch-detail'}>
                        <div className={'project-detail'}>
                            <div className={'topic-container'}>
                                <h3>Topic List</h3>
                            </div>
                            <div className={'form-fields'}>
                                <form className="form-inline">
                                    <label htmlFor="name">Project name</label>
                                    <input required={true} type="text" name="name" />
                                    <label htmlFor="maxStudents">Max. students per group</label>
                                    <input required={true} type="number" name="maxStudents" min={1} max={8} placeholder={1}/>
                                    <label htmlFor="shortName">Short name</label>
                                    <input required={true} type="text" name="shortName" />
                                    <label htmlFor="Description">Description</label>
                                    <textarea required={true} name="description" />
                                    <label htmlFor="Instructions">Instructions</label>
                                    <textarea required={true} name="instruction" />
                                </form>
                                <button onClick={this.saveProject}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(CreateProject);
