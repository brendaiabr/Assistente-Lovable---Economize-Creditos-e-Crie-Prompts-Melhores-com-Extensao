(function(){
  // Build Pro Tools: conexão robusta de projeto, sem licença, sem proxy externo, anexos nativos, diagnóstico, construtor, histórico inteligente e modo foco. Auditoria 3.4.35: correções de runtime, conexão e UX.
  const DEFAULT_REMOTE_CONFIG = {
    branding: {
      app_name: "Assistente Lovable",
      panel_title: "Assistente Lovable",
      support_label: "Ajuda",
      support_url: "",
      shield_title: "Protegido",
      shield_subtitle: "Use a extensão para enviar prompts"
    },
    ui: {
      show_support_link: false
    },
    update: {
      force_update: false,
      latest_version: "",
      min_version: "",
      download_url: "",
      message: "",
      features: ""
    },
    api: {
      validate_license_url: "",
      proxy_command_url: ""
    }
  };

  const SP_SVG = {
    sparkles: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/><path d="M5 3l1 2"/><path d="M19 3l-1 2"/><path d="M5 21l1-2"/><path d="M19 21l-1-2"/></svg>',
    mic: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>',
    wrench: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    edit: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    shield: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    zap: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    msgSq: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    trendUp: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    palette: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    box: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    search: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    attach: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>',
    smartphone: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    moon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };


  const SP_PROJECT_SAFE_CLOSING = [
    'Fecho orientativo para projeto existente:',
    '- Considere que este projeto já possui telas, fluxos e regras em uso. Não modifique arquivos, componentes, dados, rotas ou comportamentos que não façam parte direta deste pedido.',
    '- Antes de alterar banco, Auth, RLS, Storage, RPC, migrations, permissões, deploy ou integrações, explique por que isso é indispensável e aplique somente a menor mudança segura.',
    '- Preserve visual, regras de negócio, histórico, dados e funcionalidades existentes; não remova código funcional sem justificativa objetiva.',
    '- Se o pedido estiver ambíguo ou puder gerar regressão, pare e peça confirmação ou entregue um plano curto antes de implementar.',
    '- Ao final, informe exatamente: arquivos alterados, o que foi preservado, riscos/pendências e passos de validação manual.'
  ].join('\n');

  function spAppendProjectSafeClosing(text) {
    var base = String(text || '').trim();
    if (!base) return '';
    if (/Fecho orientativo para projeto existente|projeto já possui telas, fluxos e regras em uso/i.test(base)) return base;
    return base + '\n\n---\n' + SP_PROJECT_SAFE_CLOSING;
  }

  const SP_DEFAULT_TEMPLATES = [
    {
      icon: SP_SVG.wrench,
      label: "🛠️ Super Debug",
      category: "Bug",
      prompt: "Atue como engenheiro sênior fazendo correção cirúrgica. Analise o erro/bug atual, identifique a causa provável e aplique a menor alteração segura possível. Preserve o que já funciona, não refatore fora do escopo e não altere banco, Auth, RLS, permissões ou integrações sem necessidade explícita. Ao final, informe: arquivos alterados, causa do problema, correção aplicada e como validar."
    },
    {
      icon: SP_SVG.shield,
      label: "🛡️ Segurança",
      category: "Segurança",
      prompt: "Faça uma auditoria de segurança prática e corrija apenas riscos reais encontrados. Verifique validação de entrada, exposição de dados sensíveis, permissões, rotas protegidas, tratamento de erros e uso seguro de APIs. Não altere schema, RLS, Auth ou políticas sem explicar exatamente o motivo. Entregue as correções com checklist de validação e possíveis impactos."
    },
    {
      icon: SP_SVG.zap,
      label: "⚡ Performance",
      category: "Performance",
      prompt: "Otimize a performance sem mudar o comportamento visual ou funcional. Priorize carregamento inicial, lazy loading, redução de renders desnecessários, imagens, bundle, consultas repetidas e estados pesados. Evite refatorações amplas. Ao final, liste o que foi otimizado, arquivos alterados e como testar se houve regressão."
    },
    {
      icon: SP_SVG.palette,
      label: "🎨 UI Premium",
      category: "Design",
      prompt: "Refine a interface como um designer sênior de produto SaaS. Melhore hierarquia visual, espaçamento, tipografia, contraste, microcopy, estados vazios, feedbacks e consistência dos componentes. Preserve a identidade atual e evite aparência genérica de IA. Não altere regras de negócio. Ao final, descreva os principais ajustes visuais e pontos de validação responsiva."
    },
    {
      icon: SP_SVG.smartphone,
      label: "📱 Mobile First",
      category: "Responsivo",
      prompt: "Revise a experiência mobile-first. Corrija cortes, overflow, botões pequenos, textos longos, espaçamentos, menus, formulários, modais e estados de carregamento em telas pequenas. Mantenha o desktop consistente. Ao final, informe breakpoints afetados, arquivos alterados e um checklist de teste em celular, tablet e desktop."
    },
    {
      icon: SP_SVG.moon,
      label: "🌙 Dark Mode",
      category: "Tema",
      prompt: "Implemente ou revise o modo escuro de forma consistente e acessível. Use tokens/variáveis quando possível, preserve contraste, estados hover/focus, bordas, cards, inputs, modais e mensagens de erro/sucesso. Não duplique estilos desnecessariamente. Ao final, explique onde o tema foi ajustado e como testar alternância e persistência."
    },
    {
      icon: SP_SVG.edit,
      label: "✍️ Copywriting",
      category: "Texto",
      prompt: "Revise os textos da página com copywriting claro, humano e orientado à conversão. Melhore títulos, subtítulos, CTAs, mensagens de erro, estados vazios e microcopy sem exageros ou promessas absolutas. Preserve o sentido do produto e não altere funcionalidades. Ao final, liste os textos alterados e o objetivo de cada melhoria."
    },
    {
      icon: SP_SVG.trendUp,
      label: "🔎 Auditor SEO/AEO On-Page",
      category: "SEO/AEO",
      prompt: "Audite e corrija SEO/AEO on-page considerando Lovable com SSR/pré-renderização quando disponível. Verifique title, meta description, canonical, Open Graph, Twitter Card, JSON-LD, HTML semântico, headings, alt text, links acessíveis e conteúdo indexável. Preserve projeto existente, layout e regras de negócio. Não invente métricas; se houver dados Semrush no chat, use apenas como referência. Ao final, liste arquivos alterados, metadados/dados estruturados criados e como validar."
    },
    {
      icon: SP_SVG.search,
      label: "🔑 Landing com palavras-chave",
      category: "SEO/AEO",
      prompt: "Crie ou otimize uma landing page a partir de palavras-chave fornecidas pelo usuário. Antes de implementar, organize intenção de busca, H1/H2, seções, FAQs, CTAs, metadados, Open Graph e JSON-LD. Se o Lovable disponibilizar dados Semrush no chat, use-os como apoio, sem inventar volume ou dificuldade. Preserve o projeto existente e faça a menor alteração segura possível."
    },
    {
      icon: SP_SVG.trendUp,
      label: "📈 SEO Pro",
      category: "SEO",
      prompt: "Faça otimização SEO técnica e semântica do projeto. Revise title, description, headings, estrutura de conteúdo, alt text, links internos, metadados sociais, sitemap/robots quando aplicável e performance básica. Não crie conteúdo genérico. Ao final, informe arquivos alterados, melhorias feitas e o que ainda depende de publicação/domínio."
    },
    {
      icon: SP_SVG.box,
      label: "🏗️ Arquitetura",
      category: "Código",
      prompt: "Faça uma refatoração incremental e segura da arquitetura. Separe responsabilidades, reduza duplicação, melhore nomes, componentes reutilizáveis e organização de arquivos sem mudar comportamento. Não faça reescrita ampla. Ao final, explique antes/depois, arquivos alterados, riscos e como validar que nada quebrou."
    },
    {
      icon: SP_SVG.search,
      label: "🧪 QA Final",
      category: "Qualidade",
      prompt: "Faça uma revisão final de qualidade como usuário exigente. Procure falhas de UX, inconsistências visuais, textos confusos, botões sem feedback, fluxos quebrados, responsividade e possíveis regressões. Corrija apenas problemas objetivos e de baixo risco. Ao final, entregue checklist do que foi revisado e pendências que exigem decisão humana."
    },
    {
      icon: SP_SVG.shield,
      label: "🗄️ Banco/RLS Seguro",
      category: "Banco",
      prompt: "Antes de alterar banco, Auth, Storage, RPC, triggers ou RLS, faça diagnóstico e explique o risco. Só aplique mudanças se forem indispensáveis para corrigir o problema solicitado. Preserve isolamento de dados entre usuários/famílias/organizações. Ao final, liste migrations/policies/RPCs alteradas, motivo, impacto e consultas de validação."
    },
    {
      icon: SP_SVG.msgSq,
      label: "🧭 Plano Econômico",
      category: "Planejamento",
      prompt: "Antes de implementar, transforme este pedido em um plano curto e econômico para reduzir idas e voltas. Divida em etapas, indique riscos, o que pode ser feito por Visual Edits/Code Mode/manual e o que realmente precisa de prompt no Lovable. Não altere código nesta etapa; apenas entregue plano e checklist de execução."
    },
    {
      icon: SP_SVG.box,
      label: "⚛️ Refatorar React A11y",
      category: "Refatoração",
      prompt: "Refatore o componente React selecionado ou descrito com foco em acessibilidade e manutenção. Preserve comportamento e visual geral. Verifique semântica HTML, labels, aria somente quando necessário, navegação por teclado, foco visível, estados disabled/loading, nomes de componentes, separação de responsabilidades e redução de duplicação. Não mexa em banco, Auth, RLS ou regras de negócio. Ao final, informe arquivos alterados, melhorias aplicadas e checklist de teste com teclado e leitor de tela básico."
    },
    {
      icon: SP_SVG.trendUp,
      label: "🐘 Performance Supabase",
      category: "Banco/Performance",
      prompt: "Analise a query, estrutura de tabela ou fluxo Supabase/PostgreSQL com foco em performance sem quebrar o projeto existente. Identifique gargalos prováveis, colunas usadas em filtros/joins/order by, risco de full scan, paginação, N+1, contagens caras e índices necessários. Antes de propor migration, explique o motivo, custo de escrita, risco e rollback. Entregue SQL mínimo para índices apenas quando indispensável, alternativa de reescrita da query, como medir com EXPLAIN ANALYZE e checklist de validação preservando RLS e isolamento de dados."
    },
    {
      icon: SP_SVG.trendUp,
      label: "🐘 Query PostgreSQL",
      category: "Banco",
      prompt: "Analise e otimize esta query PostgreSQL/Supabase com foco em performance e segurança. Explique o gargalo provável, sugira índices apenas se forem realmente necessários, evite alterações destrutivas e preserve RLS/isolamento de dados. Caso proponha migration, entregue SQL mínimo, reversível quando possível, e consultas de validação. Ao final, informe impacto esperado, riscos e como medir a melhoria."
    },
    {
      icon: SP_SVG.shield,
      label: "🔐 Revisar RLS/RPC",
      category: "Banco",
      prompt: "Revise esta lógica de Supabase RLS/RPC como arquiteto sênior. Confirme se há isolamento correto entre usuários/organizações, se funções usam SECURITY DEFINER apenas quando necessário, se inputs são validados e se grants não expõem dados. Não crie políticas redundantes. Entregue alterações mínimas, justificativa de segurança e consultas de teste para owner, membro autorizado, read-only e usuário sem acesso."
    },
    {
      icon: SP_SVG.wrench,
      label: "🧱 Refatorar componente grande",
      category: "Refatoração",
      prompt: "Refatore este componente grande de forma incremental. Extraia subcomponentes somente quando melhorar legibilidade, preserve props, estados e comportamento, evite reescrever a tela inteira e mantenha a UI igual salvo problemas objetivos. Não altere integrações, banco ou rotas. Ao final, liste antes/depois, arquivos criados/alterados e um checklist de regressão visual e funcional."
    },
    {
      icon: SP_SVG.search,
      label: "🧹 Limpeza TypeScript",
      category: "Código",
      prompt: "Faça uma limpeza TypeScript segura: remova código morto, tipos frouxos, imports não usados, estados duplicados e funções repetidas. Não mude comportamento funcional. Prefira tipos explícitos onde ajudam, preserve compatibilidade e evite refatoração ampla. Ao final, informe arquivos alterados, o que foi removido e como validar build, lint e fluxos principais."
    },
    {
      icon: SP_SVG.box,
      label: "🔌 Conectar API/OpenAPI",
      category: "Integrações",
      prompt: "Gere uma integração segura para API externa no Lovable a partir de um esquema OpenAPI/Swagger ou documentação fornecida. Estruture a resposta em Base URL, método de autenticação, endpoints, parâmetros, exemplo de request/response e secrets necessários. Não exponha chaves no frontend; use secrets/variáveis de ambiente. Preserve projeto existente e não altere rotas, banco, Auth, RLS ou regras fora do escopo. Ao final, liste arquivos alterados e como validar em desenvolvimento e publicado."
    },
    {
      icon: SP_SVG.shield,
      label: "🔑 Validar Secrets/Env",
      category: "Integrações",
      prompt: "Audite os conectores, APIs e variáveis de ambiente necessárias para este projeto Lovable. Liste quais secrets precisam existir, onde devem ser usados, quais nunca devem ir para o frontend e quais validações devem ocorrer em ambiente publicado. Não peça nem registre valores reais de secrets; trabalhe apenas com nomes das variáveis. Preserve o projeto existente e entregue checklist de configuração."
    },
    {
      icon: SP_SVG.msgSq,
      label: "🧩 Planejar MCP Connector",
      category: "MCP/Connectors",
      prompt: "Planeje a integração de um Chat Connector/MCP server para fornecer contexto à IA no Lovable. Liste objetivo, dados expostos, escopo mínimo, permissões, autenticação, riscos de privacidade e exemplos de uso no chat. Não implemente nada sensível sem confirmação. Preserve o projeto existente e entregue um plano seguro antes de qualquer alteração."
    },
    {
      icon: SP_SVG.wrench,
      label: "🛠️ App Connector Seguro",
      category: "MCP/Connectors",
      prompt: "Planeje ou revise um App Connector com rotas autenticadas para Lovable. Garanta uso seguro de LOVABLE_API_KEY e secrets de terceiros, validação de entrada, rate limiting básico, tratamento de erros e separação entre frontend e backend. Não exponha chaves no cliente. Preserve o projeto existente e liste arquivos/rotas envolvidos e testes de validação."
    },
    {
      icon: SP_SVG.palette,
      label: "🎨 Refatorar visual selecionado",
      category: "Dev Mode/Visual",
      prompt: "Refatore apenas o elemento ou componente selecionado no Dev Mode/Visual Edit. Aplique melhoria visual incremental com tokens de design, contraste acessível, responsividade e estados hover/focus. Não altere regras de negócio, rotas, dados, banco, Auth ou componentes fora do escopo. Se precisar de biblioteca externa, peça confirmação antes. Ao final, liste arquivos alterados e validação visual."
    },
    {
      icon: SP_SVG.box,
      label: "🧩 Padronizar componente",
      category: "Dev Mode/Visual",
      prompt: "Padronize o componente selecionado para ficar reutilizável, acessível e consistente com o design system existente. Preserve props, comportamento, dados e integração atual. Não reescreva telas inteiras nem altere lógica fora do componente. Ao final, informe o que foi preservado, o que mudou e como testar."
    },
    {
      icon: SP_SVG.clock,
      label: "🧬 Comparar ramificações",
      category: "Histórico 2.0",
      prompt: "Compare a versão atual com a ramificação/versão anterior do Lovable. Identifique diferenças relevantes, possíveis regressões, arquivos impactados e qual prompt/abordagem parece mais segura. Não aplique mudanças sem confirmação; entregue primeiro um diagnóstico curto e plano de validação."
    }
  ];

  const SP_DEFAULT_KNOWLEDGE_SNIPPETS = [
    {
      label: "🏗️ Blueprint arquitetural",
      category: "Arquitetura",
      content: "Arquitetura padrão do app:\n- Frontend React/TypeScript com componentes pequenos e reutilizáveis.\n- UI mobile-first, acessível e consistente.\n- Preservar rotas, autenticação e fluxos existentes.\n- Alterações devem ser incrementais, com menor superfície de risco.\n- Evitar reescritas amplas sem necessidade explícita."
    },
    {
      label: "📌 Regras de negócio",
      category: "Negócio",
      content: "Regras de negócio importantes:\n- Preserve regras já implementadas e não invente novos fluxos.\n- Em caso de dúvida, pergunte antes de alterar lógica sensível.\n- Não remova validações existentes.\n- Toda mudança deve manter compatibilidade com usuários atuais.\n- Ao final, informe impacto e pontos de validação manual."
    },
    {
      label: "🎨 Paleta e design system",
      category: "UI",
      content: "Diretrizes visuais:\n- Interface moderna, limpa, responsiva e mobile-first.\n- Usar tokens/variáveis de tema sempre que possível.\n- Preservar contraste, estados hover/focus/disabled e espaçamentos consistentes.\n- Evitar aparência genérica; priorizar acabamento premium e legibilidade.\n- Não alterar identidade visual sem pedido explícito."
    },
    {
      label: "🗄️ Supabase seguro",
      category: "Supabase",
      content: "Diretrizes Supabase:\n- Nunca expor service_role, secrets ou tokens no frontend.\n- Usar migrations versionadas para mudanças de banco.\n- RLS deve preservar isolamento entre usuários/organizações.\n- RPCs devem validar inputs e permissões.\n- Não alterar Auth, Storage, RLS, triggers ou policies sem justificar risco e testes."
    },
    {
      label: "🐘 Performance PostgreSQL/Supabase",
      category: "Banco",
      content: "Diretrizes para performance de banco:\n- Otimizar queries com menor mudança possível e preservar RLS/isolamento de dados.\n- Antes de criar índices, justificar coluna, seletividade, filtros, joins, order by e impacto em escrita.\n- Evitar SELECT * em listas, paginação sem limite, contagens caras, N+1 e filtros com funções que impedem índice.\n- Preferir EXPLAIN ANALYZE, métricas antes/depois e rollback quando houver migration.\n- Não alterar schema, policies, RPCs ou dados sem necessidade e validação explícita."
    },
    {
      label: "🔎 SEO/AEO e SSR",
      category: "SEO/AEO",
      content: "Diretrizes SEO/AEO:\n- Usar title, meta description, canonical, Open Graph e Twitter Card coerentes com o conteúdo real.\n- Incluir JSON-LD quando fizer sentido: WebSite, Organization, Article, FAQPage, BreadcrumbList, Product ou LocalBusiness.\n- Preferir SSR/pré-renderização/metadados nativos do Lovable quando disponíveis.\n- Usar HTML semântico: header, main, section, article, nav e footer.\n- Não inventar volume de busca, Semrush ou métricas. Usar palavras-chave fornecidas pelo usuário.\n- Preservar layout, regras de negócio e rotas existentes."
    },

    {
      label: "🔌 Conectores e APIs",
      category: "Integrações",
      content: "Diretrizes para APIs e conectores:\n- Nunca expor secrets, tokens, LOVABLE_API_KEY ou chaves de terceiros no frontend.\n- Descrever integrações em Base URL, Auth Method, Endpoints, parâmetros e exemplos.\n- Para App Connectors, usar rotas autenticadas e validação de entrada.\n- Para Chat Connectors/MCP, limitar escopo de dados e contexto enviado à IA.\n- Em produção, validar que todas as variáveis de ambiente necessárias foram configuradas.\n- Preservar projeto existente e pedir confirmação antes de alterar integrações sensíveis."
    },
    {
      label: "✅ Checklist de aceite",
      category: "QA",
      content: "Critérios de aceite padrão:\n- Não quebrar fluxos existentes.\n- Funcionar em mobile e desktop.\n- Sem erros no console.\n- Estados loading/erro/vazio tratados.\n- Arquivos alterados listados ao final.\n- Instruções claras de validação manual."
    }
  ];

  function spEscapeHtml(s) {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  function spTemplateStatusBadge(status) {
    if (status === 'trial') return '<span class="sp-status-badge sp-badge-test">TEST</span>';
    return '<span class="sp-status-badge sp-badge-pro">PRO</span>';
  }

  function spDialogToneMeta(tone) {
    var map = {
      success: { icon: '✅', label: 'Sucesso' },
      info: { icon: 'ℹ️', label: 'Informação' },
      warning: { icon: '⚠️', label: 'Atenção' },
      danger: { icon: '🛑', label: 'Confirmar risco' },
      question: { icon: '❔', label: 'Confirmação' },
      credit: { icon: '🛡️', label: 'Créditos' }
    };
    return map[tone] || map.info;
  }

  function spHtmlToLines(message) {
    return spEscapeHtml(message).replace(/\n/g, '<br>');
  }

  function spTemplateAlert(title, message, opts) {
    var tone = (opts && opts.tone) || 'success';
    var meta = spDialogToneMeta(tone);
    return '<div class="sp-alert-box sp-premium-dialog sp-premium-dialog-' + tone + '" role="dialog" aria-modal="true">' +
      '<div class="sp-premium-dialog-topline"></div>' +
      '<div class="sp-alert-icon sp-premium-icon" aria-hidden="true">' + meta.icon + '</div>' +
      '<div class="sp-premium-kicker">' + spEscapeHtml((opts && opts.kicker) || meta.label) + '</div>' +
      '<div class="sp-alert-title sp-premium-title">' + spEscapeHtml(title) + '</div>' +
      '<div class="sp-alert-message sp-premium-message">' + spHtmlToLines(message) + '</div>' +
      '<div class="sp-premium-actions sp-premium-actions-single"><button class="sp-alert-ok sp-premium-btn sp-premium-btn-primary">' + spEscapeHtml((opts && opts.okLabel) || 'Entendi') + '</button></div>' +
    '</div>';
  }

  // Template de Banner de Atualização removido

  function spTemplateCountdown(label, timeStr, pct, urgentClass) {
    return '<div class="sp-countdown-row">' +
      '<span>&#x23F3;</span>' +
      '<span class="sp-countdown-label">' + label + '</span>' +
      '<span class="sp-countdown-time">' + timeStr + '</span>' +
    '</div>' +
    '<div class="sp-trial-bar">' +
      '<div class="sp-trial-bar-fill' + urgentClass + '" style="width:' + pct + '%"></div>' +
    '</div>';
  }

  function spTemplateAttachItem(f, index) {
    const thumb = f.previewUrl
      ? '<img class="sp-attach-thumb" src="' + f.previewUrl + '" alt="">'
      : '<div class="sp-attach-icon">&#128196;</div>';
    return '<div class="sp-attach-item' + (f.uploading ? ' sp-attach-uploading' : '') + '">' +
      thumb +
      '<div class="sp-attach-info">' +
        '<span class="sp-attach-name" title="' + spEscapeHtml(f.file_name) + '">' + spEscapeHtml(f.file_name) + '</span>' +
        '<span class="sp-attach-size">' + spEscapeHtml(f.sizeLabel) + '</span>' +
      '</div>' +
      '<button class="sp-attach-remove" data-idx="' + index + '">×</button>' +
    '</div>';
  }

  function spFormatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function spTemplateTabs(activeTab, msgCount) {
    var countBadge = msgCount > 0 ? '<span class="sp-tab-badge">' + msgCount + '</span>' : '';
    return '<div class="sp-tabs">' +
      '<button class="sp-tab' + (activeTab === 'prompt' ? ' sp-tab-active' : '') + '" data-tab="prompt">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' +
        ' Prompt' +
      '</button>' +
      '<button class="sp-tab' + (activeTab === 'history' ? ' sp-tab-active' : '') + '" data-tab="history">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
        ' Histórico ' + countBadge +
      '</button>' +
    '</div>';
  }

  function spTemplateChatEmpty() {
    return '<div class="sp-chat-empty">' +
      '<div class="sp-chat-empty-icon">&#128172;</div>' +
      '<div class="sp-chat-empty-title">Nenhuma mensagem</div>' +
      '<div class="sp-chat-empty-desc">Seus prompts enviados aparecerão aqui como histórico.</div>' +
    '</div>';
  }

  function spFormatChatDate(dateStr) {
    var d = new Date(dateStr);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var msgDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var diff = (today - msgDay) / 86400000;
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    if (diff < 7) return ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'][d.getDay()];
    return d.toLocaleDateString('pt-BR');
  }

  function spFormatChatTime(dateStr) {
    var d = new Date(dateStr);
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  function spHistoryStatusInfo(status) {
    var map = {
      error: ['sp-chat-status-err', 'Erro', 'Falhou ou não foi confirmado pela aba do Lovable'],
      ok: ['sp-chat-status-ok', 'Enviado', 'Enviado pelo fluxo normal'],
      'official-no-credit': ['sp-chat-status-free', 'Oficial/sem chat', 'Ação oficial detectada antes do chat comum'],
      'confirmed-credit-risk': ['sp-chat-status-warn', 'Confirmado', 'Você confirmou envio que poderia consumir créditos'],
      'cancelled-credit-risk': ['sp-chat-status-muted', 'Cancelado', 'Envio cancelado após alerta de créditos'],
      captured: ['sp-chat-status-muted', 'Capturado', 'Registrado pela extensão'],
      worked: ['sp-chat-status-free', 'Funcionou', 'Marcado manualmente como funcionou'],
      failed: ['sp-chat-status-err', 'Não funcionou', 'Marcado manualmente como não funcionou']
    };
    return map[status] || map.ok;
  }

  function spNormalizeHistoryList(list) {
    var arr = Array.isArray(list) ? list.filter(function(item) { return item && item.text; }) : [];
    arr.sort(function(a, b) {
      return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
    });
    return arr.slice(0, SP_MAX_HISTORY);
  }

  function spFilterHistory(messages) {
    var q = (spHistorySearch || '').trim().toLowerCase();
    var filter = spHistoryFilter || 'all';
    return spNormalizeHistoryList(messages).filter(function(msg) {
      var text = String(msg.text || '').toLowerCase();
      var status = msg.status || 'ok';
      var passText = !q || text.indexOf(q) >= 0;
      var passFilter = filter === 'all' || status === filter ||
        (filter === 'credit' && status === 'confirmed-credit-risk') ||
        (filter === 'free' && status === 'official-no-credit') ||
        (filter === 'error' && status === 'error') ||
        (filter === 'favorite' && !!msg.favorite) ||
        (filter === 'worked' && status === 'worked') ||
        (filter === 'failed' && status === 'failed');
      return passText && passFilter;
    });
  }

  function spTemplateChatBubble(msg, originalIndex) {
    var item = spHistoryStatusInfo(msg.status);
    var statusClass = item[0];
    var statusText = item[1];
    var statusTitle = item[2];
    var fullText = String(msg.text || '');
    var truncated = fullText.length > 420 ? spEscapeHtml(fullText.substring(0, 420)) + '…' : spEscapeHtml(fullText);
    var category = msg.category || spClassifyPromptCategory(fullText);
    var risk = msg.risk || (spAnalyzeCreditProfile(fullText).risk || 'Médio');
    var fav = msg.favorite ? '★' : '☆';
    var checklist = Array.isArray(msg.checklist) && msg.checklist.length ? msg.checklist : spBuildPostSendChecklist(fullText);
    var checklistHtml = checklist && checklist.length ?
      '<details class="sp-history-checklist"><summary>Checklist pós-envio</summary><ul>' + checklist.map(function(c) { return '<li>' + spEscapeHtml(c) + '</li>'; }).join('') + '</ul></details>' : '';
    return '<div class="sp-chat-bubble" title="' + spEscapeHtml(fullText) + '" data-history-index="' + originalIndex + '">' +
      '<div class="sp-chat-text">' + truncated + '</div>' +
      '<div class="sp-history-tags"><span>' + spEscapeHtml(category) + '</span><span>Risco: ' + spEscapeHtml(risk) + '</span><span>Ramo: ' + spEscapeHtml(msg.branch || 'Principal') + '</span>' + (msg.result ? '<span>' + spEscapeHtml(msg.result) + '</span>' : '') + '</div>' +
      checklistHtml +
      '<div class="sp-chat-meta">' +
        '<span class="sp-chat-status ' + statusClass + '" title="' + spEscapeHtml(statusTitle) + '">' + statusText + '</span>' +
        '<span class="sp-chat-time">' + spFormatChatTime(msg.timestamp) + '</span>' +
        '<span class="sp-chat-check">››</span>' +
      '</div>' +
      '<div class="sp-history-item-actions">' +
        '<button class="sp-history-action" data-history-action="favorite" data-history-index="' + originalIndex + '" title="Favoritar/desfavoritar">' + fav + '</button>' +
        '<button class="sp-history-action" data-history-action="reuse" data-history-index="' + originalIndex + '" title="Colocar este prompt de volta no editor">Reusar</button>' +
        '<button class="sp-history-action" data-history-action="copy" data-history-index="' + originalIndex + '" title="Copiar prompt">Copiar</button>' +
        '<button class="sp-history-action" data-history-action="copy-checklist" data-history-index="' + originalIndex + '" title="Copiar checklist">Checklist</button>' +
        '<button class="sp-history-action" data-history-action="mark-worked" data-history-index="' + originalIndex + '" title="Marcar como funcionou">Funcionou</button>' +
        '<button class="sp-history-action" data-history-action="mark-failed" data-history-index="' + originalIndex + '" title="Marcar como não funcionou">Não funcionou</button>' +
        '<button class="sp-history-action sp-history-danger" data-history-action="delete" data-history-index="' + originalIndex + '" title="Excluir apenas este item">Excluir</button>' +
      '</div>' +
    '</div>';
  }

  function spTemplateChatHistory(messages) {
    var normalized = spNormalizeHistoryList(messages);
    var filtered = spFilterHistory(normalized);
    var html = '<div class="sp-history-panel">' +
      '<div class="sp-history-toolbar">' +
        '<input class="sp-history-search" id="sp-history-search" value="' + spEscapeHtml(spHistorySearch || '') + '" placeholder="Buscar no histórico..." autocomplete="off">' +
        '<select class="sp-history-filter" id="sp-history-filter">' +
          '<option value="all"' + ((spHistoryFilter || 'all') === 'all' ? ' selected' : '') + '>Todos</option>' +
          '<option value="confirmed-credit-risk"' + (spHistoryFilter === 'confirmed-credit-risk' ? ' selected' : '') + '>Confirmados</option>' +
          '<option value="official-no-credit"' + (spHistoryFilter === 'official-no-credit' ? ' selected' : '') + '>Oficiais</option>' +
          '<option value="error"' + (spHistoryFilter === 'error' ? ' selected' : '') + '>Erros</option>' +
          '<option value="cancelled-credit-risk"' + (spHistoryFilter === 'cancelled-credit-risk' ? ' selected' : '') + '>Cancelados</option>' +
          '<option value="favorite"' + (spHistoryFilter === 'favorite' ? ' selected' : '') + '>Favoritos</option>' +
          '<option value="worked"' + (spHistoryFilter === 'worked' ? ' selected' : '') + '>Funcionou</option>' +
          '<option value="failed"' + (spHistoryFilter === 'failed' ? ' selected' : '') + '>Não funcionou</option>' +
        '</select>' +
      '</div>' +
      '<div class="sp-history-privacy">Salvo somente neste navegador em <strong>chrome.storage.local</strong>. Não é enviado para servidor pela aba Histórico.</div>';

    if (!normalized.length) {
      html += spTemplateChatEmpty();
    } else if (!filtered.length) {
      html += '<div class="sp-chat-empty"><div class="sp-chat-empty-icon">🔎</div><div class="sp-chat-empty-title">Nada encontrado</div><div class="sp-chat-empty-desc">Tente limpar a busca ou mudar o filtro.</div></div>';
    } else {
      html += '<div class="sp-chat-messages">';
      var lastDate = '';
      for (var i = 0; i < filtered.length; i++) {
        var m = filtered[i];
        var originalIndex = normalized.indexOf(m);
        var dateLabel = spFormatChatDate(m.timestamp);
        if (dateLabel !== lastDate) {
          html += '<div class="sp-chat-date-divider"><span class="sp-chat-date-label">' + dateLabel + '</span></div>';
          lastDate = dateLabel;
        }
        html += spTemplateChatBubble(m, originalIndex);
      }
      html += '</div>';
    }

    html += '<div class="sp-chat-actions sp-history-actions-bar">' +
      '<span class="sp-chat-count">' + normalized.length + '/' + SP_MAX_HISTORY + ' salvos' + (filtered.length !== normalized.length ? ' · ' + filtered.length + ' exibidos' : '') + '</span>' +
      '<button class="sp-chat-clear sp-history-export" id="sp-chat-export">Exportar</button>' +
      '<button class="sp-chat-clear" id="sp-chat-clear">Limpar</button>' +
    '</div>' +
    '</div>';
    return html;
  }


  let sessionId = "local", userName = "Olá, seja bem vindo!", expiresAt = null, licenseStatus = "active", deviceId = null;
  let spIsRecording = false;
  let spAttachedFiles = [];
  let spActiveTab = 'prompt';
  let spChatHistory = [];
  let spHistorySearch = '';
  let spHistoryFilter = 'all';
  let spPromptTemplates = [];
  let spTemplateSearch = '';
  let spKnowledgeSnippets = [];
  let spKnowledgeSearch = '';
  let spDesignTokens = [];
  let spDesignSearch = '';
  let spCurrentBranch = 'Principal';
  let spRemoteConfig = JSON.parse(JSON.stringify(DEFAULT_REMOTE_CONFIG));
  let spConfigState = { loaded: false, source: 'default', error: '' };
  const SP_MAX_FILES = 15;
  const SP_MAX_FILE_SIZE = 20 * 1024 * 1024;
  const SP_HISTORY_KEY = 'fl_chat_history';
  const SP_MAX_HISTORY = 200;
  const SP_TEMPLATE_STORAGE_KEY = 'fl_prompt_templates';
  const SP_TEMPLATE_MAX = 80;
  const SP_KNOWLEDGE_STORAGE_KEY = 'fl_custom_knowledge_snippets';
  const SP_KNOWLEDGE_MAX = 80;
  const SP_SECRETS_STORAGE_KEY = 'fl_env_secrets_checklist';
  const SP_SECRETS_MAX = 80;
  const SP_DESIGN_TOKENS_STORAGE_KEY = 'fl_design_tokens';
  const SP_DESIGN_TOKENS_MAX = 120;
  const SP_BRANCH_STORAGE_KEY = 'fl_current_prompt_branch';
  const SP_DEFAULT_SECRET_CHECKLIST = [
    { name: 'LOVABLE_API_KEY', required: true, scope: 'App Connector', note: 'Chave usada em rotas/conectores autenticados. Nunca exponha no frontend.' },
    { name: 'OPENAI_API_KEY', required: false, scope: 'IA externa', note: 'Exemplo de chave de terceiro. Configure somente se a integração usar OpenAI.' },
    { name: 'SUPABASE_URL', required: false, scope: 'Supabase', note: 'URL pública do projeto Supabase, quando o app usar Supabase.' },
    { name: 'SUPABASE_ANON_KEY', required: false, scope: 'Supabase', note: 'Chave anon pública quando necessária no cliente, respeitando RLS.' },
    { name: 'SUPABASE_SERVICE_ROLE_KEY', required: false, scope: 'Backend somente', note: 'Somente backend/Edge Function. Nunca enviar ao navegador.' },
    { name: 'THIRD_PARTY_API_KEY', required: false, scope: 'API externa', note: 'Substitua pelo nome real da chave da API integrada.' }
  ];

  const SP_DEFAULT_DESIGN_TOKENS = [
    { label: 'Primária Lovable Pro', category: 'Cores', value: '#7C3AED', instruction: 'Use #7C3AED como cor primária apenas em CTAs, foco e destaques. Preserve a paleta atual e ajuste contraste se necessário.' },
    { label: 'Gradiente Premium', category: 'Cores', value: 'from-violet-600 via-fuchsia-500 to-cyan-400', instruction: 'Aplicar gradiente premium com Tailwind somente em hero, cards de destaque ou botões principais, mantendo legibilidade e identidade do projeto.' },
    { label: 'Card Glass', category: 'Componentes', value: 'rounded-2xl border bg-white/70 dark:bg-slate-950/60 backdrop-blur shadow-sm', instruction: 'Transforme o componente selecionado em um card glassmorphism discreto usando classes Tailwind equivalentes, sem alterar regras de negócio.' },
    { label: 'Botão Primário', category: 'Tailwind', value: 'inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2', instruction: 'Padronize o botão selecionado como botão primário acessível com hover, focus-visible, disabled e texto claro.' },
    { label: 'Grid Responsivo', category: 'Tailwind', value: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', instruction: 'Ajuste o bloco selecionado para grid responsivo mobile-first, preservando conteúdo e ordem dos elementos.' },
    { label: 'Foco Acessível', category: 'Acessibilidade', value: 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500', instruction: 'Adicione estados de foco visíveis e acessíveis nos elementos interativos selecionados, sem mudar sua função.' },
    { label: 'Animação Suave', category: 'Animações', value: 'transition-all duration-200 ease-out motion-reduce:transition-none', instruction: 'Adicione microinteração suave respeitando reduced motion. Não use animação excessiva nem prejudique performance.' },
    { label: '21st.dev Motion', category: 'Bibliotecas', value: 'https://21st.dev/', instruction: 'Se o projeto já usar 21st.dev ou biblioteca equivalente, aplique animações/componentes com parcimônia. Se não estiver integrado, sugira plano antes de instalar dependências.' }
  ];

  const SP_FOCUS_MODE_KEY = 'fl_focus_mode';
  const SP_REMOTE_CONFIG_CACHE_KEY = 'fl_remote_config_cache';
  const SP_EXTENSION_VERSION = (chrome.runtime && chrome.runtime.getManifest && chrome.runtime.getManifest().version) || '0.0.0';
  const SP_DONATION_PIX = 'doacoes@brenda.ia.br';
  const SP_DONATION_CRYPTO = '0xEd46dADa43cb7b4e4D753D631B4E99002530D780';
  const SP_DONATION_PIX_QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=doacoes@brenda.ia.br';
  const SP_DONATION_CRYPTO_QR_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=0xEd46dADa43cb7b4e4D753D631B4E99002530D780';
  function safeSendMessage(msg) {
    return new Promise((resolve, reject) => {
      try {
        if (!chrome.runtime || !chrome.runtime.id) return reject(new Error("Extension context invalidated"));
        chrome.runtime.sendMessage(msg, (resp) => {
          if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message));
          resolve(resp);
        });
      } catch(e) { reject(new Error("Extension context invalidated")); }
    });
  }

  function bgFetch() {
    return Promise.reject(new Error('proxyFetch externo removido nesta versão.'));
  }

  function getDeviceId() {
    return getHardwareFingerprint();
  }

  function spGetBranding() {
    return spRemoteConfig.branding || DEFAULT_REMOTE_CONFIG.branding;
  }

  function spGetUpdateConfig() {
    return spRemoteConfig.update || DEFAULT_REMOTE_CONFIG.update;
  }

  function spApplyApiConfig() {
    // Sem endpoints externos nesta versão local.
  }


  
  function spApplyValidationState(data, licenseKey, onDone) {
    sessionId = 'local';
    userName = 'Olá, seja bem vindo!';
    licenseStatus = 'active';
    expiresAt = null;
    chrome.storage.local.set({
      fl_session_id: sessionId,
      fl_user_name: userName,
      fl_license_status: licenseStatus,
      fl_last_validate_at: new Date().toISOString()
    }, function() { if (onDone) onDone(); });
  }


  
  
  
  function spNeedsForcedUpdate() {
    return false;
  }


  function spShowVersionInfo() {
    const existing = document.querySelector('.sp-version-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'sp-alert-overlay sp-version-overlay';
    overlay.innerHTML =
      '<div class="sp-alert-box" style="max-width:320px;text-align:center;">' +
        '<div class="sp-alert-title">Versão da extensão</div>' +
        '<div class="sp-alert-message" style="text-align:center;">' +
          '<div style="font-size:28px;font-weight:800;color:var(--fl-text-primary);margin:8px 0 4px;">' + spEscapeHtml(SP_EXTENSION_VERSION) + '</div>' +
          '<div style="font-size:12px;color:var(--fl-text-muted);">Versão instalada no navegador.</div>' +
        '</div>' +
        '<button class="sp-alert-ok" style="margin-top:14px;">Fechar</button>' +
      '</div>';
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector('.sp-alert-ok')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }


  function spCopyDonationText(value, button) {
    const done = () => {
      if (!button) return;
      const previous = button.textContent;
      button.textContent = 'Copiado';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = previous || 'Copiar';
        button.disabled = false;
      }, 1200);
    };
    const fail = () => {
      if (!button) return;
      const previous = button.textContent;
      button.textContent = 'Copie manualmente';
      setTimeout(() => { button.textContent = previous || 'Copiar'; }, 1600);
    };

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(fail);
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', 'readonly');
      textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;left:-9999px;top:-9999px;';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      done();
    } catch (_) {
      fail();
    }
  }

  function spOpenExternalUrl(url) {
    try {
      if (chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url });
        return;
      }
    } catch (_) {}
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function spShowCollaborateInfo() {
    const existing = document.querySelector('.sp-collab-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'sp-alert-overlay sp-collab-overlay';
    overlay.innerHTML =
      '<div class="sp-alert-box sp-collab-box">' +
        '<div class="sp-collab-head">' +
          '<div class="sp-collab-icon">💜</div>' +
          '<div>' +
            '<div class="sp-alert-title sp-collab-title">Colabore com o projeto</div>' +
            '<div class="sp-collab-sub">Apoio voluntário para manutenção e evolução da ferramenta open source.</div>' +
          '</div>' +
        '</div>' +
        '<div class="sp-collab-message">Este projeto é open source. Se esta ferramenta ajudou você, pode apoiar voluntariamente a manutenção, melhorias e continuidade do desenvolvimento:</div>' +
        '<div class="sp-open-source-note"><strong>Open source:</strong> contribuições, melhorias e sugestões são bem-vindas. O apoio financeiro é opcional e ajuda a manter o projeto evoluindo.</div>' +
        '<div class="sp-donate-card">' +
          '<div class="sp-donate-label">📱 Pix</div>' +
          '<div class="sp-donate-value">' + spEscapeHtml(SP_DONATION_PIX) + '</div>' +
          '<div class="sp-donate-actions">' +
            '<button class="sp-mini-action" data-copy="pix">Copiar Pix</button>' +
            '<button class="sp-mini-action" data-open="pix">Abrir QR Code Pix</button>' +
          '</div>' +
        '</div>' +
        '<div class="sp-donate-card">' +
          '<div class="sp-donate-label">🌐 Cripto</div>' +
          '<div class="sp-donate-value sp-donate-value-break">' + spEscapeHtml(SP_DONATION_CRYPTO) + '</div>' +
          '<div class="sp-donate-actions">' +
            '<button class="sp-mini-action" data-copy="crypto">Copiar carteira</button>' +
            '<button class="sp-mini-action" data-open="crypto">Abrir QR Code Cripto</button>' +
          '</div>' +
        '</div>' +
        '<details class="sp-qr-details">' +
          '<summary>Ver links dos QR Codes</summary>' +
          '<div class="sp-qr-link"><strong>QR Code Pix:</strong><br><span>' + spEscapeHtml(SP_DONATION_PIX_QR_URL) + '</span></div>' +
          '<div class="sp-qr-link"><strong>QR Code Cripto:</strong><br><span>' + spEscapeHtml(SP_DONATION_CRYPTO_QR_URL) + '</span></div>' +
        '</details>' +
        '<button class="sp-alert-ok" style="margin-top:14px;width:100%;">Fechar</button>' +
      '</div>';
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector('.sp-alert-ok')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelector('[data-copy="pix"]')?.addEventListener('click', (e) => spCopyDonationText(SP_DONATION_PIX, e.currentTarget));
    overlay.querySelector('[data-copy="crypto"]')?.addEventListener('click', (e) => spCopyDonationText(SP_DONATION_CRYPTO, e.currentTarget));
    overlay.querySelector('[data-open="pix"]')?.addEventListener('click', () => spOpenExternalUrl(SP_DONATION_PIX_QR_URL));
    overlay.querySelector('[data-open="crypto"]')?.addEventListener('click', () => spOpenExternalUrl(SP_DONATION_CRYPTO_QR_URL));
  }

  
  
  function spRenderShell() {
    const root = document.getElementById('sp-root');
    if (!root) return;

    const currentBody = document.getElementById('sp-body');
    const bodyHtml = currentBody
      ? currentBody.innerHTML
      : '<div class="sp-license-gate" id="sp-loading" style="padding:40px 0;text-align:center"><p style="color:var(--fl-text-muted)">&#x23f3; Carregando Assistente Lovable...</p></div>';

    root.innerHTML =
      '<div class="sp-header">' +
        '<div class="sp-brand">' +
          '<img src="icon.png" width="20" height="20" alt="Logo" style="flex-shrink:0;">' +
          '<span class="sp-brand-text">Assistente Lovable</span>' +
        '</div>' +
        '<div class="sp-header-actions">' +
          '<button class="sp-icon-btn sp-expire-btn" id="sp-expire-btn" title="Status local">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' +
          '</button>' +
          '<button class="sp-icon-btn sp-version-btn" id="sp-version-btn" title="Versão da extensão">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M12 4h9"></path><path d="M4 9h16"></path><path d="M4 15h16"></path></svg>' +
          '</button>' +
          '<button class="sp-icon-btn sp-collab-btn" id="sp-collab-btn" title="Colabore com o desenvolvimento" aria-label="Colabore">' +
            '<span aria-hidden="true">💜</span><span class="sp-collab-btn-label">Colabore</span>' +
          '</button>' +
          '<button class="sp-icon-btn sp-theme-btn" id="sp-theme-btn" title="Tema">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
          '</button>' +
          '<button class="sp-icon-btn sp-logout-btn" id="sp-logout-btn" title="Fechar painel" style="display:none;color:var(--fl-danger);">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="sp-body" id="sp-body">' + bodyHtml + '</div>' +
      '<div class="sp-footer">' +
        '<a href="#" target="_blank" class="sp-support-link" style="display:none">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>' +
          'Ajuda' +
        '</a>' +
      '</div>';
  }

  function spBindShellEvents() {
    const versionBtn = document.getElementById('sp-version-btn');
    if (versionBtn && !versionBtn.dataset.bound) {
      versionBtn.dataset.bound = '1';
      versionBtn.addEventListener('click', () => {
        spShowVersionInfo();
      });
    }

    const collabBtn = document.getElementById('sp-collab-btn');
    if (collabBtn && !collabBtn.dataset.bound) {
      collabBtn.dataset.bound = '1';
      collabBtn.addEventListener('click', () => {
        spShowCollaborateInfo();
      });
    }

    const themeBtn = document.getElementById('sp-theme-btn');
    if (themeBtn && !themeBtn.dataset.bound) {
      themeBtn.dataset.bound = '1';
      themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('sp-light');
        chrome.storage.local.set({ fl_dark_mode: !isLight });
      });
    }

    const logoutBtn = document.getElementById('sp-logout-btn');
    if (logoutBtn && !logoutBtn.dataset.bound) {
      logoutBtn.dataset.bound = '1';
      logoutBtn.addEventListener('click', () => {
        // Fecha o side panel do Chrome.
        try {
          window.close();
        } catch (e) {
          console.warn('[Assistente Lovable] Não foi possível fechar o painel automaticamente:', e);
        }
      });
    }
  }

  function spSetShellVisible(visible) {
    document.querySelectorAll('.sp-header, .sp-footer').forEach(el => {
      el.style.display = visible ? '' : 'none';
    });
  }

  function spApplyShellConfig() {
    spRenderShell();
    const branding = spGetBranding();
    document.title = branding.panel_title || DEFAULT_REMOTE_CONFIG.branding.panel_title;

    const brandText = document.querySelector('.sp-brand-text');
    if (brandText) brandText.textContent = branding.app_name || DEFAULT_REMOTE_CONFIG.branding.app_name;

    const supportLink = document.querySelector('.sp-support-link');
    if (supportLink) {
      const supportUrl = branding.support_url || DEFAULT_REMOTE_CONFIG.branding.support_url;
      supportLink.textContent = branding.support_label || DEFAULT_REMOTE_CONFIG.branding.support_label;
      supportLink.href = supportUrl || '#';
      supportLink.style.display = spRemoteConfig.ui && spRemoteConfig.ui.show_support_link === false ? 'none' : (supportUrl ? '' : 'none');
      const footer = supportLink.closest('.sp-footer');
      if (footer) footer.style.display = supportLink.style.display === 'none' ? 'none' : '';
    }
    spBindShellEvents();
  }

  function spRenderForceUpdateScreen() {
    const update = spGetUpdateConfig();
    const branding = spGetBranding();
    const body = document.getElementById('sp-body');
    if (!body) return;

    spSetShellVisible(false);
    body.innerHTML =
      '<div class="fl-auth-screen">' +
        '<div class="fl-auth-card" style="max-width:340px">' +
          '<div class="fl-auth-icon-wrap" style="background:none; border:none; box-shadow:none; margin-bottom:16px;">' +
            '<img src="icon.png" width="80" height="80" alt="Logo">' +
          '</div>' +
          '<div class="fl-auth-title">' + spEscapeHtml(branding.app_name || DEFAULT_REMOTE_CONFIG.branding.app_name) + '</div>' +
          '<div class="fl-auth-subtitle">Atualização obrigatória</div>' +
          '<div class="sp-log sp-log-warning" style="display:block; margin-top:16px;">' +
            spEscapeHtml(update.message || 'Uma nova versão é necessária para continuar usando a extensão.') +
          '</div>' +
          '<div style="margin-top:14px; color:var(--fl-text-muted); font-size:12px; line-height:1.5;">' +
            'Versão atual: ' + spEscapeHtml(SP_EXTENSION_VERSION) + '<br>' +
            'Versão mínima: ' + spEscapeHtml(update.min_version || '-') +
          '</div>' +
          (update.download_url ? '<button id="sp-force-update-btn" class="sp-btn-primary" style="margin-top:16px;">Baixar atualização</button>' : '') +
        '</div>' +
      '</div>';

    const button = document.getElementById('sp-force-update-btn');
    if (button) {
      button.addEventListener('click', () => {
        try {
          window.open(update.download_url, '_blank', 'noopener,noreferrer');
        } catch (err) {
          location.href = update.download_url;
        }
      });
    }
  }

  async function spFetchRemoteConfig() {
    spRemoteConfig = JSON.parse(JSON.stringify(DEFAULT_REMOTE_CONFIG));
    spRemoteConfig.update.latest_version = SP_EXTENSION_VERSION;
    spConfigState = { loaded: true, source: 'local', error: '' };
    spApplyShellConfig();
    spApplyApiConfig();
    return { mustForceUpdate: false, configReady: true };
  }


  function spInferDialogTone(title, message) {
    var t = String(title || '').toLowerCase();
    var m = String(message || '').toLowerCase();
    if (/erro|falha|inv[aá]lid|indispon[ií]vel|não consegui|nao consegui|bloqueado/.test(t + ' ' + m)) return 'danger';
    if (/aten[cç][aã]o|aviso|alerta|cr[eé]dito|pode consumir|risco|token|conex[aã]o|anexo/.test(t + ' ' + m)) return 'warning';
    if (/copiado|salvo|inserido|restaurado|importado|carregado|conectado|preparado|sucesso/.test(t + ' ' + m)) return 'success';
    return 'info';
  }

  function showAlert(title, message, opts) {
    opts = opts || {};
    if (!opts.tone) opts.tone = spInferDialogTone(title, message);
    const existing = document.querySelector('.sp-alert-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.className = 'sp-alert-overlay sp-premium-overlay';
    overlay.innerHTML = spTemplateAlert(title, message, opts);
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('.sp-alert-ok')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay && opts.closeOnBackdrop !== false) close(); });
    try { overlay.querySelector('.sp-alert-ok')?.focus(); } catch (_) {}
    if (opts.autoClose !== false) setTimeout(() => { if (document.body.contains(overlay)) close(); }, opts.timeout || 5200);
  }

  function spConfirmPremium(title, message, opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      const existing = document.querySelector('.sp-alert-overlay');
      if (existing) existing.remove();
      const tone = opts.tone || 'question';
      const meta = spDialogToneMeta(tone);
      const confirmLabel = opts.confirmLabel || 'Confirmar';
      const cancelLabel = opts.cancelLabel || 'Cancelar';
      const confirmKind = opts.confirmKind || (tone === 'danger' ? 'danger' : 'primary');
      const details = opts.details ? '<div class="sp-premium-details">' + opts.details.map(function(x){ return '<div class="sp-premium-detail-item">' + spEscapeHtml(x) + '</div>'; }).join('') + '</div>' : '';
      const overlay = document.createElement('div');
      overlay.className = 'sp-alert-overlay sp-premium-overlay';
      overlay.innerHTML = '<div class="sp-alert-box sp-premium-dialog sp-premium-dialog-' + tone + '" role="dialog" aria-modal="true">' +
        '<div class="sp-premium-dialog-topline"></div>' +
        '<div class="sp-alert-icon sp-premium-icon" aria-hidden="true">' + meta.icon + '</div>' +
        '<div class="sp-premium-kicker">' + spEscapeHtml(opts.kicker || meta.label) + '</div>' +
        '<div class="sp-alert-title sp-premium-title">' + spEscapeHtml(title) + '</div>' +
        '<div class="sp-alert-message sp-premium-message">' + spHtmlToLines(message) + '</div>' +
        details +
        '<div class="sp-premium-actions">' +
          '<button class="sp-premium-btn sp-premium-btn-secondary" id="sp-premium-cancel">' + spEscapeHtml(cancelLabel) + '</button>' +
          '<button class="sp-premium-btn sp-premium-btn-' + confirmKind + '" id="sp-premium-confirm">' + spEscapeHtml(confirmLabel) + '</button>' +
        '</div>' +
      '</div>';
      document.body.appendChild(overlay);
      const done = (value) => { overlay.remove(); resolve(value); };
      overlay.querySelector('#sp-premium-cancel')?.addEventListener('click', () => done(false));
      overlay.querySelector('#sp-premium-confirm')?.addEventListener('click', () => done(true));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) done(false); });
      overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') done(false); });
      try { overlay.querySelector('#sp-premium-confirm')?.focus(); } catch (_) {}
    });
  }


  function spAnalyzeCreditProfile(prompt) {
    const textOriginal = String(prompt || '');
    const text = textOriginal.toLowerCase();
    const chars = textOriginal.trim().length;
    const words = textOriginal.trim() ? textOriginal.trim().split(/\s+/).length : 0;
    const files = Array.isArray(spAttachedFiles) ? spAttachedFiles.length : 0;
    const hasBug = /erro|bug|build|failed|falha|exception|crash|quebrou|corrigir|fix|try to fix|deploy|compila|console|stack trace/.test(text);
    const hasVisual = /cor|layout|visual|texto|bot[aã]o|imagem|margem|fonte|css|tailwind|padding|responsivo|tela|card|navbar|hero|logo|espaçamento|alinhamento/.test(text);
    const hasBackend = /banco|schema|rls|auth|login|supabase|edge function|migration|tabela|policy|rpc|storage|permiss[aã]o|segurança|security/.test(text);
    const hasSeoAeo = /seo|aeo|ssr|pré-render|pre-render|prerender|json-ld|schema\.org|open graph|twitter card|canonical|robots|sitemap|indexa|metadados|metadata|semrush|palavra-chave|palavras-chave|heading|alt text/.test(text);
    const hasApiMcp = /api|openapi|swagger|mcp|connector|conector|endpoint|webhook|secret|lovable_api_key|env|vari[áa]vel de ambiente|base url|auth method|token de api|chave de api/.test(text);
    const hasPlanning = /planej|arquitetura|estrutura|refator|fluxo|regra de negócio|implementar|criar sistema|do zero|integração/.test(text);
    const isVague = chars > 0 && chars < 90 && !/[.:;\n]/.test(textOriginal);

    let score = 2;
    let type = 'Prompt comum';
    let safestAction = 'Enviar um prompt único, objetivo e completo.';
    const tips = [];

    if (hasBug) {
      type = 'Bug/erro detectado';
      score = Math.max(score, 2);
      safestAction = 'Priorizar botão oficial Try to fix/Fix all quando ele estiver visível.';
      tips.push('Se existir erro/build error na tela, use primeiro Try to fix/Fix all.');
    }
    if (hasVisual) {
      type = hasBug ? 'Bug + ajuste visual' : 'Ajuste visual';
      score = Math.max(score, 2);
      safestAction = 'Preferir Visual Edits ou Code Mode para textos, cores e layout simples.';
      tips.push('Mudança visual simples costuma ser melhor via Visual Edits ou Code Mode.');
    }
    if (hasSeoAeo) {
      type = 'SEO/AEO e indexação';
      score = Math.max(score, 3);
      safestAction = 'Usar SEO/AEO ou Keywords para estruturar metadados, JSON-LD, SSR/pré-renderização e intenção de busca.';
      tips.push('SEO/AEO é prioridade de produção: não remova metadados, páginas públicas, JSON-LD ou palavras-chave só para encurtar o prompt.');
    }
    if (hasApiMcp) {
      type = 'API/MCP/Secrets';
      score = Math.max(score, 4);
      safestAction = 'Usar API/MCP e Secrets para estruturar Base URL, Auth Method, endpoints e variáveis antes de enviar.';
      tips.push('Conectores precisam de contexto completo. Nunca cole valores reais de secrets no chat; informe apenas nomes e onde configurar.');
    }
    if (hasBackend) {
      type = hasApiMcp ? 'API/MCP + Backend' : 'Banco/Auth/Segurança';
      score = Math.max(score, 4);
      tips.push('Banco, Auth, RLS e permissões tendem a exigir mais validação. Envie contexto completo.');
    }
    if (hasPlanning) {
      score = Math.max(score, 3);
      tips.push('Para tarefas grandes, peça um plano enxuto ou divida em etapas para evitar retrabalho.');
    }
    if (isVague) {
      score = Math.max(score, 4);
      tips.push('O pedido parece curto/vago; isso aumenta a chance de gastar créditos em ajustes posteriores.');
    }
    if (files > 0) {
      score = Math.max(score, 3);
      tips.push('Anexos no chat normal podem tornar o envio mais custoso; use apenas quando forem indispensáveis.');
    }
    if (chars > 1800) {
      score = Math.max(score, 4);
      tips.push('Prompt muito longo: compacte antes para reduzir idas e voltas.');
    }
    if (!tips.length) tips.push('Inclua objetivo, escopo, arquivos afetados e critério de aceite em uma única mensagem.');

    let risk = 'Médio';
    let className = 'sp-credit-medium';
    let icon = '🟠';
    if (!chars) {
      risk = 'Aguardando prompt';
      className = 'sp-credit-idle';
      icon = '⚪';
      safestAction = 'Digite um pedido para receber orientação.';
    } else if (score <= 1) {
      risk = 'Baixo';
      className = 'sp-credit-low';
      icon = '🟢';
    } else if (score >= 4) {
      risk = 'Alto';
      className = 'sp-credit-high';
      icon = '🔴';
    }

    return { risk, className, icon, type, safestAction, tips, chars, words, files, hasBug, hasVisual, hasBackend, hasSeoAeo, hasApiMcp, isVague };
  }

  function spGetCreditSavingSuggestion(prompt) {
    const p = spAnalyzeCreditProfile(prompt);
    return p.safestAction + (p.tips && p.tips.length ? ' ' + p.tips[0] : '');
  }


  function spIsProductionCriticalPrompt(text) {
    var t = String(text || '').toLowerCase();
    return /seo|aeo|ssr|pré-render|pre-render|json-ld|schema\.org|open graph|canonical|robots|sitemap|indexa|metadados|metadata|api|openapi|swagger|mcp|connector|conector|endpoint|webhook|secret|lovable_api_key|env|vari[áa]vel|auth|token|supabase|rls|rpc|migration|postgres|query|índice|indice/.test(t);
  }

  function spGetEconomyTradeoffWarning(text) {
    var t = String(text || '').toLowerCase();
    if (!String(text || '').trim()) return 'Economia de créditos não deve reduzir contexto essencial. Primeiro defina objetivo e escopo.';
    if (/seo|aeo|ssr|json-ld|open graph|canonical|robots|sitemap|indexa|metadados|metadata/.test(t)) {
      return 'Prioridade: manter site indexável. Não economize removendo title, description, canonical, OG, JSON-LD, SSR/pré-renderização, rotas e intenção de busca.';
    }
    if (/api|openapi|swagger|mcp|connector|conector|endpoint|webhook|secret|lovable_api_key|env|token/.test(t)) {
      return 'Prioridade: produção/API. Não economize removendo Base URL, Auth Method, endpoints, headers, secrets necessários, erros e critérios de validação.';
    }
    if (/supabase|rls|rpc|migration|postgres|query|índice|indice|policy|auth|storage/.test(t)) {
      return 'Prioridade: segurança de dados. Não economize removendo RLS, permissões, migrations, isolamento entre usuários, EXPLAIN/validação e riscos.';
    }
    return 'Economia de créditos é apenas orientação. Se preparar/reduzir remover detalhe importante, mantenha o contexto completo e envie após confirmar.';
  }

  function spTemplateProductionPriorityCard() {
    return '' +
      '<div class="sp-production-card" id="sp-production-card">' +
        '<div class="sp-production-head"><span>🚀 Prioridade de produção</span><small>SEO/AEO + API/MCP primeiro</small></div>' +
        '<div class="sp-production-text">Foque em site indexável, metadados, dados estruturados, SSR/pré-renderização, conectores, secrets e integração de APIs. Economia de créditos deve alertar, nunca prejudicar funcionalidade.</div>' +
        '<div class="sp-production-actions">' +
          '<button id="sp-priority-seo" type="button">🔎 Auditar SEO/AEO</button>' +
          '<button id="sp-priority-api" type="button">🔌 Estruturar API/MCP</button>' +
          '<button id="sp-priority-check" type="button">✅ Checklist produção</button>' +
        '</div>' +
      '</div>';
  }

  function spShowProductionChecklist() {
    var prompt = spAppendProjectSafeClosing([
      'Faça uma auditoria de prontidão para produção no projeto Lovable atual, com foco prioritário em SEO/AEO e integrações API/MCP.',
      '',
      'Verifique e proponha correções apenas onde necessário:',
      '1. Indexação: SSR/pré-renderização, rotas públicas, title, meta description, canonical, robots e sitemap quando aplicável.',
      '2. AEO/IA Search: JSON-LD adequado, Open Graph, Twitter Card, headings, HTML semântico e conteúdo rastreável.',
      '3. APIs/App Connectors/MCP: Base URL, Auth Method, endpoints, tratamento de erro, variáveis de ambiente e secrets necessários.',
      '4. Segurança: não expor tokens no frontend, preservar RLS/Auth/Storage/RPC e separar secrets por ambiente.',
      '5. Validação: checklist de teste após alteração e arquivos afetados.',
      '',
      'Se alguma recomendação para economizar créditos reduzir qualidade, contexto técnico, SEO/AEO ou segurança de APIs, ignore a economia e preserve a solução correta.'
    ].join('\n'));
    var body = '' +
      '<div class="sp-pro-callout"><strong>Prioridade definida:</strong> produção antes de economia. Use este checklist para transformar protótipo visual em app mais indexável, integrável e seguro.</div>' +
      '<div class="sp-check-list">' +
        '<label><input type="checkbox" checked disabled> SEO/AEO indexável: metadados, OG, JSON-LD e HTML semântico</label>' +
        '<label><input type="checkbox" checked disabled> SSR/pré-renderização ou estratégia equivalente para páginas públicas</label>' +
        '<label><input type="checkbox" checked disabled> APIs/MCP/App Connectors com Base URL, Auth Method e endpoints claros</label>' +
        '<label><input type="checkbox" checked disabled> Secrets listados sem colar valores reais no chat</label>' +
        '<label><input type="checkbox" checked disabled> Alertas de crédito sem bloquear funcionalidade crítica</label>' +
      '</div>';
    spShowProModal('Checklist de produção', body, [
      { id: 'sp-prod-copy', label: 'Copiar prompt', kind: 'secondary', onClick: function() { spCopyText(prompt).then(function(){ showAlert('Copiado', 'Prompt de checklist de produção copiado.'); }); } },
      { id: 'sp-prod-use', label: 'Inserir no prompt', kind: 'primary', onClick: function(close) { var area = document.getElementById('sp-msg'); if (area) { area.value = prompt; spUpdateCreditAdvisor(); } close(); showAlert('Prompt inserido', 'Checklist de produção inserido no painel.'); } }
    ]);
  }

  function textareaSafeValue() {
    var t = document.getElementById('sp-msg');
    return t && typeof t.value === 'string' ? t.value : '';
  }

  function spTemplateCreditAdvisor(profile) {
    const p = profile || spAnalyzeCreditProfile('');
    const tip = (p.tips && p.tips[0]) ? p.tips[0] : 'Digite um pedido para receber orientação.';
    return '<div class="sp-credit-card ' + p.className + '">' +
      '<div class="sp-credit-row">' +
        '<span class="sp-credit-pill">' + p.icon + ' ' + spEscapeHtml(p.risk) + '</span>' +
        '<span class="sp-credit-meta">' + spEscapeHtml(p.type) + '</span>' +
      '</div>' +
      '<div class="sp-credit-main">' + spEscapeHtml(p.safestAction) + '</div>' +
      '<div class="sp-credit-tip">' + spEscapeHtml(tip) + '</div>' +
      '<div class="sp-credit-tip sp-credit-tradeoff">' + spEscapeHtml(spGetEconomyTradeoffWarning(textareaSafeValue())) + '</div>' +
      '<div class="sp-credit-stats">' + p.words + ' palavras · ' + p.chars + ' caracteres' + (p.files ? ' · ' + p.files + ' anexo(s)' : '') + '</div>' +
    '</div>';
  }

  function spUpdateCreditAdvisor() {
    const box = document.getElementById('sp-credit-advisor');
    const textarea = document.getElementById('sp-msg');
    if (!box || !textarea) return;
    box.innerHTML = spTemplateCreditAdvisor(spAnalyzeCreditProfile(textarea.value || ''));
  }

  function spConfirmAttachmentRisk(files) {
    return new Promise((resolve) => {
      const fileList = Array.from(files || []);
      const totalBytes = fileList.reduce((sum, f) => sum + (f && f.size ? f.size : 0), 0);
      const totalMb = (totalBytes / (1024 * 1024)).toFixed(totalBytes > 1024 * 1024 ? 1 : 2);
      const existing = document.querySelector('.sp-alert-overlay');
      if (existing) existing.remove();
      const overlay = document.createElement('div');
      overlay.className = 'sp-alert-overlay';
      overlay.style.zIndex = '3000';
      overlay.innerHTML = `
        <div class="sp-alert-box" style="max-width:360px; padding:24px; text-align:left;">
          <div style="text-align:center; font-size:34px; margin-bottom:12px;">📎</div>
          <div class="sp-alert-title" style="text-align:center; margin-bottom:10px;">Confirmar anexo</div>
          <div style="font-size:12px; color:var(--fl-text-secondary); line-height:1.55; margin-bottom:14px;">
            Você está anexando ${fileList.length} arquivo(s), total aproximado de ${totalMb} MB.
            Anexos podem conter dados sensíveis e também podem aumentar o custo/complexidade do envio no Lovable.
          </div>
          <div class="sp-credit-card sp-credit-medium" style="margin-bottom:14px;">
            <div class="sp-credit-main">Use anexo só quando ele for indispensável para entender o problema.</div>
            <div class="sp-credit-tip">Para prints simples, muitas vezes uma descrição objetiva economiza créditos e evita upload desnecessário.</div>
          </div>
          <div style="display:flex; gap:10px;">
            <button id="sp-attach-cancel" class="sp-alert-ok" style="flex:1; background:rgba(255,255,255,0.06); color:var(--fl-text-primary);">Cancelar</button>
            <button id="sp-attach-confirm" class="sp-alert-ok" style="flex:1;">Anexar</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const cleanup = (ok) => { overlay.remove(); resolve(!!ok); };
      overlay.querySelector('#sp-attach-cancel').addEventListener('click', () => cleanup(false));
      overlay.querySelector('#sp-attach-confirm').addEventListener('click', () => cleanup(true));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
    });
  }

  function spBuildEconomyPrompt(raw) {
    const text = String(raw || '').trim().replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
    if (!text) return '';
    const p = spAnalyzeCreditProfile(text);
    const constraints = [];
    constraints.push('preserve o que já funciona');
    constraints.push('não altere banco/RLS/Auth sem necessidade explícita');
    constraints.push('evite refatorações grandes fora do escopo');
    constraints.push('ao final, informe arquivos alterados e como validar');
    constraints.push('não reduza contexto técnico essencial apenas para economizar créditos');
    if (p.hasSeoAeo) constraints.push('para SEO/AEO, preserve title, description, canonical, Open Graph, JSON-LD, SSR/pré-renderização e intenção de busca');
    if (p.hasApiMcp) constraints.push('para API/MCP, preserve Base URL, Auth Method, endpoints, headers, secrets necessários e critérios de validação');
    if (p.hasVisual) constraints.push('para ajuste visual, altere somente os componentes/estilos necessários');
    if (p.hasBug) constraints.push('corrija a causa raiz do erro e mantenha comportamento existente');
    return [
      'Objetivo: ' + text,
      '',
      'Escopo e cuidado:',
      '- ' + constraints.join('; ') + '.',
      '',
      'Critério de aceite:',
      '- solução aplicada sem regressões aparentes;',
      '- explicar brevemente o que foi feito;',
      '- indicar qualquer ponto que precise de validação manual.'
    ].join('\n');
  }

  function spApplyLocalPromptEconomy() {
    const textarea = document.getElementById('sp-msg');
    if (!textarea || !textarea.value.trim()) { showAlert('Atenção', 'Digite um prompt antes de compactar.'); return; }
    textarea.value = spBuildEconomyPrompt(textarea.value);
    spUpdateCreditAdvisor();
    showAlert('Prompt preparado 🛡️', 'Organizei o pedido localmente sem remover contexto essencial. Se a economia prejudicar SEO/API/MCP ou segurança, mantenha o contexto completo. Nada foi enviado ao Lovable.');
  }

  async function spClearCurrentCommand() {
    const textarea = document.getElementById('sp-msg');
    if (!textarea) return;
    const current = (textarea.value || '').trim();
    if (!current) {
      showAlert('Comando já está limpo', 'Não há texto no campo de comando.');
      return;
    }
    const ok = await spConfirmPremium('Limpar comando atual?', 'Isso apagará apenas o texto do campo de comando. Histórico, contextos, atalhos e configurações serão preservados.', {
      tone: 'warning',
      kicker: 'Ação local',
      confirmLabel: 'Limpar comando',
      cancelLabel: 'Manter texto',
      confirmKind: 'danger',
      details: ['Não afeta o histórico salvo.', 'Não remove atalhos ou contextos inteligentes.']
    });
    if (!ok) return;
    textarea.value = '';
    try { textarea.dispatchEvent(new Event('input', { bubbles: true })); } catch (_) {}
    spUpdateCreditAdvisor();
    const log = document.getElementById('sp-log');
    if (log) { log.className = 'sp-log sp-log-info'; log.textContent = '🧹 Comando limpo. Histórico e atalhos foram preservados.'; }
    textarea.focus();
  }

  function spShowCreditStrategy() {
    const textarea = document.getElementById('sp-msg');
    const p = spAnalyzeCreditProfile(textarea ? textarea.value : '');
    const existing = document.querySelector('.sp-alert-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.className = 'sp-alert-overlay';
    overlay.style.zIndex = '3000';
    const tips = (p.tips || []).map(t => '<li>' + spEscapeHtml(t) + '</li>').join('');
    overlay.innerHTML = `
      <div class="sp-alert-box" style="max-width:360px; padding:24px; text-align:left;">
        <div style="text-align:center; font-size:30px; margin-bottom:10px;">🛡️</div>
        <div class="sp-alert-title" style="text-align:center; margin-bottom:10px;">Estratégia de economia</div>
        <div class="sp-credit-card ${p.className}" style="margin-bottom:14px;">
          <div class="sp-credit-row"><span class="sp-credit-pill">${p.icon} ${spEscapeHtml(p.risk)}</span><span class="sp-credit-meta">${spEscapeHtml(p.type)}</span></div>
          <div class="sp-credit-main">${spEscapeHtml(p.safestAction)}</div>
        </div>
        <ul style="font-size:12px; color:var(--fl-text-secondary); line-height:1.55; margin:0 0 16px 18px; padding:0;">${tips}</ul>
        <div style="display:flex; gap:10px;">
          <button id="sp-credit-rewrite" class="sp-alert-ok" style="flex:1; background:rgba(255,255,255,0.06); color:var(--fl-text-primary);">Preparar prompt</button>
          <button id="sp-credit-close" class="sp-alert-ok" style="flex:1;">Entendi</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#sp-credit-close').addEventListener('click', () => overlay.remove());
    overlay.querySelector('#sp-credit-rewrite').addEventListener('click', () => { overlay.remove(); spApplyLocalPromptEconomy(); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  function spConfirmCreditRisk(prompt, contextLabel) {
    return new Promise((resolve) => {
      const existing = document.querySelector('.sp-alert-overlay');
      if (existing) existing.remove();
      const p = spAnalyzeCreditProfile(prompt);
      const context = spEscapeHtml(contextLabel || 'Esta ação será enviada pelo chat normal do Lovable.');
      const tipList = (p.tips || []).slice(0, 3).map(t => '<li>' + spEscapeHtml(t) + '</li>').join('');
      const overlay = document.createElement('div');
      overlay.className = 'sp-alert-overlay';
      overlay.style.zIndex = '3000';
      overlay.innerHTML = `
        <div class="sp-alert-box" style="max-width:360px; padding:24px; text-align:left;">
          <div style="text-align:center; font-size:34px; margin-bottom:12px;">⚠️</div>
          <div class="sp-alert-title" style="text-align:center; margin-bottom:10px;">Pode consumir créditos</div>
          <div class="sp-credit-card ${p.className}" style="margin-bottom:14px;">
            <div class="sp-credit-row"><span class="sp-credit-pill">${p.icon} ${spEscapeHtml(p.risk)}</span><span class="sp-credit-meta">${spEscapeHtml(p.type)}</span></div>
            <div class="sp-credit-main">${spEscapeHtml(p.safestAction)}</div>
          </div>
          <div style="font-size:12px; color:var(--fl-text-muted); line-height:1.55; margin-bottom:14px;">
            <p style="margin:0 0 10px 0;">${context}</p>
            <ul style="margin:0 0 10px 18px; padding:0;">${tipList}</ul>
            <p style="margin:0 0 8px 0; color:var(--fl-warning);"><strong>${spEscapeHtml(spGetEconomyTradeoffWarning(prompt))}</strong></p>
            <p style="margin:0; color:var(--fl-text-primary);"><strong>Confirme apenas se deseja enviar pelo chat mesmo assim. A extensão alerta, mas não deve impedir uma ação necessária.</strong></p>
          </div>
          <div style="display:flex; gap:10px;">
            <button id="sp-credit-cancel" class="sp-alert-ok" style="flex:1; background:rgba(255,255,255,0.06); color:var(--fl-text-primary);">Cancelar</button>
            <button id="sp-credit-rewrite" class="sp-alert-ok" style="flex:1; background:rgba(16,185,129,.18); color:var(--fl-success); border-color:rgba(16,185,129,.35);">Preparar</button>
            <button id="sp-credit-confirm" class="sp-alert-ok" style="flex:1;">Enviar</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      const cleanup = (value) => { overlay.remove(); resolve(value); };
      overlay.querySelector('#sp-credit-cancel').addEventListener('click', () => cleanup(false));
      overlay.querySelector('#sp-credit-confirm').addEventListener('click', () => cleanup(true));
      overlay.querySelector('#sp-credit-rewrite').addEventListener('click', () => { overlay.remove(); spApplyLocalPromptEconomy(); resolve(false); });
      overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
    });
  }


  function spClassifyPromptCategory(prompt) {
    var t = String(prompt || '').toLowerCase();
    if (/seo|aeo|ssr|json-ld|open graph|canonical|sitemap|robots|metadados/.test(t)) return 'SEO/AEO';
    if (/api|openapi|swagger|mcp|connector|conector|endpoint|secret|lovable_api_key|webhook/.test(t)) return 'API/MCP';
    if (/rls|banco|schema|supabase|migration|rpc|storage|auth|login|permiss/.test(t)) return 'Banco/Auth';
    if (/erro|bug|failed|falha|exception|crash|quebrou|corrigir|build|deploy|console/.test(t)) return 'Bugfix';
    if (/layout|visual|cor|css|tailwind|responsivo|mobile|bot[aã]o|card|navbar|hero|modal/.test(t)) return 'UI/Design';
    if (/seo|title|description|meta|sitemap|robots|heading|alt text/.test(t)) return 'SEO';
    if (/performance|lazy|bundle|render|consulta|lento|carregamento/.test(t)) return 'Performance';
    if (/texto|copy|microcopy|cta|t[ií]tulo|descri/.test(t)) return 'Copywriting';
    if (/teste|qa|auditoria|revis/.test(t)) return 'QA';
    if (/criar|implementar|novo fluxo|nova tela|feature|funcionalidade/.test(t)) return 'Feature';
    return 'Geral';
  }

  function spEstimateTechnicalRisk(prompt) {
    var t = String(prompt || '').toLowerCase();
    var score = 1;
    var reasons = [];
    if (/rls|policy|auth|login|permiss|token|seguran/.test(t)) { score += 3; reasons.push('envolve autenticação, permissões ou segurança'); }
    if (/banco|schema|migration|rpc|trigger|storage|supabase/.test(t)) { score += 3; reasons.push('pode alterar banco, Storage, RPC ou migrations'); }
    if (/refator|arquitetura|reescrev|mudar tudo|reorganizar/.test(t)) { score += 2; reasons.push('pode gerar refatoração ampla'); }
    if (/integra|api|webhook|pagamento|email|notifica/.test(t)) { score += 2; reasons.push('envolve integração externa'); }
    if (/apenas|somente|não altere|preserve|cirúrgic/.test(t)) score -= 1;
    var risk = score >= 6 ? 'Alto' : score >= 3 ? 'Médio' : 'Baixo';
    if (!reasons.length) reasons.push('não há sinais fortes de alteração crítica');
    return { risk: risk, score: score, reasons: reasons };
  }

  function spBestPathForPrompt(prompt) {
    var p = spAnalyzeCreditProfile(prompt);
    var t = String(prompt || '').toLowerCase();
    if (p.hasBug) return 'Try to fix/Fix all oficial, se existir na tela; depois chat com contexto técnico.';
    if (p.hasVisual && !p.hasBackend) return 'Visual Edits ou Code Mode para ajuste visual simples; chat apenas se precisar de lógica.';
    if (/texto|copy|cta|microcopy/.test(t)) return 'Code Mode/Visual Edits para textos pequenos; chat para revisão ampla.';
    if (p.hasBackend) return 'Chat normal com escopo fechado, validação e aviso para não alterar RLS/Auth sem necessidade.';
    if (/planej|arquitetura|refator|grande|muitas/.test(t)) return 'Pedir plano econômico primeiro e executar em etapas menores.';
    return 'Chat normal com prompt preparado e critério de aceite claro.';
  }

  function spBuildPostSendChecklist(prompt) {
    var p = spAnalyzeCreditProfile(prompt);
    var list = ['Verificar a tela/fluxo alterado', 'Conferir Console/Preview em busca de erros', 'Validar mobile e desktop'];
    if (p.hasBackend) list.push('Conferir se banco, Auth, RLS e permissões não foram alterados indevidamente');
    if (p.hasVisual) list.push('Comparar espaçamento, contraste, estados hover/focus e responsividade');
    if (p.hasBug) list.push('Reproduzir o bug original e confirmar que não voltou');
    if (/seo|meta|sitemap|robots/i.test(prompt)) list.push('Conferir metadados, headings, alt text e preview social');
    list.push('Pedir ao Lovable a lista de arquivos alterados se ele não informou');
    return list.slice(0, 7);
  }

  function spBuildDiagnosisHtml(prompt) {
    var p = spAnalyzeCreditProfile(prompt);
    var tr = spEstimateTechnicalRisk(prompt);
    var category = spClassifyPromptCategory(prompt);
    var best = spBestPathForPrompt(prompt);
    var tips = (p.tips || []).concat(tr.reasons || []).slice(0, 6).map(function(t) { return '<li>' + spEscapeHtml(t) + '</li>'; }).join('');
    return '<div class="sp-diagnosis-grid">' +
      '<div class="sp-diagnosis-card"><span>Tipo</span><strong>' + spEscapeHtml(category) + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Créditos</span><strong>' + spEscapeHtml(p.risk) + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Risco técnico</span><strong>' + spEscapeHtml(tr.risk) + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Tamanho</span><strong>' + p.words + ' palavras</strong></div>' +
    '</div>' +
    '<div class="sp-pro-callout"><strong>Melhor caminho:</strong><br>' + spEscapeHtml(best) + '</div>' +
    '<ul class="sp-pro-list">' + tips + '</ul>';
  }

  function spShowDiagnosisModal() {
    var area = document.getElementById('sp-msg');
    var prompt = area ? area.value : '';
    if (!prompt.trim()) { showAlert('Diagnóstico', 'Digite um prompt primeiro para eu analisar.'); return; }
    spShowProModal('Diagnóstico antes de enviar', spBuildDiagnosisHtml(prompt), [
      { id: 'sp-pro-prepare', label: 'Preparar prompt', kind: 'secondary', onClick: function(close) { close(); spApplyLocalPromptEconomy(); } },
      { id: 'sp-pro-close', label: 'Entendi', kind: 'primary' }
    ]);
  }

  function spShowProModal(title, bodyHtml, actions, opts) {
    document.querySelector('.sp-alert-overlay')?.remove();
    var overlay = document.createElement('div');
    overlay.className = 'sp-alert-overlay sp-pro-overlay';
    overlay.style.zIndex = '3000';
    var buttons = (actions || [{ id: 'sp-pro-ok', label: 'Fechar', kind: 'primary' }]).map(function(a) {
      return '<button id="' + a.id + '" class="sp-alert-ok sp-pro-modal-btn ' + (a.kind === 'secondary' ? 'sp-pro-secondary' : '') + '">' + spEscapeHtml(a.label) + '</button>';
    }).join('');
    overlay.innerHTML = '<div class="sp-alert-box sp-pro-modal" style="max-width:' + ((opts && opts.width) || 440) + 'px;text-align:left;">' +
      '<div class="sp-alert-title" style="text-align:left;margin-bottom:12px;">' + spEscapeHtml(title) + '</div>' +
      '<div class="sp-pro-modal-body">' + bodyHtml + '</div>' +
      '<div class="sp-pro-modal-actions">' + buttons + '</div>' +
    '</div>';
    document.body.appendChild(overlay);
    var close = function() { try { overlay.remove(); } catch (_) {} };
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    (actions || []).forEach(function(a) {
      var b = overlay.querySelector('#' + a.id);
      if (!b) return;
      b.addEventListener('click', function() { if (typeof a.onClick === 'function') a.onClick(close, overlay); else close(); });
    });
    if (!actions || !actions.length) overlay.querySelector('.sp-pro-modal-btn')?.addEventListener('click', close);
    return overlay;
  }

  function spShowPromptBuilder() {
    var current = (document.getElementById('sp-msg')?.value || '').trim();
    var body = '<div class="sp-builder-grid">' +
      '<label>Objetivo<textarea id="spb-goal" rows="3" placeholder="O que você quer que o Lovable faça?">' + spEscapeHtml(current) + '</textarea></label>' +
      '<label>O que não pode alterar<textarea id="spb-nochange" rows="2" placeholder="Ex.: não mexer em banco, RLS, Auth, layout global..."></textarea></label>' +
      '<label>Telas/arquivos afetados<input id="spb-scope" placeholder="Ex.: /app/rotina, componente Header, mobile..."></label>' +
      '<label>Erro/contexto atual<textarea id="spb-error" rows="3" placeholder="Cole erro, comportamento atual ou prints descritos..."></textarea></label>' +
      '<label>Critério de aceite<textarea id="spb-accept" rows="2" placeholder="Como saber que ficou pronto?"></textarea></label>' +
      '<label>Nível de profundidade<select id="spb-depth"><option value="cirurgico">Cirúrgico/econômico</option><option value="normal">Normal</option><option value="profundo">Profundo, com auditoria</option></select></label>' +
    '</div>';
    spShowProModal('Construtor de prompt profissional', body, [
      { id: 'spb-cancel', label: 'Cancelar', kind: 'secondary' },
      { id: 'spb-generate', label: 'Gerar prompt', kind: 'primary', onClick: function(close, overlay) {
        function val(id) { return (overlay.querySelector('#' + id)?.value || '').trim(); }
        var depth = val('spb-depth');
        var lines = [];
        lines.push('Atue como desenvolvedor sênior no Lovable e execute com escopo controlado.');
        lines.push('');
        lines.push('Objetivo: ' + (val('spb-goal') || current || '[descreva o objetivo]'));
        if (val('spb-scope')) lines.push('Telas/arquivos afetados: ' + val('spb-scope'));
        if (val('spb-error')) lines.push('Contexto/erro atual:\n' + val('spb-error'));
        lines.push('');
        lines.push('Restrições:');
        lines.push('- Preserve o que já funciona.');
        lines.push('- Não refatore fora do escopo.');
        lines.push('- Não altere banco, Auth, RLS, Storage, policies, RPC ou integrações sem necessidade explícita.');
        if (val('spb-nochange')) lines.push('- Não alterar: ' + val('spb-nochange'));
        if (depth === 'cirurgico') lines.push('- Faça a menor alteração segura possível.');
        if (depth === 'profundo') lines.push('- Faça uma auditoria breve antes de alterar e explique riscos relevantes.');
        lines.push('');
        lines.push('Critério de aceite:');
        if (val('spb-accept')) lines.push('- ' + val('spb-accept'));
        else lines.push('- comportamento validado sem regressões aparentes; informar arquivos alterados e como testar.');
        lines.push('');
        lines.push('Ao final, responda com: arquivos alterados, resumo da solução, riscos/pendências e checklist de validação.');
        var area = document.getElementById('sp-msg');
        if (area) { area.value = spAppendProjectSafeClosing(lines.join('\n')); area.focus(); spUpdateCreditAdvisor(); }
        close();
      } }
    ], { width: 520 });
  }

  async function spCaptureErrorContext() {
    var log = document.getElementById('sp-log');
    if (log) { log.className = 'sp-log sp-log-info'; log.textContent = 'Capturando contexto da aba do Lovable...'; }
    var resp = await spSendToLovableTab('FL_CAPTURE_PAGE_CONTEXT', '');
    if (!resp || !resp.success) { showAlert('Captura indisponível', (resp && resp.error) || 'Não consegui capturar a aba do Lovable.'); return; }
    var lines = [];
    lines.push('Corrija o problema abaixo usando o menor ajuste seguro possível.');
    lines.push('');
    lines.push('Contexto capturado:');
    lines.push('- URL: ' + (resp.url || ''));
    lines.push('- Título: ' + (resp.title || ''));
    if (resp.projectHint) lines.push('- Projeto/rota: ' + resp.projectHint);
    if (resp.visibleErrors && resp.visibleErrors.length) {
      lines.push('');
      lines.push('Erros/mensagens visíveis:');
      resp.visibleErrors.slice(0, 8).forEach(function(e) { lines.push('- ' + e); });
    }
    if (resp.consoleSignals && resp.consoleSignals.length) {
      lines.push('');
      lines.push('Console/avisos recentes capturados:');
      resp.consoleSignals.slice(0, 6).forEach(function(e) { lines.push('- [' + (e.level || 'log') + '] ' + (e.message || '')); });
    }
    if (resp.selectedText) { lines.push(''); lines.push('Texto selecionado:\n' + resp.selectedText); }
    lines.push('');
    lines.push('Regras: não altere banco/Auth/RLS sem necessidade; preserve o que funciona; informe arquivos alterados e como validar.');
    var area = document.getElementById('sp-msg');
    if (area) { area.value = spAppendProjectSafeClosing(lines.join('\n')); area.focus(); spUpdateCreditAdvisor(); }
    if (log) { log.className = 'sp-log sp-log-success'; log.textContent = 'Contexto capturado e inserido no prompt.'; }
  }

  function spAnalyzeLovableText(text) {
    var t = String(text || '').toLowerCase();
    var findings = [];
    var next = [];
    if (/rls|policy|auth|migration|schema|rpc|storage/.test(t)) findings.push('A resposta menciona área sensível: banco/Auth/RLS/Storage. Valide antes de aceitar.');
    if (/refactor|refator|rewrite|reescrev|reorganizei|arquitetura/.test(t)) findings.push('Há sinal de refatoração. Confirme se ficou dentro do escopo.');
    if (/não consegui|cannot|failed|erro|error|não foi possível/.test(t)) findings.push('A resposta indica falha ou limitação; peça diagnóstico específico antes de novo envio grande.');
    if (!/arquivo|file|alterad|changed/.test(t)) findings.push('A resposta não parece listar arquivos alterados. Peça essa lista antes de continuar.');
    next.push('Liste exatamente os arquivos alterados e como validar a correção.');
    next.push('Confirme que nenhuma alteração de banco/Auth/RLS foi feita sem necessidade.');
    if (/erro|bug|failed|falha/.test(t)) next.push('Informe a causa raiz provável e o menor ajuste necessário.');
    if (!findings.length) findings.push('Resposta parece objetiva, mas valide no preview, console e mobile antes de novo prompt.');
    return { findings: findings, next: next };
  }


  function spStatusLabel(status) {
    if (status === 'ok') return 'OK';
    if (status === 'warn') return 'Atenção';
    return 'Corrigir';
  }

  function spBuildSeoAeoAuditHtml(report) {
    var checks = Array.isArray(report.checks) ? report.checks : [];
    var score = Number(report.score || 0);
    var scoreClass = score >= 80 ? 'sp-risk-low' : (score >= 55 ? 'sp-risk-medium' : 'sp-risk-high');
    var rows = checks.map(function(c) {
      var cls = c.status === 'ok' ? 'sp-risk-low' : (c.status === 'warn' ? 'sp-risk-medium' : 'sp-risk-high');
      return '<div class="sp-pro-check-row '+cls+'"><strong>'+spEscapeHtml(c.label)+'</strong><span>'+spEscapeHtml(spStatusLabel(c.status))+'</span><small>'+spEscapeHtml(c.detail || '')+'</small></div>';
    }).join('');
    var notes = (report.frameNotes || []).length ? '<div class="sp-pro-callout"><strong>Observação:</strong><br>'+spEscapeHtml(report.frameNotes.join('\n'))+'</div>' : '';
    return '<div class="sp-credit-card '+scoreClass+'">' +
      '<div class="sp-credit-row"><span class="sp-credit-pill">🔎 SEO/AEO</span><span class="sp-credit-meta">Score '+score+'/100</span></div>' +
      '<div class="sp-credit-main">Alvo: '+spEscapeHtml(report.targetLabel || 'Página atual')+'</div>' +
      '<div style="font-size:11px;color:var(--fl-text-muted);margin-top:4px;word-break:break-all;">'+spEscapeHtml(report.targetUrl || report.url || '')+'</div>' +
    '</div>' + notes + '<div class="sp-pro-output" style="max-height:320px;overflow:auto;">' + rows + '</div>' +
    '<div class="sp-pro-callout">Use “Inserir prompt” para pedir ao Lovable uma correção cirúrgica de SEO/AEO preservando o projeto existente.</div>';
  }


  function spJsonTryParse(text) {
    try { return JSON.parse(String(text || '')); } catch (_) { return null; }
  }

  function spNormalizeUrlHost(url) {
    try { var u = new URL(String(url || '').trim()); return u.origin; } catch (_) { return ''; }
  }

  function spExtractEndpointsFromText(raw) {
    var text = String(raw || '');
    var endpoints = [];
    var seen = new Set();
    function add(method, path, summary) {
      method = String(method || 'GET').toUpperCase();
      path = String(path || '').trim();
      if (!path || path.length > 220) return;
      if (!/^\//.test(path) && !/^https?:\/\//i.test(path)) return;
      var key = method + ' ' + path;
      if (seen.has(key)) return;
      seen.add(key);
      endpoints.push({ method: method, path: path, summary: summary || '' });
    }
    var re = /\b(GET|POST|PUT|PATCH|DELETE)\s+((?:https?:\/\/[^\s"'`<>]+)|(?:\/[A-Za-z0-9_\-./:{}?=&%]+))/gi;
    var m;
    while ((m = re.exec(text)) && endpoints.length < 30) add(m[1], m[2], 'Extraído da documentação');
    var pathRe = /["'`]((?:\/[A-Za-z0-9_\-./:{}?=&%]+))["'`]/g;
    while ((m = pathRe.exec(text)) && endpoints.length < 30) add('GET', m[1], 'Possível endpoint detectado');
    return endpoints;
  }

  function spExtractOpenApiSchema(raw, urlHint) {
    var rawText = String(raw || '').trim();
    var parsed = spJsonTryParse(rawText);
    var schema = {
      title: 'API externa',
      version: '',
      baseUrl: spNormalizeUrlHost(urlHint),
      authMethod: 'A definir',
      endpoints: [],
      secrets: [],
      rawKind: parsed ? 'json' : 'texto'
    };
    if (parsed && typeof parsed === 'object') {
      var info = parsed.info || {};
      schema.title = info.title || parsed.title || schema.title;
      schema.version = info.version || parsed.version || '';
      var servers = Array.isArray(parsed.servers) ? parsed.servers : [];
      if (servers[0] && servers[0].url) schema.baseUrl = servers[0].url;
      if (!schema.baseUrl && parsed.host) schema.baseUrl = (parsed.schemes && parsed.schemes[0] ? parsed.schemes[0] : 'https') + '://' + parsed.host + (parsed.basePath || '');
      var security = parsed.components && parsed.components.securitySchemes ? parsed.components.securitySchemes : (parsed.securityDefinitions || {});
      var secretNames = [];
      Object.keys(security || {}).forEach(function(k) {
        var s = security[k] || {};
        var type = [s.type, s.scheme, s.in, s.name].filter(Boolean).join(' ');
        secretNames.push(k);
        if (/apiKey|api key/i.test(type)) schema.authMethod = 'API Key' + (s.name ? ' em ' + s.name : '');
        else if (/bearer|oauth/i.test(type)) schema.authMethod = /oauth/i.test(type) ? 'OAuth 2.0' : 'Bearer Token';
        else if (/basic/i.test(type)) schema.authMethod = 'Basic Auth';
      });
      schema.secrets = secretNames.map(function(k) { return k.toUpperCase().replace(/[^A-Z0-9]+/g, '_') + '_KEY'; });
      var paths = parsed.paths || {};
      Object.keys(paths).forEach(function(path) {
        var item = paths[path] || {};
        ['get','post','put','patch','delete'].forEach(function(method) {
          if (item[method]) {
            schema.endpoints.push({ method: method.toUpperCase(), path: path, summary: item[method].summary || item[method].description || '' });
          }
        });
      });
    }
    if (!schema.endpoints.length) schema.endpoints = spExtractEndpointsFromText(rawText);
    if (!schema.baseUrl && rawText) {
      var urlMatch = rawText.match(/https?:\/\/[^\s"'`<>]+/i);
      if (urlMatch) schema.baseUrl = spNormalizeUrlHost(urlMatch[0]);
    }
    if (!schema.secrets.length && /api[_ -]?key|token|bearer|authorization/i.test(rawText)) schema.secrets = ['THIRD_PARTY_API_KEY'];
    return schema;
  }

  function spBuildApiConnectorPrompt(schema, opts) {
    opts = opts || {};
    var endpoints = (schema.endpoints || []).slice(0, 18).map(function(e) {
      return '- ' + (e.method || 'GET') + ' ' + (e.path || '/') + (e.summary ? ' — ' + e.summary : '');
    }).join('\n') || '- Informe os endpoints necessários a partir da documentação fornecida.';
    var secrets = (opts.secrets || schema.secrets || []).filter(Boolean).join(', ') || 'THIRD_PARTY_API_KEY';
    var lines = [
      'Atue como arquiteto sênior no Lovable para conectar uma API externa com segurança.',
      '',
      'Objetivo:',
      'Criar ou planejar a integração com ' + (opts.name || schema.title || 'API externa') + ' preservando o projeto existente.',
      '',
      'Tipo de integração desejada:',
      '- ' + (opts.connectorType || 'API externa / App Connector quando necessário'),
      '',
      'Especificação da API:',
      '- Base URL: ' + (opts.baseUrl || schema.baseUrl || 'A definir'),
      '- Auth Method: ' + (opts.authMethod || schema.authMethod || 'A definir'),
      '- Secrets necessários: ' + secrets,
      '',
      'Endpoints principais:',
      endpoints,
      '',
      'Regras de segurança:',
      '- Não exponha secrets, tokens, LOVABLE_API_KEY ou chaves de terceiros no frontend.',
      '- Use variáveis de ambiente/secrets no backend/rotas autenticadas quando necessário.',
      '- Valide entradas, trate erros de API e nunca registre valores secretos em logs.',
      '- Se usar App Connector, garanta autenticação apropriada e explique onde configurar LOVABLE_API_KEY.',
      '- Se usar MCP/Chat Connector, limite o contexto exposto à IA e descreva os dados acessíveis.',
      '',
      'Entregáveis esperados:',
      '- Plano curto da integração antes de alterações sensíveis.',
      '- Arquivos/rotas/componentes que serão criados ou alterados.',
      '- Exemplos seguros de request/response sem secrets reais.',
      '- Checklist de validação local e publicado.'
    ];
    return spAppendProjectSafeClosing(lines.join('\n'));
  }

  function spBuildApiSchemaPreviewHtml(schema) {
    var eps = (schema.endpoints || []).slice(0, 12).map(function(e) {
      return '<li><strong>' + spEscapeHtml(e.method || 'GET') + '</strong> ' + spEscapeHtml(e.path || '/') + (e.summary ? '<br><span>' + spEscapeHtml(e.summary).slice(0, 180) + '</span>' : '') + '</li>';
    }).join('') || '<li>Nenhum endpoint detectado automaticamente.</li>';
    var secrets = (schema.secrets || []).map(function(s) { return '<span class="sp-credit-pill">' + spEscapeHtml(s) + '</span>'; }).join(' ') || '<span class="sp-credit-meta">Nenhum secret detectado automaticamente</span>';
    return '<div class="sp-diagnosis-grid">' +
      '<div class="sp-diagnosis-card"><span>API</span><strong>' + spEscapeHtml(schema.title || 'API externa') + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Base URL</span><strong>' + spEscapeHtml(schema.baseUrl || 'A definir') + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Auth</span><strong>' + spEscapeHtml(schema.authMethod || 'A definir') + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Endpoints</span><strong>' + String((schema.endpoints || []).length) + '</strong></div>' +
    '</div>' +
    '<div class="sp-pro-callout"><strong>Secrets sugeridos:</strong><br>' + secrets + '</div>' +
    '<ul class="sp-pro-list">' + eps + '</ul>';
  }

  async function spFetchPublicDoc(url) {
    var resp = await safeSendMessage({ action: 'FL_FETCH_PUBLIC_DOC', url: url });
    if (!resp || !resp.success) throw new Error((resp && resp.error) || 'Não foi possível ler a documentação. Cole o JSON/texto manualmente.');
    return String(resp.text || '');
  }


  function spExtractQueryInfo(raw) {
    var text = String(raw || '').trim();
    var lower = text.toLowerCase();
    var tables = [];
    var colsWhere = [];
    var colsJoin = [];
    var colsOrder = [];
    var issues = [];
    var suggestions = [];
    function pushUnique(arr, v) { v = String(v || '').trim().replace(/["`]/g, ''); if (v && arr.indexOf(v) === -1) arr.push(v); }
    var tableRe = /\b(?:from|join|update|into)\s+([a-zA-Z_][\w.]*)(?:\s+as\s+\w+|\s+\w+)?/g;
    var m;
    while ((m = tableRe.exec(text))) pushUnique(tables, m[1]);
    var wherePart = (text.match(/\bwhere\b([\s\S]*?)(?:\bgroup\s+by\b|\border\s+by\b|\blimit\b|\boffset\b|;|$)/i) || [,''])[1];
    var colRe = /(?:^|[\s(])([a-zA-Z_][\w.]*?)\s*(?:=|>|<|>=|<=|<>|!=|\bin\b|\blike\b|\bilike\b|\bis\b)/gi;
    while ((m = colRe.exec(wherePart))) pushUnique(colsWhere, m[1]);
    var joinRe = /\bon\b\s+([a-zA-Z_][\w.]*?)\s*=\s*([a-zA-Z_][\w.]*)/gi;
    while ((m = joinRe.exec(text))) { pushUnique(colsJoin, m[1]); pushUnique(colsJoin, m[2]); }
    var orderPart = (text.match(/\border\s+by\b([\s\S]*?)(?:\blimit\b|\boffset\b|;|$)/i) || [,''])[1];
    var orderCols = orderPart.split(',').map(function(x){ return x.trim().split(/\s+/)[0]; }).filter(Boolean);
    orderCols.forEach(function(c){ pushUnique(colsOrder, c); });

    if (/select\s+\*/i.test(text)) issues.push('Uso de SELECT * pode trazer colunas desnecessárias e aumentar tráfego/renderização.');
    if (/\bselect\b/i.test(text) && !/\blimit\s+\d+/i.test(text)) issues.push('Consulta SELECT sem LIMIT/paginação explícita.');
    if (/\boffset\s+\d+/i.test(text)) issues.push('OFFSET alto pode ficar lento em tabelas grandes; considerar keyset pagination.');
    if (/\bilike\s+['"]%/i.test(text) || /\blike\s+['"]%/i.test(text)) issues.push('Busca com prefixo % impede uso eficiente de índice B-tree.');
    if (/lower\s*\(|date_trunc\s*\(|::date|to_char\s*\(/i.test(text)) issues.push('Função/cast sobre coluna em filtro pode impedir uso de índice simples.');
    if (/count\s*\(\s*\*\s*\)/i.test(text)) issues.push('COUNT(*) em tabela grande pode ser caro dependendo dos filtros e RLS.');
    if (/\bor\b/i.test(wherePart)) issues.push('Muitos ORs podem dificultar o plano; avaliar UNION, índices parciais ou normalização do filtro.');
    if (/\bjsonb?\b|->>|->/i.test(text)) issues.push('Filtros em JSON/JSONB podem precisar de GIN ou expressão indexada, conforme o acesso.');
    if (/\brpc\b|security definer|policy|rls/i.test(lower)) issues.push('Há sinais de RPC/RLS: otimização deve preservar isolamento e permissões.');

    if (colsWhere.length) suggestions.push('Avaliar índice nas colunas de filtro: ' + colsWhere.slice(0, 8).join(', ') + '.');
    if (colsJoin.length) suggestions.push('Avaliar índices nas chaves de JOIN/FK: ' + colsJoin.slice(0, 8).join(', ') + '.');
    if (colsOrder.length) suggestions.push('Se combinado com filtros, avaliar índice composto para ORDER BY: ' + colsOrder.slice(0, 6).join(', ') + '.');
    if (/created_at|updated_at/i.test(text) && /order\s+by/i.test(text)) suggestions.push('Para timelines/listas, considerar índice composto como (owner_id, created_at desc) ou equivalente ao filtro real.');
    if (/ilike|like/i.test(text)) suggestions.push('Para busca textual, considerar pg_trgm + GIN/GIST ou full-text search, se fizer sentido para o produto.');
    if (!issues.length) issues.push('Nenhum problema óbvio detectado localmente; peça ao Lovable validar com EXPLAIN ANALYZE e dados reais.');
    return { tables: tables, colsWhere: colsWhere, colsJoin: colsJoin, colsOrder: colsOrder, issues: issues, suggestions: suggestions };
  }

  function spBuildDbPerformancePrompt(input) {
    var raw = String(input.raw || '').trim();
    var info = spExtractQueryInfo(raw);
    var lines = [
      'Atue como especialista sênior em Supabase/PostgreSQL e Lovable. Analise a query, estrutura de tabela ou fluxo abaixo com foco em performance, preservando totalmente o projeto existente.',
      '',
      'Contexto informado:',
      '- Tipo de análise: ' + (input.kind || 'Query/estrutura Supabase/PostgreSQL'),
      '- Sintoma observado: ' + (input.symptom || 'A definir'),
      '- Tabela/área afetada: ' + (input.area || 'A definir'),
      '- Volume estimado: ' + (input.volume || 'A definir'),
      '',
      'Conteúdo para análise:',
      '```sql',
      raw || '-- Cole aqui a query, estrutura CREATE TABLE, policy/RPC ou trecho Supabase.',
      '```',
      '',
      'Sinais detectados localmente pela extensão:',
      '- Tabelas prováveis: ' + (info.tables.join(', ') || 'não detectadas'),
      '- Colunas em filtros: ' + (info.colsWhere.join(', ') || 'não detectadas'),
      '- Colunas em JOIN: ' + (info.colsJoin.join(', ') || 'não detectadas'),
      '- Colunas em ORDER BY: ' + (info.colsOrder.join(', ') || 'não detectadas'),
      '- Possíveis pontos de atenção: ' + info.issues.join(' | '),
      '- Sugestões iniciais: ' + info.suggestions.join(' | '),
      '',
      'Tarefas:',
      '1. Explique o gargalo provável sem inventar métricas.',
      '2. Reescreva a query somente se houver ganho claro e sem mudar resultado funcional.',
      '3. Sugira índices apenas quando justificados por filtro, JOIN, ORDER BY, seletividade ou volume.',
      '4. Se sugerir migration, entregue SQL mínimo, nome de índice claro, opção CONCURRENTLY quando aplicável e plano de rollback.',
      '5. Preserve RLS, Auth, RPCs, grants, permissões, dados existentes e isolamento entre usuários/organizações.',
      '6. Mostre como medir antes/depois com EXPLAIN ANALYZE ou ferramenta equivalente no Supabase/PostgreSQL.',
      '7. Liste riscos: aumento de escrita, locks, índice redundante, impacto em deploy e necessidade de dados reais.',
      '',
      'Entregáveis esperados:',
      '- Diagnóstico curto.',
      '- Query otimizada, se necessário.',
      '- Índices recomendados com justificativa.',
      '- SQL/migration somente se indispensável.',
      '- Checklist de validação no Lovable/Supabase.'
    ];
    return spAppendProjectSafeClosing(lines.join('\n'));
  }

  function spBuildDbPerformanceHtml(info) {
    function chips(list) { return (list || []).slice(0, 10).map(function(x){ return '<span class="sp-credit-pill">' + spEscapeHtml(x) + '</span>'; }).join(' ') || '<span class="sp-credit-meta">Não detectado</span>'; }
    var issues = (info.issues || []).map(function(x){ return '<li>' + spEscapeHtml(x) + '</li>'; }).join('');
    var suggestions = (info.suggestions || []).map(function(x){ return '<li>' + spEscapeHtml(x) + '</li>'; }).join('');
    return '<div class="sp-diagnosis-grid">' +
      '<div class="sp-diagnosis-card"><span>Tabelas</span><strong>' + String((info.tables || []).length) + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Filtros</span><strong>' + String((info.colsWhere || []).length) + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>JOINs</span><strong>' + String((info.colsJoin || []).length) + '</strong></div>' +
      '<div class="sp-diagnosis-card"><span>Ordenação</span><strong>' + String((info.colsOrder || []).length) + '</strong></div>' +
    '</div>' +
    '<div class="sp-pro-callout"><strong>Colunas em filtros:</strong><br>' + chips(info.colsWhere) + '</div>' +
    '<div class="sp-pro-callout"><strong>Colunas em JOIN/ORDER:</strong><br>' + chips((info.colsJoin || []).concat(info.colsOrder || [])) + '</div>' +
    '<h4 class="sp-pro-section-title">Pontos de atenção</h4><ul class="sp-pro-list">' + issues + '</ul>' +
    '<h4 class="sp-pro-section-title">Sugestões iniciais</h4><ul class="sp-pro-list">' + suggestions + '</ul>';
  }

  function spShowDbPerformanceTool() {
    var body = '<div class="sp-builder-grid">' +
      '<label>Tipo de análise<select id="spdb-kind"><option>Query SELECT lenta</option><option>RPC Supabase lenta</option><option>Estrutura de tabela</option><option>RLS/policy afetando performance</option><option>Lista/timeline/paginação</option><option>Busca textual</option><option>Dashboard/relatório</option></select></label>' +
      '<label>Sintoma observado<input id="spdb-symptom" placeholder="Ex.: tela demora, timeout, lista lenta, filtro pesado"></label>' +
      '<label>Tabela/área afetada<input id="spdb-area" placeholder="Ex.: profiles, tasks, orders, dashboard"></label>' +
      '<label>Volume estimado<input id="spdb-volume" placeholder="Ex.: 50 mil linhas, muitos usuários, crescimento diário"></label>' +
      '<label style="grid-column:1/-1">Cole a query, CREATE TABLE, policy, RPC ou trecho Supabase<textarea id="spdb-raw" rows="10" placeholder="SELECT ...\n\nCREATE TABLE ...\n\n-- ou cole aqui a estrutura do fluxo Supabase"></textarea></label>' +
      '<div class="sp-pro-callout" style="grid-column:1/-1">Análise local: a extensão sugere pontos prováveis, mas quem deve validar índice/query é o Lovable/Supabase com EXPLAIN ANALYZE e dados reais. Não cole secrets.</div>' +
      '<div id="spdb-preview" style="grid-column:1/-1"></div>' +
    '</div>';
    spShowProModal('Simulador de Performance PostgreSQL/Supabase', body, [
      { id: 'spdb-analyze', label: 'Analisar local', kind: 'secondary', onClick: function(close, overlay) {
        var raw = overlay.querySelector('#spdb-raw')?.value || '';
        var info = spExtractQueryInfo(raw);
        var preview = overlay.querySelector('#spdb-preview');
        if (preview) preview.innerHTML = spBuildDbPerformanceHtml(info);
      } },
      { id: 'spdb-copy', label: 'Copiar prompt', kind: 'secondary', onClick: function(close, overlay) {
        var prompt = spBuildDbPerformancePrompt({
          raw: overlay.querySelector('#spdb-raw')?.value || '',
          kind: overlay.querySelector('#spdb-kind')?.value || '',
          symptom: overlay.querySelector('#spdb-symptom')?.value || '',
          area: overlay.querySelector('#spdb-area')?.value || '',
          volume: overlay.querySelector('#spdb-volume')?.value || ''
        });
        spCopyText(prompt).then(function(){ showAlert('Copiado', 'Prompt de performance PostgreSQL/Supabase copiado.'); });
      } },
      { id: 'spdb-use', label: 'Inserir prompt', kind: 'primary', onClick: function(close, overlay) {
        var prompt = spBuildDbPerformancePrompt({
          raw: overlay.querySelector('#spdb-raw')?.value || '',
          kind: overlay.querySelector('#spdb-kind')?.value || '',
          symptom: overlay.querySelector('#spdb-symptom')?.value || '',
          area: overlay.querySelector('#spdb-area')?.value || '',
          volume: overlay.querySelector('#spdb-volume')?.value || ''
        });
        var area = document.getElementById('sp-msg');
        if (area) { area.value = prompt; spUpdateCreditAdvisor(); }
        close();
        showAlert('Prompt inserido', 'Revise antes de enviar ao Lovable.');
      } }
    ], { width: 660 });
  }

  function spShowApiSchemaGenerator() {
    var body = '<div class="sp-builder-grid">' +
      '<label>Nome da API<input id="spapi-name" placeholder="Ex.: OpenWeatherMap, Stripe, API interna"></label>' +
      '<label>URL da documentação/OpenAPI<input id="spapi-url" placeholder="https://.../openapi.json ou página pública"></label>' +
      '<label>Base URL<input id="spapi-base" placeholder="https://api.exemplo.com/v1"></label>' +
      '<label>Método de autenticação<select id="spapi-auth"><option>API Key</option><option>Bearer Token</option><option>OAuth 2.0</option><option>Basic Auth</option><option>Sem autenticação</option><option>A definir</option></select></label>' +
      '<label>Tipo de conector<select id="spapi-type"><option>API externa / App Connector quando necessário</option><option>App Connector com rotas autenticadas</option><option>Chat Connector / MCP server</option><option>Somente client-side seguro</option><option>Planejamento antes de implementar</option></select></label>' +
      '<label>Secrets esperados<input id="spapi-secrets" placeholder="LOVABLE_API_KEY, OPENWEATHER_API_KEY..."></label>' +
      '<label style="grid-column:1/-1">Cole OpenAPI/Swagger JSON ou trecho da documentação<textarea id="spapi-raw" rows="8" placeholder="Cole aqui JSON OpenAPI, Swagger ou texto com endpoints..."></textarea></label>' +
      '<div class="sp-pro-callout" style="grid-column:1/-1">A extensão tenta formatar a documentação localmente. Não cole valores reais de secrets; use apenas nomes das variáveis.</div>' +
    '</div>';
    spShowProModal('Gerador de API / OpenAPI para Prompt', body, [
      { id: 'spapi-fetch', label: 'Ler URL', kind: 'secondary', onClick: async function(close, overlay) {
        var url = (overlay.querySelector('#spapi-url')?.value || '').trim();
        if (!url) { showAlert('URL vazia', 'Informe uma URL pública ou cole o JSON manualmente.'); return; }
        try {
          overlay.querySelector('#spapi-raw').value = 'Lendo documentação...';
          var txt = await spFetchPublicDoc(url);
          overlay.querySelector('#spapi-raw').value = txt.slice(0, 90000);
          showAlert('Documentação lida', 'Conteúdo carregado. Revise antes de gerar o prompt.');
        } catch (e) { overlay.querySelector('#spapi-raw').value = ''; showAlert('Falha ao ler URL', e.message || String(e)); }
      } },
      { id: 'spapi-preview', label: 'Prévia', kind: 'secondary', onClick: function(close, overlay) {
        var raw = overlay.querySelector('#spapi-raw')?.value || '';
        var url = overlay.querySelector('#spapi-url')?.value || '';
        var schema = spExtractOpenApiSchema(raw, url);
        spShowProModal('Prévia da API detectada', spBuildApiSchemaPreviewHtml(schema), [{ id: 'spapi-prev-ok', label: 'Fechar', kind: 'primary' }], { width: 520 });
      } },
      { id: 'spapi-generate', label: 'Gerar prompt', kind: 'primary', onClick: function(close, overlay) {
        var raw = overlay.querySelector('#spapi-raw')?.value || '';
        var url = overlay.querySelector('#spapi-url')?.value || '';
        var schema = spExtractOpenApiSchema(raw, url);
        var secretText = (overlay.querySelector('#spapi-secrets')?.value || '').trim();
        var prompt = spBuildApiConnectorPrompt(schema, {
          name: (overlay.querySelector('#spapi-name')?.value || schema.title || '').trim(),
          baseUrl: (overlay.querySelector('#spapi-base')?.value || schema.baseUrl || '').trim(),
          authMethod: overlay.querySelector('#spapi-auth')?.value || schema.authMethod,
          connectorType: overlay.querySelector('#spapi-type')?.value || '',
          secrets: secretText ? secretText.split(',').map(function(s){ return s.trim(); }) : schema.secrets
        });
        var area = document.getElementById('sp-msg');
        if (area) { area.value = prompt; spUpdateCreditAdvisor(); }
        close();
        showAlert('Prompt de API criado', 'Revise o prompt antes de enviar ao Lovable.');
      } }
    ], { width: 620 });
  }

  function spLoadSecretChecklist(cb) {
    chrome.storage.local.get([SP_SECRETS_STORAGE_KEY], function(r) {
      var list = Array.isArray(r[SP_SECRETS_STORAGE_KEY]) ? r[SP_SECRETS_STORAGE_KEY] : SP_DEFAULT_SECRET_CHECKLIST.slice();
      cb(list.slice(0, SP_SECRETS_MAX));
    });
  }

  function spSaveSecretChecklist(list, cb) {
    var clean = (Array.isArray(list) ? list : []).map(function(item) {
      return {
        name: String(item.name || '').trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_'),
        required: !!item.required,
        scope: String(item.scope || '').trim() || 'Geral',
        note: String(item.note || '').trim()
      };
    }).filter(function(item) { return item.name; }).slice(0, SP_SECRETS_MAX);
    chrome.storage.local.set({ [SP_SECRETS_STORAGE_KEY]: clean }, function(){ if (cb) cb(clean); });
  }

  function spSecretRowsHtml(list) {
    return (list || []).map(function(s, i) {
      return '<div class="sp-template-card" data-secret-row="' + i + '">' +
        '<div class="sp-template-card-head">' +
          '<input class="sp-secret-name" value="' + spEscapeHtml(s.name || '') + '" placeholder="NOME_DA_VARIAVEL" autocomplete="off">' +
          '<input class="sp-secret-scope" value="' + spEscapeHtml(s.scope || 'Geral') + '" placeholder="Escopo" autocomplete="off">' +
        '</div>' +
        '<textarea class="sp-secret-note sp-template-prompt" rows="2" placeholder="Observação: onde usar, risco, ambiente publicado...">' + spEscapeHtml(s.note || '') + '</textarea>' +
        '<div class="sp-template-card-actions">' +
          '<label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--fl-text-muted)"><input class="sp-secret-required" type="checkbox" ' + (s.required ? 'checked' : '') + '>Obrigatório</label>' +
          '<button class="sp-template-mini sp-template-danger" data-secret-action="remove">Excluir</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function spReadSecretsFromModal(overlay) {
    return Array.from(overlay.querySelectorAll('[data-secret-row]')).map(function(row) {
      return {
        name: row.querySelector('.sp-secret-name')?.value || '',
        scope: row.querySelector('.sp-secret-scope')?.value || 'Geral',
        note: row.querySelector('.sp-secret-note')?.value || '',
        required: !!row.querySelector('.sp-secret-required')?.checked
      };
    });
  }

  function spBuildSecretsPrompt(list) {
    var rows = (list || []).map(function(s) {
      return '- ' + (s.required ? '[OBRIGATÓRIO] ' : '[OPCIONAL] ') + s.name + ' — ' + (s.scope || 'Geral') + (s.note ? ': ' + s.note : '');
    }).join('\n') || '- LOVABLE_API_KEY — configure se houver App Connector/rotas autenticadas.';
    return spAppendProjectSafeClosing([
      'Audite e configure os secrets/variáveis de ambiente necessários para os conectores deste projeto Lovable.',
      '',
      'Importante: não use valores reais de secrets no chat. Trabalhe apenas com nomes das variáveis.',
      '',
      'Checklist de secrets:',
      rows,
      '',
      'Valide:',
      '- Quais variáveis são obrigatórias para ambiente publicado.',
      '- Quais devem existir somente no backend/Edge Function/rotas autenticadas.',
      '- Se LOVABLE_API_KEY é necessária para App Connectors.',
      '- Se chaves de terceiros estão isoladas e nunca expostas no frontend.',
      '- Mensagens de erro quando secret estiver ausente.',
      '',
      'Ao final, entregue checklist de configuração, arquivos/rotas afetados e teste de publicação.'
    ].join('\n'));
  }

  function spShowSecretsValidator() {
    spLoadSecretChecklist(function(list) {
      var body = '<div class="sp-history-privacy">Salvo somente neste navegador em <strong>chrome.storage.local</strong>. Não salve valores reais de secrets, apenas nomes e lembretes.</div>' +
        '<div id="sp-secrets-list" class="sp-template-manager-list">' + spSecretRowsHtml(list) + '</div>';
      spShowProModal('Validador de Secrets / Variáveis', body, [
        { id: 'spsec-add', label: '+ Secret', kind: 'secondary', onClick: function(close, overlay) {
          var c = overlay.querySelector('#sp-secrets-list');
          if (!c) return;
          c.insertAdjacentHTML('beforeend', spSecretRowsHtml([{ name: '', required: false, scope: 'API externa', note: '' }]));
        } },
        { id: 'spsec-reset', label: 'Restaurar', kind: 'secondary', onClick: function(close, overlay) {
          var c = overlay.querySelector('#sp-secrets-list');
          if (c) c.innerHTML = spSecretRowsHtml(SP_DEFAULT_SECRET_CHECKLIST);
        } },
        { id: 'spsec-copy', label: 'Copiar checklist', kind: 'secondary', onClick: function(close, overlay) {
          var list = spReadSecretsFromModal(overlay);
          spCopyText(list.map(function(s){ return (s.required ? '[OBRIGATÓRIO] ' : '[OPCIONAL] ') + s.name + ' — ' + s.scope + (s.note ? ': ' + s.note : ''); }).join('\n')).then(function(){ showAlert('Copiado', 'Checklist de secrets copiado.'); });
        } },
        { id: 'spsec-save', label: 'Salvar', kind: 'secondary', onClick: function(close, overlay) {
          spSaveSecretChecklist(spReadSecretsFromModal(overlay), function(){ showAlert('Secrets salvos', 'Checklist atualizado localmente.'); });
        } },
        { id: 'spsec-prompt', label: 'Inserir prompt', kind: 'primary', onClick: function(close, overlay) {
          var list = spReadSecretsFromModal(overlay);
          spSaveSecretChecklist(list);
          var area = document.getElementById('sp-msg');
          if (area) { area.value = spBuildSecretsPrompt(list); spUpdateCreditAdvisor(); }
          close();
          showAlert('Prompt inserido', 'Revise antes de enviar ao Lovable.');
        } }
      ], { width: 620 });
      setTimeout(function(){
        var overlay = document.querySelector('.sp-pro-overlay');
        overlay?.addEventListener('click', function(e) {
          var btn = e.target && e.target.closest ? e.target.closest('[data-secret-action="remove"]') : null;
          if (btn) btn.closest('[data-secret-row]')?.remove();
        });
      }, 0);
    });
  }

  async function spRunSeoAeoAudit() {
    var log = document.getElementById('sp-log');
    if (log) { log.className = 'sp-log sp-log-info'; log.textContent = '🔎 Auditando SEO/AEO da aba Lovable...'; }
    var resp = await spSendToLovableTab('FL_AUDIT_SEO_AEO', '');
    if (!resp || !resp.success) {
      showAlert('Auditoria indisponível', (resp && resp.error) || 'Não consegui acessar a aba do Lovable. Abra o preview/projeto e tente novamente.');
      if (log) { log.className = 'sp-log sp-log-error'; log.textContent = '✗ Auditoria SEO/AEO indisponível.'; }
      return;
    }
    if (log) { log.className = 'sp-log sp-log-success'; log.textContent = '✅ Auditoria SEO/AEO concluída.'; }
    var prompt = spAppendProjectSafeClosing(resp.prompt || 'Corrija SEO/AEO on-page preservando o projeto existente.');
    spShowProModal('Auditor SEO/AEO On-Page', spBuildSeoAeoAuditHtml(resp), [
      { id: 'spseo-close', label: 'Fechar', kind: 'secondary' },
      { id: 'spseo-copy', label: 'Copiar relatório', kind: 'secondary', onClick: function() { spCopyText(JSON.stringify(resp, null, 2)).then(function(){ showAlert('Copiado', 'Relatório SEO/AEO copiado em JSON.'); }); } },
      { id: 'spseo-use', label: 'Inserir prompt', kind: 'primary', onClick: function(close) { var area = document.getElementById('sp-msg'); if (area) { area.value = prompt; spUpdateCreditAdvisor(); } close(); showAlert('Prompt SEO/AEO inserido', 'Revise e envie ao Lovable quando quiser.'); } }
    ], { width: 620 });
  }

  function spShowKeywordInjector() {
    var body = '<div class="sp-builder-grid">' +
      '<label>Palavras-chave principais<textarea id="spkw-main" rows="3" placeholder="Ex.: cuidador de idosos, rotina de cuidados, segurança para idosos"></textarea></label>' +
      '<label>Palavras-chave secundárias<textarea id="spkw-secondary" rows="3" placeholder="Ex.: medicação, hidratação, agenda familiar, emergência"></textarea></label>' +
      '<label>Tipo de página<input id="spkw-page" placeholder="Ex.: landing page, página de serviço, blog, homepage" value="landing page"></label>' +
      '<label>Público e intenção<input id="spkw-intent" placeholder="Ex.: familiares buscando organizar cuidados de idosos"></label>' +
      '<label>Estrutura desejada<textarea id="spkw-structure" rows="3" placeholder="Ex.: Hero, benefícios, como funciona, prova social, FAQ, CTA"></textarea></label>' +
      '<div class="sp-pro-callout">Cole aqui ideias de palavras-chave coletadas manualmente ou vindas do Semrush no chat do Lovable. A extensão não consulta Semrush; ela estrutura o prompt com segurança.</div>' +
    '</div>';
    spShowProModal('Injetor de palavras-chave SEO/AEO', body, [
      { id: 'spkw-close', label: 'Fechar', kind: 'secondary' },
      { id: 'spkw-generate', label: 'Gerar prompt', kind: 'primary', onClick: function(close, overlay) {
        function v(id){ return (overlay.querySelector('#'+id)?.value || '').trim(); }
        var main = v('spkw-main');
        var secondary = v('spkw-secondary');
        var page = v('spkw-page') || 'landing page';
        var intent = v('spkw-intent') || 'usuários do projeto';
        var structure = v('spkw-structure') || 'Hero, problema, solução, benefícios, como funciona, FAQ e CTA';
        if (!main) { showAlert('Palavras-chave', 'Informe pelo menos uma palavra-chave principal.'); return; }
        var prompt = spAppendProjectSafeClosing([
          'Crie ou otimize uma ' + page + ' focada em SEO/AEO para buscas tradicionais e respostas de IA.',
          '',
          'Palavras-chave principais:',
          main.split(/[\n,;]/).map(function(x){ return x.trim(); }).filter(Boolean).map(function(x){ return '- ' + x; }).join('\n'),
          '',
          secondary ? 'Palavras-chave secundárias:\n' + secondary.split(/[\n,;]/).map(function(x){ return x.trim(); }).filter(Boolean).map(function(x){ return '- ' + x; }).join('\n') : 'Palavras-chave secundárias: não informadas.',
          '',
          'Público/intenção de busca: ' + intent,
          'Estrutura desejada em Markdown: ' + structure,
          '',
          'Requisitos:',
          '- Use metadados completos: title, meta description, canonical quando aplicável, Open Graph e Twitter Card.',
          '- Inclua dados estruturados JSON-LD apropriados, como WebSite, Organization, FAQPage, Article, BreadcrumbList, Product ou LocalBusiness, somente se fizer sentido para a página.',
          '- Use HTML semântico e hierarquia clara de H1/H2/H3.',
          '- Se o Lovable oferecer SSR/pré-renderização/metadados nativos no projeto, aplique pelo caminho mais seguro.',
          '- Se houver dados Semrush disponíveis no chat, use-os como referência; não invente volume, KD ou CPC.',
          '- Preserve o design, as rotas, as regras de negócio e funcionalidades existentes.',
          '- Ao final, liste arquivos alterados, metadados criados, JSON-LD incluído e passos de validação.'
        ].join('\n'));
        var area = document.getElementById('sp-msg');
        if (area) { area.value = prompt; spUpdateCreditAdvisor(); }
        close();
        showAlert('Prompt criado', 'Prompt SEO/AEO com palavras-chave inserido. Revise antes de enviar ao Lovable.');
      } }
    ], { width: 560 });
  }

  function spShowResponseAnalyzer() {
    var body = '<label class="sp-pro-label">Cole aqui a resposta do Lovable<textarea id="spr-response" rows="8" placeholder="Cole a resposta gerada pelo Lovable..."></textarea></label><div id="spr-output" class="sp-pro-output"></div>';
    spShowProModal('Analisar resposta do Lovable', body, [
      { id: 'spr-close', label: 'Fechar', kind: 'secondary' },
      { id: 'spr-analyze', label: 'Analisar', kind: 'primary', onClick: function(_, overlay) {
        var val = overlay.querySelector('#spr-response')?.value || '';
        var a = spAnalyzeLovableText(val);
        overlay.querySelector('#spr-output').innerHTML = '<div class="sp-pro-callout"><strong>Atenção:</strong><ul>' + a.findings.map(function(x){return '<li>'+spEscapeHtml(x)+'</li>';}).join('') + '</ul></div>' +
          '<div class="sp-pro-callout"><strong>Próximo prompt sugerido:</strong><br>' + spEscapeHtml(a.next.join(' ')) + '</div>' +
          '<button id="spr-use-next" class="sp-alert-ok sp-pro-modal-btn" style="width:100%;margin-top:8px;">Usar próximo prompt</button>';
        overlay.querySelector('#spr-use-next')?.addEventListener('click', function(){ var area=document.getElementById('sp-msg'); if(area){ area.value=spAppendProjectSafeClosing(a.next.join(' ')); spUpdateCreditAdvisor(); } overlay.remove(); });
      } }
    ], { width: 520 });
  }

  function spAuditScope() {
    var area = document.getElementById('sp-msg');
    var prompt = area ? area.value : '';
    if (!prompt.trim()) { showAlert('Auditor de escopo', 'Digite um prompt primeiro.'); return; }
    var t = prompt.toLowerCase();
    var signals = [];
    var taskCount = (prompt.match(/\n-|\n\d+\.| e |,|;/g) || []).length;
    if (taskCount > 6) signals.push('O prompt parece reunir muitas tarefas em uma única mensagem.');
    if (/banco|rls|auth|layout|seo|performance|mobile/.test(t) && taskCount > 2) signals.push('Mistura áreas técnicas diferentes; isso aumenta risco de regressão.');
    if (prompt.length > 1800) signals.push('O prompt está longo; pode ser melhor dividir em etapas.');
    if (!signals.length) signals.push('Escopo parece aceitável. Ainda assim, mantenha critério de aceite claro.');
    spShowProModal('Auditor de escopo', '<ul class="sp-pro-list">' + signals.map(function(s){return '<li>'+spEscapeHtml(s)+'</li>';}).join('') + '</ul><div class="sp-pro-callout">Sugestão: uma etapa por vez reduz retrabalho e créditos desperdiçados.</div>', [
      { id: 'spa-close', label: 'Fechar', kind: 'secondary' },
      { id: 'spa-split', label: 'Dividir em etapas', kind: 'primary', onClick: function(close){ close(); spSplitPromptIntoSteps(); } }
    ]);
  }

  function spSplitPromptIntoSteps() {
    var area = document.getElementById('sp-msg');
    if (!area || !area.value.trim()) { showAlert('Dividir em etapas', 'Digite um prompt primeiro.'); return; }
    var original = area.value.trim();
    area.value = spAppendProjectSafeClosing([
      'Antes de implementar, transforme o pedido abaixo em um plano econômico em etapas curtas.',
      '',
      'Pedido original:',
      original,
      '',
      'Entregue:',
      '1. Etapas recomendadas em ordem.',
      '2. O que pode ser feito por Visual Edits/Code Mode/manual.',
      '3. O que realmente precisa de prompt no Lovable.',
      '4. Riscos de banco/Auth/RLS/permissões, se houver.',
      '5. Primeiro prompt ideal para executar apenas a etapa 1.',
      '',
      'Não altere código ainda; apenas planeje.'
    ].join('\n'));
    spUpdateCreditAdvisor();
    showAlert('Prompt dividido', 'Transformei em pedido de plano econômico. Envie primeiro o plano para reduzir retrabalho.');
  }

  function spReducePrompt() {
    var area = document.getElementById('sp-msg');
    if (!area || !area.value.trim()) { showAlert('Reduzir prompt', 'Digite um prompt primeiro.'); return; }
    var raw = area.value.trim().replace(/\n{3,}/g, '\n\n');
    var category = spClassifyPromptCategory(raw);
    var sentences = raw.split(/(?<=[.!?])\s+|\n+/).map(function(s){ return s.trim(); }).filter(Boolean);
    var objective = sentences[0] || raw.slice(0, 500);
    var important = sentences.filter(function(s){ return /erro|bug|não|nao|precis|deve|preserve|rls|auth|banco|mobile|layout|arquivo|valid/.test(s.toLowerCase()); }).slice(0, 6);
    area.value = spAppendProjectSafeClosing([
      'Objetivo (' + category + '): ' + objective,
      '',
      'Pontos importantes:',
      important.length ? important.map(function(s){ return '- ' + s; }).join('\n') : '- preserve o que funciona; evite alterações fora do escopo.',
      '',
      'Ao final, informe arquivos alterados, resumo da correção e como validar.'
    ].join('\n'));
    spUpdateCreditAdvisor();
    showAlert('Prompt reduzido', 'Compactei localmente mantendo objetivo, restrições e validação. Nada foi enviado.');
  }

  function spToggleFocusMode() {
    var enabled = !document.body.classList.contains('sp-focus-mode');
    document.body.classList.toggle('sp-focus-mode', enabled);
    try { chrome.storage.local.set({ [SP_FOCUS_MODE_KEY]: enabled }); } catch (_) {}
    showAlert('Modo foco', enabled ? 'Modo foco ativado: painel mais limpo para envio.' : 'Modo foco desativado.');
  }

  function spRestoreFocusMode() {
    try { chrome.storage.local.get([SP_FOCUS_MODE_KEY], function(r){ document.body.classList.toggle('sp-focus-mode', !!r[SP_FOCUS_MODE_KEY]); }); } catch (_) {}
  }

  

  
  
  

  // Função checkForUpdate removida
  // Função checkResellerRole removida

    

  function spToggleTransferDeviceButton(visible) {
    const btn = document.getElementById('sp-transfer-device-btn');
    if (btn) btn.style.display = visible ? '' : 'none';
  }

  

  


  function spNormalizeDesignTokens(list) {
    var source = Array.isArray(list) ? list : SP_DEFAULT_DESIGN_TOKENS;
    var normalized = [];
    source.forEach(function(item) {
      var label = String(item && item.label || '').trim().slice(0, 70);
      var category = String(item && item.category || 'Geral').trim().slice(0, 40) || 'Geral';
      var value = String(item && item.value || '').trim().slice(0, 5000);
      var instruction = String(item && item.instruction || '').trim().slice(0, 12000);
      if (!label || (!value && !instruction)) return;
      normalized.push({ label: label, category: category, value: value, instruction: instruction });
    });
    if (!normalized.length) normalized = SP_DEFAULT_DESIGN_TOKENS.map(function(t) { return { label: t.label, category: t.category, value: t.value, instruction: t.instruction }; });
    return normalized.slice(0, SP_DESIGN_TOKENS_MAX);
  }

  function spMergeDefaultDesignTokens(saved) {
    var base = spNormalizeDesignTokens(Array.isArray(saved) && saved.length ? saved : []);
    var seen = new Set(base.map(function(t){ return String(t.label || '').toLowerCase().trim(); }));
    SP_DEFAULT_DESIGN_TOKENS.forEach(function(t) {
      var key = String(t.label || '').toLowerCase().trim();
      if (key && !seen.has(key)) { base.push({ label: t.label, category: t.category, value: t.value, instruction: t.instruction }); seen.add(key); }
    });
    return spNormalizeDesignTokens(base);
  }

  function spLoadDesignTokens(callback) {
    chrome.storage.local.get([SP_DESIGN_TOKENS_STORAGE_KEY], function(r) {
      var saved = r && r[SP_DESIGN_TOKENS_STORAGE_KEY];
      spDesignTokens = Array.isArray(saved) && saved.length ? spMergeDefaultDesignTokens(saved) : spNormalizeDesignTokens(SP_DEFAULT_DESIGN_TOKENS);
      chrome.storage.local.set({ [SP_DESIGN_TOKENS_STORAGE_KEY]: spDesignTokens });
      if (typeof callback === 'function') callback(spDesignTokens);
    });
  }

  function spSaveDesignTokens(list, callback) {
    spDesignTokens = spNormalizeDesignTokens(list);
    chrome.storage.local.set({ [SP_DESIGN_TOKENS_STORAGE_KEY]: spDesignTokens }, function() {
      if (typeof callback === 'function') callback(spDesignTokens);
    });
  }

  function spDesignTokenPrompt(token) {
    token = token || {};
    return spAppendProjectSafeClosing([
      'Aplique o seguinte token/diretriz visual no elemento selecionado ou no menor escopo necessário:',
      'Nome: ' + (token.label || 'Token visual'),
      'Categoria: ' + (token.category || 'Design'),
      token.value ? 'Valor/classes/link: ' + token.value : '',
      'Instrução: ' + (token.instruction || 'Use de forma consistente e acessível.'),
      '',
      'Cuidados:',
      '- Preserve identidade visual, regras de negócio e comportamento existente.',
      '- Não instale bibliotecas novas sem pedir confirmação.',
      '- Se estiver usando a barra visual/Dev Mode do Lovable, aplique apenas ao elemento selecionado.',
      '- Ao final, informe arquivos alterados e como validar visualmente.'
    ].filter(Boolean).join('\n'));
  }

  function spDownloadDesignTokens() {
    var data = spNormalizeDesignTokens(spDesignTokens.length ? spDesignTokens : SP_DEFAULT_DESIGN_TOKENS);
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'tokens-design-assistente-lovable-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function() { URL.revokeObjectURL(url); }, 800);
  }

  function spDesignTokenCard(t, idx) {
    return '<div class="sp-template-card" data-design-row="' + idx + '">' +
      '<div class="sp-template-card-head">' +
        '<input class="sp-design-label" value="' + spEscapeHtml(t.label || '') + '" placeholder="Nome. Ex.: Botão primário" autocomplete="off">' +
        '<input class="sp-design-category" value="' + spEscapeHtml(t.category || 'Design') + '" placeholder="Categoria" autocomplete="off">' +
      '</div>' +
      '<input class="sp-design-value sp-template-label" value="' + spEscapeHtml(t.value || '') + '" placeholder="Hex, classes Tailwind ou link de biblioteca" autocomplete="off">' +
      '<textarea class="sp-design-instruction" rows="4" placeholder="Instrução pronta para colar no Lovable...">' + spEscapeHtml(t.instruction || '') + '</textarea>' +
      '<div class="sp-template-card-actions">' +
        '<button class="sp-template-mini" data-design-action="use">Inserir</button>' +
        '<button class="sp-template-mini" data-design-action="copy">Copiar</button>' +
        '<button class="sp-template-mini sp-template-danger" data-design-action="remove">Excluir</button>' +
      '</div>' +
    '</div>';
  }

  function spReadDesignTokensFromManager() {
    var rows = Array.from(document.querySelectorAll('[data-design-row]'));
    var out = [];
    rows.forEach(function(row) {
      var label = row.querySelector('.sp-design-label')?.value || '';
      var category = row.querySelector('.sp-design-category')?.value || 'Design';
      var value = row.querySelector('.sp-design-value')?.value || '';
      var instruction = row.querySelector('.sp-design-instruction')?.value || '';
      if (String(label).trim() || String(value).trim() || String(instruction).trim()) out.push({ label: label, category: category, value: value, instruction: instruction });
    });
    return spNormalizeDesignTokens(out);
  }

  function spRefreshDesignTokenManagerList(list) {
    var container = document.getElementById('sp-design-manager-list');
    if (!container) return;
    var q = (document.getElementById('sp-design-manager-search')?.value || '').trim().toLowerCase();
    var normalized = spNormalizeDesignTokens(list);
    if (q) normalized = normalized.filter(function(t) { return String(t.label + ' ' + t.category + ' ' + t.value + ' ' + t.instruction).toLowerCase().indexOf(q) >= 0; });
    container.innerHTML = normalized.map(spDesignTokenCard).join('');
  }

  function spShowDesignTokenManager() {
    var existing = document.querySelector('.sp-template-overlay');
    if (existing) existing.remove();
    spLoadDesignTokens(function() {
      var overlay = document.createElement('div');
      overlay.className = 'sp-template-overlay';
      var list = spNormalizeDesignTokens(spDesignTokens.length ? spDesignTokens : SP_DEFAULT_DESIGN_TOKENS);
      overlay.innerHTML = '<div class="sp-template-modal">' +
        '<div class="sp-template-modal-head">' +
          '<div><div class="sp-template-modal-title">Paletas e componentes rápidos</div><div class="sp-template-modal-sub">Tokens de design locais para usar com a barra visual, Dev Mode ou chat do Lovable.</div></div>' +
          '<button class="sp-template-close" id="sp-design-close">×</button>' +
        '</div>' +
        '<div class="sp-template-audit-note"><strong>Uso seguro:</strong> clique em Inserir para adicionar a instrução ao prompt, ou Copiar para colar manualmente na barra flutuante/Dev Mode. Não instala bibliotecas nem altera projeto sozinho.</div>' +
        '<input id="sp-design-manager-search" class="sp-template-search" placeholder="Buscar por cor, Tailwind, componente ou biblioteca..." autocomplete="off" style="width:100%;margin-bottom:10px;">' +
        '<div id="sp-design-manager-list" class="sp-template-manager-list">' + list.map(spDesignTokenCard).join('') + '</div>' +
        '<input id="sp-design-import-file" type="file" accept="application/json,.json" style="display:none">' +
        '<div class="sp-template-footer">' +
          '<button class="sp-template-secondary" id="sp-design-add">+ Novo</button>' +
          '<button class="sp-template-secondary" id="sp-design-import">Importar</button>' +
          '<button class="sp-template-secondary" id="sp-design-export">Exportar</button>' +
          '<button class="sp-template-secondary" id="sp-design-reset">Restaurar modelos</button>' +
          '<button class="sp-template-primary" id="sp-design-save">Salvar tokens</button>' +
        '</div>' +
      '</div>';
      document.body.appendChild(overlay);
      function close() { overlay.remove(); }
      overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
      document.getElementById('sp-design-close')?.addEventListener('click', close);
      document.getElementById('sp-design-manager-search')?.addEventListener('input', function(){ spRefreshDesignTokenManagerList(spReadDesignTokensFromManager()); });
      document.getElementById('sp-design-add')?.addEventListener('click', function(){ var current = spReadDesignTokensFromManager(); current.unshift({ label: '🎨 Novo token', category: 'Design', value: '#000000', instruction: 'Descreva a instrução para usar este token no Lovable.' }); spRefreshDesignTokenManagerList(current); });
      document.getElementById('sp-design-save')?.addEventListener('click', function(){ spSaveDesignTokens(spReadDesignTokensFromManager(), function(){ showAlert('Tokens salvos', 'Paletas e componentes foram atualizados localmente.'); close(); }); });
      document.getElementById('sp-design-reset')?.addEventListener('click', async function(){ var ok = await spConfirmPremium('Restaurar modelos de design?', 'Isso substituirá a lista atual de tokens visuais pelos modelos padrão da extensão.', { tone: 'warning', kicker: 'Design tokens', confirmLabel: 'Restaurar modelos', cancelLabel: 'Cancelar', confirmKind: 'primary' }); if (!ok) return; var defaults = spNormalizeDesignTokens(SP_DEFAULT_DESIGN_TOKENS); spRefreshDesignTokenManagerList(defaults); spSaveDesignTokens(defaults, function(){ showAlert('Modelos restaurados', 'Tokens padrão restaurados.', { tone: 'success' }); }); });
      document.getElementById('sp-design-export')?.addEventListener('click', function(){ spDesignTokens = spReadDesignTokensFromManager(); spDownloadDesignTokens(); });
      document.getElementById('sp-design-import')?.addEventListener('click', function(){ document.getElementById('sp-design-import-file')?.click(); });
      document.getElementById('sp-design-import-file')?.addEventListener('change', function(){ var file=this.files&&this.files[0]; if(!file) return; var reader=new FileReader(); reader.onload=function(){ try{ var parsed=JSON.parse(String(reader.result||'[]')); var imported=spNormalizeDesignTokens(parsed); spRefreshDesignTokenManagerList(imported); showAlert('Importado', imported.length+' tokens carregados. Clique em Salvar para aplicar.'); } catch(e){ showAlert('Importação inválida', 'Use um JSON exportado pela extensão.'); } }; reader.readAsText(file); this.value=''; });
      overlay.addEventListener('click', async function(e){ var btn=e.target&&e.target.closest?e.target.closest('[data-design-action]'):null; if(!btn) return; var row=btn.closest('[data-design-row]'); if(!row) return; var item={ label: row.querySelector('.sp-design-label')?.value || '', category: row.querySelector('.sp-design-category')?.value || 'Design', value: row.querySelector('.sp-design-value')?.value || '', instruction: row.querySelector('.sp-design-instruction')?.value || '' }; var action=btn.getAttribute('data-design-action'); var prompt=spDesignTokenPrompt(item); if(action==='remove'){ var okRemoveToken = await spConfirmPremium('Excluir token de design?', 'Este token será removido da lista local. Você poderá restaurar os modelos padrão depois, se necessário.', { tone: 'danger', kicker: 'Excluir item', confirmLabel: 'Excluir token', cancelLabel: 'Cancelar', confirmKind: 'danger' }); if(!okRemoveToken) return; row.remove(); } else if(action==='copy'){ spCopyText(prompt).then(function(){ showAlert('Copiado', 'Instrução de design copiada. Cole na barra visual/Dev Mode do Lovable.'); }); } else if(action==='use'){ spAppendToPrompt(prompt); close(); } });
    });
  }

  function spShowParallelHistory() {
    loadChatHistory(function() {
      var list = spNormalizeHistoryList(spChatHistory);
      var options = list.slice(0, 80).map(function(item, idx) {
        var label = (idx + 1) + ' · ' + (item.branch || 'Principal') + ' · ' + spFormatChatDate(item.timestamp) + ' ' + spFormatChatTime(item.timestamp) + ' · ' + String(item.text || '').slice(0, 70).replace(/\n/g, ' ');
        return '<option value="' + idx + '">' + spEscapeHtml(label) + '</option>';
      }).join('');
      var branchCounts = {};
      list.forEach(function(item){ var b = item.branch || 'Principal'; branchCounts[b] = (branchCounts[b] || 0) + 1; });
      var branches = Object.keys(branchCounts).sort(function(a,b){ return branchCounts[b]-branchCounts[a]; });
      var branchHtml = branches.length ? branches.map(function(b){ return '<span class="sp-history-branch-pill">' + spEscapeHtml(b) + ' · ' + branchCounts[b] + '</span>'; }).join('') : '<span class="sp-history-branch-pill">Principal · 0</span>';
      var body = '<div class="sp-history-privacy">Histórico paralelo local para comparar prompts entre ramificações/versões do Lovable sem navegar manualmente no History 2.0.</div>' +
        '<label class="sp-pro-label">Ramo atual para próximos envios<input id="sp-branch-current" value="' + spEscapeHtml(spCurrentBranch || 'Principal') + '" placeholder="Ex.: Branch mobile, Landing v2, Correção RLS"></label>' +
        '<div class="sp-history-branches">' + branchHtml + '</div>' +
        '<div class="sp-builder-grid" style="grid-template-columns:1fr 1fr;">' +
          '<label>Comparar A<select id="sp-compare-a">' + options + '</select></label>' +
          '<label>Comparar B<select id="sp-compare-b">' + options + '</select></label>' +
        '</div>' +
        '<div class="sp-pro-callout"><strong>Dica:</strong> marque prompts como “Funcionou” ou “Não funcionou” no Histórico para identificar qual ramificação gerou melhor resultado.</div>';
      spShowProModal('Histórico paralelo de prompts', body, [
        { id: 'spph-save-branch', label: 'Salvar ramo', kind: 'secondary', onClick: function(close, overlay){ var v=(overlay.querySelector('#sp-branch-current')?.value||'Principal').trim()||'Principal'; spCurrentBranch=v.slice(0,60); chrome.storage.local.set({ [SP_BRANCH_STORAGE_KEY]: spCurrentBranch }, function(){ showAlert('Ramo atualizado', 'Próximos prompts serão salvos em: ' + spCurrentBranch); }); } },
        { id: 'spph-compare', label: 'Comparar prompts', kind: 'secondary', onClick: function(close, overlay){ var a=Number(overlay.querySelector('#sp-compare-a')?.value||0); var b=Number(overlay.querySelector('#sp-compare-b')?.value||0); var ia=list[a], ib=list[b]; if(!ia||!ib){ showAlert('Comparação', 'Selecione dois prompts salvos.'); return; } var report=['Comparação local de prompts','', 'A — Ramo: '+(ia.branch||'Principal')+' | Resultado: '+(ia.result||ia.status||'sem marcação'), ia.text, '', 'B — Ramo: '+(ib.branch||'Principal')+' | Resultado: '+(ib.result||ib.status||'sem marcação'), ib.text, '', 'Orientação: use o prompt que teve melhor resultado como base, mantendo escopo fechado e fecho de preservação do projeto existente.'].join('\n'); spCopyText(report).then(function(){ showAlert('Comparação copiada', 'Relatório comparativo copiado para a área de transferência.'); }); } },
        { id: 'spph-open-history', label: 'Abrir Histórico', kind: 'primary', onClick: function(close){ close(); switchTab('history'); } }
      ], { width: 560 });
    });
  }

  function loadChatHistory(cb) {
    chrome.storage.local.get([SP_HISTORY_KEY], function(r) {
      spChatHistory = spNormalizeHistoryList(r[SP_HISTORY_KEY] || []);
      if (cb) cb();
    });
  }

  function saveChatHistory() {
    spChatHistory = spNormalizeHistoryList(spChatHistory);
    chrome.storage.local.set({ [SP_HISTORY_KEY]: spChatHistory });
  }

  function addToHistory(text, status, extra) {
    var prompt = String(text || '').trim();
    if (!prompt) return;
    var profile = spAnalyzeCreditProfile(prompt);
    var item = Object.assign({
      text: prompt,
      timestamp: new Date().toISOString(),
      status: status || 'ok',
      category: spClassifyPromptCategory(prompt),
      risk: profile.risk || 'Médio',
      technicalRisk: spEstimateTechnicalRisk(prompt).risk,
      bestPath: spBestPathForPrompt(prompt),
      checklist: spBuildPostSendChecklist(prompt),
      favorite: false,
      branch: spCurrentBranch || 'Principal'
    }, extra || {});
    spChatHistory.unshift(item);
    saveChatHistory();
    updateHistoryBadge();
  }

  function spCopyText(text) {
    text = String(text || '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function() { return spCopyTextFallback(text); });
    }
    return spCopyTextFallback(text);
  }

  function spCopyTextFallback(text) {
    return new Promise(function(resolve) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      ta.remove();
      resolve();
    });
  }

  function spDownloadHistory() {
    var data = spNormalizeHistoryList(spChatHistory).map(function(item) {
      return {
        timestamp: item.timestamp || '',
        status: item.status || 'ok',
        prompt: item.text || '',
        category: item.category || '',
        risk: item.risk || '',
        technicalRisk: item.technicalRisk || '',
        bestPath: item.bestPath || '',
        favorite: !!item.favorite,
        result: item.result || '',
        checklist: Array.isArray(item.checklist) ? item.checklist : []
      };
    });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'historico-prompts-credit-advisor-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function() { URL.revokeObjectURL(url); }, 800);
  }


  function spNormalizePromptTemplates(list) {
    var source = Array.isArray(list) ? list : SP_DEFAULT_TEMPLATES;
    var normalized = [];
    source.forEach(function(item) {
      var label = String(item && item.label || '').trim().slice(0, 70);
      var prompt = String(item && item.prompt || '').trim().slice(0, 12000);
      var category = String(item && item.category || 'Geral').trim().slice(0, 40) || 'Geral';
      if (!label || !prompt) return;
      normalized.push({ label: label, category: category, prompt: prompt });
    });
    if (!normalized.length) {
      normalized = SP_DEFAULT_TEMPLATES.map(function(t) { return { label: t.label, category: t.category || 'Geral', prompt: t.prompt }; });
    }
    return normalized.slice(0, SP_TEMPLATE_MAX);
  }

  function spDefaultPromptTemplates() {
    return spNormalizePromptTemplates(SP_DEFAULT_TEMPLATES);
  }

  function spLoadPromptTemplates(callback) {
    chrome.storage.local.get([SP_TEMPLATE_STORAGE_KEY], function(r) {
      var saved = r && r[SP_TEMPLATE_STORAGE_KEY];
      spPromptTemplates = Array.isArray(saved) && saved.length ? spMergeDefaultTemplates(saved) : spDefaultPromptTemplates();
      chrome.storage.local.set({ [SP_TEMPLATE_STORAGE_KEY]: spPromptTemplates });
      if (typeof callback === 'function') callback(spPromptTemplates);
    });
  }

  function spSavePromptTemplates(list, callback) {
    spPromptTemplates = spNormalizePromptTemplates(list);
    chrome.storage.local.set({ [SP_TEMPLATE_STORAGE_KEY]: spPromptTemplates }, function() {
      spRenderShortcutChips();
      if (typeof callback === 'function') callback(spPromptTemplates);
    });
  }

  function spApplyTemplateToEditor(template) {
    var msgArea = document.getElementById('sp-msg');
    if (!msgArea || !template) return;
    msgArea.value = spAppendProjectSafeClosing(template.prompt || '');
    msgArea.focus();
    try { msgArea.setSelectionRange(msgArea.value.length, msgArea.value.length); } catch (_) {}
    spUpdateCreditAdvisor();
  }

  function spRenderShortcutChips() {
    var chips = document.getElementById('sp-chips');
    if (!chips) return;
    var q = (spTemplateSearch || '').trim().toLowerCase();
    var list = spNormalizePromptTemplates(spPromptTemplates.length ? spPromptTemplates : SP_DEFAULT_TEMPLATES);
    if (q) {
      list = list.filter(function(t) {
        return String(t.label + ' ' + (t.category || '') + ' ' + t.prompt).toLowerCase().indexOf(q) >= 0;
      });
    }
    chips.innerHTML = '';
    if (!list.length) {
      chips.innerHTML = '<div class="sp-shortcuts-empty">Nenhum atalho encontrado.</div>';
      return;
    }
    list.forEach(function(t) {
      var chip = document.createElement('button');
      chip.className = 'sp-chip sp-chip-premium sp-template-chip';
      chip.innerHTML = '<span class="sp-chip-label">' + spEscapeHtml(t.label || 'Atalho') + '</span><span class="sp-chip-meta">' + spEscapeHtml(t.category || 'Geral') + '</span>';
      chip.title = '[' + (t.category || 'Geral') + '] ' + t.prompt;
      chip.addEventListener('click', function() { spApplyTemplateToEditor(t); });
      chips.appendChild(chip);
    });
  }

  function spDownloadPromptTemplates() {
    var data = spNormalizePromptTemplates(spPromptTemplates.length ? spPromptTemplates : SP_DEFAULT_TEMPLATES);
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'atalhos-assistente-lovable-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function() { URL.revokeObjectURL(url); }, 800);
  }

  function spMergeDefaultTemplates(saved) {
    var base = spNormalizePromptTemplates(Array.isArray(saved) && saved.length ? saved : []);
    var seen = new Set(base.map(function(t){ return String(t.label || '').toLowerCase().trim(); }));
    SP_DEFAULT_TEMPLATES.forEach(function(t) {
      var key = String(t.label || '').toLowerCase().trim();
      if (key && !seen.has(key)) {
        base.push({ label: t.label, category: t.category || 'Geral', prompt: t.prompt });
        seen.add(key);
      }
    });
    return spNormalizePromptTemplates(base);
  }

  function spNormalizeKnowledgeSnippets(list) {
    var source = Array.isArray(list) ? list : SP_DEFAULT_KNOWLEDGE_SNIPPETS;
    var normalized = [];
    source.forEach(function(item) {
      var label = String(item && item.label || '').trim().slice(0, 70);
      var category = String(item && item.category || 'Geral').trim().slice(0, 40) || 'Geral';
      var content = String(item && (item.content || item.prompt) || '').trim().slice(0, 20000);
      if (!label || !content) return;
      normalized.push({ label: label, category: category, content: content });
    });
    if (!normalized.length) normalized = SP_DEFAULT_KNOWLEDGE_SNIPPETS.map(function(t) { return { label: t.label, category: t.category || 'Geral', content: t.content }; });
    return normalized.slice(0, SP_KNOWLEDGE_MAX);
  }

  function spMergeDefaultKnowledge(saved) {
    var base = spNormalizeKnowledgeSnippets(Array.isArray(saved) && saved.length ? saved : []);
    var seen = new Set(base.map(function(t){ return String(t.label || '').toLowerCase().trim(); }));
    SP_DEFAULT_KNOWLEDGE_SNIPPETS.forEach(function(t) {
      var key = String(t.label || '').toLowerCase().trim();
      if (key && !seen.has(key)) {
        base.push({ label: t.label, category: t.category || 'Geral', content: t.content });
        seen.add(key);
      }
    });
    return spNormalizeKnowledgeSnippets(base);
  }

  function spDefaultKnowledgeSnippets() { return spNormalizeKnowledgeSnippets(SP_DEFAULT_KNOWLEDGE_SNIPPETS); }

  function spLoadKnowledgeSnippets(callback) {
    chrome.storage.local.get([SP_KNOWLEDGE_STORAGE_KEY], function(r) {
      var saved = r && r[SP_KNOWLEDGE_STORAGE_KEY];
      spKnowledgeSnippets = Array.isArray(saved) && saved.length ? spMergeDefaultKnowledge(saved) : spDefaultKnowledgeSnippets();
      chrome.storage.local.set({ [SP_KNOWLEDGE_STORAGE_KEY]: spKnowledgeSnippets });
      if (typeof callback === 'function') callback(spKnowledgeSnippets);
    });
  }

  function spSaveKnowledgeSnippets(list, callback) {
    spKnowledgeSnippets = spNormalizeKnowledgeSnippets(list);
    chrome.storage.local.set({ [SP_KNOWLEDGE_STORAGE_KEY]: spKnowledgeSnippets }, function() {
      spRenderKnowledgeChips();
      if (typeof callback === 'function') callback(spKnowledgeSnippets);
    });
  }

  function spAppendToPrompt(text, opts) {
    var msgArea = document.getElementById('sp-msg');
    if (!msgArea) return;
    var block = String(text || '').trim();
    if (!block) return;
    var before = msgArea.value.trim();
    msgArea.value = before + (before ? '\n\n' : '') + block;
    msgArea.focus();
    try { msgArea.setSelectionRange(msgArea.value.length, msgArea.value.length); } catch (_) {}
    spUpdateCreditAdvisor();
    if (!opts || opts.alert !== false) showAlert('Contexto inserido', 'Bloco adicionado ao prompt. Revise antes de enviar ao Lovable.');
  }

  function spApplyKnowledgeSnippet(snippet) {
    if (!snippet) return;
    var block = [
      'Contexto inteligente — ' + (snippet.label || 'Bloco') + ':',
      String(snippet.content || '').trim(),
      '',
      'Use este contexto como referência. Preserve o escopo solicitado e não altere regras sensíveis sem necessidade explícita.'
    ].join('\n');
    spAppendToPrompt(spAppendProjectSafeClosing(block));
  }

  function spRenderKnowledgeChips() {
    var chips = document.getElementById('sp-knowledge-chips');
    if (!chips) return;
    var q = (spKnowledgeSearch || '').trim().toLowerCase();
    var list = spNormalizeKnowledgeSnippets(spKnowledgeSnippets.length ? spKnowledgeSnippets : SP_DEFAULT_KNOWLEDGE_SNIPPETS);
    if (q) list = list.filter(function(t) { return String(t.label + ' ' + (t.category || '') + ' ' + t.content).toLowerCase().indexOf(q) >= 0; });
    chips.innerHTML = '';
    if (!list.length) {
      chips.innerHTML = '<div class="sp-shortcuts-empty">Nenhum contexto encontrado.</div>';
      return;
    }
    list.slice(0, 12).forEach(function(t) {
      var chip = document.createElement('button');
      chip.className = 'sp-chip sp-chip-premium sp-knowledge-chip';
      chip.innerHTML = '<span class="sp-chip-label">' + spEscapeHtml(t.label || 'Contexto') + '</span><span class="sp-chip-meta">' + spEscapeHtml(t.category || 'Geral') + '</span>';
      chip.title = '[' + (t.category || 'Geral') + '] Clique para anexar ao prompt. ' + t.content.slice(0, 400);
      chip.addEventListener('click', function() { spApplyKnowledgeSnippet(t); });
      chips.appendChild(chip);
    });
  }

  function spDownloadKnowledgeSnippets() {
    var data = spNormalizeKnowledgeSnippets(spKnowledgeSnippets.length ? spKnowledgeSnippets : SP_DEFAULT_KNOWLEDGE_SNIPPETS);
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'contexto-inteligente-assistente-lovable-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function() { URL.revokeObjectURL(url); }, 800);
  }

  function spKnowledgeManagerCard(t, idx) {
    return '<div class="sp-template-card" data-knowledge-row="' + idx + '">' +
      '<div class="sp-template-card-head">' +
        '<input class="sp-knowledge-label" value="' + spEscapeHtml(t.label || '') + '" placeholder="Nome do contexto. Ex.: 🗄️ Supabase seguro" autocomplete="off">' +
        '<input class="sp-knowledge-category" value="' + spEscapeHtml(t.category || 'Geral') + '" placeholder="Categoria" autocomplete="off">' +
      '</div>' +
      '<textarea class="sp-knowledge-content sp-template-prompt" rows="7" placeholder="Cole aqui regras de negócio, paleta, arquitetura, tabelas, padrões de código ou contexto recorrente...">' + spEscapeHtml(t.content || '') + '</textarea>' +
      '<div class="sp-template-card-actions">' +
        '<button class="sp-template-mini" data-knowledge-action="use" data-knowledge-index="' + idx + '">Inserir</button>' +
        '<button class="sp-template-mini" data-knowledge-action="copy" data-knowledge-index="' + idx + '">Copiar</button>' +
        '<button class="sp-template-mini sp-template-danger" data-knowledge-action="remove" data-knowledge-index="' + idx + '">Excluir</button>' +
      '</div>' +
    '</div>';
  }

  function spReadKnowledgeFromManager() {
    var rows = Array.from(document.querySelectorAll('[data-knowledge-row]'));
    var out = [];
    rows.forEach(function(row) {
      var label = row.querySelector('.sp-knowledge-label')?.value || '';
      var category = row.querySelector('.sp-knowledge-category')?.value || 'Geral';
      var content = row.querySelector('.sp-knowledge-content')?.value || '';
      if (String(label).trim() || String(content).trim()) out.push({ label: label, category: category, content: content });
    });
    return spNormalizeKnowledgeSnippets(out);
  }

  function spRefreshKnowledgeManagerList(list) {
    var container = document.getElementById('sp-knowledge-manager-list');
    if (!container) return;
    var normalized = spNormalizeKnowledgeSnippets(list);
    container.innerHTML = normalized.map(spKnowledgeManagerCard).join('');
  }

  function spShowKnowledgeManager() {
    var existing = document.querySelector('.sp-template-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'sp-template-overlay';
    var list = spNormalizeKnowledgeSnippets(spKnowledgeSnippets.length ? spKnowledgeSnippets : SP_DEFAULT_KNOWLEDGE_SNIPPETS);
    overlay.innerHTML = '<div class="sp-template-modal sp-knowledge-modal">' +
      '<div class="sp-template-modal-head">' +
        '<div><div class="sp-template-modal-title">Gerenciar contexto inteligente</div><div class="sp-template-modal-sub">Custom Knowledge local: blueprints, regras, paleta, Supabase e padrões do projeto.</div></div>' +
        '<button class="sp-template-close" id="sp-knowledge-close">×</button>' +
      '</div>' +
      '<div class="sp-template-audit-note"><strong>Como usar:</strong> salve blocos de contexto recorrente e insira no prompt com um clique. Isso ajuda o Lovable a respeitar arquitetura, regras de negócio, UI e banco sem repetir tudo manualmente.</div>' +
      '<div id="sp-knowledge-manager-list" class="sp-template-manager-list">' + list.map(spKnowledgeManagerCard).join('') + '</div>' +
      '<input id="sp-knowledge-import-file" type="file" accept="application/json,.json" style="display:none">' +
      '<div class="sp-template-footer">' +
        '<button class="sp-template-secondary" id="sp-knowledge-add">+ Novo</button>' +
        '<button class="sp-template-secondary" id="sp-knowledge-import">Importar</button>' +
        '<button class="sp-template-secondary" id="sp-knowledge-export">Exportar</button>' +
        '<button class="sp-template-secondary" id="sp-knowledge-reset">Restaurar modelos</button>' +
        '<button class="sp-template-primary" id="sp-knowledge-save">Salvar contexto</button>' +
      '</div>' +
    '</div>';
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.getElementById('sp-knowledge-close')?.addEventListener('click', close);
    document.getElementById('sp-knowledge-add')?.addEventListener('click', function() {
      var current = spReadKnowledgeFromManager();
      current.unshift({ label: '📎 Novo contexto', category: 'Geral', content: 'Cole aqui um bloco de contexto reutilizável para o Lovable.' });
      spRefreshKnowledgeManagerList(current);
    });
    document.getElementById('sp-knowledge-save')?.addEventListener('click', function() {
      var next = spReadKnowledgeFromManager();
      spSaveKnowledgeSnippets(next, function() { showAlert('Contexto salvo', 'Seus blocos foram atualizados localmente.'); close(); });
    });
    document.getElementById('sp-knowledge-reset')?.addEventListener('click', async function() {
      var okResetKnowledge = await spConfirmPremium('Restaurar contextos padrão?', 'Isso substituirá os blocos personalizados atuais pelos modelos padrão de Contexto Inteligente.', { tone: 'warning', kicker: 'Contexto Inteligente', confirmLabel: 'Restaurar contextos', cancelLabel: 'Cancelar', confirmKind: 'primary' });
      if (!okResetKnowledge) return;
      var defaults = spDefaultKnowledgeSnippets();
      spRefreshKnowledgeManagerList(defaults);
      spSaveKnowledgeSnippets(defaults, function() { showAlert('Contextos restaurados', 'Os modelos padrão foram restaurados.'); });
    });
    document.getElementById('sp-knowledge-export')?.addEventListener('click', function() { spKnowledgeSnippets = spReadKnowledgeFromManager(); spDownloadKnowledgeSnippets(); });
    document.getElementById('sp-knowledge-import')?.addEventListener('click', function() { document.getElementById('sp-knowledge-import-file')?.click(); });
    document.getElementById('sp-knowledge-import-file')?.addEventListener('change', function() {
      var file = this.files && this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var parsed = JSON.parse(String(reader.result || '[]'));
          var imported = spNormalizeKnowledgeSnippets(parsed);
          spRefreshKnowledgeManagerList(imported);
          showAlert('Importado', imported.length + ' blocos de contexto carregados. Clique em Salvar para aplicar.');
        } catch (e) { showAlert('Importação inválida', 'O arquivo precisa ser um JSON exportado pela extensão.'); }
      };
      reader.readAsText(file); this.value = '';
    });
    overlay.addEventListener('click', async function(e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-knowledge-action]') : null;
      if (!btn) return;
      var row = btn.closest('[data-knowledge-row]');
      if (!row) return;
      var item = { label: row.querySelector('.sp-knowledge-label')?.value || '', category: row.querySelector('.sp-knowledge-category')?.value || 'Geral', content: row.querySelector('.sp-knowledge-content')?.value || '' };
      var action = btn.getAttribute('data-knowledge-action');
      if (action === 'remove') { var okRemoveKnowledge = await spConfirmPremium('Excluir bloco de contexto?', 'Este bloco será removido do Contexto Inteligente local. O campo de prompt e o histórico não serão alterados.', { tone: 'danger', kicker: 'Excluir item', confirmLabel: 'Excluir bloco', cancelLabel: 'Cancelar', confirmKind: 'danger' }); if (!okRemoveKnowledge) return; row.remove(); }
      else if (action === 'copy') { spCopyText(item.content).then(function() { showAlert('Copiado', 'Bloco de contexto copiado.'); }); }
      else if (action === 'use') { spApplyKnowledgeSnippet(item); close(); }
    });
  }

  function spTemplateManagerCard(t, idx) {
    return '<div class="sp-template-card" data-template-row="' + idx + '">' +
      '<div class="sp-template-card-head">' +
        '<input class="sp-template-label" value="' + spEscapeHtml(t.label || '') + '" placeholder="Nome do atalho. Ex.: 🛠️ Debug" autocomplete="off">' +
        '<input class="sp-template-category" value="' + spEscapeHtml(t.category || 'Geral') + '" placeholder="Categoria" autocomplete="off">' +
      '</div>' +
      '<textarea class="sp-template-prompt" rows="5" placeholder="Prompt do atalho...">' + spEscapeHtml(t.prompt || '') + '</textarea>' +
      '<div class="sp-template-card-actions">' +
        '<button class="sp-template-mini" data-template-action="use" data-template-index="' + idx + '">Usar</button>' +
        '<button class="sp-template-mini" data-template-action="copy" data-template-index="' + idx + '">Copiar</button>' +
        '<button class="sp-template-mini sp-template-danger" data-template-action="remove" data-template-index="' + idx + '">Excluir</button>' +
      '</div>' +
    '</div>';
  }

  function spReadTemplatesFromManager() {
    var rows = Array.from(document.querySelectorAll('[data-template-row]'));
    var out = [];
    rows.forEach(function(row) {
      var label = row.querySelector('.sp-template-label')?.value || '';
      var category = row.querySelector('.sp-template-category')?.value || 'Geral';
      var prompt = row.querySelector('.sp-template-prompt')?.value || '';
      if (String(label).trim() || String(prompt).trim()) {
        out.push({ label: label, category: category, prompt: prompt });
      }
    });
    return spNormalizePromptTemplates(out);
  }

  function spRefreshTemplateManagerList(list) {
    var container = document.getElementById('sp-template-manager-list');
    if (!container) return;
    var normalized = spNormalizePromptTemplates(list);
    container.innerHTML = normalized.map(spTemplateManagerCard).join('');
  }

  function spShowTemplateManager() {
    var existing = document.querySelector('.sp-template-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'sp-template-overlay';
    var list = spNormalizePromptTemplates(spPromptTemplates.length ? spPromptTemplates : SP_DEFAULT_TEMPLATES);
    overlay.innerHTML = '<div class="sp-template-modal">' +
      '<div class="sp-template-modal-head">' +
        '<div><div class="sp-template-modal-title">Gerenciar atalhos</div><div class="sp-template-modal-sub">Modelos editáveis salvos apenas neste navegador.</div></div>' +
        '<button class="sp-template-close" id="sp-template-close">×</button>' +
      '</div>' +
      '<div class="sp-template-audit-note"><strong>Auditoria sênior aplicada:</strong> os modelos padrão foram reescritos para projeto já existente: são cirúrgicos, evitam alterações fora do escopo, preservam funcionalidades atuais e incluem fecho orientativo de validação.</div>' +
      '<div id="sp-template-manager-list" class="sp-template-manager-list">' + list.map(spTemplateManagerCard).join('') + '</div>' +
      '<input id="sp-template-import-file" type="file" accept="application/json,.json" style="display:none">' +
      '<div class="sp-template-footer">' +
        '<button class="sp-template-secondary" id="sp-template-add">+ Novo</button>' +
        '<button class="sp-template-secondary" id="sp-template-import">Importar</button>' +
        '<button class="sp-template-secondary" id="sp-template-export">Exportar</button>' +
        '<button class="sp-template-secondary" id="sp-template-reset">Restaurar modelos</button>' +
        '<button class="sp-template-primary" id="sp-template-save">Salvar atalhos</button>' +
      '</div>' +
    '</div>';
    document.body.appendChild(overlay);

    function close() { overlay.remove(); }
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.getElementById('sp-template-close')?.addEventListener('click', close);
    document.getElementById('sp-template-add')?.addEventListener('click', function() {
      var current = spReadTemplatesFromManager();
      current.unshift({ label: '✨ Novo atalho', category: 'Geral', prompt: 'Descreva aqui um prompt reutilizável, claro e específico para o Lovable.' });
      spRefreshTemplateManagerList(current);
    });
    document.getElementById('sp-template-save')?.addEventListener('click', function() {
      var next = spReadTemplatesFromManager();
      spSavePromptTemplates(next, function() {
        showAlert('Atalhos salvos', 'Seus atalhos foram atualizados localmente.');
        close();
      });
    });
    document.getElementById('sp-template-reset')?.addEventListener('click', async function() {
      var okResetTemplates = await spConfirmPremium('Restaurar atalhos padrão?', 'Isso substituirá os atalhos personalizados atuais pelos modelos otimizados da extensão.', { tone: 'warning', kicker: 'Atalhos Rápidos', confirmLabel: 'Restaurar atalhos', cancelLabel: 'Cancelar', confirmKind: 'primary', details: ['Recomendado apenas se você quiser voltar aos modelos originais.', 'Exporte seus atalhos antes se quiser manter uma cópia.'] });
      if (!okResetTemplates) return;
      var defaults = spDefaultPromptTemplates();
      spRefreshTemplateManagerList(defaults);
      spSavePromptTemplates(defaults, function() { showAlert('Modelos restaurados', 'Os atalhos padrão otimizados foram restaurados.'); });
    });
    document.getElementById('sp-template-export')?.addEventListener('click', function() {
      spPromptTemplates = spReadTemplatesFromManager();
      spDownloadPromptTemplates();
    });
    document.getElementById('sp-template-import')?.addEventListener('click', function() {
      document.getElementById('sp-template-import-file')?.click();
    });
    document.getElementById('sp-template-import-file')?.addEventListener('change', function() {
      var file = this.files && this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function() {
        try {
          var parsed = JSON.parse(String(reader.result || '[]'));
          var imported = spNormalizePromptTemplates(parsed);
          spRefreshTemplateManagerList(imported);
          showAlert('Importado', imported.length + ' atalhos carregados. Clique em Salvar para aplicar.');
        } catch (e) {
          showAlert('Importação inválida', 'O arquivo precisa ser um JSON de atalhos exportado pela extensão.');
        }
      };
      reader.readAsText(file);
      this.value = '';
    });
    overlay.addEventListener('click', async function(e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-template-action]') : null;
      if (!btn) return;
      var action = btn.getAttribute('data-template-action');
      var row = btn.closest('[data-template-row]');
      if (!row) return;
      var template = {
        label: row.querySelector('.sp-template-label')?.value || '',
        category: row.querySelector('.sp-template-category')?.value || 'Geral',
        prompt: row.querySelector('.sp-template-prompt')?.value || ''
      };
      if (action === 'remove') {
        var okRemoveTemplate = await spConfirmPremium('Excluir atalho?', 'Este modelo será removido da biblioteca local de Atalhos Rápidos.', { tone: 'danger', kicker: 'Excluir item', confirmLabel: 'Excluir atalho', cancelLabel: 'Cancelar', confirmKind: 'danger' });
        if (!okRemoveTemplate) return;
        row.remove();
      } else if (action === 'copy') {
        spCopyText(template.prompt).then(function() { showAlert('Copiado', 'Prompt do atalho copiado.'); });
      } else if (action === 'use') {
        spApplyTemplateToEditor(template);
        close();
      }
    });
  }

  function updateHistoryBadge() {
    var badge = document.querySelector('.sp-tab[data-tab="history"] .sp-tab-badge');
    if (badge) badge.textContent = spChatHistory.length;
  }

  function renderHistoryTab() {
    var container = document.getElementById('sp-tab-content');
    if (!container) return;
    spChatHistory = spNormalizeHistoryList(spChatHistory);
    container.innerHTML = spTemplateChatHistory(spChatHistory);
    var searchInput = document.getElementById('sp-history-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        spHistorySearch = this.value || '';
        renderHistoryTab();
        var nextInput = document.getElementById('sp-history-search');
        if (nextInput) {
          nextInput.focus();
          try { nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length); } catch (_) {}
        }
      });
    }
    var filter = document.getElementById('sp-history-filter');
    if (filter) {
      filter.addEventListener('change', function() {
        spHistoryFilter = this.value || 'all';
        renderHistoryTab();
      });
    }
    var clearBtn = document.getElementById('sp-chat-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', async function() {
        if (!spChatHistory.length) return;
        var okClearHistory = await spConfirmPremium('Limpar histórico local?', 'Isso apagará todo o histórico de prompts salvo neste navegador. Atalhos, contextos e configurações serão mantidos.', { tone: 'danger', kicker: 'Histórico', confirmLabel: 'Limpar histórico', cancelLabel: 'Cancelar', confirmKind: 'danger', details: ['Esta ação não apaga dados no Lovable.', 'Você pode exportar o histórico antes, se quiser guardar uma cópia.'] });
        if (!okClearHistory) return;
        spChatHistory = [];
        saveChatHistory();
        updateHistoryBadge();
        renderHistoryTab();
      });
    }
    var exportBtn = document.getElementById('sp-chat-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        if (!spChatHistory.length) { showAlert('Histórico vazio', 'Não há prompts para exportar.'); return; }
        spDownloadHistory();
      });
    }
    container.querySelectorAll('[data-history-action]').forEach(function(btn) {
      btn.addEventListener('click', async function() {
        var idx = Number(this.getAttribute('data-history-index'));
        var action = this.getAttribute('data-history-action');
        var list = spNormalizeHistoryList(spChatHistory);
        var item = list[idx];
        if (!item) return;
        if (action === 'copy') {
          spCopyText(item.text).then(function() { showAlert('Copiado', 'Prompt copiado para a área de transferência.'); });
        } else if (action === 'copy-checklist') {
          var cl = Array.isArray(item.checklist) && item.checklist.length ? item.checklist : spBuildPostSendChecklist(item.text || '');
          spCopyText(cl.map(function(x){ return '- [ ] ' + x; }).join('\n')).then(function() { showAlert('Copiado', 'Checklist copiado.'); });
        } else if (action === 'favorite') {
          spChatHistory = list.map(function(x, i) { if (i === idx) x.favorite = !x.favorite; return x; });
          saveChatHistory();
          renderHistoryTab();
        } else if (action === 'mark-worked') {
          spChatHistory = list.map(function(x, i) { if (i === idx) { x.status = 'worked'; x.result = 'Funcionou'; } return x; });
          saveChatHistory();
          renderHistoryTab();
        } else if (action === 'mark-failed') {
          spChatHistory = list.map(function(x, i) { if (i === idx) { x.status = 'failed'; x.result = 'Não funcionou'; } return x; });
          saveChatHistory();
          renderHistoryTab();
        } else if (action === 'reuse') {
          spActiveTab = 'prompt';
          switchTab('prompt');
          setTimeout(function() {
            var area = document.getElementById('sp-msg');
            if (area) {
              area.value = item.text || '';
              area.focus();
              try { area.setSelectionRange(area.value.length, area.value.length); } catch (_) {}
              if (typeof spUpdateCreditAdvisor === 'function') spUpdateCreditAdvisor();
            }
          }, 80);
        } else if (action === 'delete') {
          var okDeleteHistory = await spConfirmPremium('Excluir item do histórico?', 'Este prompt será removido apenas do histórico local da extensão.', { tone: 'danger', kicker: 'Histórico', confirmLabel: 'Excluir item', cancelLabel: 'Cancelar', confirmKind: 'danger' });
          if (!okDeleteHistory) return;
          spChatHistory = list.filter(function(_, i) { return i !== idx; });
          saveChatHistory();
          updateHistoryBadge();
          renderHistoryTab();
        }
      });
    });
  }



  function switchTab(tab) {
    spActiveTab = tab;
    document.querySelectorAll('.sp-tab').forEach(function(t) {
      t.classList.toggle('sp-tab-active', t.getAttribute('data-tab') === tab);
    });
    if (tab === 'history') {
      loadChatHistory(function() { renderHistoryTab(); });
    } else {
      showMainUIContent();
    }
  }
  function showMainUI() {
    if (spNeedsForcedUpdate()) {
      spRenderForceUpdateScreen();
      return;
    }
    spSetShellVisible(true);
    document.querySelectorAll('.sp-header-optimize-btn, .sp-header-watermark-btn, .sp-logout-btn').forEach(el => {
      el.style.display = '';
    });
    let greeting = spEscapeHtml(userName || 'Olá, seja bem vindo!');
    if (greeting.trim() === 'Cliente' || greeting.toLowerCase().includes('cliente pro')) {
      greeting = 'Olá, seja bem vindo!';
    }
    
    // Força a limpeza no storage para não persistir o nome antigo
    chrome.storage.local.remove('fl_user_name');
    
    const body = document.getElementById('sp-body');
    if (body) {
      body.style.background = '';
      body.style.padding = '';
      body.style.margin = '';
    }
    loadChatHistory(function() {
      body.innerHTML = 
        '<div class="sp-profile-card">' +
          '<div class="sp-profile-top"><span class="sp-profile-name" id="sp-name">' + greeting + '</span><span id="sp-sync-badge" class="sp-status-badge sp-badge-waiting">⏳ Verificando</span></div>' +
        '</div>' +
        spTemplateTabs(spActiveTab, spChatHistory.length) +
        '<div id="sp-connection-card" class="sp-connection-card sp-connection-waiting">' +
          '<div class="sp-connection-main"><span class="sp-connection-dot"></span><span id="sp-connection-title">Verificando conexão com o Lovable...</span></div>' +
          '<div class="sp-connection-sub" id="sp-connection-sub">Abra uma aba de projeto do Lovable para sincronizar.</div>' +
          '<div class="sp-connection-actions"><button id="sp-sync-refresh" type="button">Atualizar</button><button id="sp-sync-open" type="button">Abrir Lovable</button></div>' +
        '</div>' +
        '<div id="sp-tab-content"></div>';
      document.querySelectorAll('.sp-tab').forEach(function(t) {
        t.addEventListener('click', function() { switchTab(t.getAttribute('data-tab')); });
      });
      if (spActiveTab === 'history') {
        renderHistoryTab();
      } else {
        showMainUIContent();
      }
      updateSync();
      if (!window.__spConnectionStorageListener) {
        window.__spConnectionStorageListener = true;
        chrome.storage.onChanged.addListener(function(ch) {
          // Evita loop visual: updateSync atualiza lastSeenAt, então não use esse campo para disparar nova verificação.
          if (ch.lovable_projectId || ch.lovable_token || ch.lovable_sourceHost || ch.lovable_lastUrl) spScheduleConnectionUpdate();
        });
      }
      setTimeout(function(){ updateSync(); }, 900);
      checkWelcomeOnboarding();

    });
  }

  function showMainUIContent() {
    var container = document.getElementById('sp-tab-content');
    if (!container) return;
    container.innerHTML =
      '<div id="sp-drop-zone" style="position: relative; display: flex; flex-direction: column; flex: 1; min-height: 0;">' +
        '<textarea class="sp-textarea" id="sp-msg" rows="3" placeholder="Digite seu comando..." spellcheck="false"></textarea>' +
        '<div id="sp-credit-advisor" class="sp-credit-advisor"></div>' +
        spTemplateProductionPriorityCard() +
        '<div id="sp-attach-preview" class="sp-attach-preview" style="display:none"></div>' +
        '<div class="sp-action-bar">' +
          '<div class="sp-action-left">' +
            '<button class="sp-clear-command-btn" id="sp-clear-command" title="Limpar apenas o comando atual. Não apaga histórico, contextos ou atalhos.">🗑️ Limpar comando</button>' +
          '</div>' +
          '<div class="sp-action-center">' +
            '<button class="sp-attach-btn" id="sp-attach-btn" title="Abrir anexo nativo do Lovable">📎</button>' +
            '<button class="sp-tool-btn" id="sp-remove-watermark" title="Ação avançada: remover marca d’água por prompt pode consumir créditos">🚫</button>' +
            '<button class="sp-tool-btn sp-shield-active" id="sp-shield-btn" title="Aviso de créditos sempre ativo">🛡️</button>' +
            '<button class="sp-tool-btn" id="sp-credit-plan" title="Analisar risco e ver estratégia de economia">💡</button>' +
            '<button class="sp-tool-btn" id="sp-local-economy" title="Preparar prompt localmente — não envia ao Lovable e não usa IA externa">🧹</button>' +
          '</div>' +
          '<button class="sp-send-btn" id="sp-send">Enviar</button>' +
        '</div>' +
        '<details class="sp-pro-tools" id="sp-pro-tools">' +
          '<summary>Ferramentas Pro</summary>' +
          '<div class="sp-pro-tools-grid">' +
            '<button id="sp-seo-aeo-audit" class="sp-priority-tool" title="Auditar SEO/AEO on-page do preview/página atual">🔎 SEO/AEO</button>' +
            '<button id="sp-api-schema" class="sp-priority-tool" title="Gerar prompt de conexão a API/OpenAPI, App Connector ou MCP">🔌 API/MCP</button>' +
            '<button id="sp-keyword-injector" class="sp-priority-tool" title="Gerar prompt com palavras-chave e estrutura SEO/AEO">🔑 Keywords</button>' +
            '<button id="sp-secrets-validator" class="sp-priority-tool" title="Checklist local de secrets e variáveis de ambiente">🔐 Secrets</button>' +
            '<button id="sp-diagnose" title="Analisar risco, tipo do pedido e melhor caminho">🧭 Diagnóstico</button>' +
            '<button id="sp-builder" title="Montar um prompt com campos profissionais">🧩 Construir</button>' +
            '<button id="sp-capture-error" title="Capturar URL, título e erros visíveis da aba Lovable">🐞 Capturar erro</button>' +
            '<button id="sp-query-performance" title="Simular e preparar prompt para performance de queries Supabase/PostgreSQL">🐘 DB/Query</button>' +
            '<button id="sp-design-tokens" title="Paletas, tokens Tailwind e componentes rápidos para barra visual/Dev Mode">🎨 Design</button>' +
            '<button id="sp-parallel-history" title="Histórico paralelo para comparar prompts por ramificações">🧬 Histórico 2.0</button>' +
            '<button id="sp-response-analyzer" title="Analisar resposta do Lovable e sugerir próximo prompt">🧪 Resposta</button>' +
            '<button id="sp-scope-audit" title="Verificar se o pedido está amplo demais">🔎 Escopo</button>' +
            '<button id="sp-split-steps" title="Transformar pedido grande em plano econômico">🪜 Etapas</button>' +
            '<button id="sp-reduce-prompt" title="Compactar prompt localmente">✂️ Reduzir</button>' +
            '<button id="sp-focus-mode" title="Alternar painel compacto">🎯 Foco</button>' +
          '</div>' +
          '<div class="sp-pro-tools-helper">Prioridade desta versão: SEO/AEO indexável e API/MCP para produção. Alertas de crédito orientam o usuário, mas não devem remover contexto nem bloquear funcionalidades necessárias. Tudo roda localmente, exceto “Ler URL” em API/MCP quando acionado.</div>' +
        '</details>' +
        '<button id="sp-download-project" class="sp-watermark-btn" style="margin-top:0;background:linear-gradient(135deg,rgba(37,99,235,0.12),rgba(37,99,235,0.06));border-color:rgba(37,99,235,0.25);color:var(--fl-accent);">Baixar projeto em .zip</button>' +
        '<button id="sp-create-project" class="sp-watermark-btn" style="margin-top:8px;background:linear-gradient(135deg,rgba(16,185,129,0.14),rgba(16,185,129,0.08));border-color:rgba(16,185,129,0.28);color:var(--fl-success);">Abrir Lovable</button>' +
        '<div class="sp-log" id="sp-log"></div>' +
        '<div class="sp-library-deck" aria-label="Bibliotecas de apoio">' +
          '<details class="sp-shortcuts-wrap sp-library-card sp-knowledge-wrap" open>' +
            '<summary class="sp-library-summary">' +
              '<span class="sp-library-icon">📚</span>' +
              '<span class="sp-library-copy"><strong>Contexto Inteligente</strong><small>Custom Knowledge local para blueprints, regras, SEO/AEO, Supabase e APIs.</small></span>' +
              '<span class="sp-library-badge">Preserva escopo</span>' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sp-details-arrow"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
            '</summary>' +
            '<div class="sp-library-body">' +
              '<div class="sp-shortcuts-toolbar sp-library-toolbar">' +
                '<input id="sp-knowledge-search" class="sp-template-search" placeholder="Buscar contexto: Supabase, SEO, API..." autocomplete="off">' +
                '<button id="sp-knowledge-manage" class="sp-template-manage" title="Criar, editar, importar e exportar blocos de contexto salvos localmente">Gerenciar contextos</button>' +
              '</div>' +
              '<div class="sp-shortcuts-helper">Clique em um bloco para anexar contexto ao prompt sem reescrever tudo. Ideal para projetos já existentes.</div>' +
              '<div class="sp-shortcuts-grid sp-premium-chip-grid" id="sp-knowledge-chips"></div>' +
            '</div>' +
          '</details>' +
          '<details class="sp-shortcuts-wrap sp-library-card" open>' +
            '<summary class="sp-library-summary">' +
              '<span class="sp-library-icon">⚡</span>' +
              '<span class="sp-library-copy"><strong>Atalhos Rápidos</strong><small>Prompts profissionais para bugfix, SEO/AEO, API/MCP, RLS, UI e QA.</small></span>' +
              '<span class="sp-library-badge sp-library-badge-purple">Editável</span>' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sp-details-arrow"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
            '</summary>' +
            '<div class="sp-library-body">' +
              '<div class="sp-shortcuts-toolbar sp-library-toolbar">' +
                '<input id="sp-template-search" class="sp-template-search" placeholder="Buscar atalho: bug, SEO, API, RLS..." autocomplete="off">' +
                '<button id="sp-template-manage" class="sp-template-manage" title="Criar, editar, importar e exportar atalhos salvos localmente">Gerenciar atalhos</button>' +
              '</div>' +
              '<div class="sp-shortcuts-helper">Clique em um atalho para preencher o prompt com fecho de proteção para projeto existente.</div>' +
              '<div class="sp-shortcuts-grid sp-premium-chip-grid" id="sp-chips"></div>' +
            '</div>' +
          '</details>' +
        '</div>' +
        '<div id="sp-drop-overlay" style="display: none; position: absolute; inset: 0; background: rgba(16, 185, 129, 0.15); backdrop-filter: blur(4px); border: 2px dashed var(--fl-accent, #10b981); border-radius: 16px; z-index: 10000; flex-direction: column; align-items: center; justify-content: center; color: var(--fl-accent, #10b981); font-weight: 800; pointer-events: none; font-family: \'Outfit\', sans-serif;">' +
          'Use o botão 📎 para anexar pelo Lovable' +
        '</div>' +
      '</div>';
    spLoadPromptTemplates(function() { spRenderShortcutChips(); });
    spLoadKnowledgeSnippets(function() { spRenderKnowledgeChips(); });
    spLoadDesignTokens(function() {});
    const knowledgeSearch = document.getElementById('sp-knowledge-search');
    if (knowledgeSearch) {
      knowledgeSearch.value = spKnowledgeSearch || '';
      knowledgeSearch.addEventListener('input', function() {
        spKnowledgeSearch = this.value || '';
        spRenderKnowledgeChips();
      });
    }
    document.getElementById('sp-knowledge-manage')?.addEventListener('click', spShowKnowledgeManager);
    const templateSearch = document.getElementById('sp-template-search');
    if (templateSearch) {
      templateSearch.value = spTemplateSearch || '';
      templateSearch.addEventListener('input', function() {
        spTemplateSearch = this.value || '';
        spRenderShortcutChips();
      });
    }
    document.getElementById('sp-template-manage')?.addEventListener('click', spShowTemplateManager);
    chrome.storage.local.set({ fl_plan_mode: false });
    setupSpFileAttachment();
    setupSpPasteAttachment();
    setupSpDragAndDrop();
    document.getElementById('sp-send').addEventListener('click', handleSend);
      document.getElementById('sp-clear-command')?.addEventListener('click', spClearCurrentCommand);
      document.getElementById('sp-credit-plan')?.addEventListener('click', spShowCreditStrategy);
      document.getElementById('sp-local-economy')?.addEventListener('click', spApplyLocalPromptEconomy);
      document.getElementById('sp-diagnose')?.addEventListener('click', spShowDiagnosisModal);
      document.getElementById('sp-builder')?.addEventListener('click', spShowPromptBuilder);
        document.getElementById('sp-capture-error')?.addEventListener('click', function(){ spCaptureErrorContext().catch(function(e){ showAlert('Erro', e.message || String(e)); }); });
      document.getElementById('sp-seo-aeo-audit')?.addEventListener('click', function(){ spRunSeoAeoAudit().catch(function(e){ showAlert('SEO/AEO', e.message || String(e)); }); });
      document.getElementById('sp-priority-seo')?.addEventListener('click', function(){ spRunSeoAeoAudit().catch(function(e){ showAlert('SEO/AEO', e.message || String(e)); }); });
      document.getElementById('sp-keyword-injector')?.addEventListener('click', spShowKeywordInjector);
      document.getElementById('sp-api-schema')?.addEventListener('click', spShowApiSchemaGenerator);
      document.getElementById('sp-priority-api')?.addEventListener('click', spShowApiSchemaGenerator);
      document.getElementById('sp-priority-check')?.addEventListener('click', spShowProductionChecklist);
      document.getElementById('sp-secrets-validator')?.addEventListener('click', spShowSecretsValidator);
      document.getElementById('sp-query-performance')?.addEventListener('click', spShowDbPerformanceTool);
      document.getElementById('sp-design-tokens')?.addEventListener('click', spShowDesignTokenManager);
      document.getElementById('sp-parallel-history')?.addEventListener('click', spShowParallelHistory);
      document.getElementById('sp-response-analyzer')?.addEventListener('click', spShowResponseAnalyzer);
      document.getElementById('sp-scope-audit')?.addEventListener('click', spAuditScope);
      document.getElementById('sp-split-steps')?.addEventListener('click', spSplitPromptIntoSteps);
      document.getElementById('sp-reduce-prompt')?.addEventListener('click', spReducePrompt);
      document.getElementById('sp-focus-mode')?.addEventListener('click', spToggleFocusMode);
      setupSpWatermarkButton();
      setupSpDownloadProject();
      setupSpCreateProject();

      setupSpShield();
      document.getElementById('sp-sync-refresh')?.addEventListener('click', function(){ updateSync(true); });
      document.getElementById('sp-sync-open')?.addEventListener('click', function(){
        chrome.tabs.create({ url: 'https://lovable.dev/', active: true }, function(){ setTimeout(function(){ updateSync(); }, 1200); });
      });
    document.getElementById('sp-expire-btn')?.addEventListener('click', () => {
      if(!expiresAt) { showAlert('Aviso', 'Informação de expiração não disponível.'); return; }
      const date = new Date(expiresAt);
      showAlert('Status local ✨', 'Projeto open source ativo. Status técnico exibido: ' + date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    });

    const msgArea = document.getElementById('sp-msg');
    if (msgArea) {
      spUpdateCreditAdvisor();
      msgArea.addEventListener('input', spUpdateCreditAdvisor);
      msgArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });
    }
  }
  function spExtractProjectIdFromUrl(url) {
    try {
      const u = new URL(String(url || ''));
      const parts = u.pathname.split('/').filter(Boolean).map(function(part) {
        try { return decodeURIComponent(part).trim(); } catch (_) { return String(part || '').trim(); }
      }).filter(Boolean);
      const ignored = /^(new|create|templates|template|settings|account|billing|pricing|login|signin|signup|discover|explore|help|docs|blog|community|projects?|project|apps?|app|dashboard)$/i;
      const queryKeys = ['projectId', 'project_id', 'project', 'appId', 'app_id'];
      for (const key of queryKeys) {
        const v = u.searchParams.get(key);
        if (v && !ignored.test(v)) return String(v).trim();
      }
      for (let i = 0; i < parts.length; i++) {
        if (/^(projects?|apps?)$/i.test(parts[i]) && parts[i + 1] && !ignored.test(parts[i + 1])) return parts[i + 1];
      }
      const uuidLike = parts.find(function(part) {
        return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(part) || /^[a-f0-9]{24,}$/i.test(part);
      });
      if (uuidLike) return uuidLike;
      const candidate = parts.find(function(part) {
        return !ignored.test(part) && /^[a-z0-9][a-z0-9_-]{5,}$/i.test(part);
      });
      return candidate || '';
    } catch (_) { return ''; }
  }

  function spShortProjectId(projectId) {
    projectId = String(projectId || '').trim();
    if (!projectId) return '';
    return projectId.length > 16 ? projectId.slice(0, 8) + '…' + projectId.slice(-4) : projectId;
  }

  function spFindBestLovableProjectTab(tabs) {
    tabs = Array.isArray(tabs) ? tabs : [];
    const projectTabs = tabs.filter(function(tab) { return tab && spIsLovableTabUrl(tab.url) && spExtractProjectIdFromUrl(tab.url); });
    if (projectTabs.length) {
      projectTabs.sort(function(a, b) {
        const aa = (a.active ? 4 : 0) + (a.highlighted ? 2 : 0) + (a.lastAccessed || 0) / 1e13;
        const bb = (b.active ? 4 : 0) + (b.highlighted ? 2 : 0) + (b.lastAccessed || 0) / 1e13;
        return bb - aa;
      });
      return projectTabs[0];
    }
    const lovableTabs = tabs.filter(function(tab) { return tab && spIsLovableTabUrl(tab.url); });
    lovableTabs.sort(function(a, b) { return (b.active ? 1 : 0) - (a.active ? 1 : 0); });
    return lovableTabs[0] || null;
  }

  async function spGetConnectionSnapshot() {
    const storage = await new Promise(function(resolve) {
      chrome.storage.local.get(['lovable_projectId', 'lovable_token', 'lovable_sourceHost', 'lovable_lastUrl', 'lovable_lastSeenAt'], resolve);
    });
    const tabs = await spFindLovableTabs();
    const tab = spFindBestLovableProjectTab(tabs);
    let projectId = spExtractProjectIdFromUrl(tab && tab.url) || storage.lovable_projectId || '';
    let host = (tab && tab.url ? (new URL(tab.url)).hostname : '') || storage.lovable_sourceHost || '';
    let tabUrl = (tab && tab.url) || storage.lovable_lastUrl || '';
    let tokenKnown = Boolean(storage.lovable_token);
    let contentResponded = false;

    if (tab && tab.id) {
      let resp = await spTabSendMessage(tab.id, { action: 'FL_GET_CONNECTION_STATUS' });
      if (!resp || !resp.success) {
        await spInjectContentScript(tab.id);
        resp = await spTabSendMessage(tab.id, { action: 'FL_GET_CONNECTION_STATUS' });
      }
      if (resp && resp.success) {
        contentResponded = true;
        projectId = resp.projectId || projectId;
        host = resp.host || host;
        tabUrl = resp.url || tabUrl;
        if (resp.token) tokenKnown = true;
      }
    }

    if (projectId || host || tabUrl) {
      const updates = {};
      if ((host || '') !== (storage.lovable_sourceHost || '')) updates.lovable_sourceHost = host || '';
      if ((tabUrl || '') !== (storage.lovable_lastUrl || '')) updates.lovable_lastUrl = tabUrl || '';
      if (projectId && projectId !== (storage.lovable_projectId || '')) updates.lovable_projectId = projectId;
      if (contentResponded && Date.now() - Number(storage.lovable_lastSeenAt || 0) > 15000) updates.lovable_lastSeenAt = Date.now();
      if (Object.keys(updates).length) {
        try { await chrome.storage.local.set(updates); } catch (_) {}
      }
    }

    return { projectId, host, tabUrl, tokenKnown, tab, contentResponded, tabsCount: tabs.length };
  }

  function spRenderConnection(snapshot) {
    snapshot = snapshot || {};
    const projectId = snapshot.projectId || '';
    const host = snapshot.host || '';
    const tokenKnown = Boolean(snapshot.tokenKnown);
    const card = document.getElementById('sp-connection-card');
    const title = document.getElementById('sp-connection-title');
    const sub = document.getElementById('sp-connection-sub');
    const badge = document.getElementById('sp-sync-badge');
    if (!card || !title || !sub) return;

    card.classList.remove('sp-connection-ok', 'sp-connection-partial', 'sp-connection-off', 'sp-connection-waiting');

    if (projectId) {
      card.classList.add('sp-connection-ok');
      title.textContent = 'Projeto conectado';
      sub.textContent = 'ID: ' + spShortProjectId(projectId) + (host ? ' • ' + host : '') + ' • envio pela interface disponível' + (tokenKnown ? ' • ZIP disponível' : '');
      if (badge) {
        badge.className = 'sp-status-badge sp-badge-pro';
        badge.textContent = '✅ Conectado';
        badge.onclick = function() { showAlert('Conexão', 'Projeto conectado: ' + projectId + '\nEnvio pela interface disponível.' + (tokenKnown ? '\nToken sincronizado para download ZIP.' : '\nDownload ZIP pode exigir token; isso não afeta o envio de prompts.')); };
      }
      return;
    }

    if (snapshot.tabsCount) {
      card.classList.add('sp-connection-partial');
      title.textContent = 'Lovable aberto, mas sem projeto';
      sub.textContent = 'Abra uma página de projeto dentro do Lovable e clique em Atualizar.';
      if (badge) {
        badge.className = 'sp-status-badge sp-badge-test';
        badge.textContent = 'Abrir projeto';
        badge.onclick = function() { showAlert('Conexão', 'Existe uma aba do Lovable aberta, mas não encontrei um ID de projeto na URL. Abra um projeto específico e clique em Atualizar.'); };
      }
      return;
    }

    card.classList.add('sp-connection-off');
    title.textContent = 'Lovable não conectado';
    sub.textContent = 'Abra uma aba de projeto do Lovable para o Assistente sincronizar.';
    if (badge) {
      badge.className = 'sp-status-badge sp-badge-test';
      badge.textContent = 'Desconectado';
      badge.onclick = function() { showAlert('Conexão', 'Abra uma aba de projeto do Lovable e clique em Atualizar.'); };
    }
  }

  function spScheduleConnectionUpdate() {
    clearTimeout(spScheduleConnectionUpdate._timer);
    spScheduleConnectionUpdate._timer = setTimeout(function(){ updateSync(false); }, 350);
  }

  async function updateSync(showFeedback) {
    if (updateSync._running) {
      if (showFeedback) updateSync._feedbackQueued = true;
      return;
    }
    updateSync._running = true;
    try {
      const card = document.getElementById('sp-connection-card');
      if (card && showFeedback) card.classList.add('sp-connection-refreshing');
      const snapshot = await spGetConnectionSnapshot();
      spRenderConnection(snapshot);
      if (showFeedback || updateSync._feedbackQueued) {
        updateSync._feedbackQueued = false;
        if (snapshot.projectId) {
          showAlert('Conexão', 'Projeto conectado: ' + snapshot.projectId + '\nEnvio pela interface disponível.' + (snapshot.tokenKnown ? '\nDownload ZIP disponível.' : '\nDownload ZIP pode exigir token; use apenas se necessário.'));
        } else {
          showAlert('Conexão', 'Nenhum projeto do Lovable detectado. Abra uma aba de projeto e tente novamente.');
        }
      }
    } catch (err) {
      spRenderConnection({});
      if (showFeedback) showAlert('Conexão', err && err.message ? err.message : 'Falha ao verificar conexão.');
    } finally {
      updateSync._running = false;
      const card = document.getElementById('sp-connection-card');
      if (card) card.classList.remove('sp-connection-refreshing');
    }
  }

    function spDecodeJwtUserId(token) {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
      const payload = JSON.parse(atob(padded));
      return payload.sub || payload.user_id || null;
    } catch(e) { return null; }
  }
  async function spCompressImage(file) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const MAX_DIM = 1280;
        let w = img.width, h = img.height;
        if (w > MAX_DIM || h > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / w, MAX_DIM / h);
          w = Math.round(w * ratio); h = Math.round(h * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob((blob) => {
          if (!blob) return resolve({ file, previewUrl: null });
          resolve({ file: new File([blob], file.name, { type: outputType }), previewUrl: URL.createObjectURL(blob) });
        }, outputType, file.type === 'image/png' ? undefined : 0.8);
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve({ file, previewUrl: null }); };
      img.src = url;
    });
  }
  function spInferContentType(file) {
    if (file && typeof file.type === 'string' && file.type.trim()) return file.type;
    const name = (file && file.name ? file.name : '').toLowerCase();
    const ext = name.includes('.') ? name.split('.').pop() : '';
    const map = {
      pdf: 'application/pdf',
      txt: 'text/plain',
      csv: 'text/csv',
      json: 'application/json',
      zip: 'application/zip',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      mp4: 'video/mp4',
      webm: 'video/webm'
    };
    return map[ext] || 'application/octet-stream';
  }

  function spBuildUploadFileName(fileId, file) {
    const rawName = file && file.name ? String(file.name) : '';
    const ext = rawName.includes('.') ? rawName.split('.').pop().toLowerCase() : '';
    const safeExt = ext && /^[a-z0-9]{1,10}$/.test(ext) ? ext : 'bin';
    return fileId + '.' + safeExt;
  }

  function spGetApiBaseFromToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length >= 2) {
        const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
        const payload = JSON.parse(atob(padded));
        const iss = payload.iss || '';
        if (iss.includes('cvbgrjauqjawrsyknhyj') || iss.includes('lovable.app')) {
          return 'https://api.lovable.app';
        }
        if (iss.includes('dwpuqewnfibeldegvimp') || iss.includes('lovable.dev')) {
          return 'https://api.lovable.dev';
        }
      }
    } catch(e) {}
    return null;
  }

  function spGetApiBaseUrl(token, sourceHost) {
    if (sourceHost) {
      if (sourceHost.includes('lovable.app')) return 'https://api.lovable.app';
      if (sourceHost.includes('lovable.dev')) return 'https://api.lovable.dev';
    }
    if (token) {
      const fromToken = spGetApiBaseFromToken(token);
      if (fromToken) return fromToken;
    }
    return 'https://api.lovable.dev';
  }

  function spGetSiteBaseUrl(token, sourceHost) {
    if (sourceHost && (sourceHost.includes('lovable.app') || sourceHost.includes('lovable.dev'))) {
      return 'https://' + sourceHost;
    }
    return spGetApiBaseUrl(token, sourceHost).replace('https://api.', 'https://');
  }

  async function spUploadFileDirect(_file, _token) {
    throw new Error('Upload externo desativado. Use o anexo nativo do Lovable.');
  }
  function spRenderAttachPreview() {
    const container = document.getElementById('sp-attach-preview');
    if (!container) return;
    if (spAttachedFiles.length === 0) { container.style.display = 'none'; container.innerHTML = ''; spUpdateCreditAdvisor(); return; }
    container.style.display = 'flex';
    container.innerHTML = spAttachedFiles.map((f, i) => spTemplateAttachItem(f, i)).join('');
    spUpdateCreditAdvisor();
    container.querySelectorAll('.sp-attach-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        if (spAttachedFiles[idx] && spAttachedFiles[idx].previewUrl) URL.revokeObjectURL(spAttachedFiles[idx].previewUrl);
        spAttachedFiles.splice(idx, 1);
        spRenderAttachPreview();
      });
    });
  }
  async function spAddFiles(files) {
    const count = files && files.length ? files.length : 0;
    if (!count) return;
    const okToAttach = await spConfirmAttachmentRisk(files);
    if (!okToAttach) {
      showAlert('Anexo cancelado', 'Nenhum arquivo foi enviado ou anexado.');
      return;
    }

    const log = document.getElementById('sp-log');
    if (log) {
      log.className = 'sp-log sp-log-info';
      log.textContent = '📎 Abrindo o anexo nativo do Lovable...';
    }

    const resp = await spSendToLovableTab('FL_OPEN_NATIVE_ATTACH', '');
    if (resp && resp.success) {
      if (log) {
        log.className = 'sp-log sp-log-success';
        log.textContent = '✅ Use o seletor/painel nativo do Lovable para anexar. Nenhum arquivo passou por servidor externo.';
      }
      showAlert('Anexo nativo', 'Abrimos o fluxo nativo do Lovable. Escolha o arquivo diretamente no painel oficial do Lovable.');
      return;
    }

    const error = resp && resp.error ? resp.error : 'Não encontrei o botão de anexo do Lovable nesta tela.';
    if (log) {
      log.className = 'sp-log sp-log-warning';
      log.textContent = '⚠️ ' + error;
    }
    showAlert('Anexo no Lovable', error + ' Se necessário, clique manualmente no clipe/anexo dentro da própria página do Lovable.');
  }
  function setupSpPasteAttachment() {
    const msgArea = document.getElementById('sp-msg');
    if (!msgArea) return;
    msgArea.addEventListener('paste', async (event) => {
      const items = (event.clipboardData || event.originalEvent?.clipboardData)?.items || [];
      const hasFile = Array.from(items || []).some(item => item.kind === 'file');
      if (!hasFile) return;
      event.preventDefault();
      showAlert('Use o anexo nativo', 'Para proteger seus arquivos, a extensão não faz upload externo. Clique no botão 📎 para abrir o anexo nativo do Lovable.');
    });
  }

  function setupSpDragAndDrop() {
    const dropZone = document.getElementById('sp-drop-zone');
    const dropOverlay = document.getElementById('sp-drop-overlay');
    if (!dropZone || !dropOverlay) return;

    let dragCounter = 0;
    dropZone.addEventListener('dragenter', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (dragCounter === 1) dropOverlay.style.display = 'flex';
    });
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'none';
    });
    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        dropOverlay.style.display = 'none';
      }
    });
    dropZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter = 0;
      dropOverlay.style.display = 'none';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        showAlert('Use o anexo nativo', 'A extensão não recebe arquivos por arrastar/soltar. Clique no botão 📎 para abrir o fluxo oficial de anexo do Lovable.');
      }
    });
  }
  function setupSpFileAttachment() {
    const attachBtn = document.getElementById('sp-attach-btn');
    if (!attachBtn) return;
    attachBtn.addEventListener('click', async () => {
      const log = document.getElementById('sp-log');
      if (log) {
        log.className = 'sp-log sp-log-info';
        log.textContent = '📎 Abrindo anexo nativo do Lovable...';
      }
      const resp = await spSendToLovableTab('FL_OPEN_NATIVE_ATTACH', '');
      if (resp && resp.success) {
        if (log) {
          log.className = 'sp-log sp-log-success';
          log.textContent = '✅ Fluxo nativo de anexo acionado. Nenhum arquivo passou pela extensão ou por servidor externo.';
        }
        return;
      }
      const error = resp && resp.error ? resp.error : 'Não encontrei o botão nativo de anexo do Lovable nesta tela.';
      if (log) {
        log.className = 'sp-log sp-log-warning';
        log.textContent = '⚠️ ' + error;
      }
      showAlert('Anexo nativo', error + ' Abra o projeto no Lovable e tente novamente; se necessário, clique manualmente no clipe/anexo da página.');
    });
  }
  function showModoPlanoAlert() {
    const overlay = document.createElement('div');
    overlay.className = 'sp-modal-overlay';
    overlay.innerHTML = '<div class="sp-modal">' +
      '<div class="sp-modal-icon">\u26a0\ufe0f</div>' +
      '<div class="sp-modal-title">Aten\u00e7\u00e3o \u2014 Modo Plano</div>' +
      '<div class="sp-modal-body">' +
        'O <strong>Modo Plano/Pensar</strong> pode consumir cr\u00e9ditos, mas oferece um excelente aux\u00edlio. Use com modera\u00e7\u00e3o!' +
      '</div>' +
      '<div style="margin-bottom:14px;">' +
        '<div class="sp-modal-step"><span class="sp-modal-step-num">1</span><span class="sp-modal-step-text">Ative o <strong>Modo Plano</strong> e envie seu prompt pela extens\u00e3o.</span></div>' +
        '<div class="sp-modal-step"><span class="sp-modal-step-num">2</span><span class="sp-modal-step-text">O Lovable vai gerar um plano. <strong>N\u00c3O clique no bot\u00e3o "Aprovar"</strong> dentro do Lovable.</span></div>' +
        '<div class="sp-modal-step"><span class="sp-modal-step-num">3</span><span class="sp-modal-step-text"><strong>Copie o plano gerado</strong> e cole no campo de prompt da extens\u00e3o.</span></div>' +
        '<div class="sp-modal-step"><span class="sp-modal-step-num">4</span><span class="sp-modal-step-text"><strong>Desligue o Modo Plano</strong> antes de enviar. Ainda pode consumir crédito, mas você reduz retrabalho e mensagens extras.</span></div>' +
      '</div>' +
      '<div class="sp-modal-check">' +
        '<input type="checkbox" id="sp-modal-dismiss" />' +
        '<label for="sp-modal-dismiss">N\u00e3o mostrar novamente</label>' +
      '</div>' +
      '<button class="sp-modal-btn" id="sp-modal-ok">Entendi!</button>' +
    '</div>';
    document.body.appendChild(overlay);
    document.getElementById('sp-modal-ok').addEventListener('click', function() {
      var dismiss = document.getElementById('sp-modal-dismiss').checked;
      if (dismiss) chrome.storage.local.set({ fl_plan_mode_alert_dismissed: true });
      overlay.remove();
    });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  }
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  }

  var SP_WATERMARK_PROMPT = "Adicione isso ao arquivo index.css do projeto \n" +
    "a[href*=\"lovable.dev\"], \n" +
    "iframe[src*=\"lovable.dev\"],\n" +
    "div[style*=\"Edit with Lovable\"],\n" +
    ".lovable-badge {\n" +
    "  display: none !important;\n" +
    "  opacity: 0 !important;\n" +
    "  visibility: hidden !important;\n" +
    "  pointer-events: none !important;\n" +
    "  position: absolute !important;\n" +
    "  z-index: -9999 !important;\n" +
    "}";

  function setupSpWatermarkButton(){
    var btn = document.getElementById("sp-remove-watermark");
    if(!btn) return;
    btn.addEventListener("click", async function(){
      var log = document.getElementById("sp-log");
      var originalLabel = btn.textContent;
      btn.disabled = true;
      btn.textContent = "⏳";
      log.className = "sp-log sp-log-warning";
      log.textContent = "⚠️ Remover marca d’água por prompt pode consumir créditos.";

      try {
        const confirmed = await spConfirmCreditRisk(
          SP_WATERMARK_PROMPT,
          'Remover marca d’água envia um prompt comum ao Lovable e pode consumir créditos.'
        );
        if (!confirmed) {
          log.className = "sp-log sp-log-info";
          log.textContent = "Envio cancelado por você. Nada foi enviado.";
          return;
        }

        var result = await new Promise(function(resolve) {
          try {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              var tab = tabs && tabs[0];
              if (!tab || !tab.id) {
                resolve({ success: false, error: 'Abra a aba do projeto Lovable antes de enviar.' });
                return;
              }
              chrome.tabs.sendMessage(tab.id, { action: 'FL_SEND_DIRECT', prompt: SP_WATERMARK_PROMPT }, function(resp) {
                if (chrome.runtime.lastError) {
                  resolve({ success: false, error: chrome.runtime.lastError.message });
                  return;
                }
                resolve(resp || { success: false, error: 'Sem resposta da aba do Lovable.' });
              });
            });
          } catch (e) {
            resolve({ success: false, error: e && e.message ? e.message : String(e) });
          }
        });

        if(result && result.success === false){
          throw new Error(result.error || "Erro no envio direto");
        }

        log.className = "sp-log sp-log-success";
        log.textContent = "✓ Prompt enviado após confirmação. Pode consumir créditos no Lovable.";
      } catch(err) {
        log.className = "sp-log sp-log-error";
        log.textContent = "✗ " + (err.message || err);
      } finally {
        btn.disabled = false;
        btn.textContent = originalLabel || "🚫";
      }
    });
  }
  function setupSpDownloadProject() {
    var btn = document.getElementById('sp-download-project');
    if (!btn) return;
    btn.addEventListener('click', async function() {
      var log = document.getElementById('sp-log');
      var originalLabel = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Preparando...';
      if (log) { log.className = 'sp-log sp-log-info'; log.textContent = 'Verificando token e projeto...'; }
      try {
        var sd = await new Promise(function(r) { chrome.storage.local.get(['lovable_token', 'lovable_projectId', 'lovable_sourceHost'], r); });
        var authToken = sd.lovable_token || '';
        var storedProjectId = sd.lovable_projectId || '';
        var sourceHost = sd.lovable_sourceHost || '';
        if (authToken.indexOf('Bearer ') === 0) authToken = authToken.slice(7);
        var apiBase = spGetApiBaseUrl(authToken, sourceHost);

        var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        var currentTab = tabs[0];
        var projectId = storedProjectId;
        if (!projectId && currentTab && currentTab.url) {
          projectId = spExtractProjectIdFromUrl(currentTab.url);
        }

        if (!projectId) throw new Error('Abra uma página de projeto do Lovable primeiro.');
        if (!authToken) throw new Error('Download ZIP indisponível: não encontrei o token da sessão do Lovable. O envio de prompts pelo painel continua funcionando normalmente.');

        if (log) log.textContent = 'Baixando arquivos do projeto...';
        btn.textContent = 'Baixando...';

        var dlResponse = await new Promise(function(resolve) {
          chrome.runtime.sendMessage({ action: 'downloadProject', projectId: projectId, token: authToken }, function(resp) { resolve(resp); });
        });
        if (!dlResponse || !dlResponse.success) throw new Error(dlResponse && dlResponse.error ? dlResponse.error : 'Download falhou');

        var files = dlResponse.files;
        if (!files || files.length === 0) throw new Error('Nenhum arquivo encontrado no projeto.');
        if (typeof JSZip === 'undefined') throw new Error('Biblioteca JSZip não carregada.');

        if (log) log.textContent = 'Criando ZIP com ' + files.length + ' arquivos...';
        btn.textContent = 'Empacotando...';

        var zip = new JSZip();
        var imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.bmp', '.tiff'];
        var addedFiles = 0;

        for (var fi = 0; fi < files.length; fi++) {
          var f = files[fi];
          if (!f || !f.name || f.sizeExceeded) continue;
          if (f.contents && f.binary) {
            zip.file(f.name, f.contents, { base64: true, binary: true });
            addedFiles++;
            continue;
          }
          if (!f.contents && imageExts.some(function(ext) { return f.name.toLowerCase().endsWith(ext); })) {
            try {
              var imgUrl = apiBase + '/projects/' + projectId + '/files/raw?path=' + encodeURIComponent(f.name);
              var imgResp = await fetch(imgUrl, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + authToken, 'Accept': '*/*' }
              });
              if (imgResp.ok) {
                zip.file(f.name, await imgResp.arrayBuffer(), { binary: true });
                addedFiles++;
                continue;
              }
            } catch (imgErr) {}
          }
          if (f.contents) {
            zip.file(f.name, f.contents);
            addedFiles++;
          }
        }

        if (log) log.textContent = 'Comprimindo ' + addedFiles + ' arquivos...';
        var zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
        var timestamp = new Date().toISOString().split('T')[0];
        var zipName = 'lovable-' + projectId.substring(0, 8) + '-' + timestamp + '.zip';
        var url = URL.createObjectURL(zipBlob);
        var a = document.createElement('a');
        a.href = url;
        a.download = zipName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (log) { log.className = 'sp-log sp-log-success'; log.textContent = addedFiles + ' arquivos baixados com sucesso!'; }
        btn.textContent = 'Download concluído!';
        setTimeout(function() { btn.disabled = false; btn.textContent = originalLabel; }, 1600);
      } catch (err) {
        if (log) { log.className = 'sp-log sp-log-error'; log.textContent = err.message || 'Falha ao baixar projeto.'; }
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
    });
  }

  function setupSpCreateProject() {
    const btn = document.getElementById('sp-create-project');
    if (!btn) return;
    btn.addEventListener('click', async function() {
      const log = document.getElementById('sp-log');
      const originalLabel = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Abrindo...';
      try {
        await chrome.tabs.create({ url: 'https://lovable.dev/', active: true });
        if (log) {
          log.className = 'sp-log sp-log-info';
          log.textContent = 'Lovable aberto em nova aba.';
        }
      } catch (err) {
        if (log) {
          log.className = 'sp-log sp-log-error';
          log.textContent = err && err.message ? err.message : 'Falha ao abrir Lovable.';
        }
      } finally {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
    });
  }


  // === PATCH 3.4.9: envio confirmado com localização robusta da aba Lovable ===
  function spIsLovableTabUrl(url) {
    return /^https:\/\/([^/]+\.)?lovable\.(dev|app)(\/|$)/i.test(String(url || ''));
  }

  function spTabSendMessage(tabId, payload) {
    return new Promise(function(resolve) {
      try {
        chrome.tabs.sendMessage(tabId, payload, function(resp) {
          if (chrome.runtime.lastError) {
            resolve({ success: false, error: chrome.runtime.lastError.message || 'Sem content script na aba.' });
            return;
          }
          resolve(resp || { success: false, error: 'Sem resposta da aba do Lovable.' });
        });
      } catch (e) {
        resolve({ success: false, error: e && e.message ? e.message : String(e) });
      }
    });
  }

  function spInjectContentScript(tabId) {
    return new Promise(function(resolve) {
      try {
        if (!chrome.scripting || !chrome.scripting.executeScript) return resolve(false);
        chrome.scripting.executeScript({
          target: { tabId: tabId, allFrames: false },
          files: ['content.js']
        }, function() {
          if (chrome.runtime.lastError) return resolve(false);
          setTimeout(function(){ resolve(true); }, 350);
        });
      } catch (_) {
        resolve(false);
      }
    });
  }

  function spQueryTabs(queryInfo) {
    return new Promise(function(resolve) {
      try { chrome.tabs.query(queryInfo, function(tabs){ resolve(tabs || []); }); }
      catch (_) { resolve([]); }
    });
  }

  async function spFindLovableTabs() {
    const active = await spQueryTabs({ active: true, currentWindow: true });
    const all = await spQueryTabs({});
    const map = new Map();
    active.concat(all).forEach(function(tab) {
      if (tab && tab.id && spIsLovableTabUrl(tab.url)) map.set(tab.id, tab);
    });
    const tabs = Array.from(map.values());
    tabs.sort(function(a, b) {
      const aa = (a.active ? 2 : 0) + (a.highlighted ? 1 : 0);
      const bb = (b.active ? 2 : 0) + (b.highlighted ? 1 : 0);
      return bb - aa;
    });
    return tabs;
  }

  async function spSendToLovableTab(action, prompt) {
    const tabs = await spFindLovableTabs();
    if (!tabs.length) {
      return { success: false, error: 'Abra uma aba do projeto no Lovable antes de enviar.' };
    }
    let lastError = '';
    for (const tab of tabs) {
      let resp = await spTabSendMessage(tab.id, { action: action, prompt: prompt });
      if (resp && resp.success) return Object.assign({ tabId: tab.id }, resp);
      lastError = resp && resp.error ? resp.error : lastError;

      // Quando a aba já estava aberta antes da instalação/atualização, o content script pode não existir ainda.
      if (/receiving end|establish connection|content script|sem content script|Could not establish/i.test(lastError || '')) {
        const injected = await spInjectContentScript(tab.id);
        if (injected) {
          resp = await spTabSendMessage(tab.id, { action: action, prompt: prompt });
          if (resp && resp.success) return Object.assign({ tabId: tab.id }, resp);
          lastError = resp && resp.error ? resp.error : lastError;
        }
      }
    }
    return { success: false, error: lastError || 'Não consegui comunicar com a aba do Lovable. Recarregue o projeto e tente novamente.' };
  }
  async function handleSend() {
    const input = document.getElementById('sp-msg');
    const msg = (input && input.value ? input.value : '').trim();
    const log = document.getElementById('sp-log');
    const btn = document.getElementById('sp-send');

    if (!msg) {
      if (log) { log.className = 'sp-log sp-log-error'; log.textContent = '⚠ Prompt vazio'; }
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = '⏳'; }
    if (log) { log.className = 'sp-log sp-log-info'; log.textContent = '🔎 Verificando melhor caminho antes do envio...'; }

    try {
      let directResp = await spSendToLovableTab('FL_SEND_BUGFIX', msg);

      if (!directResp || !directResp.success) {
        const reason = (directResp && directResp.error) || 'Não encontrei ação oficial/visual segura nesta tela; o chat normal pode consumir créditos.';
        if (log) { log.className = 'sp-log sp-log-warning'; log.textContent = '⚠️ ' + reason; }

        const confirmed = await spConfirmCreditRisk(msg, reason);
        if (!confirmed) {
          if (log) { log.className = 'sp-log sp-log-info'; log.textContent = 'Envio cancelado por você. Nada foi enviado.'; }
          addToHistory(msg, 'cancelled-credit-risk');
          return;
        }

        if (log) { log.className = 'sp-log sp-log-warning'; log.textContent = '⚠️ Enviando pelo chat normal após confirmação...'; }
        directResp = await spSendToLovableTab('FL_SEND_DIRECT', msg);
      }

      if (!directResp || !directResp.success) {
        throw new Error((directResp && directResp.error) || 'Falha ao enviar para a aba do Lovable.');
      }

      if (input) input.value = '';
      spAttachedFiles.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); });
      spAttachedFiles = [];
      spRenderAttachPreview();
      spUpdateCreditAdvisor();

      if (log) {
        log.className = 'sp-log sp-log-success';
        if (directResp.warning) log.textContent = '✅ ' + directResp.warning;
        else if (directResp.wouldConsumeCredits) log.textContent = '✅ Enviado após confirmação. Esta ação pode consumir créditos.';
        else log.textContent = '✅ Enviado com sucesso!';
      }

      addToHistory(msg, directResp.wouldConsumeCredits ? 'confirmed-credit-risk' : (directResp.creditSafe ? 'official-no-credit' : 'ok'));
    } catch (err) {
      console.error('[Assistente Lovable] Falha no envio:', err);
      if (log) { log.className = 'sp-log sp-log-error'; log.textContent = '✗ ' + (err.message || String(err)); }
      addToHistory(msg, 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Enviar'; }
    }
  }

  

  

  



  (async function init() {
    try {
      deviceId = await getDeviceId();
    } catch (e) {
      deviceId = 'fallback-' + Date.now();
    }

    spRenderShell();
    spBindShellEvents();
    await spFetchRemoteConfig();
    spApplyValidationState({}, 'local');

    try {
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg && msg.action === 'REFRESH_HISTORY') {
          if (spActiveTab === 'history') {
            loadChatHistory(function() { renderHistoryTab(); });
          } else {
            updateHistoryBadge();
          }
        }
      });
    } catch (e) {}

    chrome.storage.local.get(["fl_dark_mode"], r => {
      if (r.fl_dark_mode === false) document.body.classList.add('sp-light');
    });
    spRestoreFocusMode();
    try {
      chrome.storage.local.get([SP_BRANCH_STORAGE_KEY], function(r) {
        spCurrentBranch = (r && r[SP_BRANCH_STORAGE_KEY]) || 'Principal';
      });
    } catch (_) {}

    const body = document.getElementById('sp-body');
    if (body) {
      body.innerHTML = '<div class="sp-license-gate" id="sp-loading" style="padding:40px 0;text-align:center"><p style="color:var(--fl-text-muted)">&#x23f3; Abrindo painel...</p></div>';
    }

    showMainUI();
  })();



  async function checkWelcomeOnboarding() {
    // Pop-up inicial removido para manter abertura direta do painel.
    return;
  }

  function showWelcomeModal() {
    return;
  }

  let spShieldActive = false;

  function setupSpShield() {
    const btn = document.getElementById('sp-shield-btn');
    if (!btn) return;
    spShieldActive = true;
    btn.classList.add('sp-shield-active');
    btn.title = 'Aviso de créditos sempre ativo';
    chrome.storage.local.set({ fl_shield_active: true });
    btn.addEventListener('click', () => {
      showAlert('Aviso de Créditos Ativo 🛡️', 'A extensão não bloqueia suas ações, mas pede confirmação antes de envios que possam consumir créditos.');
    });
  }

  function injectSpShieldOverlay() {
    // Desativado no modo confirmação: a extensão avisa, mas não cobre/bloqueia o campo do Lovable.
  }

  function removeSpShieldOverlay() {
    // Desativado no modo confirmação.
  }

})();
