import React from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store';
import {Login} from './Login';

function NameEntry (props) {

  // const { handleChange } = props;

  return (
    // <form className="form-inline">
    //   <label htmlFor="name">Enter your name: </label>
    //   <input
    //     type="text"
    //     name="name"
    //     placeholder="First and Last Name"
    //     className="form-control"
    //     onChange={handleChange}
    //   />
<div align="center">
  <h3>Black History Month Project</h3>
  <p>Instructions: Choose one person to research in honor of black history month.</p>
  <p>First come first serve.</p>
  <p>Try to choose someone you know, since you will be researching, creating, and presenting a project on this person.</p>
  <p>If you aren't here, Ms. L will choose for you.</p>
  <button onClick={props.closePopup}>OK!</button>

</div>

    // </form>
     
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
