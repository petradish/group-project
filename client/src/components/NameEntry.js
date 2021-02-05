import React from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store';

function NameEntry (props) {

  const { handleChange } = props;

  const name = sessionStorage.getItem('name');

  return (
    <form className="form-inline" align={'center'} >
      <label htmlFor="name">Enter your first and last name: </label>
      <input
        type="text"
        name="name"
        placeholder="First and Last Name"
        value={name}
        readOnly={name}
        className="form-control"
        onChange={!name ? handleChange : null}
      />
        <h3>Black History Month Project</h3>
        <p>Instructions: Choose one person to research in honor of black history month.</p>
        <p>First come first serve.</p>
        <p>Try to choose someone you know, since you will be researching, creating, and presenting a project on this person.</p>
        <p>If you aren't here, Ms. L will choose for you.</p>
        <button onClick={props.closePopup}>OK!</button>
    </form>
     
  );
}


const mapDispatchToProps = function (dispatch) {
  return {
    handleChange (evt) {
      dispatch(updateName(evt.target.value));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NameEntry);
