import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createClassroom} from '../../store'
import {compact, isEmpty, isString, values} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

class CreateClassroom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            description: null,
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        let errors = this.state.errors,
            value = evt.target.value
        value = isString(value) ? value.trim() : value;

        switch (evt.target.name) {
            case 'name':
            case 'description':
                errors[evt.target.name] = evt.target.value.length < 4 ? 'Min. 4 characters' : null
                break;
            default:
                break;
        }
        this.setState({...this.state, errors, [evt.target.name]: value});
    }

    async handleSubmit(evt) {
        const {name, description, errors} = this.state;
        evt.preventDefault();
        if (!isEmpty(compact(values(errors)))) {
            return;
        }
        const data = {
            name,
            description
        };

        await this.props.createClassroom(data);
        this.props.getClassrooms();
        this.props.setClassroom(this.props.classroom);
        this.props.setIsAdding(false);
    }

    render() {
        const {errors} = this.state,
            {handleChange, handleSubmit} = this;

        return (
            <div className={'create-classroom-form'}>
                <form>
                    <label htmlFor="name">
                        Name*
                        {errors.name ? <p>{errors.name}</p> : null}
                    </label>
                    <input onChange={handleChange} type="text" name="name"/>
                    <label htmlFor="Description">
                        Description*
                        {errors.description ? <p>{errors.description}</p> : null}
                    </label>
                    <textarea onChange={handleChange} name="description" placeholder="e.g. Period 1, 8:30am"/>
                </form>
                <div className={'action-button'}>
                    <button onClick={() => this.props.setIsAdding(false)}>Cancel</button>
                    <button
                        className="submit-button"
                        title={compact(values(errors)).length ? 'Resolve errors before saving' : null}
                        disabled={compact(values(errors)).length}
                        onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faCheck}/>
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroom: state.classroom.classroom
});

const mapDispatchToProps = dispatch => ({
    createClassroom: (classroom) => dispatch(createClassroom(classroom))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassroom);
