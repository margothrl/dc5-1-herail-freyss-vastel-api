//Nous récupérons les données présentes dans le local Storage, puis nous les convertissons au format JS 
let fromJS = JSON.parse(window.localStorage.getItem('idJSON'))

// Séléction de la classe dans laquelle l'HTML vas être injecté
const addHTML = document.querySelector('#cart__items')

/* Si le panier est vide : affichage du message contenu dans la const emptyBasketMessage (l.14 à 20)
/* Si le panier n'est pas vide, alors : 
     - Nous initions structureProduitPanier, un tableau vide
     - Puis nous initions une boucle for sur la longueur de fromJS
     - Pour chaque i de fromJS, nous ajoutons à structureProduitPanier les éléments HTML correspondants
     - Pour finir, lorsque nous arrivons au dernier i de fromJS, alors nous injectons structureProduitPanier dans l'HTML 
    */
if (fromJS === null){
  const emptyBasketMessage = `
    <div style = "padding-top: 90px; display: flex; text-align: center; place-content: center;">
        <div>Votre panier est vide ! N'hésitez pas à le meubler...</div>
    </div>
    `
  addHTML.innerHTML = emptyBasketMessage
} else {
  let structureProduitPanier = []
  for (i = 0; i < fromJS.length; i++) {
    structureProduitPanier =
      structureProduitPanier +
      `<article class="cart__item" data-id="${fromJS[i].selectedProduct_id}" data-color="${fromJS[i].option_produit}">
              <div class="cart__item__img">
                <img src="${fromJS[i].image}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${fromJS[i].name}</h2>
                  <p>${fromJS[i].option_produit}</p>
                  <p class = "item_price">€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div id="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${fromJS[i].quantite}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <button class="deleteItem">Supprimer</button>
                  </div>
                </div>
              </div>
            </article>  `
  }
  if (i === fromJS.length) {
    //Injection du HTML 
    addHTML.innerHTML = structureProduitPanier
  }
}

//LA SUPPRESSION DE PRODUIT
// Nous ciblons l'élément à supprimer grâce à la méthode element.closest
// Nous attendons que l'HTML soit injecté 
// Boucle forEach afin de pouvoir écouter le click sur chacun des bouttons "SUPPRIMER"
//Nous ajoutons les produits à conserver au tableau someProduct, grace à la méthode filter
//Enfin, nous mettons à jour le local storage;
let someProduct = []
const removeProduct = async (addHTML) => {
  await addHTML
  let deleteButtons = document.querySelectorAll('.deleteItem')
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      let totalToRemove = fromJS.length
      let closestData = deleteButton.closest('article')
      if (totalToRemove == 1) {
        return (
          localStorage.removeItem('idJSON'),
          alert('Votre panier est désormais vide'),
          (window.location.href = '../html/cart.html')
        )
      } else {
        someProduct = fromJS.filter((produit) => {
          if (
            closestData.dataset.id != produit.selectedProduct_id ||
            closestData.dataset.color != produit.option_produit
          ) {
            return true
          }
        })
        localStorage.setItem('idJSON', JSON.stringify(someProduct))
        alert('Ce produit a supprimé du panier')
        window.location.href = '../html/cart.html'
      }
    })
  })
}
removeProduct()

changeQuantity()

/* LE NOMBRE TOTAL DE PRODUIT :
A) Si from JS nous retourne une valeur, alors : 
B) Nous initions la fonction callbackTotalProducts, nous servant à récupérer les produits présent dans le panier
C) Puis nous récupérons les quantités de chacun des produit via la const result 
D) Nous initions ensuite totalQuantity, à laquelle nous attribuons une valeur de 0, puis nous initions une boucle
   for, dans laquelle nous additionnons au sein de totalQuantity chacun des nombres stockés dans result
E) Nous injectons la valeur de totalQuantity dans le HTML 
*/

if (fromJS) {
  function callbackTotalProducts(arr, callback) {
    let newArr = []
    for (i = 0; i < arr.length; i++) {
      newArr.push(callback(arr[i]))
    }
    return newArr
  }
  const result = callbackTotalProducts(fromJS, (val) => {
    return val.quantite
  })
  totalQuantity = 0
  for (i = 0; i < result.length; i++) {
    totalQuantity += result[i]
  }
  const totalProducts = document.getElementById('totalQuantity')
  totalProducts.innerHTML = totalQuantity
} else {
  const totalProducts = document.getElementById('totalQuantity')
  totalProducts.innerHTML = totalQuantity = 0
}


//Affichage DU PRIX UNITAIRE
//Si fromJS nous retourne une valeur 
//Alors nous récupérons les données au sein de l'API 
//Nous convertissons ensuite ces données au format JS, que nous stockons dans "data" 
//Puis nous initions une boucle for sur la longueur du tableau fromJS 
//Au sein de cette boucle, nous appliquons la méthode .find afin que l'élément correspondant à l'ID du produit présent dans fromJS nous soit retourné
//Pour finir, injectons dans le HTML le prix du produit retourné par find  
if (fromJS) {
  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((res) => {
      data = res
      for (i = 0; i < fromJS.length; i++) {
        let getPrice = document.getElementsByClassName('item_price')
        fetchedProduct = data.find(
          (element) => element._id === fromJS[i].selectedProduct_id,
        )
        addPrice = (getPrice[i].innerHTML =
          fetchedProduct.price + ' €')
      }
    })
}

