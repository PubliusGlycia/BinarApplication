// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PostForm from './post_form'

class PostEvent extends React.Component{
  
  render(){
      return (
      <>
      <h1>Dodaj wydarzenie</h1>
      <PostForm />
      </>
      )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PostEvent />,
    document.body.appendChild(document.createElement('div')),
  )
})


