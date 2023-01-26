
<h1 align="center"> # Projeto_Radar_2.0_G6</h1>

# Índice

- [Sobre o Projeto](#--sobre-projeto)
- [Equipe do Projeto](#--equipe-do-projeto--)
- [Funcionalidades](#---funcionalidades--)
- [Tecnologias utilizadas](#--tecnologias-utilizadas-)
- [Organização do Projeto](#-%EF%B8%8F-organização-do-projeto-)
- [Execução do Projeto](#--execução-o-projeto-)
- [Visualização do Projeto](#--visualização-do-projeto)
  - [Tela de Login](#tela-de-login-do-usuário)
  - [Tela Home(Fluxo de caixa)](#tela-de-fluxo-de-caixa-home)
  - [Tela de Clientes](#tela-de-clientes)
    - [Modal - Editar clientes](modal-editar-clientes)
    - [Modal - Informações do cliente](#modal-informações-do-clientes)
  - [Tela de Produtos](#tela-de-produtos)
    - [Modal - Informações do Produto](#modal-informações-do-produto)
    - [Modal - Editar Produtos](#modal-editar-produto)
  - [Tela de Pedidos](#tela-de-pedidos)
    - [Modal - Informações do Pedido](#modal-de-informações-do-pedido)
- [Organização do projeto](#--organiza%C3%A7%C3%A3o-do-projeto-)
- [Agradecimentos](#--agradecimentos)

##

<br>
<h2> 👨🏻‍💻 Sobre projeto</h2>
<p>Este projeto visa o desenvolvimento de uma API em C#, para conectar com o primeiro projeto apresentado à Farmarcas/Gama Academy feito em Angular, utilizando como front-end, o repositório de outro grupo, sendo necessária a adição das páginas de Lojas (com API Google Mpas) e Campanhas (utilizando Drag-and-drop). </p>
<br>

##

<h2> 👩‍💻 Equipe do projeto 👨‍💻 </h2>


| [![daniela](https://user-images.githubusercontent.com/101750798/214454745-b055a296-ee75-4a6c-a728-4abab3f8db65.jpeg)](https://www.linkedin.com/in/daniela-martins-costa "Daniela Martins Costa")  |[![Diego](https://user-images.githubusercontent.com/101750798/214455584-440e9b6b-e607-4cff-9c48-6c7e9f19f142.jpeg "Diego Moritz")](https://www.linkedin.com/in/diego-moritz-lopes-7a90aa225/ "Diego") |[![Eric](https://user-images.githubusercontent.com/101750798/214455908-c9d8a27a-d43c-4c5e-9776-f854717d1703.jpeg "Eric")](https://www.linkedin.com/in/eric-nagao-2a59a93b// "Eric Nagao")  | [![Filipe](https://user-images.githubusercontent.com/101750798/214456445-4079c84a-519b-426f-bcfa-6d83443a6d1b.jpeg)](https://www.linkedin.com/in/filipe-magalh%C3%A3es-moreira/ "Filipe Magalhães") | [![Jonathan](https://user-images.githubusercontent.com/101750798/214448427-37472463-b630-4374-8a8f-8c1dd61c1a4f.png "Jonatan")](https://www.linkedin.com/in/gabriel-santos-cavalcante-b07b7221b/ "Jonatan")  | [![Sérgio](https://user-images.githubusercontent.com/101750798/214447884-785a70bb-e7ea-4706-8b23-308a5f0935cd.png)](https://www.linkedin.com/in/sergio-alves-b3bb91208 "Sergio") 
| :------------: | :------------: | :------------: | :------------: | :------------: | :------------: |
|  Daniela M. Costa | Diego M. Lopes | Eric M. Nagao | Filipe M. Moreira | Jonathan Tenório  |  Sérgio Alves  | 



##

<h2>  🛠 Funcionalidades 🛠 </h2>

- `Pagina Login:` Página destinada ao login de usuário com senha para acesso as demais páginas do sistema, utilizado autentização via JWT;
- `Página Home:` Página inicial de apresentação de fluxo de caixa com gráficos e quantidade de cadastros de cada item;
- `Página de clientes:`Página que apresenta a lista de clientes cadastrados e opções de cadastro, visualização, edição e exclusão de clientes;
- `Página cadastro de pedidos dos clientes:`Página que apresenta a lista de pedidos cadastrados e opções de cadastro, visualização, edição e exclusão de pedidos;
- `Página Produtos:` Página que apresenta a lista de produtos cadastrados e opções de cadastro, visualização, edição e exclusão de produtos;
- `Página Compras:` Página destinada a criação de pedido de produtos, utilizado como base, a tela de pedidos. Apresenta opções de cadastro, visualização, edição e exclusão de pedidos;
- `Página Campanhas:` Página destinada a realização de campanhas dando a possibilidade de mover itens na tela, especificando  ;
- `Página Lojas:` P;


## 

<h2> 💻 Tecnologias utilizadas: </h2>

<table  align= "center">
   <tr>
   <a  href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,git,github,angular,cs,dotnet,mysql"/>
    <img align="alling" alt="Trello" height="55" width="55" src="https://cdn.icon-icons.com/icons2/3041/PNG/512/trello_logo_icon_189227.png">
      
     
    
   </tr>
  </table>



##


<h2> 🗓 Organização do projeto </h2>

<p>Organizamos o projeto utilizando a metodologia ágil Kaban, através da ferramenta Trello. Separamos como Tarefas 'To Do', 'Doing' e 'Done'. <a href="https://trello.com/invite/b/4gk5fv0m/ATTIfd83188797101d8b5b7d71bd97cca68375FFFB17/projetoradar20g6">Clique aqui para visualizar o quadro</a></p>



##

![Captura de tela 2023-01-26 014501](https://user-images.githubusercontent.com/84486574/214766442-da8f6e19-3da9-4f8b-9544-059010df3a1a.png)

##

<h2> 🎲 Execução o projeto </h2>



```bash
# Clone estes repositórios
$ git clone <https://github.com/danielamartinscosta/Projeto_Radar_G6_Front-end>
$ git clone <https://github.com/danielamartinscosta/Projeto_Radar_G6_API>

# Acesse a pasta dos projetos no terminal/cmd
$ cd Projeto_Radar_G6_Front-end
$ cd Projeto_Radar_G6_API

# Instale as dependências - Front-end
$ npm install  

# Instale as dependências - Back-end
$ dotnet build

# incluir variável de ambiente para acesso ao banco de dados
DATABASE_URL_RADAR_G6="server=localhost;database=radar_g6;uid=SEUUSUARIO;pwd=SUASENHA"

# Execute a aplicação em modo de desenvolvimento
$ dotnet watch run (para a API)
$ ng serve (para o angular)

#Login
usuário: admin@admin
senha: admin123


```

##





<h2> 🤝 Agradecimentos</h2>

<p>Agradecemos às empresas Febrafar e Farmacas em parceria com a Gama Academy, pela oportunidade de participarmos dessa iniciativa chamada Código do Futuro. Ao nosso Professor Danilo Aparecido, que tem compartilhado conosco, seu vasto conhecimento e nos tornando melhores, pelo menos 1% a cada dia e a Nossa Yellow Belt Carina Aguiar, que sempre se esforça para nos mantermos atualizados e nos ajudar no que precisarmos. </p>
<p> <strong> A todos vocês, o nosso Muito Obrigado!</strong> </p>

----
Referencia de projeto
https://github.com/VictorPnheiro/Grupo4-Projeto-Integrador-Front-End
