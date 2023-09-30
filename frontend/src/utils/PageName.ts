
export let pageTitle = (location: any) => {
    let pageTitle = '';
    switch (location.pathname) {
        case '/':
          pageTitle = 'Vendas';
          break;
        case '/sale':
          pageTitle = 'Nova Venda';
          break;
        case '/commissions':
          pageTitle = 'Comissões';
          break;
        default:
          pageTitle = 'Página não encontrada';
          break;
      }
    return pageTitle
}