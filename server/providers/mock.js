module.exports = {
  getFaturas: async (documento) => {
    // Simulando uma API externa de um sistema como IXC ou MK-Auth
    return new Promise(resolve => {
      setTimeout(() => {
        if (documento.replace(/\D/g, '') === '12345678909') {
          resolve([
            { id: 1, vencimento: '2023-11-10', valor: '99,90', status: 'pago' },
            { id: 2, vencimento: '2023-12-10', valor: '99,90', status: 'aberto', linhaDigitavel: '00190.00009 03333.333333 33333.333333 1 99990000009990' },
          ]);
        } else {
          resolve([]);
        }
      }, 500);
    });
  }
};
