import { Injectable } from '@nestjs/common';
import {
  CreateOrderResponseDto,
  Product,
  Pedido,
  Box,
} from 'src/application/dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor() {}

  async createOrder(pedidos: Pedido[]): Promise<CreateOrderResponseDto> {
    const orderWithBoxes = pedidos.map((pedido) => {
      const idealBox = this.getIdealBox(pedido.produtos);

      let caixas: Box[];

      if (idealBox) {
        caixas = [
          {
            caixa_id: idealBox.boxName,
            produtos: pedido.produtos.map((product) => product.produto_id),
          },
        ];
      } else {
        caixas = [
          {
            caixa_id: null,
            produtos: pedido.produtos.map((product) => product.produto_id),
            observacao: 'Produto não cabe em nenhuma caixa disponível.',
          },
        ];
      }

      return {
        pedido_id: pedido.pedido_id,
        caixas: caixas,
      };
    });

    return { pedidos: orderWithBoxes };
  }

  private getIdealBox(products: Product[]) {
    const availableBoxes = {
      Caixa_1: [30, 40, 80],
      Caixa_2: [50, 50, 40],
      Caixa_3: [50, 80, 60],
    };

    for (const [boxName, [altura, largura, comprimento]] of Object.entries(
      availableBoxes,
    )) {
      if (this.canFitInBox(products, [altura, largura, comprimento])) {
        return { boxName, dimensions: [altura, largura, comprimento] };
      }
    }
  }

  private canFitInBox(
    products: Product[],
    boxDimensions: [number, number, number],
  ): boolean {
    const [boxAltura, boxLargura, boxComprimento] = boxDimensions;

    for (const product of products) {
      const { altura, largura, comprimento } = product.dimensoes;

      const orientations = [
        [altura, largura, comprimento],
        [altura, comprimento, largura],
        [largura, altura, comprimento],
        [largura, comprimento, altura],
        [comprimento, altura, largura],
        [comprimento, largura, altura],
      ];

      let fitsInAnyOrientation = false;
      for (const [h, w, l] of orientations) {
        if (h <= boxAltura && w <= boxLargura && l <= boxComprimento) {
          fitsInAnyOrientation = true;
          break;
        }
      }

      if (!fitsInAnyOrientation) {
        return false;
      }
    }

    return true;
  }
}
