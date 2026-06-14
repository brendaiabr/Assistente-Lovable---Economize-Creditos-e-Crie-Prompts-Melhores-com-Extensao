# Assistente Lovable

<p align="center">
  <strong>Extensão profissional para organizar prompts, estruturar contexto, auditar SEO/AEO e preparar integrações API/MCP no Lovable.</strong>
</p>

<p align="center">
  <img alt="Versão" src="https://img.shields.io/badge/versão-3.4.32-purple">
  <img alt="Chrome Extension" src="https://img.shields.io/badge/Chrome-Extension-blue">
  <img alt="Open Source" src="https://img.shields.io/badge/open--source-sim-green">
  <img alt="Lovable" src="https://img.shields.io/badge/feito%20para-Lovable-ff4fd8">
</p>

---

## Visão geral

**Assistente Lovable** é uma extensão para navegador criada para melhorar o fluxo de trabalho de quem usa o Lovable em projetos reais.

A proposta da extensão é ajudar o usuário a transformar pedidos soltos em instruções mais claras, organizadas e seguras, com foco em:

* SEO/AEO e indexação;
* APIs, MCP, conectores e secrets;
* prompts melhores para projetos já existentes;
* redução de retrabalho;
* alertas antes de ações que possam consumir créditos;
* histórico local e reutilização inteligente de prompts;
* organização de contexto, regras de negócio e padrões do projeto.

A extensão não tenta burlar regras da plataforma. Ela atua como uma camada de produtividade, análise e organização antes do envio ao Lovable.

---

## Principais funcionalidades

### 1. Painel de conexão com o Lovable

A extensão identifica quando há uma aba do Lovable aberta e informa o status do projeto.

Recursos:

* detecção da aba ativa do Lovable;
* status de projeto conectado/detectado;
* botão para atualizar conexão;
* botão para abrir o Lovable;
* funcionamento leve, sem polling agressivo;
* envio pela interface oficial da página.

---

### 2. Editor de prompt com diagnóstico

O painel possui uma área principal para escrever, preparar e analisar prompts antes de enviar.

Recursos:

* campo principal de prompt;
* diagnóstico automático do tipo de pedido;
* classificação de risco técnico;
* classificação de risco de consumo de créditos;
* alertas antes de envio;
* confirmação quando a ação pode consumir créditos;
* preparação local do prompt;
* redução local de prompt;
* divisão de prompts grandes em etapas;
* auditoria de escopo.

A extensão não bloqueia o usuário. Quando há risco de consumo de créditos, ela apenas avisa e pede confirmação.

---

### 3. Proteção para projetos já existentes

Os prompts gerados pela extensão incluem um fecho orientativo para evitar alterações indevidas em projetos já em produção ou em desenvolvimento avançado.

O fecho orienta o Lovable a:

* preservar telas, fluxos e regras já existentes;
* não alterar arquivos fora do escopo solicitado;
* não mexer em banco, Auth, RLS, Storage, RPCs ou migrations sem necessidade;
* pedir confirmação quando houver ambiguidade;
* listar arquivos alterados;
* informar riscos e validações necessárias.

---

## Ferramentas Pro

### SEO/AEO

Ferramenta voltada para preparar sites gerados no Lovable para melhor indexação em buscadores e respostas de IA.

Recursos:

* auditor SEO/AEO on-page;
* análise de title e meta description;
* verificação de canonical;
* verificação de viewport;
* verificação de robots;
* análise de Open Graph;
* análise de Twitter Card;
* verificação de JSON-LD;
* checagem de HTML semântico;
* verificação de tags como `main`, `header`, `section`, `article`, `nav` e `footer`;
* verificação de H1 e H2;
* alerta para imagens sem `alt`;
* alerta para links sem texto acessível;
* score estimado de SEO/AEO;
* geração de prompt de correção para o Lovable.

---

### Keywords

Ferramenta para estruturar páginas com foco em palavras-chave e intenção de busca.

Recursos:

* campo para palavras-chave principais;
* campo para palavras-chave secundárias;
* tipo de página;
* público-alvo;
* intenção de busca;
* estrutura desejada em Markdown;
* geração de prompt para landing pages;
* orientação para metadados, dados estruturados e SSR/pré-renderização.

---

### API/MCP

Ferramenta para ajudar na criação de prompts de integração com APIs externas, App Connectors e MCP/Chat Connectors.

Recursos:

* leitura de URL pública de documentação;
* campo para colar JSON OpenAPI/Swagger;
* campo para documentação manual;
* detecção básica de Base URL;
* detecção de método de autenticação;
* detecção de endpoints;
* identificação de possíveis secrets necessários;
* geração de prompt estruturado para Lovable;
* suporte conceitual a APIs REST, App Connectors e MCP.

