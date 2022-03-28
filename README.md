# Articles API

![GitHub repo size](https://img.shields.io/github/repo-size/brunosvx/articles-api?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/brunosvx/articles-api?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/brunosvx/articles-api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/brunosvx/articles-api?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/brunosvx/articles-api?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/brunosvx/articles-api?style=for-the-badge)

<br>

> Api de Usuários e artigos feita em nodejs

<br>

## 💻 Pré-requisitos

* Ter o [Nodejs](https://nodejs.org/) instalado

<br>

## 🚀 Instalando e iniciando a API

Com NPM:
```
npm install
```
```
npm start
```
Com YARN:
```
yarn
```
```
yarn start
```

Será iniciado um servidor em <http://localhost:3333>

<br>

## Rotas

Rotas privadas precisam receber o header `authorization` com o token do usuário.
```js
{
    headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkMjI2M2M5LWNlYzYtNDI1YS05MDZhLTAyMGU5ZTYxNDEwNyIsImVtYWlsIjoiYnJ1bm8xMjNAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0ODM0NTk1OSwiZXhwIjoxNjQ4NDMyMzU5fQ.eJH6RHdQpeg9-1w-cTl0ea_cRmb8finCGLJbyHA_Ukg'
    }
}
```

<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/user` | POST | Cria um usuário | Não

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| email | str | null | Sim | Email do usuário |
| name | str | null | Sim | Nome do usuário |
| password | str | null | Sim | Senha do usuário |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/login` | POST | Autentica um usuário | Não

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| email | str | null | Sim | Email do usuário |
| password | str | null | Sim | Senha do usuário |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/user/password` | PUT | Altera a senha do usuário | Sim

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| oldPassword | str | null | Sim | Senha antiga |
| newPassword | str | null | Sim | Senha nova |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/user/admin` | PUT | Define um usuário como Admin (necessário ser admin) | Sim

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| userId | str | null | Sim | id do usuário |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/user/{id}/posts` | GET | Busca os artigos de um usuário | Não

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| id | str | null | Sim | Id do usuário |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/post` | POST | Cria um artigo | Sim

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| title | str | null | Sim | Título do artigo |
| content | str | null | Sim | Conteúdo do artigo |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/post/{id}` | GET | Busca um artigo específico | Não

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| id | str | null | Sim | Id do post |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/post?search=&orderBy=&order=&limit=` | GET | Busca os artigos de acordo com os filtros | Não

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| search | str | null | Não | Filtra pelo título dos artigos |
| orderBy | `createdAt ou updatedAt` | `updatedAt` | Não | Ordena or artigos |
| order | `asc ou desc` | `desc` | Não | Define a ordem |
| limit | int | 10 | Não | Define o número de artigos a serem buscados |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/post` | DELETE | Deleta um artigo | Sim

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| postId | str | null | Sim | id do artigo |

<br>
<hr>
<br>

| URL | Método | Descrição | Privada |
| -------- | ------------- | --------- | ------- |
| `/post` | PATCH | Edita um artigo | Sim

Paramêtros:

| Parâmetro | Tipo de valor | Default | Obrigatório | Descrição |
| -------- | ------------- | ---------- | --------- | --------- |
| postId | str | null | Sim | id do artigo |
| title | str | null | *Não | Novo Título do artigo |
| content | str | null | *Não | Novo conteúdo do artigo |

<br>

## 📫 Contribuindo com o projeto

Para contribuir com o projeto, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

<br>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.