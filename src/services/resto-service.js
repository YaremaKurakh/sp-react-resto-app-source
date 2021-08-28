export default class RestoService {
    _apiBase = 'https://my-json-server.typicode.com/yaremakurakh/sp-react-resto-app-db';

    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, recived ${res.status}`);
        }
        return await res.json();
    }

    async getMenuItems() {
        return await this.getResourse('/menu/');
    }

    async getItem(id) {
        const res = await this.getResourse('/menu/');
        const item = res.find((el) => {
            console.log(`el.id: ${el.id}, id: ${id}`);
            return el.id === +id;
        })
        return item;
    }

    async setOredr(order) {
        const number = await this.getOrderNumber();
        const newOrder = {
            id: number,
            order: order
        }

        const response = await fetch(`${this._apiBase}/orders`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if(!response.ok){
            throw new Error('json error')
        }
    }

    async getOrderNumber() {
        const res = await this.getResourse('/orders/');
        const orderNumber = res.length + 1;

        return orderNumber
    }

} 