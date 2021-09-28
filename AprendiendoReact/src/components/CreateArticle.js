import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../assets/Global';

// Forms validations and alerts

class CreateArticle extends Component{

    url = Global.url;

    titleRef =  React.createRef();
    contentRef =  React.createRef();

    state = {
        article: {},
        status: null
    };

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });
    }

    saveArticle = (event) => {
        event.preventDefault();

        // Rellenar stat con formulario
        // console.log(this.state)

        // Petición http post
        axios.post(this.url + "save", this.state.article)
        .then(res => {
            if(res.data.article){
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            } else {
                this.setState({
                    status: 'failed'
                });
            }
        });
        

    }

    render(){
        if(this.state.status === "success") {
            return <Redirect to="/blog"/>
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Artículo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Contenido</label>
                            <textarea type="text" name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Imagen</label>
                            <input type="file" name="file0"></input>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-sucess" onSubmit={this.saveArticle}></input>
                    </form>
                </section>
            </div>
        );
    }
}
export default CreateArticle;