import ComputerListPage from '../pageObjects/computerlist.page';
import ComputerPage from '../pageObjects/computer.page';

const { Then } = require('cucumber');

Then('I verify that the following computer exists:', (computertable) => {
  computertable.hashes().forEach(function (computer) {
  	assert.isTrue(ComputerListPage.computerExists(computer));
	});
 });

Then('I verify that the following computer does not exist:', (computertable) => {
  computertable.hashes().forEach(function (computer) {
  	assert.isFalse(ComputerListPage.computerExists(computer));
	});
 });

Then('an error is shown in the computer field {string}', field => {
	assert.isTrue(ComputerPage.isErrorPresentInField(field));
	});