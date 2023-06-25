<h1 align="center">

<img src="https://raw.githubusercontent.com/khalleb/ignews/main/public/images/avatar.svg" alt="rocketshoes" width="100px"/>

</h1>

## Food Explorer

O Food Explorer é o projeto final do programa Explorer, uma aplicação que visa simular um sistema completo de pedidos de comida. O projeto inclui recursos como autenticação de usuários, login e cadastro, com a utilização de tokens para autenticação. Inspirado por plataformas como o iFood, o Food Explorer permite que os usuários realizem pedidos de pratos e refrigerantes, além de oferecer um sistema de carrinho para armazenar os itens selecionados. Por fim, o projeto conta com uma tela de pagamento, embora seja importante ressaltar que essa funcionalidade é apenas uma representação e não realiza transações reais. É importante destacar que existem dois tipos de usuários no sistema, o administrador (admin) e o cliente (client), cada um com permissões distintas e acesso a recursos específicos.
<br>

## Tecnologias

As seguintes tecnologias foram utilizadas no projeto:

-   [Next.js](https://nextjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind](https://tailwindcss.com/)
-   [Node](https://nodejs.org/en)
-   [MySQL](https://www.mysql.com/)

## Principais bibliotecas

-   [Formik](https://formik.org/)
-   [Yup](https://github.com/jquense/yup)
-   [Axios](https://axios-http.com/)
-   [Express](https://expressjs.com/)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [jsonwebtoken](https://jwt.io/)

## Começando

```bash
# Clone this project
$ git clone git@github.com:Jonatank28/Explorer-Food-Explorer-Front.git

# Access
$ cd Explorer-Food-Explorer-Front

# Install dependencies
$ npm install

# Run the project
$ npm run dev

# The server will initialize in the <http://localhost:3000>
```

## Acesso

O sistema exibe diferentes conteúdos com base no papel do usuário, que pode ser "admin" ou "client". Ao fazer um novo cadastro no sistema, o usuário é automaticamente atribuído ao papel "client" como padrão.

Segue acessos de exemplo:

Admin:

-   email: admin@gmail.com
-   password: 123456

Client:

-   email: client@gmail.com
-   password: 123456

## Imagens

<div align="center">
    <div style="display: flex; justify-content: center; gap: 10px">
        <img  alt="Web app" src="https://raw.githubusercontent.com/Jonatank28/Explorer-FoodExplorer/master/public/fotos/home.jpg" style="width: auto;" />
        <img alt="Web app" src="https://raw.githubusercontent.com/Jonatank28/Explorer-FoodExplorer/master/public/fotos/novo.jpg" style="width: auto;" />
    </div>
</div>
<div align="center" style="margin-top: 10px">
    <div style="display: flex; justify-content: center; gap: 10px">
        <img  alt="Web app" src="https://raw.githubusercontent.com/Jonatank28/Explorer-FoodExplorer/master/public/fotos/homeMobile.jpg" style="width: auto;" />
        <img alt="Web app" src="https://raw.githubusercontent.com/Jonatank28/Explorer-FoodExplorer/master/public/fotos/editMobile.jpg" style="width: auto;" />
    </div>
    
</div>

## Creditos

Dúvidas sobre Json Web Token: https://www.youtube.com/watch?v=r4gjCn2r-iw&ab_channel=GuidoCerqueira
Dúvidas sobre rotas dinamicas do Next.js 13.4 : https://www.youtube.com/watch?v=b8JX94mkwio&ab_channel=DeveloperDeck101
