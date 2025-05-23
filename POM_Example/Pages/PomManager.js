import LoginPage from "./LoginPage.js";
import SecurePage from "./SecurePage.js";
import CheckboxesPage from "./CheckboxesPage.js";

export default class PomManager {
    constructor(page) {
        this.page = page;
        this.login = new LoginPage(page);
        this.secure = new SecurePage(page);
        this.checkboxesPage = new CheckboxesPage(page);
    }
}