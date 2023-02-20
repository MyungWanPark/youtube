/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Youtube', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('render app', () => {
        cy.findByText('YouTube').should('exist');
    });
});
