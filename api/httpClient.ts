import axios, {AxiosInstance} from "axios";
import * as process from "node:process";

export default class HttpClient {
  private client: AxiosInstance;

  constructor() {
    console.log(process.env)
    this.client = axios.create({
      baseURL: 'http://127.0.0.1:8000'
    })
  }
}
