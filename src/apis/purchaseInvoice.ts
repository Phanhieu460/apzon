import axios from "axios"

const purchaseInvoice = {
    getAll(): Promise<any> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/purchaseInvoice`)
    },
    deletePurchaseInvoice(id: any): Promise<any> {
        return axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/purchaseInvoice/${id}`)
    },
    getSaleOrderInfo(id: any): Promise<any> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/purchaseInvoice/${id}`)
    },
    updatePurchaseInvoice(data: any): Promise<any> {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/api/purchaseInvoice/${data._id}`, data)
    }
}
export default purchaseInvoice
