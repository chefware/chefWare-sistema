const botaoAcoesRapidas = document.querySelector('.botaoAcoesRapidas');
    const modal = document.querySelector('.area-modal')

    botaoAcoesRapidas.addEventListener('click', function() {
        modal.style.display = 'flex'
    });

    const botaoFecharModal = document.querySelector('.fecharModal');

    botaoFecharModal.addEventListener('click', function() {
        modal.style.display = 'none'
    });