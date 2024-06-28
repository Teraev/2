import { reloadHead,reloadWelcome , reloadWallets,} from "/modules/script.js"


const container = document.querySelector('.container')

function reloadData() {
    container.innerHTML = ""
    reloadHead(container)
    reloadWelcome(container)
    reloadWallets(container)
  
    }
    
    reloadData()