const dataDom = document.getElementById('data')
diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

const quantidadeTasks = document.getElementById('quantidade__tasks')


let hoje = new Date();
let dia = hoje.getDate()
let mes = ((hoje.getMonth() + 1).toString()).padStart(2, '0')

let diaSemana = diasSemana[hoje.getDay()]
console.log(diaSemana)

dataDom.innerHTML = `${dia}/${mes}, <br>${diaSemana}`

function atualizaQuantidade(){
    let list = listaDeTasks.map(elemento => elemento.completo)
    let quantidade = 0
    
    list.forEach((elemento) => {
        if(elemento != 'completo'){
            quantidade++
        }
    })
    

    quantidadeTasks.innerHTML = `Você tem ${quantidade} tasks`
}

atualizaQuantidade()