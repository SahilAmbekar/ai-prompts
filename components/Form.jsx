import React from 'react'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full">
        <h1 className="head_text">
            <span className='blue_gradient '> {type} Post </span>
        </h1>
    </section>
  )
}

export default Form