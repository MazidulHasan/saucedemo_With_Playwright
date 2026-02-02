export class OverviewPage{
    constructor(page){
        this.page = page;
    }

    async finishCheckout(){
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }
}