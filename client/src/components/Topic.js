import React, {Component} from 'react';

class Topic extends Component {

    render(){
        const {maxStudents, name, id, students} = this.props,
            studentCount = students.length,
            isFull = studentCount === maxStudents,
            rgb = [];

        for (let i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 256);
            if (r - rgb[i] < 10) {r += 20;}
            rgb.push(r);
        }
        return (
            <div className="topic-swatch"
                style={{backgroundColor: isFull ? 'black' : `rgb(${rgb})`}}
                onClick={() => this.props.selectTopic({id, name, isFull})}
            >
                <h2>{name}</h2>
                <div className='group'>
                    {isFull ? students.map((s, i) => (<p key={i}>{s.name}</p>)) : null}
                </div>
            </div>
        );
    }
}

export default Topic