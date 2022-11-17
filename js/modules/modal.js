export default function initModal(){
    

    const abrirModal = document.querySelector('.avaliar')
    const inputCategoria = document.getElementById('modal-categoria')
    const inputName = document.getElementById('modal-nome')
    const inputDescricao = document.getElementById('modal-descricao')
    const inputNota = document.getElementById('modal-nota')
    const sendButton = document.querySelector('.enviar');
    const returnButton = document.querySelector('.voltar');
    const modal = document.querySelector('.modal') 
    const wrapperAvaliacao = document.querySelector('.wrapper-avaliacao')

    const errorCategoria = document.querySelector('.error-categoria')
    const errorNome = document.querySelector('.error-nome')
    const errorDescricao = document.querySelector('.error-descricao')
    const errorNota = document.querySelector('.error-nota')

    const letterCount = document.querySelector('.count-value')
    const letterCountMessage = document.querySelector('.letter-count')

    //Verifica clica fora da modal para fechar
    modal.addEventListener('click', cliqueForaModal);
    //Botão Avaliar
    abrirModal.addEventListener('click', toggleModal)
    //Botao Enviar
    sendButton.addEventListener('click', handleSendClick)
    //Botao voltar
    returnButton.addEventListener('click', toggleModal)

    //validar caracteres digitaveis
    inputDescricao.addEventListener('keyup', handleLetterCount)
    

    function clearValues(){
        inputName.value=''
        inputDescricao.value=''
        inputNota.value=''
        letterCount.value =''
        letterCountMessage.style.opacity=0
    }

    function cliqueForaModal(event) {
        if(event.target == this) {
            toggleModal(event);
        }
    }

    function toggleModal(){
        event.preventDefault()
        clearValues()
        modal.classList.toggle('ativo')
    }

    
    function handleSendClick(event){
        event.preventDefault()
        const name = inputName.value
        const descricao = inputDescricao.value.trim()
        const nota = inputNota.value  
        const categoria = inputCategoria.value

        let  boolCategoria = validateCategoria(categoria)
        let  boolName = validateName(name)
        let  boolNota = validateNota(nota)
        let  boolDescricao = validateDescription(descricao)
          
        if( boolName && boolNota && boolDescricao && boolCategoria)
        {
            createCommentary(name, descricao, nota, categoria)    
            modal.classList.remove('ativo')
        }
    }
    // WORKING
    function validateCategoria(categoria){
        if(categoria == "invalida")
        {
            inputCategoria.classList.add('validation-error')
            errorCategoria.classList.add('ativo')
            return false
        }
        errorCategoria.classList.remove('ativo')
        inputCategoria.classList.remove('validation-error')
        return true
    }


    function validateName(name){
        var regexLetters = new RegExp(/^[A-Za-z]+$/)
        if(regexLetters.test(name))
        {
            inputName.classList.remove('validation-error');
            errorNome.classList.remove('ativo')
            return true;
        }
        inputName.classList.add('validation-error')
        errorNome.classList.add('ativo')
        return false;
    }

    function validateNota(nota){
        var regexNumbers = new RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/)
        if(regexNumbers.test(nota) && nota<10 && nota >0)
        {
            inputNota.classList.remove('validation-error');
            errorNota.classList.remove('ativo')
            return true
        }
        inputNota.classList.add('validation-error')
        errorNota.classList.add('ativo')
        return false
    }

    function handleLetterCount(){
        event.preventDefault()
        let limitCharacters = 200
        let actualCharacters = this.value.length
        let remaining = (actualCharacters - limitCharacters)*-1
        
        letterCount.innerText = remaining
        
        if(actualCharacters >= 0){
            letterCountMessage.style.opacity = 1;
        }else{
            letterCountMessage.style.opacity = 0;
        }

        if(actualCharacters >100)
        {
            letterCount.style.color = "rgba(78, 194, 93, 0.925)";
        }else{
            letterCount.style.color = "rgb(134, 134, 134)";
        }
    }
    
    
    function validateDescription(description){
        if(description.length<100){
            inputDescricao.classList.add('validation-error');
            errorDescricao.classList.add('ativo')
            return false
        }
        inputDescricao.classList.remove('validation-error');
        errorDescricao.classList.remove('ativo')
        return true
    }

    function createCommentary(name, descricao, avaliation, categoria){
        const newAvaliation = document.createElement('div')
        newAvaliation.classList.add('avaliacao')

        const newCommentary = document.createElement('div')
        newCommentary.classList.add('comentario')

        const categoriaSpan = document.createElement('span')
        categoriaSpan.classList.add('small-comment')
        categoriaSpan.classList.add('categoria')
        categoriaSpan.innerText=categoria

        const commentarySpan = document.createElement('span')
        commentarySpan.classList.add('descricao')
        commentarySpan.innerText= `"${descricao}"`

        const autor = document.createElement('span')
        autor.classList.add('small-comment')
        autor.innerText=name;
    
        /*nota*/
        const avaliationDiv = document.createElement('div')
        avaliationDiv.classList.add('nota')        
        const avaliationValue = document.createElement('span')
        avaliationValue.innerText=avaliation
    
        newCommentary.appendChild(categoriaSpan)
        newCommentary.appendChild(commentarySpan)
        newCommentary.appendChild(autor)
    
        avaliationDiv.appendChild(avaliationValue)
    
        newAvaliation.appendChild(newCommentary);
        newAvaliation.appendChild(avaliationDiv);
    
        wrapperAvaliacao.appendChild(newAvaliation)
    }
}