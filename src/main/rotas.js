import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import { Route, Switch, HashRouter } from 'react-router-dom' 

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuario" component={CadastroUsuario}></Route>
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rotas;