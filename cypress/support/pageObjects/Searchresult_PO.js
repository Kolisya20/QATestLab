class SearchResults_PO {
    checkResultOfSearching() {
        let numberOfProducts;
        cy.get('.total-products > p').then($el => {
            numberOfProducts = $el.text().substr(-2, 1)
            cy.log(numberOfProducts)

            cy.get(".products .product-miniature")
            .should('have.length', numberOfProducts)
        })
    }

    sortProductsFromHighToLow() {
        cy.get('.select-title').click();
        cy.get('.select-list').contains('Цене: от высокой к низкой').click()
       

    }

    checkDiscount() {
        cy.get(".products .product-miniature").each(($el, index, $list) => {
            let discount = parseFloat(($el.find('.discount-percentage').text()).replace(',', '.'))
            let price= parseFloat(($el.find('.price').text()).replace(',', '.'))
            let textWithPrise= parseFloat(($el.find('.regular-price').text()).replace(',', '.'))
            if(isNaN(discount)) {discount = 0}
            if(isNaN(textWithPrise)) {textWithPrise = price}

            expect((textWithPrise * (100 + discount) / 100).toFixed(2) - price).to.eq(0)
        })
    }
}

export default SearchResults_PO;