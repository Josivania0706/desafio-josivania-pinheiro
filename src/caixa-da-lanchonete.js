class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {

        let total = 0;
        const principais = [];
        const extras = [];
        const pedidoItens = [];

        if (itens.length === 0) { return "Não há itens no carrinho de compra!"; }

        // Distiguir entre principal e extra
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (this.cardapio[codigo] !== undefined) {
                pedidoItens.push({ codigo, quantidade: parseInt(quantidade) });
                if (codigo === 'chantily' || codigo === 'queijo') { 
                    extras.push({ codigo, quantidade: parseInt(quantidade) }); 
                }
                else { principais.push({ codigo, quantidade: parseInt(quantidade) });}
            } else { return "Item inválido!"; }
        }

        // Verificar se itens extras têm seus principais
        for (const extra of extras) {
            let principalCodigo = '';
            if (extra.codigo === 'chantily') { principalCodigo = 'cafe' }
            else if (extra.codigo === 'queijo') { principalCodigo = 'sanduiche'; }

            const temPrincipal = principais.some(item => item.codigo === principalCodigo);

            if (!temPrincipal) { return "Item extra não pode ser pedido sem o principal"; }
        }

        //calcular o preço dos pedidos
        for (const pedido of pedidoItens) { total += this.cardapio[pedido.codigo] * pedido.quantidade; }

        if (total === 0) { return "Quantidade inválida!"; }


        // Aplicar descontos e acréscimos
        if (formaDePagamento === 'dinheiro') { total *= (1 - 0.05); }
        else if (formaDePagamento === 'credito') { total *= (1 + 0.03); }
        else if (formaDePagamento !== 'debito') { return "Forma de pagamento inválida!"; }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
