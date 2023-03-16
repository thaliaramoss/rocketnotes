// hooks personalizados que centralizam a lógica de utilização de contextos
import { createContext, useContext, useState, useEffect} from "react";

import {api} from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({children}) {
  const [data, setData] = useState({})

  async function signIn({email, password}){ // com {} => não há obrigatoriedade de ordem no preenchimento dos dados

    try {
      const response = await api.post("/sessions", {email, password})
      const {user, token } = response.data
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}` // inserido um token do tipo Bearer de autenticação no cabeçalho por padrão de todas as requisições feitas pelo usuário
      setData({user, token})

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      localStorage.setItem("@rocketnotes:token", token)

    } catch (error) {
      if (error.response){
        alert(error.response.data.message)
      } else {
        alert("Não foi possível autenticar-se")
      }
    }
  } 

  function signOut() {
    localStorage.removeItem("@rocketnotes:token")
    localStorage.removeItem("@rocketnotes:user")

    setData({})
  }

  async function updateProfile({user, avatarFile}) {
    try {
      

      if(avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar
      }

      await api.put("/users", user)
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

      setData({user, token: data.token})
      alert("Perfil atualizado com sucesso")

    } catch (error) {
      if (error.response){
        alert(error.response.data.message)
      } else {
        alert("Não foi possível atualizar o perfil")
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")

    if(token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({
        token,
        user: JSON.parse(user)
      })
    }

  }, [])

  return (
    <AuthContext.Provider value={{
      signIn, 
      user: data.user,
      signOut,
      updateProfile
      }}>
      {children} 
    </AuthContext.Provider>
  )
}
// children = rotas da aplicação

function useAuth(){
  const context = useContext(AuthContext)

  return context
}

export {AuthProvider, useAuth}