---

### Secrets

Checklist visual para organizar variáveis de ambiente e chaves necessárias ao projeto.

Recursos:

* checklist local de secrets;
* lembrete para `LOVABLE_API_KEY`;
* lembrete para `SUPABASE_URL`;
* lembrete para `SUPABASE_ANON_KEY`;
* lembrete para `SERVICE_ROLE`;
* lembrete para chaves de terceiros;
* status visual de pendências;
* aviso para nunca colar valores reais de secrets no chat;
* armazenamento local no navegador.

---

### DB/Query

Simulador e explicador de performance para consultas Supabase/PostgreSQL.

Recursos:

* campo para colar queries, `CREATE TABLE`, policies, RPCs ou trechos Supabase;
* detecção de tabelas;
* detecção de filtros;
* detecção de joins;
* detecção de `ORDER BY`;
* alerta para `SELECT *`;
* alerta para ausência de `LIMIT`;
* alerta para uso de `OFFSET`;
* alerta para `ILIKE '%termo%'`;
* alerta para `COUNT(*)`;
* alerta para funções em filtros;
* alerta para uso de JSONB;
* sugestões iniciais de índices;
* sugestões de reescrita segura;
* prompt pronto para otimização no Lovable;
* orientação para usar `EXPLAIN ANALYZE`;
* cuidado com RLS, Auth, RPCs e isolamento de dados.

---

### Design

Gerenciador de paletas, tokens e instruções visuais para uso com fluxo visual e Dev Mode.

Recursos:

* tokens de cor;
* classes Tailwind comuns;
* padrões de cards;
* padrões de botões;
* instruções de foco acessível;
* padrões de animação;
* copiar instrução pronta;
* inserir instrução no prompt;
* importar tokens em JSON;
* exportar tokens em JSON;
* armazenamento local em `chrome.storage.local`.

---

### Histórico 2.0

Histórico paralelo de prompts, pensado para comparar tentativas e ramificações.

Recursos:

* histórico local dos prompts;
* busca no histórico;
* filtro por status;
* favoritos;
* marcação de “funcionou” ou “não funcionou”;
* comparação entre duas tentativas;
* relatório comparativo copiável;
* ramificações locais;
* campo de ramo atual;
* checklist pós-envio;
* exportação em JSON.

---

### Capturar erro atual

Ferramenta para coletar contexto básico da aba atual do Lovable.

Recursos:

* captura da URL atual;
* captura do título da página;
* captura de sinais visíveis de erro;
* coleta leve de contexto da aba;
* geração de prompt técnico de bugfix;
* orientação para preservar o projeto existente.

---

### Analisar resposta do Lovable

Campo para colar uma resposta recebida do Lovable e avaliar o próximo passo.

Recursos:

* análise de risco;
* alerta se a resposta parece ampla demais;
* alerta se envolve banco, Auth, RLS ou alterações sensíveis;
* sugestão de próximo prompt;
* ajuda para decidir se vale aceitar, ajustar ou pedir plano antes de executar.

---

### Modo Foco

Interface compacta para trabalhar com menos distrações.

Recursos:

* foco no prompt principal;
* ocultação de blocos secundários;
* fluxo mais limpo para telas menores;
* ideal para uso rápido durante desenvolvimento.

---

## Contexto Inteligente

O **Contexto Inteligente** funciona como uma biblioteca local de conhecimento do projeto.

Ele permite salvar blocos reutilizáveis, como:

* blueprint arquitetural;
* regras de negócio;
* paleta e design system;
* estrutura Supabase;
* regras de segurança;
* checklist de aceite;
* contexto SEO/AEO e SSR;
* contexto API/MCP;
* contexto de banco e performance;
* contexto visual/Dev Mode.

Recursos:

* criar contexto;
* editar contexto;
* excluir contexto;
* copiar contexto;
* inserir contexto no prompt;
* importar contextos em JSON;
* exportar contextos em JSON;
* restaurar modelos padrão.

Os contextos ficam armazenados localmente no navegador.

---

## Atalhos Rápidos

Os atalhos rápidos são modelos editáveis de prompts profissionais.

Incluem modelos para:

* debug;
* segurança;
* performance;
* layout;
* SEO/AEO;
* API/OpenAPI;
* MCP;
* App Connector;
* Secrets;
* Supabase;
* RLS/RPC;
* query PostgreSQL;
* acessibilidade React;
* QA final;
* refatoração de componente;
* limpeza TypeScript;
* Dev Mode;
* comparação de ramificações.

