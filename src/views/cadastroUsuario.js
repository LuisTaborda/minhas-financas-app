import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () =>{
        console.log(this.state)
    }

    render(){
        return(
                <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input className="form-control" type="text" id="inputNome" name="nome" onChange={e => this.setState({nome: e.target.value})}/>                           
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input className="form-control" type="email" id="inputEmail" name="email" onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input className="form-control" type="password" id="inputSenha" name="senha" onChange={e => this.setState({senha: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input className="form-control" type="password" id="inputRepitaSenha" name="senha" onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                            </FormGroup>

                            <button type="button" className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
                            <button type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
                </Card>
        )
    }
}

export default CadastroUsuario