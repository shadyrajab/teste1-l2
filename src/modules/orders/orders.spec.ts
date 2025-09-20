import { OrdersService } from './orders.service';

describe('Orders', () => {
  let service: OrdersService;

  beforeEach(() => {
    service = new OrdersService();
  });

  it('deve processar pedido simples', async () => {
    const pedidos = [
      {
        pedido_id: 1,
        produtos: [
          { produto_id: 'Mouse', dimensoes: { altura: 5, largura: 8, comprimento: 12 } }
        ]
      }
    ];

    const result = await service.createOrder(pedidos);
    
    expect(result.pedidos[0].pedido_id).toBe(1);
    expect(result.pedidos[0].caixas[0].caixa_id).toBe('Caixa_1');
  });

  it('deve processar produto grande', async () => {
    const pedidos = [
      {
        pedido_id: 2,
        produtos: [
          { produto_id: 'Monitor', dimensoes: { altura: 50, largura: 60, comprimento: 20 } }
        ]
      }
    ];

    const result = await service.createOrder(pedidos);
    
    expect(result.pedidos[0].caixas[0].caixa_id).toBe('Caixa_3');
  });

  it('deve retornar null para produto muito grande', async () => {
    const pedidos = [
      {
        pedido_id: 3,
        produtos: [
          { produto_id: 'Cadeira', dimensoes: { altura: 120, largura: 60, comprimento: 70 } }
        ]
      }
    ];

    const result = await service.createOrder(pedidos);
    
    expect(result.pedidos[0].caixas[0].caixa_id).toBeNull();
    expect(result.pedidos[0].caixas[0].observacao).toBe('Produto não cabe em nenhuma caixa disponível.');
  });

  it('deve processar múltiplos pedidos com vários produtos', async () => {
    const pedidos = [
      {
        pedido_id: 1,
        produtos: [
          { produto_id: 'PS5', dimensoes: { altura: 40, largura: 10, comprimento: 25 } },
          { produto_id: 'Volante', dimensoes: { altura: 40, largura: 30, comprimento: 30 } }
        ]
      },
      {
        pedido_id: 2,
        produtos: [
          { produto_id: 'Joystick', dimensoes: { altura: 15, largura: 20, comprimento: 10 } },
          { produto_id: 'Fifa 24', dimensoes: { altura: 10, largura: 30, comprimento: 10 } },
          { produto_id: 'Call of Duty', dimensoes: { altura: 30, largura: 15, comprimento: 10 } }
        ]
      },
      {
        pedido_id: 3,
        produtos: [
          { produto_id: 'Headset', dimensoes: { altura: 25, largura: 15, comprimento: 20 } }
        ]
      }
    ];

    const result = await service.createOrder(pedidos);
    
    expect(result.pedidos).toHaveLength(3);
    expect(result.pedidos[0].pedido_id).toBe(1);
    expect(result.pedidos[1].pedido_id).toBe(2);
    expect(result.pedidos[2].pedido_id).toBe(3);
    
    expect(result.pedidos[0].caixas[0].caixa_id).toBe('Caixa_1');
    expect(result.pedidos[0].caixas[0].produtos).toEqual(['PS5', 'Volante']);
    
    expect(result.pedidos[1].caixas[0].caixa_id).toBe('Caixa_1');
    expect(result.pedidos[1].caixas[0].produtos).toEqual(['Joystick', 'Fifa 24', 'Call of Duty']);
    
    expect(result.pedidos[2].caixas[0].caixa_id).toBe('Caixa_1');
    expect(result.pedidos[2].caixas[0].produtos).toEqual(['Headset']);
  });

  it('deve processar cenário com produtos grandes e pequenos', async () => {
    const pedidos = [
      {
        pedido_id: 1,
        produtos: [
          { produto_id: 'Mouse Gamer', dimensoes: { altura: 5, largura: 8, comprimento: 12 } },
          { produto_id: 'Teclado Mecânico', dimensoes: { altura: 4, largura: 45, comprimento: 15 } }
        ]
      },
      {
        pedido_id: 2,
        produtos: [
          { produto_id: 'Monitor', dimensoes: { altura: 50, largura: 60, comprimento: 20 } },
          { produto_id: 'Notebook', dimensoes: { altura: 2, largura: 35, comprimento: 25 } }
        ]
      },
      {
        pedido_id: 3,
        produtos: [
          { produto_id: 'Cadeira Gamer', dimensoes: { altura: 120, largura: 60, comprimento: 70 } }
        ]
      }
    ];

    const result = await service.createOrder(pedidos);
    
    expect(result.pedidos).toHaveLength(3);
    
    expect(result.pedidos[0].caixas[0].caixa_id).toBe('Caixa_1');
    
    expect(result.pedidos[1].caixas[0].caixa_id).toBe('Caixa_3');
    
    expect(result.pedidos[2].caixas[0].caixa_id).toBeNull();
    expect(result.pedidos[2].caixas[0].observacao).toBe('Produto não cabe em nenhuma caixa disponível.');
  });

  it('deve processar cenário complexo com rotação de produtos', async () => {
    const pedidos = [
      {
        pedido_id: 1,
        produtos: [
          { produto_id: 'Webcam', dimensoes: { altura: 7, largura: 10, comprimento: 5 } },
          { produto_id: 'Microfone', dimensoes: { altura: 25, largura: 10, comprimento: 10 } },
          { produto_id: 'Monitor', dimensoes: { altura: 50, largura: 60, comprimento: 20 } },
          { produto_id: 'Notebook', dimensoes: { altura: 2, largura: 35, comprimento: 25 } }
        ]
      },
      {
        pedido_id: 2,
        produtos: [
          { produto_id: 'Controle Xbox', dimensoes: { altura: 10, largura: 15, comprimento: 10 } },
          { produto_id: 'Carregador', dimensoes: { altura: 3, largura: 8, comprimento: 8 } }
        ]
      }
    ];

    const result = await service.createOrder(pedidos);
    
    expect(result.pedidos).toHaveLength(2);
    
    expect(result.pedidos[0].caixas[0].caixa_id).toBe('Caixa_3');
    expect(result.pedidos[0].caixas[0].produtos).toEqual(['Webcam', 'Microfone', 'Monitor', 'Notebook']);
    
    expect(result.pedidos[1].caixas[0].caixa_id).toBe('Caixa_1');
    expect(result.pedidos[1].caixas[0].produtos).toEqual(['Controle Xbox', 'Carregador']);
  });
});
