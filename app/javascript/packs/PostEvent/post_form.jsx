import React from 'react'
import axios from 'axios'

export default class PostForm extends React.Component{
    state={
        category: "",
        importance: "",
        title: "",
        description: "",
        titleError: "",
        descriptionError: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/post_events.json", 
        {post_event: {
            title: this.state.title, 
            description:this.state.description,
            category:this.state.category,
            importance:this.state.importance}}, 
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
                
                <input type="submit" value="save"/>
            </form>
        )
    }
}


