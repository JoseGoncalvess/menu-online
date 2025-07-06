const destaqeuPod = document.getElementById('grid-produtos')
const closeModalBtn = document.getElementById('closeModalBtn')
const mySimpleModal = document.getElementById('mySimpleModal')
// função usada para carregaar os dados do produto
function loadData() {
  return fetch('../assets/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON: ' + response.statusText)
      }
      return response.json()
    })
    .then(data => {
      return data
    })
}

// função que criar o modelo de pordutos para ser usando em tela
function createdProd(title, description, img, altText, price, idprod) {
  var titleProd = document.createElement('h3')
  titleProd.textContent = title

  var precoProd = document.createElement('p')
  precoProd.classList.add('preco')
  precoProd.textContent = price

  var descption = document.createElement('p')
  descption.classList.add('description')
  descption.textContent = description

  var imgProd = document.createElement('img')
  imgProd.src = img
  imgProd.alt = title
  imgProd.width = '400px'

  var btndata = document.createElement('button')
  btndata.classList.add('btn-ver')
  btndata.innerText = 'Ver Mais'
  btndata.addEventListener('click', () => {
    showProdDetatil(idprod)
  })

  var produto = document.createElement('div')

  produto.appendChild(imgProd)
  produto.appendChild(titleProd)
  produto.appendChild(descption)
  produto.appendChild(precoProd)
  produto.appendChild(btndata)

  produto.classList.add('item-produto')

  return produto
}
// função resposnavel opr criar o cardapio em tela após carregar os pordutos
async function createdProdDestaque(category) {
  var prods = await loadData()
  destaqeuPod.innerHTML = ''
  prods.forEach(p => {
    if (category != null) {
      if (p.category === category) {
        var newprod = createdProd(
          p.name,
          p.description,
          p.img,
          p.name,
          p.price,
          p.id
        )
        destaqeuPod.appendChild(newprod)
      }
    } else {
      var newprod = createdProd(
        p.name,
        p.description,
        p.img,
        p.name,
        p.price,
        p.id
      )
      destaqeuPod.appendChild(newprod)
    }
  })
}

async function showProdDetatil(idProd) {
  console.log(idProd)
  var prods = await loadData()
  mySimpleModal.innerHTML = ` <div class="modal-content">
          <img src="${prods[idProd].img}" alt="${prods[idProd].name}">
            <div class="modal-prod">
              <h2>${prods[idProd].name}</h2>
            <p>${prods[idProd].description}</p>
            <button id="closeModalBtn">OK</button>
            </div>
        </div>`

  openModal()

  const closeBtn = document.getElementById('closeModalBtn')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal()
    })
  }
}

function openModal() {
  if (mySimpleModal) {
    // mySimpleModal.style.display = 'flex'; // Forma direta
    mySimpleModal.classList.add('is-visible') // Usando a nova classe CSS
  }
}

function closeModal() {
  if (mySimpleModal) {
    // mySimpleModal.style.display = 'none'; // Forma direta
    mySimpleModal.classList.remove('is-visible') // Removendo a nova classe CSS
  }
}

// Aguarda carrar o documento para poder efetuar as ações
document.addEventListener('DOMContentLoaded', () => {
  // Ações od modal
  if (mySimpleModal) {
    mySimpleModal.addEventListener('click', event => {
      if (event.target === mySimpleModal) {
        closeModal()
      }
    })

    document.addEventListener('keydown', event => {
      if (
        event.key === 'Escape' &&
        mySimpleModal.classList.contains('is-visible')
      ) {
        closeModal()
      }
    })
  }

  // filtro pro categoria de porduto
  const btsCategory = document.querySelector('.category-buttons')
  btsCategory.addEventListener('click', event => {
    destaqeuPod.innerHTML = `<h2>CARREGANDO...</h2>` // simulação de loading
    const clickedButton = event.target
    if (clickedButton.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active')
      })
    }
    // acção de filtro dos produtos ao clicar na categoria
    clickedButton.classList.add('active')
    const selectedCategory = clickedButton.dataset.category
    if (selectedCategory === 'Todos') {
      createdProdDestaque()
    } else {
      createdProdDestaque(selectedCategory)
    }
  })
})

// carregamento de todos os pordutos ao iniciar
createdProdDestaque()
