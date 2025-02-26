/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import config from './config';
import { initServer } from './index';

const axios = require('axios'); // Instale com: npm install axios

// Função para enviar dados para sua API
async function sendToAPI(endpoint, data) {
  try {
    const response = await axios.post(endpoint, data);
    console.log('Dados enviados com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao enviar para a API:', error.message);
  }
}

// Ouvir mensagens recebidas
client.onMessage(async (message) => {
  // Extrair informações da mensagem
  const { body, from, timestamp } = message;

  // Exemplo de lógica para processar a mensagem:
  // Suponha que a mensagem seja um pedido no formato "/novopedido {dados}"
  if (body.startsWith('/novopedido')) {
    const pedidoData = parsePedido(body); // Crie uma função para extrair os dados
    await sendToAPI('https://apipizzaria-ea2f.onrender.com/pedidos/', pedidoData);
  }

  // Repita para clientes e produtos conforme necessário
  if (body.startsWith('/novocliente')) {
    const clienteData = parseCliente(body);
    await sendToAPI('https://apipizzaria-ea2f.onrender.com/clientes/', clienteData);
  }
});

initServer(config);
