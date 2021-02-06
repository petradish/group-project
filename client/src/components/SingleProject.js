import React, {Component} from 'react';

class SingleProject extends Component {

    render(){
        const {maxStudents, name, id, students} = this.props,
            rgb = []
        for (let i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 256);
            if (r - rgb[i] < 10) {r += 20;}
            rgb.push(r);
        }
        return (
            <div className="project-swatch"
                 style={{backgroundColor: students.length < maxStudents ? `rgb(${rgb})` : 'black'}}
                 onClick={!this.props.isSelected ? () => this.props.selectProject({id, name, students, maxStudents}) : null}>
                <h2>{name}</h2>
                <div className='group'>
                {students.length === maxStudents ?
                    students.map((name, i) => (<p key={i}>{name}</p>)) :
                    null
                }
                </div>
            </div>
        );
    }
}

export default SingleProject