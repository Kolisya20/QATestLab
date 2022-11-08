/// <reference types="cypress" />
import HomePage_PO from '../../support/pageObjects/Homepage_PO'
import SearchResults_PO from '../../support/pageObjects/Searchresult_PO'

describe('', () => {
    const homepage = new HomePage_PO();
    const searchResultsPage = new SearchResults_PO();
    before(() => {
        homepage.visitHomepage();
    });

    it('should check if selected currency and currency of all the products the same', () => {
        homepage.checkCurrencyOfAllTheProducts();    
    });
    
    it('should change the currency for USD', () => {
        homepage.changeCurrency();
        cy.get('._gray-darker').then($el => expect($el).to.contain('$'))        
    });

    it('should check if selected currency and currency of all the products the same', () => {
        homepage.checkCurrencyOfAllTheProducts();    
    });
    
    it('should find all products "dress" and check find results', () => {
        homepage.findDressProducts();
        searchResultsPage.checkResultOfSearching();
    });

    it('should sort products from high to low prise by regular-price', () => {
        homepage.changeCurrency();
        searchResultsPage.sortProductsFromHighToLow();    
        cy.get('.products').filter('.product-miniature').each(($el, index, $list) => {
            let price= parseFloat(($el.find('.price').text()).replace(',', '.'))
            cy.log(price)
        })         
    });

    it('should check if price after discount correct', () => {
        searchResultsPage.checkDiscount();   
    });
});