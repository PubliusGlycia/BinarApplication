import React from 'react'

export default class PostForm extends React.Component{
    state={
        id: "",
        category: "",
        importance: "",
        title: "",
        desc: "",
        titleError: "",
        descError: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleCategoryChange = (e) =>{}
    handleImportanceChange = (e) =>{}

    validateTitle = () =>{
        const {title} = this.state.title;
        this.setState({
            titleError:
                title.lenght > 30 ? null : 'Tytuł nie może być dłuższy niż 30 znaków'
        });
    }

    validateDesc = () =>{}

    render(){
        return (
            <form>
                <input
                    placeholder='Enter title'
                    value={this.state.title}
                />
            </form>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <PostForm />,
      document.body.appendChild(document.createElement('div')),
    )
  })

