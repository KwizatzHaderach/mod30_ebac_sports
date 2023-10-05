import { useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'

import * as S from './styles'
import { RootReducer } from '../store'
import { useGetJogosQuery } from '../services/api'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetJogosQuery()

  const itensFavoritos = useSelector(
    (state: RootReducer) => state.favoritos.itens
  )

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = itensFavoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
