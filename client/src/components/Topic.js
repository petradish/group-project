import React, {Component} from 'react';

class Topic extends Component {

    render(){
        const {maxStudents, name, id, students} = this.props,
            rgb = []
        for (let i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 256);
            if (r - rgb[i] < 10) {r += 20;}
            rgb.push(r);
        }
        return (
            <div className="topic-swatch"
                 style={{backgroundColor: students?.length === maxStudents ? 'black' : `rgb(${rgb})`}}
                 onClick={!this.props.isSelected ? () => this.props.selectTopic({id, name, students, maxStudents}) : null}>
                <h2>{name}</h2>
                <div className='group'>
                {students?.length === maxStudents ?
                    students?.map((s, i) => (<p key={i}>{s.name}</p>)) :
                    null
                }
                </div>
            </div>
        );
    }
}

export default Topic