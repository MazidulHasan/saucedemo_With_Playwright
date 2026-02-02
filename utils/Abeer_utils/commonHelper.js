export class CommonHelper{
    remove$(itemPrice){
        itemPrice = itemPrice.split('$');
        return Number(itemPrice[1]);
    }

    sumPrice(itemsPrice){
        let sum = 0;
        for(const itemPrice of itemsPrice){
            sum += this.remove$(itemPrice);
        }
        return '$' + sum.toString();
    }

    separatePrice(itemPrice){
        itemPrice = itemPrice.split('$');
        return '$' + itemPrice[1];
    }
}