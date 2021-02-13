import React, {Component} from 'react';

class Project extends Component {

    render(){
        const {name, topics} = this.props,
            rgb = [];

        return (
            <div className={'project-swatch'} style={{backgroundColor: 'rebeccaPurple'}}>
                <h2>{name}</h2>
                <div className='group'>
                    {topics.map((s, i) => (<p key={i}>{s.name}</p>))}
                </div>
            </div>
        );
    }
}

export default Project