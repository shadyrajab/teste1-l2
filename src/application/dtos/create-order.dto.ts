import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Dimensoes {
  @ApiProperty({
    description: 'Altura do produto em cm',
    example: 40,
  })
  @IsNumber()
  altura: number;

  @ApiProperty({
    description: 'Largura do produto em cm',
    example: 10,
  })
  @IsNumber()
  largura: number;

  @ApiProperty({
    description: 'Comprimento do produto em cm',
    example: 25,
  })
  @IsNumber()
  comprimento: number;
}

export class Product {
  @ApiProperty({
    description: 'ID único do produto',
    example: 'PS5',
  })
  @IsString()
  produto_id: string;

  @ApiProperty({
    description: 'Dimensões do produto',
    type: Dimensoes,
  })
  @IsObject()
  dimensoes: Dimensoes;
}

export class Pedido {
  @ApiProperty({
    description: 'ID único do pedido',
    example: 1,
  })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({
    description: 'Lista de produtos do pedido',
    type: [Product],
  })
  @IsArray()
  produtos: Product[];
}

export class Box {
  @ApiProperty({
    description: 'ID único da caixa',
    example: 'BOX-001',
    nullable: true,
  })
  @IsString()
  caixa_id: string | null;

  @ApiProperty({
    description: 'Lista de IDs dos produtos na caixa',
    example: ['PS5', 'Volante'],
  })
  @IsArray()
  produtos: string[];

  @ApiProperty({
    description: 'Observação sobre a caixa',
    example: 'Produto não cabe em nenhuma caixa disponível.',
    required: false,
  })
  @IsString()
  observacao?: string;
}

export class CreateOrderRequestDto {
  @ApiProperty({
    description: 'Lista de pedidos para processar',
    type: [Pedido],
    example: [
      {
        pedido_id: 1,
        produtos: [
          {
            produto_id: 'PS5',
            dimensoes: { altura: 40, largura: 10, comprimento: 25 },
          },
          {
            produto_id: 'Volante',
            dimensoes: { altura: 40, largura: 30, comprimento: 30 },
          },
        ],
      },
      {
        pedido_id: 2,
        produtos: [
          {
            produto_id: 'Joystick',
            dimensoes: { altura: 15, largura: 20, comprimento: 10 },
          },
          {
            produto_id: 'Fifa 24',
            dimensoes: { altura: 10, largura: 30, comprimento: 10 },
          },
          {
            produto_id: 'Call of Duty',
            dimensoes: { altura: 30, largura: 15, comprimento: 10 },
          },
        ],
      },
      {
        pedido_id: 3,
        produtos: [
          {
            produto_id: 'Headset',
            dimensoes: { altura: 25, largura: 15, comprimento: 20 },
          },
        ],
      },
      {
        pedido_id: 4,
        produtos: [
          {
            produto_id: 'Mouse Gamer',
            dimensoes: { altura: 5, largura: 8, comprimento: 12 },
          },
          {
            produto_id: 'Teclado Mecânico',
            dimensoes: { altura: 4, largura: 45, comprimento: 15 },
          },
        ],
      },
      {
        pedido_id: 5,
        produtos: [
          {
            produto_id: 'Cadeira Gamer',
            dimensoes: { altura: 120, largura: 60, comprimento: 70 },
          },
        ],
      },
      {
        pedido_id: 6,
        produtos: [
          {
            produto_id: 'Webcam',
            dimensoes: { altura: 7, largura: 10, comprimento: 5 },
          },
          {
            produto_id: 'Microfone',
            dimensoes: { altura: 25, largura: 10, comprimento: 10 },
          },
          {
            produto_id: 'Monitor',
            dimensoes: { altura: 50, largura: 60, comprimento: 20 },
          },
          {
            produto_id: 'Notebook',
            dimensoes: { altura: 2, largura: 35, comprimento: 25 },
          },
        ],
      },
      {
        pedido_id: 7,
        produtos: [
          {
            produto_id: 'Jogo de Cabos',
            dimensoes: { altura: 5, largura: 15, comprimento: 10 },
          },
        ],
      },
      {
        pedido_id: 8,
        produtos: [
          {
            produto_id: 'Controle Xbox',
            dimensoes: { altura: 10, largura: 15, comprimento: 10 },
          },
          {
            produto_id: 'Carregador',
            dimensoes: { altura: 3, largura: 8, comprimento: 8 },
          },
        ],
      },
      {
        pedido_id: 9,
        produtos: [
          {
            produto_id: 'Tablet',
            dimensoes: { altura: 1, largura: 25, comprimento: 17 },
          },
        ],
      },
      {
        pedido_id: 10,
        produtos: [
          {
            produto_id: 'HD Externo',
            dimensoes: { altura: 2, largura: 8, comprimento: 12 },
          },
          {
            produto_id: 'Pendrive',
            dimensoes: { altura: 1, largura: 2, comprimento: 5 },
          },
        ],
      },
    ],
  })
  @IsArray()
  pedidos: Pedido[];
}

export class OrderWithBoxes {
  @ApiProperty({
    description: 'ID do pedido criado',
    example: 1,
  })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({
    description: 'Caixas geradas para o pedido',
    type: [Box],
  })
  @IsArray()
  caixas: Box[];
}

export class CreateOrderResponseDto {
  @ApiProperty({
    description: 'Lista de pedidos com caixas',
    type: [OrderWithBoxes],
  })
  @IsArray()
  pedidos: OrderWithBoxes[];
}
