/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map( lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor,{locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>

                    <button onClick={e => props.alterarStatus(lancamento, "EFETIVADO")}
                            disabled={lancamento.status !== 'PENDENTE'}
                            type="button" className="btn btn-success" title="Efetivar">
                            <i className="pi pi-check"/>
                    </button>

                    <button onClick={e => props.alterarStatus(lancamento, "CANCELADO")} 
                            disabled={lancamento.status !== 'PENDENTE'}
                            type="button" className="btn btn-warning" title="Cancelar">
                            <i className="pi pi-times"/>
                    </button>
                    
                    <button type="button" className="btn btn-primary" onClick={e => props.editAction(lancamento.id)} title="Editar">
                            <i className="pi pi-pencil"/>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={e => props.deleteAction(lancamento)} title="Excluir">
                            <i className="pi pi-trash"/>
                    </button>
                </td>
            </tr>
        )
    } )
   

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>               
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}