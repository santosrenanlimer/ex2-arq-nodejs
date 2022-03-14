const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const lista_produtos = {
  produtos: [
    { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
    { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
  ]
}

app.get('/products', (req, res, next) => {
  res.status(200).json(lista_produtos.produtos)
})

app.get('/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const productFind = lista_produtos.produtos.find(item => item.id === id)
  if (productFind) {
    res.status(200).json(productFind)
  }
  else {
    res.status(404).json({ message: "Produto não foi encontrado" })
  }
})

app.post('/products', (req, res, next) => {
  const product = req.body

  if (product && product.descricao && product.valor && product.marca) {
    let id = (lista_produtos.produtos[lista_produtos.produtos.length - 1].id) + 1
    lista_produtos.produtos.push({ id, ...product })
    res.status(201).json({ message: "Produto criado com sucesso" })
  }
  else {
    res.status(400).json({ message: "Dados do produto estão incorretos" })
  }
})

app.put('/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = req.body
  let idProductIndex = lista_produtos.produtos.findIndex(item => item.id === id)
  if (idProductIndex != -1) {
    if (product && product.descricao && product.valor && product.marca) {
      lista_produtos.produtos[idProductIndex] = { id, ...product }
      res.status(200).json({ message: "Produto alterado com sucesso" })
    } else {
      res.status(400).json({ message: "Dados do produto estão incorretos" })
    }
  } else {
    res.status(404).json({ message: "Produto não foi encontrado" })
  }
})



app.delete('/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  let idProductIndex = lista_produtos.produtos.findIndex(item => item.id === id)
  if (idProductIndex != -1) {
    lista_produtos.produtos.splice(idProductIndex, 1)
    console.log(lista_produtos.produtos)
    res.status(200).json({ message: "Produto excluído com sucesso" })
  }
  else {
    res.status(404).json({ message: "Produto não foi encontrado" })
  }
})


app.listen(port, () => {
  console.log(`Ex2 - listening on port ${port}`)
})