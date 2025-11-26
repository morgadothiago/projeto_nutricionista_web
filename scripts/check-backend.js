#!/usr/bin/env node

/**
 * Script para verificar se o backend está rodando
 */

const http = require('http');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const url = new URL(API_URL);

console.log('🔍 Verificando backend...');
console.log('🔗 URL:', API_URL);
console.log('');

const options = {
  hostname: url.hostname,
  port: url.port || 80,
  path: '/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log('✅ Backend está respondendo!');
  console.log('📊 Status:', res.statusCode);
  console.log('');

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (data) {
      console.log('📄 Resposta:', data);
    }
  });
});

req.on('timeout', () => {
  console.error('⏰ Timeout - Backend não respondeu em 5 segundos');
  console.error('');
  console.error('❌ Backend não está acessível ou está muito lento');
  console.error('');
  console.error('📝 Próximos passos:');
  console.error('1. Verifique se o backend está rodando');
  console.error('2. Verifique se a porta está correta no .env');
  console.error('3. Verifique se há firewall bloqueando a conexão');
  req.destroy();
  process.exit(1);
});

req.on('error', (error) => {
  console.error('❌ Erro ao conectar com o backend');
  console.error('🔗 URL tentada:', API_URL);
  console.error('');

  if (error.code === 'ECONNREFUSED') {
    console.error('🔴 Conexão recusada - Backend não está rodando');
    console.error('');
    console.error('📝 Próximos passos:');
    console.error('1. Inicie o backend na porta', url.port);
    console.error('2. Ou atualize a variável NEXT_PUBLIC_API_URL no .env');
    console.error('');
    console.error('💡 Dica: O backend deve estar rodando em uma porta diferente do Next.js');
    console.error('   - Next.js: porta 3001 (ou a definida em NEXTAUTH_URL)');
    console.error('   - Backend: porta 3000 (ou a definida em NEXT_PUBLIC_API_URL)');
  } else if (error.code === 'ENOTFOUND') {
    console.error('🔴 Host não encontrado');
    console.error('');
    console.error('📝 Verifique se o hostname está correto:', url.hostname);
  } else {
    console.error('🔴 Erro:', error.message);
    console.error('📝 Código:', error.code);
  }

  process.exit(1);
});

req.end();
