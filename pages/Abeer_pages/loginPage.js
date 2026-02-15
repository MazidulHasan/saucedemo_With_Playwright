export class LoginPage{
    constructor(page, loginCredentials){
        this.loginCredentials = loginCredentials;
        this.page = page;
    }

    async login(){
        await this.page.getByRole('textbox', { name: 'Username'}).fill(this.loginCredentials.username);
        await this.page.getByRole('textbox', { name: 'Password'}).fill(this.loginCredentials.password);
        await this.page.getByRole('button', { name: 'Login'}).click();
    }
}