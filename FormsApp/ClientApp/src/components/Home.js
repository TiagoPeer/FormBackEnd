import React, { useState } from 'react';

function Home() {
    const [values, setValues] = useState({
        name: "",
        subject: "",
        contact: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        subject: "",
        contact: "",
        email: "",
        message: ""
    });

    let handleFocus = (name) => {
        setErrors({ ...errors, [name]: '' })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (values.name === '') {
            setErrors({ ...errors, name: "O nome é obrigatório" });
            valid = false;
        }

        if (values.subject === '') {
            setErrors({ ...errors, subject: "O assunto é obrigatório" });
            valid = false;
        }

        if (values.contact === '') {
            setErrors({ ...errors, contact: "O contacto é obrigatório" });
            valid = false;
        }

        if (values.email === '') {
            setErrors({ ...errors, email: "O email é obrigatório" });
            valid = false;
        }

        if (valid) {
            try {
                let res = await fetch("https://localhost:44479/forms/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        name: values.name,
                        subject: values.subject,
                        contact: values.contact,
                        email: values.email,
                        message: values.message,
                    }),
                });
                let resJson = await res.json();
                console.log(resJson);
                if (res.status === 200) {
                    setValues({ ...values, name: "", email: "" })
                } else {
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    let inputHadle = (name, value) => {
        setValues({ ...values, [name]: value })
    }

    return (

        <div className="form-container container">
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
                                name="message"
                                value={values.message}
                                onChange={(e) => inputHadle(e.target.name, e.target.value)}>
                            </textarea>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Check me out</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default Home;