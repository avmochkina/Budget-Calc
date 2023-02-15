let generateTestData = (function () {
    
    let ExampleItem = function(type,desc, sum) {
        this.type = type;
        this.desc = desc;
        this.sum = sum;
    }
    
    let testData = [
        new ExampleItem('inc', 'Salary', 1245),
        new ExampleItem('inc', 'Freelance', 820),
        new ExampleItem('inc', 'Partner program', 110),
        new ExampleItem('inc', 'Digital sells', 90),
        new ExampleItem('exp', 'Rent', 400),
        new ExampleItem('exp', 'Fuel', 60),
        new ExampleItem('exp', 'Grocery', 300),
        new ExampleItem('exp', 'Entertainments', 1245),
    
    ];
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }
    
    function insertInUi() {
        let random = getRandomInt(testData.length);
        let randomItem = testData[random];
    
        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.desc;
        document.querySelector('#input__value').value = randomItem.sum;
    }
    return {
        init: insertInUi,
    }
})();

generateTestData.init();
