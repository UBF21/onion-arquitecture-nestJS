import { Customer } from "../entities/Customer.entity";
import { IBaseRepository } from "./base/IBaseRepository";

export interface ICustomerRepository extends IBaseRepository<Customer> {

}