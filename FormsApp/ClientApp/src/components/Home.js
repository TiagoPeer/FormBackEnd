import React, { Component, useState } from 'react';

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
        this.getForms();
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

        if (values.name === '') {
            this.setState({ errorName: "O nome é obrigatório" });
            valid = false;
        }

        if (values.subject === '') {
            this.setState({ errorSubject: "O assunto é obrigatório" });
            valid = false;
        }

        if (values.contact === '') {
            this.setState({ errorContact: "O contacto é obrigatório" });
            valid = false;
        }

        if (values.email === '') {
            this.setState({ errorEmail: "O email é obrigatório" });
            valid = false;
        }

        if (valid) {
            try {
                let res = await api.post("/create", {
                    name: values.name,
                    subject: values.subject,
                    contact: values.contact,
                    email: values.email,
                    message: values.message,
                }).then(({ data }) => data);
                console.log(data);
                if (res.status === 200) {
                    this.resetValues();
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    inputHadle = (name, value) => {
        setValues({ ...values, [name]: value })
    }

    render() {
        return (
            <div className="form-container container" >
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={values.name}
                                    placeholder="Nome"
                                    name="name"
                                    required="required"
                                    onChange={(e) => inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{errors.name}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Assunto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={values.subject}
                                    placeholder="Assunto"
                                    name="subject"
                                    required="required"
                                    onChange={(e) => inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{errors.subject}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Contacto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={values.contact}
                                    placeholder="Contacto"
                                    name="contact"
                                    required="required"
                                    onChange={(e) => inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{errors.contact}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={values.email}
                                    placeholder="Email"
                                    name="email"
                                    required="required"
                                    onChange={(e) => inputHadle(e.target.name, e.target.value)}
                                />
                                <span>{errors.email}</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="3"
                                    value={values.message}
                                    onChange={(e) => inputHadle(e.target.name, e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" required="required" />
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
