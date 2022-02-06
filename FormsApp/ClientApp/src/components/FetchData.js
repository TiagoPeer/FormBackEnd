import React, { Component } from "react";

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forms: [], loading: true };
    }

    componentDidMount() {
        this.populateFormsData();
    }

    static async MarkAsReaded(key) {
        try {
            let res = await fetch("https://localhost:44479/forms/mark-as-readed/" + key, {
                method: "PUT",
            });
            let resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
            } else {
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async MarkAsAnswered(key) {
        try {
            let res = await fetch("https://localhost:44479/forms/mark-as-answered/" + key, {
                method: "PUT",
            });
            let resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
            } else {
            }
        } catch (err) {
            console.log(err);
        }
    }

    static renderFormsTable(forms) {
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
                                <span onClick={() => this.MarkAsReaded(form.Id)}>{form.Readed ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}</span>
                                <span onClick={() => this.MarkAsAnswered(form.Id)}>{form.Answered ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}</span>                                </td>
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
            FetchData.renderFormsTable(this.state.forms)
        );

        return (
            <div>
                <h1 id="tabelLabel">Formulários enviados</h1>
                <p>Aqui pode ver os formulários já enviados.</p>
                {contents}
            </div>
        );
    }

    async populateFormsData() {
        const response = await fetch("/forms/get-forms");
        const data = await response.json();
        this.setState({ forms: JSON.parse(data.message), loading: false });

        this.state.forms.map((form) => console.log(form));
    }
}
