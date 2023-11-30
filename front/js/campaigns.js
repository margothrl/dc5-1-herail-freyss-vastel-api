//Nous récupérons les données présentes dans le local Storage, puis nous les convertissons au format JS 
let fromJS = JSON.parse(window.localStorage.getItem('idJSON'))

// Séléction de la classe dans laquelle l'HTML vas être injecté
const addHTML = document.querySelector('#cart__items')

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

/// LE FORMULAIRE
//Nous commençons par récupérer tous les inputs 
let id = document.getElementById('id')
let name = document.getElementById('name')
let description = document.getElementById('description')
let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')
let budget = document.getElementById('budget')


//Création d'un objet dans lequel nous stockerons les valeurs présentes dans les input
let valueId, valueName, valueDescription, valueStart, valueEnd, valueBudget

//LES REGEX
//Toutes basées sur des conditions. Tant que les informations renseignées par l'utilisateur ne correspondant pas à ce qui est demandé, la  

const nameOrDescription_LengthError = 'La valeur de ce champ doit être comprise entre 2 et 25 caractères'
const adressLengthError = "La valeur de ce champ doit être comprise entre 2 et 50 caractères"
const numberNotAllowed = 'Aucun chiffre ne peut être renseigné dans ce champ'

function checkNameAndSurname(Nom){
   if(Nom.value.match(/^[a-z A-Z éèèuàaêô -]{2,25}$/)){
      return true;
   }else{
       return false
   }
}


//Le Nom
nom.addEventListener('input', function (e) {
  checkName(nom)
  if (checkNameOrDescription(nom) === false){    
    lastNameErrorMsg.innerHTML = nameOrDescription_LengthError
  }else{
      lastNameErrorMsg.innerHTML = ''
      valueName = e.target.value
    }
})

//Description
description.addEventListener('input', function (e) {
  checkNameAndSurname(nom)
  if (checkNameAndSurname(nom) === false){    
    lastNameErrorMsg.innerHTML = nameOrSurname_LengthError
  }else{
      lastNameErrorMsg.innerHTML = ''
      valueName = e.target.value
    }
})

//Date de début
start.addEventListener('input', function (e) {
  if (e.target.value.match(/[0-9 +%.;]{2,45}$/)) {
    cityErrorMsg.innerHTML = ''
    valueStart = e.target.value
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
let order = document.querySelector('.campaigns__order__form')

//Création du addEventListener sur le submit, 
order.addEventListener('submit', (e) => {
  e.preventDefault()
//Création de la reqûete à envoyer vers l'API, avec pour condition le fait que chaque input ait une valeur valide
  if (valueId && valueName && valueDescription && valueStart && valueEnd && valueBudget) {
    const commandeFinal = JSON.parse(localStorage.getItem('idJSON'))
    let products = []
    commandeFinal.forEach((produit) =>
      products.push(produit.selectedProduct_id),
    )
    //Création de l'objet "campaign", qui sera ensuite transmis au serveur via la méthod POST, au sein de la const promise 
    const toSend = {
      campaign: {
        id: valueId,
        name: valueName,
        description: valueDescription,
        startDate: valueStart,
        endDate: valueEnd,
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