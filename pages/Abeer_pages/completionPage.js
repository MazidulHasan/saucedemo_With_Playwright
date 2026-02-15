export class CompletionPage{
    constructor(page){
        this.page = page;
        this.title = page.locator('//span[@class="title"]');
        this.header = page.locator('//h2[@class="complete-header"]');
        this.image = page.locator('//img[@class="pony_express"]');
        this.homeButton = page.getByRole('button', { name: 'Back Home' });
    }

    getTitle(){
        return this.title;
    }
    
    getHeader(){
        return this.header;
    }

    getImage(){
        return this.image;
    }

    goHome(){
        return this.homeButton.click();
    }
};