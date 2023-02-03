describe('Navigation', () => {
    it('should redirect to list page', () => {
        cy.visit('http://localhost:3000/');
        
        cy.url().should('include', '/lists');
    });
    
    it('should navigate to lists page', () => {
        cy.visit('http://localhost:3000/lists');
        
        cy.url().should('include', '/lists');
    });
    
    it('should navigate to products', () => {
        cy.visit('http://localhost:3000/');

        cy.get('a[href="/products"]').click();

        cy.url().should('include', '/products');
    });

    it('should navigate to add new list page', () => {
        cy.visit('http://localhost:3000/');

        cy.get('a[href="/new-list"]').click();

        cy.url().should('include', '/new-list');
    });

    it('should navigate to add new product page', () => {
        cy.visit('http://localhost:3000/');

        cy.get('a[href="/new-product"]').click();

        cy.url().should('include', '/new-product');
    });

    it('should navigate to add new product type page', () => {
        cy.visit('http://localhost:3000/');

        cy.get('a[href="/products/types"]').click();

        cy.url().should('include', '/products/types');
    });
});