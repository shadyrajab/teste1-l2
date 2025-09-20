import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from 'src/modules/orders/orders.service';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('orders')
@Controller('/orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
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
  @ApiResponse({
    status: 401,
    description: 'Token de autenticação inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - permissão insuficiente',
  })
  async createOrder(
    @Body() payload: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    return this.ordersService.createOrder(payload.pedidos);
  }
}
