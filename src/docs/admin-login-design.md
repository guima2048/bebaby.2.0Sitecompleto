# Design da Tela de Login Admin e 2FA

## Requisitos de Design

### Tela de Login Admin
1. **Layout**
   - Design minimalista e profissional
   - Cores institucionais do sistema
   - Responsivo (mobile first)
   - Foco em segurança e usabilidade

2. **Elementos**
   - Logo do sistema
   - Campo de e-mail
   - Campo de senha (com opção de mostrar/ocultar)
   - Botão de login
   - Link para recuperação de senha
   - Mensagens de erro/feedback
   - Indicador de força da senha

3. **Validações Visuais**
   - Feedback imediato de erros
   - Indicadores de campos obrigatórios
   - Mensagens de erro específicas
   - Animações suaves de transição

### Tela de 2FA
1. **Layout**
   - Design consistente com a tela de login
   - Foco no código de verificação
   - Mensagem clara sobre o envio do código

2. **Elementos**
   - Mensagem informativa sobre o envio do código
   - Campo para inserção do código (6 dígitos)
   - Botão de verificação
   - Botão para reenviar código
   - Contador de tempo para reenvio
   - Opção de usar outro método de autenticação

3. **Validações Visuais**
   - Feedback imediato do código
   - Indicador de tentativas restantes
   - Animações de loading
   - Mensagens de erro específicas

## Fluxo de Usuário
1. Acesso à URL /admin/login
2. Preenchimento de e-mail e senha
3. Validação das credenciais
4. Redirecionamento para tela de 2FA
5. Recebimento do código por e-mail
6. Inserção e validação do código
7. Acesso ao painel admin

## Considerações de Segurança
1. Rate limiting visual
2. Bloqueio temporário após tentativas falhas
3. Log de tentativas de acesso
4. Mensagens genéricas para evitar enumeração
5. Proteção contra força bruta

## Protótipo no Figma
[Link do protótipo será adicionado após a criação]

## Aprovação
- [ ] Design aprovado pelo time
- [ ] Feedback implementado
- [ ] Versão final validada
- [ ] Documentação atualizada 