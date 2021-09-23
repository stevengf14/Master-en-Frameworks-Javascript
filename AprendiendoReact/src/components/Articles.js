import React, { Component } from 'react';
import axios from 'axios';
import Global from '../assets/Global';
import defaultImge from '../assets/images/default.jpg';
import Momment from 'react-moment';
import 'moment/locale/es';
import {Link} from 'react-router-dom';

class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null
    }

    componentWillMount() {
        this.getArticles();
    }

    getArticles = () => {
        axios.get(this.url + "articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log(this.state);
            });
    }

    render() {
        if (this.state.articles.length >= 1) {
            var articlesList = this.state.articles.map((article, i) =>{
                return (
                    <article className="article-item" id="article-template" key={i}>
                        <div className="image-wrap">
                            {
                                article.image != null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                    <img src={defaultImge} alt={article.title} />
                                )
                            }
                            
                        </div>
    
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Momment locale="es" fromNow>{article.date}</Momment>
                        </span>
                        <Link to={"/blog/article/"+article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                );
            });
            return (
                <div id="articles">
                    {articlesList}
                </div>
            );
            
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay artículos para mostrar</h2>
                    <p>No existe contenido en esta sección</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        }

    }
}
export default Articles;