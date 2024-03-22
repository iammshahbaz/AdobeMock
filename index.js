let container = document.getElementById("container")


async function fetchData(page){
    try {
        let res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page||1}&_limit=10`);
        let data = await res.json();
        console.log(data)
        appendData(data)
    } catch (error) {
        console.log(error)
    }

}
// fetchData()

function appendData(data){
    data.forEach(item => container.append(createCard(item)));
    flag= true;
  }


function createCard(item){
    const card = document.createElement('div')
    card.classList.add('card')

    card.addEventListener('click', () => openModal(item));


    const serial  = document.createElement("h2");
    serial.textContent = item.id;
    card.appendChild(serial)

    const title  = document.createElement('p');
    title.textContent = item.body;
    card.appendChild(title)

    return card;
}

 fetchData()

let page =1;
let flag = true;



window.addEventListener('scroll',async()=>{
    
  
        let{clientHeight,scrollTop,scrollHeight} = document.documentElement;
        console.log(clientHeight,scrollHeight,scrollTop)

    if(clientHeight-scrollHeight<=Math.ceil(scrollTop)&& flag){
        console.log("we have reached bottom")
        page++;
       await fetchData(page)    
        flag=false;
        
    }
 
    
})

//modal

function openModal(item) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalEmail = document.getElementById('modal-email');
    const modalBody = document.getElementById('modal-body');
    modalTitle.textContent =`Username: ${item.name}` ;
    modalEmail.textContent = `Email: ${item.email}`;
    modalBody.textContent = item.body;
    modal.style.display = 'flex';
  }

  function onCloseModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
