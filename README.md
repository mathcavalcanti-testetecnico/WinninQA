# Desafio Técnico Winnin

Este repositório contém a automação de testes utilizando Cypress para o desafio técnico da **Winnin**. O objetivo do projeto é automatizar testes end-to-end em APIs e páginas web, utilizando práticas modernas de desenvolvimento e testes.

## Tech Stack

Este projeto utiliza a seguinte stack tecnológica:

- **Cypress**: Framework de testes end-to-end baseado em JavaScript para aplicações web.
- **JavaScript**: Linguagem de programação utilizada para escrever os scripts de teste.
- **Page Object Model (POM)**: Padrão de design utilizado para separar a lógica de teste da estrutura da página, tornando os testes mais manuteníveis.
- **Mocha/Chai**: Frameworks de testes utilizados junto com o Cypress para asserções e organização dos testes.
- **GitHub Actions**: Ferramenta de Integração Contínua (CI) para rodar os testes automatizados a cada push de código ou execução manual.

## Configuração do Projeto

### Pré-requisitos
Antes de configurar o projeto localmente, verifique se você tem as seguintes dependências instaladas:

- **Node.js** (v16 ou superior)
- **npm** (Node Package Manager)
- **Cypress** (será instalado automaticamente via npm)

### Passos para Configuração

1. **Clonar o repositório**:
   - Clone o repositório em sua máquina:
     ```bash
     git clone https://github.com/mathcavalcanti-testetecnico/WinninQA.git
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

## Integração Contínua com GitHub Actions

Este projeto está configurado com **GitHub Actions** para rodar os testes automaticamente sempre que houver um `push` para o repositório ou quando você disparar o workflow manualmente através do `workflow_dispatch`.

### Como Executar os Testes Manualmente no GitHub Actions

1. No respositório do GitHub, vá para a aba **Actions**.
2. Selecione o fluxo.
3. Clique no botão **Run workflow** para iniciar a execução dos testes.


## Contribuições

Contribuições são bem-vindas! Se você tem sugestões de melhorias ou encontrou algum problema, fique à vontade para abrir uma *issue* ou fazer um *pull request*.