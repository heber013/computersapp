import ComputerPage from '../pageObjects/computer.page';
import ComputerListPage from '../pageObjects/computerlist.page';

const { When } = require('cucumber');

When('I enter the computer data:', (computertable) => {
  computertable.hashes().forEach(function (computer) {
  	if (computer['name']) {
  		ComputerPage.enterName(computer['name']);
  	}
  	if (computer['introduced date']){
  		ComputerPage.enterIntroducedDate(computer['introduced date']);
  	}
  	if (computer['discontinued date']){
  		ComputerPage.enterDiscontinuedDate(computer['discontinued date']);	
  	}
  	if (computer['company']){
  		ComputerPage.selectCompany(computer['company']);	
  	}
	});	
});

When('I select to save the computer', () => {
	ComputerPage.selectCreateComputer();
});

When('I select to delete the computer', () => {
	ComputerPage.selectDeleteComputer();
});

When('I search the computer {string}', (name) => {
	ComputerListPage.searchComputer(name);
});

When('I open the computer {string}', (name) => {
	ComputerListPage.openComputer(name);
});