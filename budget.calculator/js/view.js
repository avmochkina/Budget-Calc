let viewController = (function() {
    let DomStrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expensesLabel: '#expense-label',
        expensesPercentLabel: '#expense-percent-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year',
    }

    function getInput() {
        return {
            type: document.querySelector(DomStrings.inputType).value,
            description: document.querySelector(DomStrings.inputDescription).value,
            value: document.querySelector(DomStrings.inputValue).value,
        }
    }

    function formatNumber(num, type) {
        num = Math.abs(num);
        num = num.toFixed(2);
        let numSplit = num.split('.');
        let int = numSplit[0];
        let dec = numSplit[1];

        if(int.length > 3) {
            let newInt = '';
            for(let i=0; i < int.length/3; i++) {
                newInt = ',' + int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + newInt;               
            }

            if(newInt[0] === ',') {
                newInt = newInt.substring(1);
            }
        }else if(int === '0') newInt = '0';
        else  newInt = int;

        let resultNumber = newInt + '.' + dec;

        if(type === 'exp') {
            resultNumber = '- ' + resultNumber; 
        }else if(type === 'inc') {
            resultNumber = '+ ' + resultNumber; 
        }

        return resultNumber;
    }

    function renderListItem(obj, type) {
        let containerElement;
        let Html;
        let newHtml;

        if(type === 'inc') {
            containerElement = DomStrings.incomeContainer;
            Html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        }else {
            containerElement = DomStrings.expenseContainer;
            Html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }
        newHtml = Html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', newHtml)
    }

    function clearFields() {
        let inputDesc, inputVal;
        inputDesc = document.querySelector(DomStrings.inputDescription);
        inputVal = document.querySelector(DomStrings.inputValue);

        inputDesc.value = '';
        inputDesc.focus();

        inputVal.value = '';
    }

    function updateBudget(obj) {
        let type;
        if(obj.budget > 0) {
            type = 'inc';
        }else type = 'exp';

        document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DomStrings.expensesLabel).textContent = formatNumber(obj.totalInc, 'exp');

        if(obj.percentage > 0) {
            document.querySelector(DomStrings.expensesPercentLabel).textContent = obj.percentage;        
        }else document.querySelector(DomStrings.expensesPercentLabel).textContent = '--';
    }

    function deleteListItem(itemId) {
        document.getElementById(itemId).remove();
    }
    
    function updateItemsPersantages(items) {
        items.forEach((item) => {
            let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent');
            
            if(item[1] >= 0) {
                el.parentElement.style.display = 'block';
                el.textContent = item[1] + '%';
            }else {
                el.parentElement.style.display = 'none';
            }

        });
    }

    function displayDate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();

        let monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь',        
        ]

        month = monthArr[month];

        document.querySelector(DomStrings.monthLabel).innerHTML = month;
        document.querySelector(DomStrings.yearLabel).innerHTML = year;
    }

    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        updateBudget: updateBudget,
        deleteListItem: deleteListItem,
        updateItemsPersantages: updateItemsPersantages,
        displayDate: displayDate,
        getDomStrings: function() {
            return DomStrings
        }
    }
})();