import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllClassrooms, getAllProjects, logout} from '../../store'
import {sortBy} from 'lodash';
import history from '../../history'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Classroom from './Classroom';

class Admin extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.getClassrooms();
    }

    logout() {
        this.props.logout();
    }

    render() {
        const {user, classrooms} = this.props;
        return (
            <div className='Admin'>
                <div>
                    <h1>Hi, {user.name}! Manage your classrooms here</h1>
                    <button onClick={this.logout} className={'logout-button'}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        Logout
                    </button>
                </div>
                <div className="projects-container">
                    {classrooms?.length ? classrooms?.map((classroom) => {
                            const {id, name, description} = classroom;
                            return(
                                <div className={'project-swatch'} key={id} onClick={() => history.push(`/home/classroom/${id}`)}>
                                    <h2 className={'project-title'}>{name}</h2>
                                    <div>{description}</div>
                                </div>
                            )
                        }) :
                        'Loading Classroom'
                    }
                </div>
                <button className="new-project-button" onClick={() => history.push('/create/classroom')}>
                    <FontAwesomeIcon icon={faPlus}/>
                    Create a new classroom
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    classrooms: sortBy(state.classroom.classrooms, 'name')
});

const mapDispatchToProps = dispatch => ({
    getClassrooms: () => dispatch(getAllClassrooms()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
