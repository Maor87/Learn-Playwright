import { expect } from '@playwright/test';
import CommonActions from '../Utils/commonActions.js';

export default class LoginPage {
    constructor(page) {
        this.actions = new CommonActions(page);
    }

    async navigate(){
        await this.actions.navigate('https://the-internet.herokuapp.com/login');
    }

    async login(username, password){
        await this.actions.fill('input[name="username"]', username);
        await this.actions.fill('input[name="password"]', password);
        await this.actions.click('button[type="submit"]');
    }

    async getErrorMessage(){ // Verifing password is invalid
        return await this.actions.getText('#flash');
    }

    async assertErrorMessage(expectedMessage){
        const actualMessage = await this.getErrorMessage();
        expect(actualMessage).toContain(expectedMessage);
    }
}