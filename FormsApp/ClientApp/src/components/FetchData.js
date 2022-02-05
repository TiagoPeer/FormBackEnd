import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forms: [], loading: true };
    }

    componentDidMount() {
        this.populateFormsData();
    }

    static renderFormsTable(forms) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Data criação</th>
                        <th>Nome</th>
                        <th>Assunto</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map(form =>
                        <tr key={form.Id}>
                            <td>{form.CreationDate}</td>
                            <td>{form.Name}</td>
                            <td>{form.Subject}</td>
                            <td>{form.Email}</td>
                            <td><span onClick={ }>Marcar como visto</span></td>
                            <td>Marcar como respondido</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>A carregar...</em></p>
            : FetchData.renderFormsTable(this.state.forms);

        return (
            <div>
                <h1 id="tabelLabel" >Formularios enviados</h1>
                <p>Aqui pode ver os formularios já enviados.</p>
                {contents}
            </div>
        );
    }

    async populateFormsData() {
        const response = await fetch('/forms/get-forms');
        const data = await response.json();
        this.setState({ forms: JSON.parse(data.message), loading: false });

        this.state.forms.map(form => console.log(form));
    }
}
