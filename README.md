
# API documentation -  Papelaria - Amcom
Projeto de desafio, vendas e comissões de papelaria

# Stack

**Django** - Todo o backend da aplicação foi desenvolvido com python utilizando o django e django rest framework

**React** -O Frontend foi desenvolvido utilizando o react com **TypeScript**
.
**Material UI - MUI** - para os componentes do react foi utilizado o MUI

**Redux** - Usei o redux para fazer o gerenciamente de estados e realizacao dos requests para o backend


# Summary

1. [Endpoint List](#1-Endpoint-List)

2. [Environment Preparation](#2-Environment-Preparation)

3. [Contact](#3-Contact)



# 1. Endpoints List
### Codumentação
Para saber os formatos aceitos pelas rotas é só acessar as rotas pelo browser que abrirar a documentação.

    | description             |   route                                            |
    |-------------------------|----------------------------------------------------|
    |  customers              |  GET http://localhost:8000/api/customers/          |
    |-------------------------|----------------------------------------------------|
    |  products               |  GET http://localhost:8000/api/products/           |
    |-------------------------|----------------------------------------------------|
    |  sales                  |  GET http://localhost:8000/api/sales/              |
    |-------------------------|----------------------------------------------------|
    |  sellers                |  GET http://localhost:8000/api/sellers/            |
    |-------------------------|----------------------------------------------------|


    Todas essas rotas citas possuem os metodos http GET | POST | UPDATE | DELETE
    
    O endpoint de comissões não possui outros metodos, já que é uma rota apenas de consulta

    |-------------------------|---------------------------------------------------------------------------------------------------|
    |  commissions            |  GET http://localhost:8000/api/seller-commissions/?start_date=2023-09-25&end_date=2023-09-27      |
    

# 2. Rodando as aplicações
### Backend 
1. Clone the api repository:
    ```shell
    git clone https://github.com/lucastavaresn/papelaria.git
    ```

2. Criando um ambiente virtual:
    > **_NOTE:_** dentro da pasta do backend crie um venv e depois ative
    ```shell
    python -m venv venv

    linux:  source venv/bin/activate
    windows:  venv\Scripts\Activate.ps1 (ou .bat)
    ```

3. instalar dependencias: 
    ```shell
    pip install - r requirements.txt
    ```

4. Rode as migrações:
   - rode o comando
     ```shell
     python manage.py migrate
     ```

5. Crie um usuário:
   - rode o comando e siga os passos no terminal/bash
     ```shell
     python manage.py createsuperuser
     ```


6. Agora só rodar a aplicação:
 > **_NOTE:_** a aplicação roda na porta 8000
     ```shell
     python manage.py runserver
     ```

6. Testes:
 > **_NOTE:_** a aplicação roda na porta 8000
     ```shell
     python manage.py test .\core\tests\
     ```
### Frontent 
 > **_NOTE:_** dentro da pasta do frontend (em outro terminal/bash)
1. instalar dependencias: 
    ```shell
    npm install
    ```
2. Rodando a aplicação: 
 > **_NOTE:_** a aplicação roda na porta 3000
    ```shell
    npm start
    ```
# Contato

> Developer:
1. Lucas Tavares - lucastavaresn@gmail.com