//Nous récupérons les données présentes dans le local Storage, puis nous les convertissons au format JS 
let fromJS = JSON.parse(window.localStorage.getItem('idJSON'))

// Séléction de la classe dans laquelle l'HTML vas être injecté
const addHTML = document.querySelector('#cart__items')

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

//Date de fin
end.addEventListener('input', function (e) {
  if (e.target.value.match(/[0-9 +%.;]{2,45}$/)) {
    cityErrorMsg.innerHTML = ''
    valueStart = e.target.value
  }
})

//Budget
budget.addEventListener('input', function (e) {
  if (e.target.value.match(/[0-9 +%.;]{2,45}$/)) {
    cityErrorMsg.innerHTML = ''
    valueStart = e.target.value
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