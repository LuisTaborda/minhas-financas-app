import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from '../../app/services/lancamentoService'
import LocalStorageService from '../../app/services/localStorageService'

import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    state = {
        ano : '',
        mes : '',
        tipo: '',
        descricao: '',
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    editar = (id) => {
        console.log('editando lançamento ',id)
    }

    deletar = ( lancamento ) => {
        this.service.deletar(lancamento.id).then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)
            lancamentos.splice(index, 1)
            this.setState(lancamentos)
            
            messages.mensagemSucesso('Lançamento deletado com sucesso!')
        }).catch(eror => {
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento, tente novamente mais tarde.')
        })
    }
    buscar = () =>{
        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo ano é obrigatório!');
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuarioLogado')

        const lancamentoFiltro = {
            ano : this.state.ano,
            mes : this.state.mes,
            tipo : this.state.tipo,
            descricao : this.state.descricao,
            usuario: usuarioLogado.id
        } 
        
        this.service
            .consultar(lancamentoFiltro)
            .then( response =>{ 
                this.setState({lancamentos : response.data})
        }).catch(error =>{
            console.log(error)
        })
    }

    render(){
        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipos();

        return(
            <Card title="Consula Lançamento">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" id="inputAno" 
                                value={this.state.ano} onChange={e => this.setState({ano : e.target.value})} 
                                placeholder="Digite o ano"/>
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes" className='form-control' lista={meses}
                                value={this.state.mes} onChange={e => this.setState({mes : e.target.value})} 
                                />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text" className="form-control" id="inputAno" 
                                value={this.state.descricao} onChange={e => this.setState({descricao : e.target.value})} 
                                placeholder="Digite a descrição"/>
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo" className='form-control' lista={tipos}
                                value={this.state.tipo} onChange={e => this.setState({tipo : e.target.value})} />
                            </FormGroup>

                            <button type="button" className="btn btn-success" onClick={this.buscar}>Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.deletar} editAction={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)