class HomePage_PO {
    visitHomepage() {
        cy.visit('http://prestashop-automation.qatestlab.com.ua/ru/')
    }

    changeCurrency() {
        cy.get('._gray-darker').click();
        cy.get('.dropdown-menu > :nth-child(3) > .dropdown-item').click();
    }

    checkCurrencyOfAllTheProducts(currensy_symbol) {
        let currency_symbol;
        cy.get('._gray-darker').then($elem => {
            currency_symbol = $elem.text().substr(-1);
            // cy.log(currency_symbol);
        }) 

        cy.get(".products .product-miniature").each(($el, index, $list) => {
            // cy.log("index: " + index + " : " + $el.text())
            expect($el).to.contain(currency_symbol);
        })
    }   

    findDressProducts() {
        cy.get('.ui-autocomplete-input').type('dress');
        cy.get('button > .material-icons').click();
    }
}

export default HomePage_PO;