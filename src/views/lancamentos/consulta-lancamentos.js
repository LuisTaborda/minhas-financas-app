import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/services/lancamentoService'
import LocalStorageService from '../../app/services/localStorageService'

class ConsultaLancamentos extends React.Component{

    state = {
        ano : '',
        mes : '',
        tipo: '',
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () =>{

        const usuarioLogado = LocalStorageService.obterItem('_usuarioLogado')

        const lancamentoFiltro = {
            ano : this.state.ano,
            mes : this.state.mes,
            tipo : this.state.tipo,
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
        const meses = [
            {label: 'Selecione', value: ''},
            {label: 'Janeiro',   value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março',     value: 3},
            {label: 'Abril',     value: 4},
            {label: 'Maio',      value: 5},
            {label: 'Junho',     value: 6},
            {label: 'Julho',     value: 7},
            {label: 'Agosto',    value: 8},
            {label: 'Setembro',  value: 9},
            {label: 'Outubro',   value: 10},
            {label: 'Novembro',  value: 11},
            {label: 'Dezembro',  value: 12}
        ]

        const tipos = [
            {label: 'Selecione', value : ''},
            {label: 'Despesa', value : 'DESPESA'},
            {label: 'Receita', value : 'RECEITA'},
        ]

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
                            <LancamentosTable lancamentos={this.state.lancamentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)