/// LE FORMULAIRE
//Nous commençons par récupérer tous les inputs  startDate: valueDébut,endDate: valueFin,budget: valueBudget 
let id = document.getElementById('valueId')
let name = document.getElementById('valueName')
let description = document.getElementById('valueDescription')
let startDate = document.getElementById('valueDébut')
let endDate = document.getElementById('valueFin')
let budget = document.getElementById('valueBudget')


//Création d'un objet dans lequel nous stockerons les valeurs présentes dans les input
let valueIDd, valueName, valueDescription, valueDébut, valueFin, valueBudget

//LES REGEX
//Toutes basées sur des conditions. Tant que les informations renseignées par l'utilisateur ne correspondant pas à ce qui est demandé, la  

const nameOrSurname_LengthError = 'La valeur de ce champ doit être comprise entre 2 et 25 caractères'
const adressLengthError = "La valeur de ce champ doit être comprise entre 2 et 50 caractères"
const numberNotAllowed = 'Aucun chiffre ne peut être renseigné dans ce champ'

function checkNameAndSurname(Nom){
   if(Nom.value.match(/^[a-z A-Z éèèuàaêô -]{2,25}$/)){
      return true;
   }else{
       return false
   }
}

  // //1- Le prénom
prenom.addEventListener('input', function (e) {
  checkNameAndSurname(prenom)
  if (checkNameAndSurname(prenom) === false){    
    firstNameErrorMsg.innerHTML = nameOrSurname_LengthError
  }else{
    firstNameErrorMsg.innerHTML = ''
    valuePrenom = e.target.value
  }
})


//2- Le Nom
nom.addEventListener('input', function (e) {
  checkNameAndSurname(nom)
  if (checkNameAndSurname(nom) === false){    
    lastNameErrorMsg.innerHTML = nameOrSurname_LengthError
  }else{
      lastNameErrorMsg.innerHTML = ''
      valueNom = e.target.value
    }
})

//L'adresse
adresse.addEventListener('input', function (e) {
  if (e.target.value.length === 0) {
    valueAdresse = null
  } else if (e.target.value.length < 2 || e.target.value.length > 50) {
    addressErrorMsg.innerHTML = adressLengthError
    valueAdresse = null
  }
  if (e.target.value.match(/^[0-9 a-z A-Z éèèuàaêô ,/;:-]{2,50}$/)) {
    addressErrorMsg.innerHTML = ''
    valueAdresse = e.target.value
  }
})

//La ville
ville.addEventListener('input', function (e) {
  if (e.target.value.length === 0) {
    valueVille = null
  } else if (e.target.value.length < 2 || e.target.value.length > 50) {
    cityErrorMsg.innerHTML = adressLengthError
    valueVille = null
  }
  if (e.target.value.match(/^[a-z A-Z éèèuàaêô ,/;:-]{2,50}$/)) {
    cityErrorMsg.innerHTML = ''
    valueVille = e.target.value
  }
  if (e.target.value.match(/[0-9 +%.;]{2,45}$/)) {
    cityErrorMsg.innerHTML = 'Une ville ne peut pas contenir de chiffre'
    valueVille = null
  }
})

////LA COMMANDE
//Récupération du formulaire
let order = document.querySelector('.cart__order__form')

//Création du addEventListener sur le submit, 
order.addEventListener('submit', (e) => {
  e.preventDefault()
//Création de la reqûete à envoyer vers l'API, avec pour condition le fait que chaque input ait une valeur valide
  if (valuePrenom && valueNom && valueAdresse && valueEmail && valueVille) {
    const commandeFinal = JSON.parse(localStorage.getItem('idJSON'))
    let products = []
    commandeFinal.forEach((produit) =>
      products.push(produit.selectedProduct_id),
    )
    //Création de l'objet "campaign", qui sera ensuite transmis au serveur via la méthod POST, au sein de la const promise 
    const toSend = {
      contact: {
        id: valueId,
        name: valueNom,
        description: valueDescription,
        startDate: valueDébut,
        endDate: valueFin,
        budget: valueBudget
      },
    
    }
      //Application de la méthode POST
      const promise = fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend),
    })
    
    //Une fois que promise a été executée, nous enclenchons response, contenant le bloc try. Ce dernier ne comprend qu'une instruction. 
    //Si le statut de response est ok, alors nous redirigeons l'utilisateur vers la page confirmation, à laquelle nous passons contenu.orderId en paramètre d'URL
    promise.then(async (response) => {
      try {
        const contenu = await response.json()
        if (response.ok){
          //Changement de page, avec ajout de l'élément OrderId à l'URL
          window.location = `../html/confirmation.html?${contenu.orderId}`
          return contenu.orderId
        }
      } catch (e) {
      }
    })
  } else {
    alert('Remplir le formulaire correctement')
  }
})