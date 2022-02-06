import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: `https://localhost:44479/forms`
});

export class FetchData extends Component {

    state = {
        forms: [],
        loading: false
    }

    constructor(props) {
        super(props);
        this.getForms();
    }

    getForms = async () => {
        try {
            let data = await api.get("/get-forms").then(({ data }) => data);
            this.setState({ forms: JSON.parse(data.message), loading: false });
        } catch (error) {
            console.log(error);
        }
    }

    markAsReaded = async (id) => {
        console.log(id);
        try {
            await api.put("/mark-as-readed/" + id).then(res => {
                this.getForms();
            });
        } catch (err) {
            console.log(err);
        }
    }

    markAsAnswered = async (id) => {
        try {
            await api.put("/mark-as-answered/" + id).then(res => {
                this.getForms();
            });
        } catch (err) {
            console.log(err);
        }
    }

    deleteForm = async (id) => {
        try {
            await api.delete(`delete/${id}`);
            this.getForms();
        } catch (error) {
            console.log(error);
        }
    }

    renderFormsTable = (forms) => {
        return (
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Data criação</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Assunto</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form.Id}>
                            <td>{form.Id}</td>
                            <td>{form.CreationDate}</td>
                            <td>{form.Name}</td>
                            <td>{form.Subject}</td>
                            <td>{form.Email}</td>
                            <td>
                                <span onClick={() => this.markAsReaded(form.Id)}>{form.Readed ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}</span>
                                <span onClick={() => this.markAsAnswered(form.Id)}>{form.Answered ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</span>
                                <span onClick={() => this.deleteForm(form.Id)}><i className="fas fa-trash"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading ? (
            <p>
                <em>A carregar...</em>
            </p>
        ) : (
            this.renderFormsTable(this.state.forms)
        );

        return (
            <div>
                <h1 id="tabelLabel">Formulários enviados</h1>
                <p>Aqui pode ver os formulários já enviados.</p>
                {contents}
            </div>
        );
    }
}
