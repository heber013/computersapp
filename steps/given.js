import ComputerListPage from '../pageObjects/computerlist.page';
import ComputerPage from '../pageObjects/computer.page';

const { Given } = require('cucumber');

Given('I am on the computers page', () => {
  ComputerListPage.open();
});

Given('I select to add a new computer', () => {
  ComputerListPage.addNewComputer();
});

Given('I ensure there is no computer with name {string}', (name) => {
    ComputerListPage.enterFilter(name);
  	while(ComputerListPage.computerExistsByName(name)){
    	ComputerListPage.openComputer(name);
    	ComputerPage.selectDeleteComputer();
    	ComputerListPage.enterFilter(name);
    }
});

Given('The following computer exists:', (computertable) => {
  computertable.hashes().forEach(function (computer) {
  	ComputerListPage.enterFilter(computer['name']);
  	while(ComputerListPage.computerExistsByName(computer['name'])){
    	ComputerListPage.openComputer(computer['name']);
    	ComputerPage.selectDeleteComputer();
    	ComputerListPage.enterFilter(computer['name']);
    }
  	if ( ! ComputerListPage.computerExists(computer)){
  		ComputerListPage.addNewComputer();
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
	  	ComputerPage.selectCreateComputer();
  }
	});	
});