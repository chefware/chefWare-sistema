const itemMenuMaquina = document.getElementById('itemMenuMaquina');

itemMenuMaquina.addEventListener('click', function () {
    window.location.href = 'lista-maquinas.html';
});

const itemMenuEmpresa = document.getElementById('itemMenuEmpresa');

itemMenuEmpresa.addEventListener('click', function () {
    window.location.href = 'lista-empresas.html';
});

const itemMenuFuncionario = document.getElementById('itemMenuFuncionario');

itemMenuFuncionario.addEventListener('click', function () {
    window.location.href = 'lista-funcionario.html';
});

const botaoSair = document.querySelector('.sidebar-sair');
botaoSair.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = '../index.html';
});