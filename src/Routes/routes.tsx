import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Admin'
import Erro from '../Pages/Erro/erro'
import Funcionario from '../Pages/Funcionario/Funcionario'
import { Casket } from '../Shared/Casket/Casket';



function Rotas() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Login/>} />
                <Route path='/login' element={<Login />} />

                <Route element={<Casket />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/funcionario' element={<Funcionario />} />


                </Route>

                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;