export default {
  getConfig(APIString) {
    if (APIString) return fetch(`http://ремонтбезвалидола.рф/api/calculators/${APIString}`);
    return fetch('http://ремонтбезвалидола.рф/api/calculators/1/');
  }
}