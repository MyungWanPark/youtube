/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Youtube', () => {
    beforeEach(() => {
        cy.intercept('GET', /(mostPopular)/g, {
            fixture: 'videos_data/popular.json',
        });
        cy.intercept('GET', /(search)/g, {
            fixture: 'videos_data/search.json',
        });
        cy.intercept('GET', /(related)/g, {
            fixture: 'videos_data/related.json',
        });
        cy.viewport(1200, 800);
        cy.visit('/');
    });

    it('renders app', () => {
        cy.findByText('YouTube').should('exist');
    });

    it('renders popular videos', () => {
        cy.findByText('temporary title 1').should('exist');
    });

    it('renders search result', () => {
        cy.findByPlaceholderText('search videos ..').type('bts');
        cy.findByRole('button').click();
        cy.findAllByRole('listitem').first().findByText('search title 1').should('exist');
    });

    it('goes to detail page', () => {
        cy.findAllByRole('listitem').first().click();
        cy.findByTitle('temporary title 1').should('exist');
        cy.findByText('temporary title 1').should('exist');
        cy.findByText('related title 1').should('exist');
    });
});