Recursos:

* usar atalho;
* copiar atalho;
* editar atalho;
* criar novo atalho;
* excluir atalho;
* buscar atalhos;
* importar atalhos;
* exportar atalhos;
* restaurar modelos padrão.

Todos os atalhos foram pensados para projetos já existentes, com orientação para não alterar partes fora do escopo.

---

## Histórico local e privacidade

A extensão salva informações localmente no navegador usando `chrome.storage.local`.

Principais chaves locais:

```txt
fl_chat_history
fl_prompt_templates
fl_custom_knowledge_snippets
fl_design_tokens
fl_current_prompt_branch
```

A extensão não depende de login próprio, não usa proxy antigo de comandos e não envia histórico para servidor externo.

---

## Aviso sobre créditos

O Assistente Lovable não altera as regras de cobrança do Lovable.

A extensão:

* alerta quando uma ação pode consumir créditos;
* sugere alternativas mais econômicas quando aplicável;
* não bloqueia funcionalidades importantes;
* avisa quando economizar créditos pode prejudicar SEO, API, MCP, segurança, banco ou qualidade de produção;
* permite continuar após confirmação.

O objetivo é evitar desperdício, não burlar cobrança.

---

## Instalação manual no Chrome

1. Baixe o pacote da extensão.
2. Extraia o arquivo `.zip`.
3. Acesse:

```txt
chrome://extensions/
```

4. Ative o **Modo do desenvolvedor**.
5. Clique em **Carregar sem compactação**.
6. Selecione a pasta extraída.
7. Abra um projeto no Lovable.
8. Abra o painel da extensão.
9. Clique em **Atualizar** no card de conexão.

---

## Permissões

A extensão utiliza permissões necessárias para funcionar dentro do fluxo do Lovable.

Permissões típicas:

* acesso à aba do Lovable;
* armazenamento local;
* leitura de documentação pública quando usada a ferramenta API/MCP;
* comunicação entre painel, background e content script.

A extensão processa a maior parte das informações localmente.

---

## Casos de uso

### Para criadores e makers

* organizar prompts antes de enviar;
* criar páginas melhores;
* evitar retrabalho;
* estruturar landing pages com SEO/AEO;
* documentar regras do projeto.

### Para desenvolvedores

* preparar prompts técnicos;
* revisar integrações API;
* organizar secrets;
* analisar queries;
* gerar instruções de refatoração;
* preservar arquitetura existente.

### Para freelancers

* manter histórico de tentativas;
* criar checklists de entrega;
* estruturar prompts reutilizáveis;
* reduzir mensagens vagas;
* melhorar qualidade das entregas.

### Para projetos em produção

* proteger regras existentes;
* evitar alterações fora do escopo;
* priorizar SEO/AEO;
* estruturar integrações com APIs;
* orientar mudanças com mais segurança.

---

## Roadmap sugerido

* presets por tipo de projeto;
* exportação completa de workspace local;
* backup/importação de todos os dados da extensão;
* modo equipe;
* perfis de prompt por cliente;
* templates avançados para SaaS, landing page, marketplace e dashboard;
* auditoria visual mais profunda;
* checklist de deploy;
* score de maturidade do projeto.

---

## Contribuição

Este projeto pode receber melhorias, sugestões e ajustes da comunidade.

Sugestões bem-vindas:

* novos modelos de prompts;
* melhorias de UX;
* novos checklists;
* novos contextos inteligentes;
* melhorias de documentação;
* correções de bugs.

---

## Apoio ao projeto

Se esta ferramenta ajudou você, é possível apoiar voluntariamente a manutenção e evolução do projeto.

```txt
Pix: doacoes@brenda.ia.br
Cripto: 0xEd46dADa43cb7b4e4D753D631B4E99002530D780
```

---

## Aviso legal

Assistente Lovable é uma ferramenta independente de apoio ao uso do Lovable.

Este projeto não é afiliado oficialmente ao Lovable.
A extensão não promete gratuidade em ações cobradas pela plataforma e não altera políticas, limites ou regras de uso do serviço original.

Use com responsabilidade, revise os prompts antes de enviar e valide alterações importantes antes de publicar qualquer projeto.

---

## Licença

Este projeto é distribuído sob a licença **GNU General Public License v3.0 (GPL-3.0)**.

Você pode usar, estudar, modificar e redistribuir este projeto, desde que qualquer versão modificada ou redistribuída também mantenha o código aberto sob os termos da GPL-3.0.

Consulte o arquivo `LICENSE` para mais detalhes.
