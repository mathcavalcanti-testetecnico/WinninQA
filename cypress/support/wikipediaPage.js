class WikipediaPage {
  visitHomePage() {
    cy.visit('https://www.wikipedia.org/');
  }

  selectLanguage(language) {
    cy.get('#searchLanguage').select(language).should('have.value', language);
  }

  performSearch(searchTerm) {
    cy.get('input#searchInput')
      .type(searchTerm)
      .should('have.value', searchTerm);
    cy.get('button[type="submit"]').click();
  }

  verifyArticle(articleName) {
    cy.get('#firstHeading').should('be.visible');
    cy.get('#firstHeading')
      .invoke('text')
      .then((text) => {
        const formattedArticleName = articleName.replace(/_/g, ' ');
        expect(text).to.include(formattedArticleName);
      });
  }

  navigateToFooterLink(linkText) {
    cy.scrollTo('bottom');
    cy.contains(linkText, { timeout: 30000 })
      .should('exist')
      .should('be.visible')
      .click({ force: true });
  }

  // Verificar se as seções principais estão presentes
  verifyMainSections() {
    cy.contains('História').should('be.visible');
    cy.contains('Geografia').should('be.visible');
    cy.contains('Governo e Política').should('be.visible');
    cy.contains('Economia').should('be.visible');
  }

  // Verificar a imagem de capa
  verifyCoverImage() {
    cy.get('img').first().should('be.visible');
  }

  // Verificar se a infobox está visível
  verifyInfobox() {
    cy.get('.infobox').should('be.visible');
  }

  // Verificar links internos do artigo
  verifyInternalLinks() {
    cy.get('a').each(($link) => {
      const href = $link.prop('href');
      if (href && href.includes('https://pt.wikipedia.org/wiki/')) {
        cy.request(href).its('status').should('eq', 200);
      }
    });
  }

  // Verificar links externos do artigo
  verifyExternalLinks() {
    cy.get('a').each(($link) => {
      const href = $link.prop('href');
      if (href && !href.includes('https://pt.wikipedia.org/wiki/')) {
        cy.request(href).its('status').should('eq', 200);
      }
    });
  }

  // Testar a funcionalidade do áudio
  verifyAudio() {
    cy.get('.mw-tmh-play-icon').click();
    cy.get('.mw-tmh-play-icon').should('have.class', 'playing');
  }

  // Verificar tabela de conteúdo (TOC)
  verifyTOC() {
    cy.get('.toc').should('be.visible');
  }

  // Pesquisar em outra língua (Exemplo: "Brazil")
  searchInOtherLanguage(searchTerm, language = 'en') {
    this.selectLanguage(language);
    this.performSearch(searchTerm);
  }
}

export default new WikipediaPage();

