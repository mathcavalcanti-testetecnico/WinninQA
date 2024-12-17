# Tech Stack
Este projeto utiliza a seguinte stack tecnológica:

- **Cypress**: Framework de testes end-to-end baseado em JavaScript para aplicações web.
- **JavaScript**: Linguagem de programação utilizada para escrever os scripts de teste.
- **Page Object Model (POM)**: Padrão de design utilizado para separar a lógica de teste da estrutura da página, tornando os testes mais manuteníveis.
- **Mocha/Chai**: Frameworks de testes utilizados junto com o Cypress para asserções e organização dos testes.
- **GitHub Actions**: Ferramenta de Integração Contínua (CI) para rodar os testes automatizados a cada push de código.

# Configuração do Projeto

## Pré-requisitos
Antes de configurar o projeto localmente, verifique se você tem as seguintes dependências instaladas:

- **Node.js** (v16 ou superior)
- **npm** (Node Package Manager)
- **Cypress** (será instalado automaticamente via npm)

## Passos para Configuração

1. **Clonar o repositório**:
   - Clone o repositório em sua máquina:
     ```bash
     git clone https://github.com/usuario/repositorio.git
     ```

2. **Instalar as dependências**:
   - Navegue até o diretório do projeto e instale as dependências com o npm:
     ```bash
     cd nome-do-repositorio
     npm install
     ```

3. **Configuração do Cypress**:
   - Depois de instalar as dependências, você pode rodar o Cypress usando:
     ```bash
     npx cypress open
     ```

4. **Rodar os Testes**:
   - Para rodar os testes em modo headless (sem interface gráfica), utilize o seguinte comando:
     ```bash
     npx cypress run
     ```


## Estrutura do Projeto

├── cypress/                          # Diretório principal dos testes Cypress
│   ├── e2e/                          # Contém os testes automatizados
│   │   ├── graphql.cy.js             # Arquivo de teste para testar uma API GraphQL
│   │   └── wikipedia.cy.js           # Arquivo de teste para testar a funcionalidade da Wikipedia
│   ├── fixtures/                     # Diretório para armazenar dados fixos (ainda não preenchido)
│   ├── support/                      # Diretório de arquivos auxiliares para configurar e suportar testes
│   │   ├── e2e.js                    # Arquivo que pode conter comandos personalizados ou configurações globais
│   │   └── wikipediaPage.js          # Página de objeto para facilitar a interação com a página da Wikipedia
│   ├── cypress.config.js             # Arquivo de configuração do Cypress
├── node_modules/                     # Diretório com as dependências do projeto (gerado automaticamente)
├── package.json                      # Arquivo de configuração do npm com dependências e scripts do projeto
├── package-lock.json                 # Arquivo de bloqueio de dependências, gerado pelo npm
└── README.md                         # Arquivo de documentação do projeto

