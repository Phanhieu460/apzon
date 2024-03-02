import axios from "axios"

const saleInvoice = {
    getAll(): Promise<any> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/saleInvoice`)
    },
    deleteSaleInvoice(id: any): Promise<any> {
        return axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/saleInvoice/${id}`)
    },
    getSaleOrderInfo(id: any): Promise<any> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/api/saleInvoice/${id}`)
    },
    updateSaleInvoice(data: any): Promise<any> {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/api/saleInvoice/${data._id}`, data)
    }
}
export default saleInvoice
