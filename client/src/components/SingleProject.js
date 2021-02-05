import React, {Component} from 'react';

class SingleProject extends Component {

    render(){
        let {numStudents, name, id, users} = this.props
        let rgb = []
        for (let i = 0; i < 3; i++) {
          let r = Math.floor(Math.random() * 256)
          rgb.push(r)
        }
        return (
            <div className="project-swatch"
                 style={{backgroundColor: !numStudents ? `rgb(${rgb})` : 'black'}}
                 onClick={!this.props.isSelected ? () => this.props.selectProject(id, numStudents, name) : null}>
                <h2>{name}</h2>
                <div className='group'>
                {numStudents === 1 ?
                users.map((student, i) => {
                    return (
                    <p key={i}>{student.name}</p>
                    )
                })
                : null}
                </div>
            </div>
           
        )
    }
    
}

export default SingleProject