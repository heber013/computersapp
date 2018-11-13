import Page from './page';

class ComputerPage extends Page {
  /**
   * define elements
   */

  get name() {
    return $('#name');
  }

  get introducedDate() {
    return $('#introduced');
  }  

  get discontinuedDate() {
    return $('#discontinued');
  }  

  get company() {
    return $('#company');
  } 

  get createbtn() {
    return $('input.btn.primary');
  } 

  get deletebtn() {
    return $('.btn.danger');
  } 
  /**
   * your page specific methods
   */
  enterName(name) {
    this.name.setValue(name);
  }
  enterIntroducedDate(date) {
    this.introducedDate.setValue(date);
  }

  enterDiscontinuedDate(date) {
    this.discontinuedDate.setValue(date);
  }

  selectCompany(company) {
    this.company.selectByVisibleText(company);
  }

  selectCreateComputer(){
    this.createbtn.click()
  }

  selectDeleteComputer(){
    browser.waitForExist('.btn.danger')
    this.deletebtn.click()
  }

  isErrorPresentInField(field){
    if (browser.isExisting('div.clearfix.error #'+field)){
      return true;
    }
    else{
      return false;
    }
  }
}

export default new ComputerPage();
