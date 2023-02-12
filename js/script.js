//ELEMENTOS DO DOM e VARIAVEIS GLOBAIS

const domListaDeTasks = document.getElementById('lista-de-tasks');

//Elemento DOM para adição de tasks
const buttonAddTask = document.getElementById('button-add-task');
var inputTask = document.getElementById('input-task');
const sectionAddTask = document.getElementById('section-add-task');
const avisoExiste = document.querySelector('.aviso__existe');

//Elementos dom para edição de tasks
const modalEdit = document.getElementById('edit-task');
const inputEdit = document.getElementById('input-edit');
const buttonConfirmaEdit = document.getElementById('confirma-edit');

//Lista de tasks
let listaDeTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//----------------------------------//------------------------------//

//Carregar os elementos do localStoragem no DOM
function carregaElementos(){
    if(listaDeTasks != []){
        listaDeTasks.forEach((elemento) => {
            criaElemento(elemento.completo, elemento.task);
        })
    }
}

carregaElementos();

//Quadrado de completado
document.addEventListener('click', function(evento){
    if(evento.target.id == 'square-complete'){
        //Alterar no DOM ao ser clicado
        evento.target.classList.toggle('fa-square-check');
        evento.target.classList.toggle('fa-square');

        //Atualizar objeto da task
        let index = listaDeTasks.findIndex((elemento) => {
            return elemento.task == evento.target.parentNode.childNodes[1].innerHTML;
        });
        listaDeTasks[index].completo = listaDeTasks[index].completo === 'incompleto' ? 'completo' : 'incompleto';

        atualizaLocalStorage();
        atualizaQuantidade();
    }
})

//Criar task ao clicar botão de adicionar
document.addEventListener('click', (evento) => {
    if(evento.target.id == 'button-add-task'){
        AdicionaElemento()
    }
})

document.addEventListener('keypress', (evento) => {
    if(evento.key == 'Enter'){
        //Task que foi digitada
        AdicionaElemento();
    }
})

function AdicionaElemento() {
    inputTask = document.getElementById('input-task');
    let task = inputTask.value;

    inputTask.value = ''

    //Verificação se ela já existe na lista
    let existe = listaDeTasks.find(elemento => elemento.task == task) != undefined;
    if (existe) {
        avisoExiste.style.display = 'block';
    } else {
        criaElemento('incompleto', task);
        adicionarNoLocalStorage('incompleto', task);
        avisoExiste.style.display = 'none';
        atualizaQuantidade();
    }
}

//CRIADOR DO OBJETO TASK
function Task(complete, task){
    this.completo = complete;
    this.task = task;
}

function criaElemento(completo, task){
    let estaCompletado = completo == 'completo' ? 'fa-square-check' : 'fa-square';

    domListaDeTasks.innerHTML += `
    <li class="lista__item"><p class="item__conteudo"><i class="fa-regular ${estaCompletado} icons" id="square-complete"></i><span class="task">${task}</span></p>
    <div class="crud__icons"><i class="fa-solid fa-pen icons" id="fa-pen"></i> <i class="fa-solid fa-trash icons" id="fa-trash"></i></div></li>`;
}

function adicionarNoLocalStorage(completo, task) {
    let TaskAtual = new Task(completo, task);
    listaDeTasks.push(TaskAtual);
    atualizaLocalStorage();
}


//DELETE
document.addEventListener('click', function(evento){
    if(evento.target.id == 'fa-trash'){
        //REMOVIDO DO DOM
        evento.target.parentNode.parentNode.parentNode.removeChild(evento.target.parentNode.parentNode);

        //REMOVER DO LOCALSTORAGE
        let index = listaDeTasks.findIndex((elemento) => {
            return elemento.task == evento.target.parentNode.parentNode.childNodes[0].childNodes[1].innerHTML;
        })
        listaDeTasks.splice(index, 1)
        atualizaLocalStorage();
        atualizaQuantidade()
    }
})

//EDITAR

let editar;

document.addEventListener('click', function(evento){
    let index = 0;

    if(evento.target.id == 'fa-pen'){
       modalEdit.style.display = 'block';

        editar = evento.target.parentNode.parentNode.childNodes[0].childNodes[1];
        index = listaDeTasks.findIndex((elemento) => {
            return elemento.task == editar.innerHTML;
        })
    }

    if(evento.target.id == 'confirma-edit'){
        //EDITAR DOM
        modalEdit.style.display = 'none';
        editar.innerHTML = inputEdit.value;

        //EDITAR LISTA
        listaDeTasks[index].task = inputEdit.value;

        inputEdit.value=''
        atualizaLocalStorage();
    }
})

function atualizaLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(listaDeTasks));
}
