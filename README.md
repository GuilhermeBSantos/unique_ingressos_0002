# Unique Ingressos - Processo Seletico 0002

## Projeto que fiz

O projeto em questão eu montei em laravel com um frontend em react, aqui fiz um login simples onde sera possivel se cadastrar, se logar e realizar a compra de um Ingresso que for adicionado na tabela 'ticket'. É realizado uma validação, para verificar se existe ingresso disponivel de acordo com o maximo possivel que pode ser comprado por cliente, e de acordo com o total de ingressos disponiveis.


## Como executar ?

Para começar, é preciso dar um 'composer update', para ser realizado a instalação dos pacotes necessarios para a aplicação poder ser executada;

No arquivo .env é onde fica as configurações de ambiente no larael, aqui é possivel configurar o banco de dados (host, porta, nome do banco, senha do banco, nome de usuario). Deve ser criado um banco vazio, e após configura-lo no env, execute a função 'php artisan migrate', onde será adicionado todas as tabelas no banco.

Após isso, é necessario dar um 'php artisan db:seed', onde será adicionado os ingressos no banco de dados.

Após, dê um 'npm install' e 'npm run dev' para realizar a instação das dependencias do react.

Após isso, é só executar o projeto com 'php artisan serve'