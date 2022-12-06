const Page = require('./page');

const expectChai = require('chai').expect;

class CalculatorPage extends Page {
    

    get singleAplicant () {
        return $('#application_type_single');
    }
     get selectDependent () {
        return $('select[title="Number of dependants"]');
    }
    get live_in () {
        return $('label[for="borrow_type_home"]');
    }
    get annualIncomeSingleAppl () {
        return $('//input [@aria-labelledby = "q2q1"]');
    }
    get otherAnnualIncomeSingleAppl() {
        return $('//input [@aria-labelledby = "q2q2"]');
    }
    get monthlyLiving () {
        return $('//input [@aria-labelledby = "q3q1"]');
    }
    get monthlyCurrentHL () {
        return $('//input [@aria-labelledby = "q3q2"]');
    }
    get monthlyOtherLoan () {
        return $('//input [@aria-labelledby = "q3q3"]');
    }
    get monthlyCommitments () {
        return $('//input [@aria-labelledby = "q3q4"]');
    }
    get totalCreditLimits () {
        return $('//input [@aria-labelledby = "q3q5"]');
    }
    get submit () {
        return $('#btnBorrowCalculater');
    }
    get estimatedAmount () {
        return $('#borrowResultTextAmount');
    }
    get startOver () {
        return $('div[class="result__restart"] button[aria-label="Start over"]');
    }
    get errorMsg () {
        return $('.borrow__error__text');
    }
    


    async enterYourDetails(dependent) {

        await this.singleAplicant.click();
        await this.selectDependent.selectByVisibleText(dependent); 
        
    }
    
    async enterYourEarnings(annualIncome, otherIncome) {
        await this.annualIncomeSingleAppl.setValue(annualIncome);
        await this.otherAnnualIncomeSingleAppl.setValue(otherIncome);
        
    } 
    async enterYourExpenses(livingExp,currentHL,otherLoan,commitments,totalCredits) {
        await this.monthlyLiving.setValue(livingExp);
        await this.monthlyCurrentHL.setValue(currentHL);
        await this.monthlyOtherLoan.setValue(otherLoan);
        await this.monthlyCommitments.setValue(commitments);
        await this.totalCreditLimits.setValue(totalCredits); 
        await browser.pause(5000);

    }
    async submitForm() {
        await browser.moveToElement(this.submit);
        await this.submit.click();
        await browser.pause(12000);
        
    }
    async verifyEstimatedAmount(estimatedAmount){
       const actualAmount = await this.estimatedAmount.getText();
       const amount = await actualAmount.replace(/\D/g,'');
        expectChai(amount).to.equal(estimatedAmount);
    }
   

}

module.exports = new CalculatorPage();
