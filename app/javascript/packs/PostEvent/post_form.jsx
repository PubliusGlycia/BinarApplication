import React from 'react'
import axios from 'axios'

export default class PostForm extends React.Component{
    state={
        category: "",
        importance: "",
        title: "",
        description: "",
        images: [],
        titleError: "",
        descriptionError: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('post_event[title]', this.state.title)
        data.append('post_event[description]', this.state.description)
        data.append('post_event[category]', this.state.category)
        data.append('post_event[importance]', this.state.importance)
        data.append('image[]', this.state.images[0])
        data.append('image[]', this.state.images[1])

        axios.post("/post_events.json", data, 
        {headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }})
    }

    handleCategoryChange = (e) =>{
        this.setState({category: e.target.value})
    }

    handleImportanceChange = (e) =>{
        this.setState({importance: e.target.value})
    }

    validateTitle = () =>{
        this.setState(state => {
            return {titleError:
                state.title.lenght > 30 ? null : 'Tytuł nie może być dłuższy niż 30 znaków'}
        });
    }

    validateDescription = () =>{
        this.setState(state => {
            return {descriptionError:
                state.description.lenght > 300 ? null : 'Opis nie może być dłuższy niż 300 znaków'}
        });
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <select value={this.state.category} onChange={this.handleCategoryChange}>
                    <option value="defect">defect</option>
                    <option value="supply">supply</option>
                    <option value="others">others</option>
                </select>
                <select value={this.state.importance} onChange={this.handleImportanceChange}>
                    <option value="important">important</option>
                    <option value="medium">medium</option>
                    <option value="small">small</option>
                </select>
                <input
                    type="text"
                    placeholder='Enter title'
                    value={this.state.title}
                    onChange={e =>{
                        this.setState({title: e.target.value},
                        this.validateTitle())
                }} />
                <input
                    type="text"
                    placeholder='Enter description'
                    value={this.state.description}
                    onChange={e =>{
                        this.setState({description: e.target.value},
                        this.validateDescription())
                }}
                />
                <input 
                    type="file" 
                    multiple="multiple"
                    onChange={e =>{
                        this.setState({images: e.target.files})
                    }}/>
                <input type="submit" value="save"/>
            </form>
        )
    }
}


