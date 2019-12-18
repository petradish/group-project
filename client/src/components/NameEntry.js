import React from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store';

function NameEntry (props) {

  const { handleChange } = props;

  return (
    <form className="form-inline">
      <label htmlFor="name">Enter your name:</label>
      <input
        type="text"
        name="name"
        placeholder="First and Last Name"
        className="form-control"
        onChange={handleChange}
      />
      <button onClick={props.closePopup}>Go!</button>
      <p>Instructions: After you click "Go!", Choose your project topic before someone else does! 
        First 4 to select a country will form the group. Think carefully before selecting. When you click the topic, it will be your final choice!
        </p>
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
