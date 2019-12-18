import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import {getProject, selectProject} from '../store'

class SingleProject extends Component {

    render(){
        let {numStudents, name, id, users} = this.props
        let rgb = []
        for (let i = 0; i < 3; i++) {
          let r = Math.floor(Math.random() * 256)
          rgb.push(r)
        }
        return (
            <div class="project-swatch" style={{backgroundColor: `rgb(${rgb})`}} onClick={!this.props.isSelected ? () => this.props.selectProject(id, numStudents, name) : null} >
                <h2>{name}</h2>
                <div class='group'>
                {numStudents>=3 ? 
                users.map(student => {
                    return (
                    <p>{student.name}</p>
                    )
                })
                : null}
                </div>
            </div>
           
        )
    }
    
}
// const mapStateToProps = state => ({
//     // projects: state.project
//   })
//   const mapDispatchToProps = dispatch => ({
   
//   })

//   export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
export default SingleProject