import palmSugar from './../assets/img/palm-sugar.jpg'
import greenTea from './../assets/img/green-tea.jpg'
import hanamiLatte from './../assets/img/hanami-latte.jpg'

const transactionData =[
    {
        id: 1,
        day: 'Saturday,',
        date: '5 March 2020',
        status: 'On The Way',
        subTotal: 69000,
        product:[
            {
                id: 1,
                name: 'Ice Coffee Palm Sugar',
                price: 33000,
                img: palmSugar,
                toping: [
                    {
                        id: 5,
                        name: 'Bill Berry Boba',
                        price: 2000,
                    },
                    {
                        id: 1,
                        name: 'Bubble Tea Gelatin',
                        price: 3000,
                    },
                ]
            },
            {
                id: 2,
                name: 'Ice Coffee Green Tea',
                price: 36000,
                img: greenTea,
                toping:[
                    {
                        id: 5,
                        name: 'Bill Berry Boba',
                        price: 2000,
                    },
                    {
                        id: 2,
                        name: 'Manggo',
                        price: 3000,
                    },
                ]
            },
        ]
    }
]

export default transactionData