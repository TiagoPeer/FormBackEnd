import React, { Component, useState } from 'react';
import axios from "axios";

const api = axios.create({
    baseURL: `https://localhost:44479/forms`
});

export class Home extends Component {

    state = {
        name: "",
        subject: "",
        contact: "",
        email: "",
        message: "",
        errorName: "",
        errorSubject: "",
        errorContact: "",
        errorEmail: ""
    }

    constructor(props) {
        super(props);
    }

    resetValues = () => {
        this.setState({ errorName: "" });
        this.setState({ errorSubject: "" });
        this.setState({ errorContact: "" });
        this.setState({ errorEmail: "" });
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (this.state.name === '') {
            this.setState({ errorName: "O nome é obrigatório" });
            valid = false;
        }

        if (this.state.subject === '') {
            this.setState({ errorSubject: "O assunto é obrigatório" });
            valid = false;
        }

        if (this.state.contact === '') {
            this.setState({ errorContact: "O contacto é obrigatório" });
            valid = false;
        }

        if (this.state.email === '') {
            this.setState({ errorEmail: "O email é obrigatório" });
            valid = false;
        }

        if (valid) {
            try {
                let data = await api.post("/create", {
                    name: this.state.name,
                    subject: this.state.subject,
                    contact: this.state.values.contact,
                    email: this.state.values.email,
                    message: this.state.values.message,
                }).then(({ data }) => data);
                console.log(data);
                if (data.status === 200) {
                    this.resetValues();
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    inputHadle = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="form-container container" >
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    placeholder="Nome"
                                    name="name"
                                    onChange={(e) => this.inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{this.state.errorName}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Assunto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.subject}
                                    placeholder="Assunto"
                                    name="subject"
                                    onChange={(e) => this.inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{this.state.errorSubject}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Contacto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.contact}
                                    placeholder="Contacto"
                                    name="contact"
                                    onChange={(e) => this.inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{this.state.errorContact}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    placeholder="Email"
                                    name="email"
                                    onChange={(e) => this.inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{this.state.errorEmail}</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="3"
                                    value={this.state.message}
                                    onChange={(e) => this.inputHadle(e.target.name, e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label">Aceito as politicas de tratamento de dados</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        )
    }
};
