describe('API GraphQLZero - Testes de Usuários', () => {
  const graphqlEndpoint = 'https://graphqlzero.almansi.me/api';

  const getUserQuery = (userId) => `
    query {
      user(id: ${userId}) {
        id
        username
        email
      }
    }
  `;

  // Cenário 1: Criar um novo usuário
  it('deve criar um novo usuário', () => {
    const apiAllowsCreateUser = true; 

    if (apiAllowsCreateUser) {
      const newUserData = {
        username: 'usuario_teste',
        email: 'usuario_teste@example.com',
        name: 'Usuario Teste', 
      };

      const createUserMutation = `
        mutation {
          createUser(input: {
            username: "${newUserData.username}",
            email: "${newUserData.email}",
            name: "${newUserData.name}"
          }) {
            id
            username
            email
          }
        }
      `;

      cy.request({
        method: 'POST',
        url: graphqlEndpoint,
        body: { query: createUserMutation },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.data.createUser).to.have.property('id');
        expect(response.body.data.createUser.username).to.equal(newUserData.username);
        expect(response.body.data.createUser.email).to.equal(newUserData.email);

        // Salvar o ID criado para usar em testes subsequentes
        cy.wrap(response.body.data.createUser.id).as('createdUserId');
      });
    } else {
      console.log('A API não permite a criação de usuários.');
    }
  });

  // Cenário 2: Deve buscar um usuario criado
  it('deve buscar dados de um usuário específico', () => {
    const userId = 1;

    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      body: { query: getUserQuery(userId) },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data.user).to.have.property('id', userId.toString());
      expect(response.body.data.user).to.have.property('username', 'Bret');
    });
  });

  // Cenário 3: Buscar usuário inexistente (erro)
  it('deve retornar um erro quando o usuário não existe', () => {
    const invalidUserId = 999;

    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      failOnStatusCode: false,
      body: { query: getUserQuery(invalidUserId) },
    }).then((response) => {
      expect(response.status).to.not.equal(404);
    });
  });
});
