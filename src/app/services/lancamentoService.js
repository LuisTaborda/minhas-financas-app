import ApiService from '../apiservice'

export default class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos');

    }

    consultar(lancamentoFiltro){
        
        let params = `?usuario=${lancamentoFiltro.usuario}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.ano){
            params = `${params}&ano=${lancamentoFiltro.ano}`
        }

        console.log(`${this.apiurl}/${params}`)
        return this.get(`/${params}`)
    }
}