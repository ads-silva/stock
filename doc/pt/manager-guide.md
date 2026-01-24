# Guia do Utilizador Gestor

## Sistema de Gestão de Stock - Manual do Gestor de Reservas

Este guia explica como utilizar o Sistema de Gestão de Stock enquanto **Gestor de Reservas**. A sua função permite rever, aprovar e satisfazer pedidos de reserva, bem como monitorizar níveis de stock e análises.

---

## Índice

1. [Introdução](#introdução)
2. [Visão Geral da Navegação](#visão-geral-da-navegação)
3. [Painel de Controlo](#painel-de-controlo)
4. [Gerir Reservas](#gerir-reservas)
5. [Processar Reservas Pendentes](#processar-reservas-pendentes)
6. [Concluir Entregas](#concluir-entregas)
7. [Rejeitar Reservas](#rejeitar-reservas)
8. [Fluxo de Trabalho das Reservas](#fluxo-de-trabalho-das-reservas)

---

## Introdução

Após iniciar sessão com a sua conta de gestor, terá acesso a funcionalidades abrangentes de gestão de reservas e análises. As suas principais responsabilidades incluem:

- Monitorizar níveis de stock e tendências de reservas
- Rever e processar reservas pendentes
- Aprovar ou rejeitar pedidos
- Confirmar entregas

---

## Visão Geral da Navegação

Enquanto gestor, tem acesso aos seguintes itens de menu na barra lateral:

| Item do Menu | Descrição |
|--------------|-----------|
| **Painel de Controlo** | Visão geral de análises e monitorização |
| **Reservas** | Gerir todos os pedidos de reserva |

---

## Painel de Controlo

O Painel de Controlo fornece uma visão abrangente do seu sistema de gestão de stock.

### Cartões de Estatísticas

No topo do painel, encontrará métricas-chave:

| Métrica | Descrição |
|---------|-----------|
| **Total de Produtos** | Número de produtos no sistema |
| **Stock Total** | Stock combinado de todos os produtos |
| **Total de Reservas** | Todas as reservas no sistema |
| **Pendentes** | Reservas a aguardar a sua revisão |
| **Concluídas** | Reservas satisfeitas com sucesso |
| **Rejeitadas** | Reservas recusadas |

### Gráficos e Visualizações

O painel inclui várias ferramentas analíticas:

1. **Gráfico de Tendência de Reservas**: Tendência mensal da atividade de reservas
2. **Distribuição por Estado**: Gráfico circular mostrando divisão por estado
3. **Produtos Mais Pedidos**: Produtos mais frequentemente reservados
4. **Níveis de Stock**: Representação visual do inventário atual

### Alertas de Stock Baixo

Uma tabela dedicada destaca produtos com inventário baixo, ajudando-o a:
- Identificar itens que necessitam de reposição
- Antecipar potenciais problemas de satisfação de pedidos
- Planear atividades de aquisição

---

## Gerir Reservas

### Aceder à Lista de Reservas

Navegue até **"Reservas"** na barra lateral para ver todas as reservas no sistema.

### Filtrar por Estado

Use a interface de separadores para filtrar reservas:

| Separador | Mostra |
|-----------|--------|
| **Pendente** | Reservas a aguardar a sua revisão |
| **Disponível** | Aprovadas, prontas para entrega |
| **Rejeitado** | Reservas recusadas |
| **Concluído** | Entregues com sucesso |

### Tabela de Reservas

Cada reserva apresenta:

| Coluna | Descrição |
|--------|-----------|
| **ID** | Identificador único da reserva |
| **Pedido Por** | Nome do requisitante |
| **Itens** | Número de produtos pedidos |
| **Criado Em** | Data de submissão |
| **Ações** | Ações disponíveis conforme o estado |

---

## Processar Reservas Pendentes

As reservas pendentes requerem a sua revisão e decisão.

### Opção A: Revisão Completa via Página de Entrega

1. Clique no botão **"Entrega"** numa reserva pendente
2. Reveja a informação detalhada:
   - Nome e email do requisitante
   - Data de criação
   - Lista de itens pedidos com quantidades
3. Tome a sua decisão:
   - Clique em **"Marcar Disponível"** para aprovar
   - Clique em **"Rejeitar"** para recusar

### Opção B: Rejeição Rápida a partir da Lista

1. A partir da lista de reservas, clique diretamente em **"Rejeitar"**
2. Confirme a sua decisão no diálogo
3. Os itens serão devolvidos ao stock automaticamente

### Detalhes da Página de Entrega

A página de entrega mostra:
- **Informação do Requisitante**: Nome, email e data do pedido
- **Itens a Preparar**: Lista completa de produtos com quantidades pedidas

---

## Concluir Entregas

Quando os itens estiverem preparados e prontos, pode marcá-los como disponíveis para o requisitante.

### Marcar como Disponível

1. A partir do separador Pendente, clique em **"Entrega"** na reserva
2. Reveja os itens para garantir que estão preparados
3. Clique em **"Marcar Disponível"**
4. Confirme no diálogo: *"O requisitante será notificado que os itens estão prontos para levantamento"*
5. A reserva passa para o estado "Disponível"

### Confirmar Entrega

Quando o requisitante recebeu os seus itens:

1. Vá ao separador **Disponível**
2. Encontre a reserva
3. Clique em **"Entregar Itens"**
4. Confirme no diálogo
5. A reserva passa para o estado "Concluído"

---

## Rejeitar Reservas

Pode rejeitar reservas tanto do estado Pendente como Disponível.

### Quando Rejeitar

- Stock insuficiente
- Produto descontinuado
- Restrições orçamentais
- Pedido duplicado
- Pedido inválido

### Processo de Rejeição

1. Clique no botão **"Rejeitar"** na reserva
2. Reveja o diálogo de confirmação:
   - *"Tem a certeza que deseja rejeitar esta reserva?"*
   - *"Os itens reservados serão devolvidos ao stock"*
3. Clique em **Confirmar** para prosseguir
4. A reserva passa para o estado "Rejeitado"

**Nota**: O requisitante verá o estado atualizado e quaisquer comentários que tenha fornecido.

---

## Fluxo de Trabalho das Reservas

```
                  REQUISITANTE                          GESTOR
                       │                                  │
                       ▼                                  │
              ┌─────────────────┐                         │
              │ Submeter Pedido │                         │
              └────────┬────────┘                         │
                       │                                  │
                       ▼                                  ▼
              ┌─────────────────┐              ┌─────────────────┐
              │    PENDENTE     │──────────────│  Rever Pedido   │
              └─────────────────┘              └────────┬────────┘
                                                        │
                                              ┌─────────┴─────────┐
                                              │                   │
                                              ▼                   ▼
                                       ┌───────────┐       ┌───────────┐
                                       │  Aprovar  │       │  Rejeitar │
                                       └─────┬─────┘       └─────┬─────┘
                                             │                   │
                                             ▼                   ▼
              ┌─────────────────┐     ┌───────────┐       ┌───────────┐
              │ Itens Prontos   │◄────│ DISPONÍVEL│       │ REJEITADO │
              └─────────────────┘     └─────┬─────┘       └───────────┘
                       │                    │
                       ▼                    ▼
              ┌─────────────────┐    ┌───────────────┐
              │Levantar/Receber │◄───│Entregar Itens │
              └────────┬────────┘    └───────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   CONCLUÍDO     │
              └─────────────────┘
```

### Descrição dos Estados

| Estado | Descrição | Ações do Gestor |
|--------|-----------|-----------------|
| **Pendente** | Novo pedido a aguardar revisão | Aprovar ou Rejeitar |
| **Disponível** | Itens preparados para levantamento | Entregar ou Rejeitar |
| **Concluído** | Itens entregues | Nenhuma (estado final) |
| **Rejeitado** | Pedido recusado | Nenhuma (estado final) |

---

## Boas Práticas para Gestores

1. **Monitorização Regular**: Verifique as reservas pendentes frequentemente
2. **Consciência do Stock**: Use o painel para monitorizar itens com stock baixo
3. **Processamento Atempado**: Processe os pedidos prontamente para manter a eficiência
4. **Comunicação Clara**: Forneça comentários úteis ao rejeitar
5. **Análise de Tendências**: Use os gráficos do painel para identificar padrões

---

## Referência Rápida: Ações do Gestor

| Estado Atual | Ações Disponíveis |
|--------------|-------------------|
| Pendente | Ver Detalhes de Entrega, Marcar Disponível, Rejeitar |
| Disponível | Entregar Itens, Rejeitar |
| Concluído | Apenas Visualizar |
| Rejeitado | Apenas Visualizar |

---

## Precisa de Ajuda?

Contacte o administrador do sistema se encontrar problemas com:
- Dados do painel
- Acesso ao sistema
- Problemas técnicos

---

*Sistema de Gestão de Stock - Guia do Gestor v1.0*
