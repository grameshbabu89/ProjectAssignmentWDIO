const { Given, When, Then } = require('@wdio/cucumber-framework');
const CalculatorPage = require('../pageobjects/calculator.page');


const expectChai = require('chai').expect;


Given(/^I launch the application$/, async () => {
    await CalculatorPage.open();
    await browser.maximizeWindow();

});

When(/^I am on the calculator page$/, async () => {
    await expect(browser).toHaveTitleContaining('Home loan borrowing power calculator')

});

When(/^I select single applicant and (.*) dependents$/, async (dependent) => {
    await CalculatorPage.enterYourDetails(dependent);
});

When(/^I select home to live in$/, async () => {
    await CalculatorPage.live_in.click();

});

When(/^I enter (.*) and (.*) for single appl$/, async (annualIncome, otherIncome) => {
    await CalculatorPage.enterYourEarnings(annualIncome, otherIncome);

});

When(/^I enter (.*), (.*),(.*), (.*) and (.*)$/, async (livingExp, currentHL, otherLoan, commitments, totalCredits) => {
    await CalculatorPage.enterYourExpenses(livingExp, currentHL, otherLoan, commitments, totalCredits);
});

When(/^I click Work out how much I could borrow button$/, async () => {
    await CalculatorPage.submit.click();
    await browser.pause(5000);

});

Then(/^I verify the estimated borrow amount could be (.*)$/, async (estimated) => {
    await CalculatorPage.verifyEstimatedAmount(estimated);
});

Then(/^I close the browser$/, async () => {
    await browser.closeWindow();

});
When(/^I click startover to reset the form$/, async () => {
    await CalculatorPage.startOver.click();

});

Then(/^I verify the fields are reset to 0$/, async () => {
    expectChai(await CalculatorPage.annualIncomeSingleAppl.getValue()).to.equal('0');
    expectChai(await CalculatorPage.otherAnnualIncomeSingleAppl.getValue()).to.equal('0');
    expectChai(await CalculatorPage.monthlyLiving.getValue()).to.equal('0');
    expectChai(await CalculatorPage.monthlyCurrentHL.getValue()).to.equal('0');
    expectChai(await CalculatorPage.monthlyOtherLoan.getValue()).to.equal('0');
    expectChai(await CalculatorPage.monthlyCommitments.getValue()).to.equal('0');
    expectChai(await CalculatorPage.totalCreditLimits.getValue()).to.equal('0');


});

Then(/^I verify the error message$/, async () => {
    const expErrMsg = "Based on the details you've entered, we're unable to give you an estimate of your borrowing power with this calculator. For questions, call us on 1800 035 500."
    let isVisible = await CalculatorPage.errorMsg.isDisplayedInViewport();

    if (isVisible) {
        const errMsg = await CalculatorPage.errorMsg.getText();
        expectChai(expErrMsg).to.equal(errMsg);
    }
    else {
        console.log("Error message is not displayed");
        expectChai(isVisible).to.equal(true);
    }


});



