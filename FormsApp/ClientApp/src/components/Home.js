import React, { Component, useState } from 'react';

function App() {
    const [values, setValues] = useState({
        name: "",
        subject: "",
        contact: "",
        email: "",
        message: ""
    });

    let handleSubmit = async (e) => {
        e.preventDefault();
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
            console.log(res);
            let resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
                setValues({ ...values, name: "", email: "" })
                console.log("User created successfully");
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    let inputHadle = (name, value) => {
        console.log(name);
        console.log(value);
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
                                onChange={(e) => inputHadle(e.target.name, e.target.value)}
                            />
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
                                onChange={(e) => inputHadle(e.target.name, e.target.value)}
                            />
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
                                onChange={(e) => inputHadle(e.target.name, e.target.value)}
                            />
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
                                onChange={(e) => inputHadle(e.target.name, e.target.value)}
                            />
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




        //<div className="App">
        //    <form onSubmit={handleSubmit}>
        //        <input
        //            type="text"
        //            value={values.name}
        //            placeholder="Nome"
        //            onChange={(e) => inputHadle(e.target.name, e.target.value)}
        //        />
        //        <input
        //            type="text"
        //            value={values.email}
        //            placeholder="Email"
        //            onChange={(e) => inputHadle(e.target.name, e.target.value)}
        //        />
        //        <input
        //            type="text"
        //            value={values.contact}
        //            placeholder="Mobile Number"
        //            onChange={(e) => inputHadle(e.target.name, e.target.value)}
        //        />
        //        <button type="submit">Create</button>
        //    </form>
        //</div>
    );
}

export default App;

//export default Home;

//export class Home extends Component {
//    static displayName = Home.name;

//    constructor(props) {
//        super(props);
//        this.state = {
//            name: "Ola",
//            subject: "",
//            contact: "",
//            email: "",
//            message: "",
//            isValid: false,
//        };
//    }

//    async onSubmit(event) {
//        event.preventDefault();
//        console.log(this.name);
//        try {
//            let res = await fetch("https://localhost:44479/forms/create", {
//                method: "POST",
//                body: JSON.stringify({
//                    name: this.state.name,
//                    subject: this.state.subject,
//                    contact: this.state.contact,
//                    email: this.state.email,
//                    message: this.state.message,
//                }),
//            });
//            console.log(res);
//            let resJson = await res.json();
//            if (res.status === 200) {
//                this.setState({
//                    name: "",
//                    email: ""
//                });
//                console.log("User created successfully");
//            } else {
//                console.log("Some error occured");
//            }
//        } catch (err) {
//            console.log(err);
//        }
//    }

//    handleNameChange = (e) => {
//        this.setState({
//            name: e.target.value
//        });
//    }

//    handleSubjectChange = (e) => {
//        this.setState({
//            subject: e.target.value
//        });
//    }

//    handleContactChange = (e) => {
//        this.setState({
//            contact: e.target.value
//        });
//    }

//    handleEmailChange = (e) => {
//        this.setState({
//            email: e.target.value
//        });
//    }

//    handleMessageChange = (e) => {
//        this.setState({
//            message: e.target.value
//        });
//    }

//    render() {
//        return (
//            <div className="form-container container">
//                <form onSubmit={this.onSubmit}>
//                    <div className="row">
//                        <div className="col-12 col-md-6">
//                            <div className="mb-3">
//                                <label className="form-label">Nome</label>
//                                <input type="text" className="form-control" name="name" onChange={this.handleNameChange} />
//                            </div>
//                        </div>
//                        <div className="col-12 col-md-6">
//                            <div className="mb-3">
//                                <label className="form-label">Assunto</label>
//                                <input type="text" className="form-control" name="subject" onChange={this.handleSubjectChange} />
//                            </div>
//                        </div>
//                        <div className="col-12 col-md-6">
//                            <div className="mb-3">
//                                <label className="form-label">Contacto</label>
//                                <input type="text" className="form-control" name="contact" onChange={this.handleContactChange} />
//                            </div>
//                        </div>
//                        <div className="col-12 col-md-6">
//                            <div className="mb-3">
//                                <label className="form-label">Email</label>
//                                <input type="email" className="form-control" name="email" onChange={this.handleEmailChange} />
//                            </div>
//                        </div>
//                        <div className="col-12">
//                            <div className="mb-3">
//                                <textarea name="message" className="form-control" rows="3" onChange={this.handleMessageChange}></textarea>
//                            </div>
//                        </div>
//                        <div className="col-12 col-md-6">
//                            <div className="mb-3 form-check">
//                                <input type="checkbox" className="form-check-input" />
//                                <label className="form-check-label">Check me out</label>
//                            </div>
//                        </div>
//                    </div>
//                    <button type="submit" className="btn btn-primary">Enviar</button>
//                </form>
//            </div>
//        );
//    }
//}
