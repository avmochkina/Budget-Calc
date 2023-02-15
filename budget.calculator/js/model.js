let modelController = (function() {

    const Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = parseInt(value);
    }

    const Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = parseInt(value);
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else this.percentage = -1;
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    function addItem(type, desc, val) {
        let newItem;
        let id;
        
        if(data.allItems[type].length > 0) {
            let lastIndex = data.allItems[type].length -1;
            id = data.allItems[type][lastIndex].id + 1;
        }else id = 0;


        if(type === 'inc') {
            newItem = new Income(id, desc, val)
        }
        else if(type === 'exp') {
            newItem = new Expense(id, desc, val)
        }

        data.allItems[type].push(newItem);
        return newItem
    }

    function deleteItem(type, Id) {
        let Ids = data.allItems[type].map((item) => {return item.id});

        let index = Ids.indexOf(Id);

        if(index !== -1) {
            data.allItems[type].splice(index, 1);
        }
    }

    function calculateTotalSum(type) {
        let sum = 0;

        data.allItems[type].forEach((item) => {
            sum = sum + item.value;
        })

        return sum;
    } 

    function calculateBudget() {
        data.totals.inc = calculateTotalSum('inc');
        data.totals.exp = calculateTotalSum('exp');

        data.budget = data.totals.inc - data.totals.exp;

        if(data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        }else data.percentage = -1;
    }

    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
        }
    }

    function calculatePercentage() {
        data.allItems.exp.forEach((item) => {
            item.calcPercentage(data.totals.inc);
        })
    }

    function getAllIdsAndPercentage() {
        let allPercentage = data.allItems.exp.map((item) => {
            return [item.id, item.getPercentage()];
        })

        return allPercentage;
    }

    const data = {
        allItems: {
            inc:[],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1,
    }

    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        deleteItem:deleteItem,
        calculatePercentage: calculatePercentage,
        getAllIdsAndPercentage: getAllIdsAndPercentage,
        test: function() {

        }
    }

})();