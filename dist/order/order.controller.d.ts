import { OrderDto } from './dto/order.dto';
import { Response, Request } from 'express';
import { OrderService } from './order.service';
import { OrderFilterDto } from './dto/order-filter.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAllOrderHistory(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    addOrder(orderDto: OrderDto, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    deleteOrder(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllOrder(res: Response, query: OrderFilterDto): Promise<Response<any, Record<string, any>>>;
    getOneOrder(res: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
