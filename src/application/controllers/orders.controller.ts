import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrdersService } from 'src/domain/services/orders.service';
import {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
} from '../dtos/create-order.dto';

@ApiTags('orders')
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Processar múltiplos pedidos' })
  @ApiBody({ type: CreateOrderRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Pedidos processados com sucesso',
    type: [CreateOrderResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  async createOrder(
    @Body() payload: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    return this.ordersService.createOrder(payload.pedidos);
  }
}
