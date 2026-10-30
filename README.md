# KURIO — NFT Marketplace

Uma experiência digital de descoberta, gerenciamento e aquisição de NFTs, desenvolvida com foco em fidelidade visual, consistência de interface, organização arquitetural e integração entre dados e experiência do usuário.

## Sobre o projeto

O KURIO é uma aplicação de marketplace de NFTs concebida para proporcionar uma experiência completa ao colecionador, contemplando desde a exploração do catálogo até a finalização de pedidos e o gerenciamento de sua conta.

A solução foi desenvolvida em React e TypeScript, seguindo a identidade visual estabelecida no Figma e contemplando interfaces responsivas para desktop e dispositivos móveis.

O projeto implementa fluxos de autenticação, gerenciamento de carteiras, favoritos, carrinho, checkout e pedidos, utilizando uma camada de dados simulada para reproduzir o comportamento de uma aplicação integrada a serviços externos.

A aplicação também foi publicada em ambiente de produção, permitindo a navegação e a demonstração dos principais recursos diretamente pelo navegador.

## Tecnologias utilizadas

| Categoria | Tecnologia | Aplicação |
|---|---|---|
| Interface | React | Construção da aplicação e dos componentes |
| Linguagem | TypeScript | Tipagem estática e contratos entre camadas |
| Build | Vite | Desenvolvimento e geração da aplicação otimizada |
| Roteamento | TanStack Router | Navegação, parâmetros de URL e rotas dinâmicas |
| Estado remoto | TanStack Query | Consultas, mutations e gerenciamento de cache |
| Comunicação HTTP | Axios | Centralização das requisições à API |
| Estilização | Tailwind CSS | Sistema de estilos e responsividade |
| Componentes | shadcn/ui | Componentes de interface acessíveis e reutilizáveis |
| Simulação de API | MSW | Interceptação de requisições e respostas simuladas |
| Ícones | Lucide React | Elementos visuais da interface |
| Notificações | Sonner | Feedback de operações e interações |

## Funcionalidades implementadas

### Marketplace
- Catálogo de NFTs com busca, filtros e ordenação.
- Visualização detalhada dos ativos.
- Informações de coleção, atributos e disponibilidade.
- Navegação entre catálogo e detalhes.

### Carrinho e checkout
- Inclusão e remoção de NFTs.
- Gerenciamento de quantidades.
- Resumo de valores e taxas.
- Seleção de carteira e rede.
- Revisão e confirmação simulada de pedidos.

### Conta do colecionador
- Cadastro e autenticação.
- Gerenciamento de sessão.
- Perfil e informações pessoais.
- Cadastro e gerenciamento de carteiras.
- Carteira principal e secundária.
- Gerenciamento de favoritos.

### Experiência de interface
- Layout responsivo para desktop e mobile.
- Componentes reutilizáveis.
- Estados de carregamento, erro e ausência de resultados.
- Feedback visual para operações.
- Navegação integrada aos parâmetros da URL.

## Arquitetura

A aplicação adota uma organização orientada a funcionalidades (*feature-based architecture*), agrupando componentes, hooks, serviços, tipos e responsabilidades conforme o domínio da aplicação.

Essa estrutura favorece a separação entre interface, regras de negócio e comunicação com a camada de dados.

| Camada | Responsabilidade |
|---|---|
| Components | Apresentação e composição da interface |
| Hooks | Encapsulamento de estados e comportamentos |
| Services | Comunicação com os recursos da API |
| Types | Definição dos contratos e estruturas de dados |
| Context | Compartilhamento de estados entre componentes |
| Routes | Organização da navegação e dos fluxos da aplicação |
| Mocks | Simulação dos recursos e respostas da API |

O gerenciamento de dados assíncronos é realizado com TanStack Query, enquanto o TanStack Router organiza a navegação e os parâmetros de pesquisa. O Axios centraliza a comunicação HTTP, mantendo a interface desacoplada dos detalhes de transporte.

## API e endpoints

A camada de comunicação utiliza contratos REST para representar os principais recursos do marketplace. Durante a demonstração, as operações são simuladas pelo MSW, sem dependência de serviços privados ou de uma infraestrutura blockchain real.

| Recurso | Método | Endpoint | Descrição |
|---|---|---|---|
| Carteiras | GET | `/wallets` | Consulta as carteiras do usuário |
| Carteiras | POST | `/wallets` | Cadastra uma carteira |
| Carteiras | DELETE | `/wallets/:id` | Remove uma carteira |

Os demais recursos da aplicação são organizados por domínio, contemplando autenticação, catálogo, favoritos, carrinho, perfil e pedidos, conforme os serviços e contratos utilizados no projeto.

### Exemplo de operações

**Consulta de carteiras**
```http
GET /wallets
```

**Cadastro de carteira**
```http
POST /wallets
Content-Type: application/json
```

**Remoção de carteira**
```http
DELETE /wallets/:id
```

As respostas simuladas contemplam os estados de sucesso e os principais cenários de validação, autenticação, inexistência de recursos e conflitos de operação.

## Ambiente de demonstração

A aplicação foi disponibilizada publicamente, com os recursos simulados necessários para explorar a experiência do marketplace sem exigir conexão com carteiras externas, gateways de pagamento ou redes blockchain.

As operações de compra representam um fluxo demonstrativo: não há transferência real de criptomoedas nem execução de transações em blockchain.

## Links

| Recurso | Endereço |
|---|---|
| Aplicação publicada | [Acessar KURIO](COLOCAR_URL_DO_DEPLOY) |
| Repositório | [Código-fonte](COLOCAR_URL_DO_REPOSITORIO) |

## Considerações finais

O desenvolvimento do KURIO consolidou a implementação de uma aplicação frontend estruturada em domínios funcionais, com contratos tipados, gerenciamento de estado assíncrono e integração entre diferentes fluxos de negócio.

A entrega contempla uma aplicação navegável e publicada, com uma arquitetura preparada para evolução e substituição da camada simulada por serviços reais, mantendo a separação entre apresentação, regras de negócio e comunicação com a API.
