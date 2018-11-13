import Page from './page';

class ComputerListPage extends Page {
  /**
   * define elements
   */

  get add() {
    return $('#add');
  }

  get filterField() {
    return $('#searchbox');
  }

  get filterBtn() {
    return $('#searchsubmit');
  }

  get computersTable(){
    return $$('table.computers tbody tr');
  }

  /**
   * define or overwrite page methods
   */
  open() {
    super.open('/computers'); // this will append `computers` to the baseUrl to form complete URL
    browser.pause(1000);
  }

  /**
   * your page specific methods
   */
  addNewComputer() {
    this.add.click();
  }

  enterFilter(search) {
    this.filterField.setValue(search);
    this.filterBtn.click();
  }

  computerExistsByName(name){
      return browser.isExisting('//a[text()="'+name+'"]')
  }
  computerExists(computertofind) {
    var rows=this.computersTable;
    for (var index = 0; index < rows.length; index++) {
        var data=rows[index].elements('td');
        if (data.value[0].getText()==computertofind['name'] && 
          data.value[1].getText()==computertofind['introduced date'] &&
          data.value[2].getText()==computertofind['discontinued date'] &&
          data.value[3].getText()==computertofind['company']){
          return true;
        }
    }
    return false;
  }

  searchComputer(name){
    this.enterFilter(name);
  }

  openComputer(name){
    if (browser.isExisting('//a[text()="'+name+'"]')){
      browser.click('//a[text()="'+name+'"]');
    }
  }
}

export default new ComputerListPage();
