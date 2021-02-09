import React from 'react';

class Popup extends React.Component {
  render() {
      const {closePopup, project} = this.props
      return (
          <div className='popup'>
            <div className='popup_inner'>
                <div className={'message'}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p>Instructions: {project.instruction}</p>
                    <button onClick={closePopup}>OK!</button>
                </div>
            </div>
          </div>
      );
  }
}

export default Popup;