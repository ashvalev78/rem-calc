export default {
  getConfig() {
    return fetch('http://ремонтбезвалидола.рф/api/calculators/1/');
  }
}