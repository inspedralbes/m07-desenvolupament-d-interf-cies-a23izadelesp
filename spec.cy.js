describe('Pruebas completas del sitio web', () => {
  it('Navega desde la página principal a la de proyectos', () => {
    cy.visit('http://chuclao-cypress.dam.inspedralbes.cat/');
    cy.title().should('include', 'MyName');
    cy.contains('Anar a Projectes').click();
    cy.url().should('include', 'projectes.html');
    cy.contains('Mis Proyectos').should('be.visible');
  });

  it('Verifica los enlaces de los proyectos y navega a ellos', () => {
    cy.visit('http://chuclao-cypress.dam.inspedralbes.cat/projectes.html');
    cy.get('ul li').should('have.length', 3);

    const proyectos = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3'];
    proyectos.forEach((proyecto) => {
      cy.contains(proyecto).should('have.attr', 'href').and('include', 'github.com');
      cy.contains(proyecto).invoke('removeAttr', 'target').then(($a) => {
        const href = $a.prop('href');
        cy.origin('https://github.com', { args: { href } }, ({ href }) => {
          cy.visit(href);
          cy.url().should('include', 'github.com');
        });
      });
      cy.visit('http://chuclao-cypress.dam.inspedralbes.cat/projectes.html');
    });

    cy.contains('Volver a Inicio').should('have.attr', 'href', 'index.html');
  });

  it('Vuelve a la página principal desde la página de proyectos', () => {
    cy.visit('http://chuclao-cypress.dam.inspedralbes.cat/projectes.html');
    cy.contains('Volver a Inicio').click();
    cy.url().should('not.include', 'projectes.html');
    cy.title().should('include', 'MyName');
  });
});
