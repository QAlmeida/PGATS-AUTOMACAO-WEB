# Automação de Testes Web – Trabalho Final - PGATS

Projeto de automação de testes end-to-end desenvolvido como parte do **Trabalho de Conclusão de Curso** da Pós-Graduação em Automação de Testes de Software (PGATS).

A automação valida funcionalidades críticas do site [Automation Exercise](https://automationexercise.com), cobrindo cenários de autenticação, contato, produtos, newsletter e fluxo completo de compra.

---

## 🎯 Objetivos do Projeto

- Aplicar na prática os conceitos estudados na pós-graduação (tipos de espera, seletores, boas práticas, CI/CD).
- Automatizar casos de teste reais em um e-commerce de demonstração.
- Garantir que os cenários principais possam ser executados:
  - Localmente (via Cypress)
  - Automaticamente (via Github Actions)
  - Com evidências (relatórios HTML, screenshots, vídeos)

---

## 📋 Casos de Teste Implementados

Todos os casos abaixo fazem parte do **escopo definido pelo professor** e estão implementados com sucesso:

### 🧾 Autenticação (arquivo: `cypress/e2e/auth/register-user.cy.js`)

- **TC1 – Register User**  
  Registro de um novo usuário com dados válidos, validação de `ACCOUNT CREATED!` e usuário logado.

- **TC2 – Login User with correct email and password**  
  Login com credenciais válidas do usuário cadastrado.

- **TC3 – Login User with incorrect email and password**  
  Validação de mensagem de erro ao tentar logar com credenciais inválidas.

- **TC4 – Logout User**  
  Logout de um usuário logado e retorno à tela de login/cadastro.

- **TC5 – Register User with existing email**  
  Tentativa de cadastro com um email já existente, validando a mensagem de erro.

### 📞 Contato (arquivo: `cypress/e2e/contact/contact-us.cy.js`)

- **TC6 – Contact Us Form**  
  Preenchimento do formulário de contato, upload de arquivo PDF, envio do formulário e validação da mensagem de sucesso.

### 🛍️ Produtos & Newsletter

- **TC8 – Verify All Products and product detail page**  
  Acesso à página de produtos, listagem dos produtos e validação dos detalhes de um produto específico.  
  Arquivo: `cypress/e2e/products/products-list.cy.js`

- **TC9 – Search Product**  
  Utilização da busca para encontrar produtos e validação de que há resultados relevantes.  
  Arquivo: `cypress/e2e/products/products-list.cy.js`

- **TC10 – Verify Subscription in home page**  
  Inscrição na newsletter pela home, validando mensagem de sucesso após enviar o email.  
  Arquivo: `cypress/e2e/products/subscription.cy.js`

### 💳 Checkout & Pedido

- **TC15 – Place Order: Register before Checkout**  
  Fluxo completo de compra, com:
  - Registro de novo usuário **antes** de adicionar produtos ao carrinho  
  - Adição de produtos ao carrinho  
  - Revisão do pedido e endereço  
  - Inserção de comentário  
  - Preenchimento de dados de pagamento  
  - Confirmação do pedido  
  - Validação da mensagem: **"Congratulations! Your order has been confirmed!"**  
  - Exclusão da conta criada ao final do teste  
  Arquivo: `cypress/e2e/checkout/place-order-register.cy.js`

---

## 🛠️ Tecnologias e Ferramentas

- **Linguagem:** JavaScript (Node.js)
- **Framework de testes:** [Cypress](https://www.cypress.io/)
- **Relatórios:** `cypress-mochawesome-reporter`
- **Controle de versão:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Gerenciador de pacotes:** npm

---


