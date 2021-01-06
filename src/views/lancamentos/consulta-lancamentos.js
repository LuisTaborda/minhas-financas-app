import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from '../../app/services/lancamentoService'
import LocalStorageService from '../../app/services/localStorageService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

class ConsultaLancamentos extends React.Component{

    state = {
        ano : '',
        mes : '',
        tipo: '',
        descricao: '',
        showConfirmDialog : false,
        lancamentoDeletar : [],
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog : true, lancamentoDeletar : lancamento})
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog : false, lancamentoDeletar : {} })

    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id).then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1)
            this.setState({lancamentos : lancamentos, showConfirmDialog : false})

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
                const lista = response.data
                if(lista.length < 1){
                    messages.mensagemAlerta("Nenhum resultado encontrado.")
                }
                this.setState({lancamentos : lista})
        }).catch(error =>{
            console.log(error)
        })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
        .then( response => {
            const lancamentos = this.state.lancamentos
            const index  =lancamentos.indexOf(lancamento)
            if(index !== -1){
                lancamento['status'] = status
                lancamentos[index] = lancamento
                this.setState({lancamento})
            }
            messages.mensagemSucesso("Status atualizado com sucesso!")
        })
        .catch()
    }

    render(){
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
                <div>
                    <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} autoFocus />
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
                </div>
        )
    

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

                            <button type="button" className="btn btn-success" onClick={this.buscar}>
                                <i className="pi pi-search"/> Buscar</button>
                            <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger">
                                <i className="pi pi-plus"/> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                            lancamentos={this.state.lancamentos} 
                            deleteAction={this.abrirConfirmacao} 
                            editAction={this.editar}
                            alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{ width: '50vw' }} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog : false})}
                            footer={confirmDialogFooter}>
                        <p>Tem certeza que deseja excluir este lançamento?</p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)