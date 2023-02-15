let controller = (function(budgetCtrl, uiCtrl) {

    

    const setupEventListeners = function() {
        let Dom = uiCtrl.getDomStrings();
        document.querySelector(Dom.form).addEventListener('submit', ctrlAddItems)
    
        document.querySelector(Dom.budgetTable).addEventListener('click', ctrlDeleteItem)
    }

    function updatePercentage() {
        budgetCtrl.calculatePercentage();
        budgetCtrl.test();
        
        let IdsAndPercent = budgetCtrl.getAllIdsAndPercentage();

        uiCtrl.updateItemsPersantages(IdsAndPercent)
    }

    function ctrlAddItems(event) {
        event.preventDefault();

        //Receive data from form
        let input = uiCtrl.getInput();

        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {

            let newItem = budgetCtrl.addItem(input.type, input.description, input.value)
    
            budgetCtrl.test();
    
            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFields();
    
            generateTestData.init();

            updateBudget();

            updatePercentage();
        }

    }

    function ctrlDeleteItem(event) {
        let itemId, splitId, type, Id;
        
        if(event.target.closest('.item__remove')) {
            itemId = event.target.closest('li.budget-list__item').id;
            
            splitId = itemId.split('-');

            type = splitId[0];
            Id = parseInt(splitId[1]);

            budgetCtrl.deleteItem(type, Id);

            uiCtrl.deleteListItem(itemId);
        }
    }
    
    function updateBudget() {
        budgetCtrl.calculateBudget();

        let budgetObj = budgetCtrl.getBudget();

        uiCtrl.updateBudget(budgetObj)
    }

    return {
        init: function() {
            setupEventListeners();
            uiCtrl.displayDate();
            uiCtrl.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            })
        }
    }

})(modelController, viewController);

controller.init()