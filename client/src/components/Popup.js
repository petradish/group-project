import React from 'react';
import NameEntry from './NameEntry';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <NameEntry closePopup={this.props.closePopup} />

        </div>
      </div>
    );
  }
}

export default Popup;