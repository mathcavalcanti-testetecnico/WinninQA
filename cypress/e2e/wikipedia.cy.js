/// <reference types="cypress" /
import wikipediaPage from '../support/wikipediaPage';

context('Testes E2E', () => {
  it('TC01: Acessa links de navegação no rodapé e valida o carregamento correto das páginas', () => {
    const footerLinks = ['Commons', 'Wikivoyage'];

    footerLinks.forEach((link) => {
      wikipediaPage.visitHomePage();

      wikipediaPage.navigateToFooterLink(link);

      if (link === 'Commons') {
        cy.origin('https://commons.wikimedia.org', { args: { link } }, (args) => {
          cy.get('.mainpage-welcome-sitename').should('be.visible');
          cy.contains('a collection of')
            .invoke('text')
            .then((text) => {
              expect(text).to.contain('freely usable media files');
              const numberOfFiles = text.match(/\d{1,3}(?:,\d{3})*/g);
              const totalFiles = parseInt(numberOfFiles[0].replace(/,/g, ''), 10);
              expect(totalFiles).to.be.greaterThan(111000000);
            });
        });
      } else if (link === 'Wikivoyage') {
        cy.origin('https://www.wikivoyage.org', { args: { link } }, (args) => {
          cy.get('h1').should('be.visible');
        });
      }

      wikipediaPage.visitHomePage();
    });
  });

  it('TC02: Verifica se a seleção de idioma persiste após atualização da página', () => {
    wikipediaPage.visitHomePage();
    wikipediaPage.selectLanguage('fi');
    cy.reload();
    cy.get('#searchLanguage').should('have.value', 'fi');
  });

  it('TC03: Altera idioma para Francês e verifica layout e redirecionamento', () => {
    const urlFrances = 'https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal';

    wikipediaPage.visitHomePage();
    cy.get('#js-link-box-fr').click({ force: true });

    cy.url().should('include', urlFrances);
    cy.get('html').should('have.attr', 'lang', 'fr');

    cy.contains('Article labellisé du jour').should('be.visible');
    const palavrasFrances = [
      'labellisé', 'encyclopédie', 'article', 'rechercher', 'portail',
    ];

    palavrasFrances.forEach((palavra) => {
      cy.contains(palavra, { matchCase: false }).should('exist');
    });
  });

  it('TC04: Verifica se os 10 idiomas estão presentes', () => {
    wikipediaPage.visitHomePage();

    const idiomasEsperados = [
      'pt', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'zh', 'it', 'fa',
    ];

    idiomasEsperados.forEach((idioma) => {
      cy.get(`#js-link-box-${idioma}`).should('exist');
    });
  });

  it('TC05: Verifica se a barra de pesquisa lida com entradas inválidas corretamente', () => {
    wikipediaPage.visitHomePage();
    wikipediaPage.performSearch('*&¨%$#$%¨&');

    cy.contains('A pesquisa não produziu resultados.').should('be.visible');
    cy.contains('Pode criar a página com o título "*&¨%$", mas verifique se há alguma página sobre esse assunto com outro nome nos seguintes resultados da busca (caso existam).').should('be.visible');
  });

  it('TC06: Verifica se o link "Download Wikipedia for Android and iOS" redireciona para a página correta', () => {
    wikipediaPage.visitHomePage();

    cy.get('.app-badge-android > a > .jsl10n').click();
    cy.wait(1000);
    cy.get('.app-badge-ios > a > .jsl10n');
    cy.wait(1000);
  });

  it('TC07: Verifica se o link de Doação no rodapé redireciona corretamente', () => {
    wikipediaPage.visitHomePage();

    cy.contains('Pode apoiar o nosso trabalho com um donativo.')
      .should('have.attr', 'href')
      .then((href) => {
        cy.window().then((win) => {
          const initialWindowCount = win.length;
          win.open(href, '_blank');
        });
      });
  });

  it('TC08: Verifica se o link "Política de Privacidade" no rodapé redireciona corretamente', () => {
    wikipediaPage.visitHomePage();

    cy.contains('Política de privacidade')
      .should('have.attr', 'href')
      .then((href) => {
        cy.window().then((win) => {
          const initialWindowCount = win.length;
          win.open(href, '_blank');
        });
      });
  });

  it('TC9: Verifica se o link Termos de uso funciona corretamente', () => {
    wikipediaPage.visitHomePage();

    cy.contains('licença Creative Commons Atribuição-Compartilha Igual')
      .should('have.attr', 'href')
      .then((href) => {
        cy.window().then((win) => {
          const initialWindowCount = win.length;
          win.open(href, '_blank');
        });
      });
  });

  describe('Validação da Página Brasil', () => {
    beforeEach(() => {
      cy.visit('https://en.wikipedia.org/wiki/Brazil');
    });

    it('Deve carregar a página em inglês', () => {
      cy.get('html').should('have.attr', 'lang', 'en');
    });

    it('Valida se o áudio está funcionando corretamente e fechar o modal', () => {
      cy.intercept('GET', '**/w/api.php?action=timedtext*').as('audioRequest');

      cy.get(':nth-child(6) > .mw-default-size > :nth-child(1) > .mw-tmh-player > .mw-tmh-play > .mw-tmh-play-icon').click();

      cy.wait('@audioRequest').then((interception) => {
        console.log(interception);
        expect(interception.response.statusCode).to.eq(200);
      });

      cy.get('a[title="Close media player"]').click();
    });

    it('Validar se os três links estão funcionando corretamente', () => {
      cy.get('#pt-sitesupport-2 > a > span').click();
      cy.visit('https://en.wikipedia.org/wiki/Brazil');

      cy.get('#pt-createaccount-2 > a > span').click();
      cy.url().should('include', 'Special:CreateAccount');
      cy.go('back');

      cy.get('#pt-login-2 > a > span').click();
      cy.url().should('include', 'Special:UserLogin');
      cy.go('back');
    });

    it('Listagem pelo "Talk" e valida se alguns campos estão presentes', () => {
      cy.get('#ca-talk > a > span').click();

      cy.contains('This is the talk page for discussing improvements to the Brazil article.').should('be.visible');
      cy.get('.mw-searchInput').type('Brasil');
      cy.get('.searchbox > .cdx-button').click();
      cy.go('back');
      cy.visit('https://en.wikipedia.org/wiki/Brazil');
    });

    it('Deve validar se o link "View history" está funcional e abre as revisões', () => {
      cy.get('#ca-history > a > span').click();
      cy.go('back');
      cy.visit('https://en.wikipedia.org/wiki/Brazil');
    });

    it('Deve validar se a imagem abre corretamente', () => {
      cy.get('img[src*="Pinturas_Rupestres"]').click();
      cy.url().should('include', 'Pinturas_Rupestres');
    });

    it('Deve validar se todos os links no menu de "Tools" estão funcionando corretamente', () => {
      cy.get('#vector-page-tools-dropdown-checkbox').click();

      cy.get('a[href="/wiki/Special:WhatLinksHere/Brazil"]').should('be.visible').click();
      cy.url().should('include', '/wiki/Special:WhatLinksHere/Brazil');
      cy.go('back');
    });

    it('Deve validar um link do footer e voltar para a página de origem', () => {
      cy.get('a[href="https://foundation.wikimedia.org/wiki/Special:MyLanguage/Policy:Privacy_policy"]')
        .first()
        .should('be.visible')
        .click();
      cy.visit('https://en.wikipedia.org/wiki/Brazil');
    });
  });
});
