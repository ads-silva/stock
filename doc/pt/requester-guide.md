# Guia do Utilizador Requisitante

## Sistema de Gestão de Stock - Manual do Requisitante de Reservas

Este guia explica como utilizar o Sistema de Gestão de Stock enquanto **Requisitante de Reservas**. A sua função permite criar pedidos de reserva de produtos e acompanhar o seu estado.

---

## Índice

1. [Introdução](#introdução)
2. [Visão Geral da Navegação](#visão-geral-da-navegação)
3. [Criar uma Nova Reserva](#criar-uma-nova-reserva)
4. [Visualizar as Suas Reservas](#visualizar-as-suas-reservas)
5. [Compreender os Estados das Reservas](#compreender-os-estados-das-reservas)
6. [Ciclo de Vida da Reserva](#ciclo-de-vida-da-reserva)

---

## Introdução

Após iniciar sessão com a sua conta de requisitante, terá acesso às funcionalidades de gestão de reservas. As suas principais tarefas incluem:

- Criar novas reservas de produtos
- Acompanhar o estado dos seus pedidos
- Visualizar detalhes das reservas

---

## Visão Geral da Navegação

Enquanto requisitante, tem acesso aos seguintes itens de menu na barra lateral:

| Item do Menu | Descrição |
|--------------|-----------|
| **Nova Reserva** | Criar um novo pedido de reserva de produtos |
| **Reservas** | Visualizar todas as suas reservas submetidas |

---

## Criar uma Nova Reserva

### Passo 1: Aceder à Página de Nova Reserva

Clique em **"Nova Reserva"** na navegação da barra lateral.

### Passo 2: Rever as Suas Informações

O formulário apresenta automaticamente as suas informações:
- **Nome do Requisitante**: O seu nome registado (apenas leitura)
- **Data/Hora**: Data e hora atuais (apenas leitura)

### Passo 3: Adicionar Produtos à Sua Reserva

1. Clique no botão **"Adicionar Produtos"** para abrir o modal de seleção de produtos
2. No modal, pode:
   - **Pesquisar** produtos por nome ou descrição
   - **Visualizar** o stock disponível de cada produto
   - **Selecionar** a quantidade desejada

### Passo 4: Regras de Seleção de Produtos

Ao selecionar produtos, tenha em atenção:
- A quantidade deve ser superior a 0
- A quantidade não pode exceder o stock disponível
- Produtos sem stock não podem ser selecionados
- O sistema mostra o stock restante após a sua seleção

### Passo 5: Gerir Produtos Selecionados

Antes de submeter:
- Reveja todos os produtos selecionados na lista
- Remova quaisquer produtos que já não necessite clicando no botão de remover
- Adicione mais produtos se necessário

### Passo 6: Submeter a Sua Reserva

Clique no botão **"Guardar"** para submeter a sua reserva. Irá:
- Ver uma notificação de sucesso
- Ser redirecionado para a lista de reservas
- A sua reserva aparecerá com o estado "Pendente"

---

## Visualizar as Suas Reservas

### Lista de Reservas

Navegue até **"Reservas"** na barra lateral para ver todos os seus pedidos submetidos.

A lista apresenta:
| Coluna | Descrição |
|--------|-----------|
| **ID** | Identificador único da reserva |
| **Estado** | Estado atual com distintivo colorido |
| **Itens** | Número de produtos na reserva |
| **Gestor** | Gestor atribuído (se existir) |
| **Criado Em** | Data de submissão da reserva |

### Visualizar Detalhes da Reserva

Clique no botão **"Detalhes"** em qualquer reserva para visualizar:
- Informação completa da reserva
- Dados do requisitante
- Informação do gestor atribuído
- Todos os produtos pedidos com quantidades
- Comentários do gestor (se existirem)
- Data de criação e atualização

---

## Compreender os Estados das Reservas

As suas reservas podem ter um de quatro estados:

### Pendente (Âmbar)
- O seu pedido foi submetido
- A aguardar revisão de um gestor
- Não é necessária qualquer ação da sua parte

### Disponível (Azul)
- O gestor aprovou o seu pedido
- Os itens estão preparados e prontos para levantamento
- Aguarde confirmação de entrega

### Concluído (Verde)
- Os itens foram-lhe entregues
- A reserva está finalizada
- Não é necessária mais nenhuma ação

### Rejeitado (Vermelho)
- O gestor não pôde satisfazer o seu pedido
- Os itens reservados foram devolvidos ao stock
- Verifique os comentários do gestor para saber o motivo

---

## Ciclo de Vida da Reserva

```
┌─────────────────┐
│  Criar Nova     │
│    Reserva      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    PENDENTE     │ ◄── A aguardar revisão do gestor
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│DISPONÍVEL│ │REJEITADO│ ◄── Gestor rejeitou
└────┬───┘ └────────┘      (itens devolvidos)
     │
     ▼
┌─────────────────┐
│   CONCLUÍDO     │ ◄── Itens entregues
└─────────────────┘
```

### Descrição do Fluxo

1. **Submeter Pedido**: Cria uma reserva com os produtos desejados
2. **Pendente**: O seu pedido aguarda revisão do gestor
3. **Decisão do Gestor**:
   - **Aprovar**: Estado muda para "Disponível" (itens prontos para levantamento)
   - **Rejeitar**: Estado muda para "Rejeitado" (itens devolvidos ao stock)
4. **Entrega**: Quando os itens são entregues, o estado torna-se "Concluído"

---

## Dicas para Requisitantes

1. **Verificar Stock**: Antes de criar uma reserva, o modal mostra as quantidades disponíveis
2. **Ser Específico**: Peça apenas o que necessita para ajudar os gestores a satisfazer os pedidos eficientemente
3. **Acompanhar Estado**: Verifique regularmente a sua lista de reservas para atualizações de estado
4. **Ler Comentários**: Se rejeitado, leia o comentário do gestor para explicação

---

## Precisa de Ajuda?

Contacte o administrador do sistema ou o gestor se encontrar problemas com:
- Disponibilidade de produtos
- Processamento de reservas
- Acesso à conta

---

*Sistema de Gestão de Stock - Guia do Requisitante v1.0*
