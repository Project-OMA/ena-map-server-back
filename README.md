# ENA Map Server

Este é um projeto de um Sistema de Back-End criado para fazer o Gerenciamento de Mapas no jogo ENA, utilizado no estudo de Orientação e Mobilidade.

## Tecnologias

Neste projeto, utilizamos as seguintes tecnologias:
* NodeJs + Express + Typescript
* MySQL + PrismaORM
* Python (Execução de Scripts)
* Swagger UI (Documentação dos Endpoints da API)

# Como utilizar 

Para executar a aplicação localmente, primeiramente é necessário ter o MySQL instalado na máquina, ou um Container Docker com a imagem do MySQL instalada. Também será necessário a instalação do NodeJs para a execução do código fonte do projeto. 
Feito isso, temos os seguintes passos:

### 1. Criação do arquivo de variáveis de ambiente

Crie um arquivo chamado '.env' no diretório raíz do projeto, como é demonstrado no arquivo 'example.env' (Para visualizá-lo, acesse o link https://github.com/Project-OMA/ena-map-server-back/blob/main/example.env).

Após criá-lo, utilize as variáveis de ambiente, como é feito no arquivo 'example.env'. Caso seja necessário, altere os valores das variáveis de acordo com as configurações da base de dados que deseja executar.

### 2. Instalação dos pacotes

Após a criação do arquivo .env, abra o terminal no diretório raíz do projeto e execute o comando: ```npm install```

Ao concluir a instalação corretamente, vá para o próximo passo.

### 3. Execução das Migrations para construção da Base de Dados

Para construir a Base de Dados junto com as Tabelas sem precisar executar SQL manualmente, utilizamos as migrations do PrismaORM, que montam as tabelas e populam o banco de acordo com o que definimos. Para a execução das migrations, execute estes comandos no terminal:

```
npm run prisma:gen
npx prisma db push
```

Ao concluir a execução das Migrations, vá para o próximo passo.

### 4. Execução do projeto

Para executar o projeto, utilize o comando: ```npm run dev```. 

Ao executar este comando, a aplicação será executada. A mesma estará disponível para uso quando aparecer o log "Server is running : [**NUMERO_DA_PORTA**]" no terminal.

## Documentação da API

Criamos uma documentação da API com o Swagger UI em um arquivo no diretório raíz chamado "swagger.json". Para visualizar esta documentação, é necessário a execução do app, após isso, é possível acessa-la pelo link http://localhost:[**NUMERO_DA_PORTA**]/docs/.

Nela, conseguimos encontrar todos os endpoints da aplicação que foram documentados, contendo descrições, exemplos de parâmetros, corpo de requisições, corpo de respostas, status code de respostas, etc.

## Informações adicionais

### Script de Conversão de Mapa XML para JSON

Este Script converte arquivos de Mapas em formato XML, que é lido pelo jogo ENA, para o formato JSON, que é registrado e lido pelo Servidor de Mapas. Este script localiza-se em "scripts/convert/convert.py".

Esse Script é acessado por método **convertXmlToJson** da classe **ScriptReader**, localizada em "src/utils/scriptReader.ts".

<br>

### Autenticação e Autorização de Endpoints

No Servidor de Mapas, utilizamos o JWT como serviço de autenticação de usuário. Ao enviar o e-mail e a senha para o endpoint "/users/auth", considerando que os dados estejam corretos, um token de acesso é enviado no corpo JSON da resposta.

O código fonte das rotas da aplicação é localizada em "src/routes/", onde há os arquivos com o sufixo "Route.ts", que são definidos os endpoints de sua respectiva Entidade, e temos o arquivo "index.js", responsável por utilizar todos os endpoints definidos nos demais arquivos e exportá-los para o arquivo principal da aplicação, chamado "server.ts".

Para a autenticação e autorização dentro das Routes, utilizamos uma função chamada "authorizateUser()", localizada em "src/middlewares/AuthorizateUser.ts". Esta função recebe como parâmetro uma lista de tipos de usuário que são aceitos na requisição. Caso o usuário esteja autenticado, porém possua um tipo de cargo diferente dos que estão sendo enviados para esta função, será dado como resposta um erro 401, indicando que o usuário não foi autorizado para utilizar esta operação.

Obs: Os Tipos de usuários são constantes definidas no Enum chamado UserTypes, localizado em "src/constants/UserTypes.ts"

```
//Exemplo de uso: 
authorizateUser([ADMIN, TEACHER])
```

Como mencionado anteriormente, esta função é utilizada dentro das Routes. Ao combinar o Route com o middleware "authorizateUser" temos o seguinte resultado:

```
routes.route('/listAll').get(authorizateUser([ADMIN, TEACHER]), userController.listAll);
```

Como resultado, obtemos como resultado, a permissão deste endpoint podendo ser feito apenas por usuários com o cargo de ADMIN e TEACHER.

<br>

## Issues da aplicação

### Refresh Token

Ao usuário autenticar-se na aplicação, é gerado um prazo de expiração do Token, definido para durar em até 16 horas. Porém quando este tempo é ultrapassado, será dado como resposta ao usuário um erro de autenticação devido o token ter expirado.

É desejável que, para que a aplicação funcione em harmonia com a interface, um endpoint para o **refresh token** seja feito. Como resposta ao usuário, será gerada uma renovação do token para o usuário manter-se logado na aplicação, sem precisar ser feito o login sempre que o prazo do token expirar.