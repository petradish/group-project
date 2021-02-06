import React from 'react';

class Popup extends React.Component {
  render() {
      const {closePopup} = this.props
    return (
      <div className='popup'>
        <div className='popup_inner'>
            <div className={'message'}>
                <h3>Black History Month Project</h3>
                <p>Instructions: Choose one person to research in honor of black history month.</p>
                <p>First come first serve.</p>
                <p>Try to choose someone you know, since you will be researching, creating, and presenting a project on this person.</p>
                <p>If you aren't here, Ms. L will choose for you.</p>

                <button onClick={closePopup}>OK!</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Popup;