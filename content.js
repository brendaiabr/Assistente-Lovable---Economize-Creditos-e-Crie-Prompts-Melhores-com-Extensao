// content.js - Assistente Lovable 3.4.28
// Modo estável: sem hooks globais, sem polling agressivo e sem interceptação pesada da página.
(function () {
  if (window.__assistenteLovableStableContent) return;
  window.__assistenteLovableStableContent = true;

  const PREFIX = '[Assistente Lovable]';
  const TOP_FRAME = window === window.top;

  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  function safeText(value, max) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max || 1000);
  }

  function isLovableHost(hostname) {
    return /(^|\.)lovable\.(dev|app)$/i.test(String(hostname || ''));
  }

  function extractProjectIdFromUrl(url) {
    try {
      const u = new URL(String(url || location.href));
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
        if (/^(projects?|apps?)$/i.test(parts[i]) && parts[i + 1] && !ignored.test(parts[i + 1])) {
          return parts[i + 1];
        }
      }

      const uuidLike = parts.find(function(part) {
        return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(part) || /^[a-f0-9]{24,}$/i.test(part);
      });
      if (uuidLike) return uuidLike;

      // Fallback seguro para rotas de projeto com slug curto no Lovable.
      const candidate = parts.find(function(part) {
        return !ignored.test(part) && /^[a-z0-9][a-z0-9_-]{5,}$/i.test(part);
      });
      return candidate || '';
    } catch (_) {
      return '';
    }
  }

  function findLovableAuthToken() {
    const jwtRe = /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/;
    const seen = new Set();
    function scanValue(value, depth) {
      if (!value || depth > 3) return '';
      const text = typeof value === 'string' ? value : '';
      if (text) {
        const direct = text.match(jwtRe);
        if (direct && direct[0]) return direct[0];
        if ((text[0] === '{' || text[0] === '[') && text.length < 20000) {
          try { return scanValue(JSON.parse(text), depth + 1); } catch (_) {}
        }
        return '';
      }
      if (Array.isArray(value)) {
        for (const item of value) {
          const found = scanValue(item, depth + 1);
          if (found) return found;
        }
        return '';
      }
      if (typeof value === 'object') {
        const priority = ['access_token', 'token', 'jwt', 'id_token', 'authToken'];
        for (const key of priority) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            const found = scanValue(value[key], depth + 1);
            if (found) return found;
          }
        }
        for (const key of Object.keys(value).slice(0, 80)) {
          const found = scanValue(value[key], depth + 1);
          if (found) return found;
        }
      }
      return '';
    }
    function scanStorage(storage) {
      try {
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i) || '';
          if (seen.has(key)) continue;
          seen.add(key);
          if (!/(auth|token|supabase|sb-|session|lovable)/i.test(key)) continue;
          const found = scanValue(storage.getItem(key), 0);
          if (found) return found;
        }
      } catch (_) {}
      return '';
    }
    return scanStorage(localStorage) || scanStorage(sessionStorage) || '';
  }

  function getConnectionStatus() {
    const projectId = extractProjectIdFromUrl(location.href);
    const token = findLovableAuthToken();
    return {
      success: true,
      url: location.href,
      host: location.hostname,
      projectId,
      tokenKnown: Boolean(token),
      token: token || '',
      isProjectPage: Boolean(projectId),
      stableMode: true,
      ts: Date.now()
    };
  }

  function storageSet(values) {
    try {
      const res = chrome.storage.local.set(values);
      if (res && typeof res.then === 'function') return res.catch(() => {});
    } catch (_) {}
    return Promise.resolve();
  }

  function syncCurrentPage() {
    if (!TOP_FRAME || !isLovableHost(location.hostname)) return;
    const status = getConnectionStatus();
    const values = {
      lovable_sourceHost: status.host || '',
      lovable_lastUrl: status.url || '',
      lovable_lastSeenAt: Date.now()
    };
    if (status.projectId) values.lovable_projectId = status.projectId;
    if (status.token) values.lovable_token = status.token;
    storageSet(values);
  }

  function scheduleSync() {
    clearTimeout(scheduleSync._timer);
    scheduleSync._timer = setTimeout(syncCurrentPage, 250);
  }

  if (TOP_FRAME) {
    syncCurrentPage();
    window.addEventListener('focus', scheduleSync, { passive: true });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) scheduleSync(); }, { passive: true });
    window.addEventListener('popstate', scheduleSync, { passive: true });
    window.addEventListener('hashchange', scheduleSync, { passive: true });
    try {
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      history.pushState = function () { const r = pushState.apply(this, arguments); scheduleSync(); return r; };
      history.replaceState = function () { const r = replaceState.apply(this, arguments); scheduleSync(); return r; };
    } catch (_) {}
  }

  function isVisible(el) {
    try {
      if (!el || !el.isConnected) return false;
      const r = el.getBoundingClientRect();
      if (!r || r.width < 2 || r.height < 2) return false;
      const st = getComputedStyle(el);
      return st.display !== 'none' && st.visibility !== 'hidden' && st.opacity !== '0';
    } catch (_) { return false; }
  }

  function norm(el) {
    try {
      return [
        el.innerText,
        el.textContent,
        el.getAttribute && el.getAttribute('aria-label'),
        el.getAttribute && el.getAttribute('placeholder'),
        el.getAttribute && el.getAttribute('title'),
        el.getAttribute && el.getAttribute('data-testid'),
        el.id,
        el.className
      ].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim().toLowerCase();
    } catch (_) { return ''; }
  }

  function findChatInput() {
    const selectors = [
      'form#chat-input div[contenteditable="true"][aria-label="Chat input"]',
      '#chatinput div[contenteditable="true"][aria-label="Chat input"]',
      'textarea[placeholder*="Ask Lovable" i]',
      'textarea[placeholder*="build" i]',
      'textarea[placeholder*="message" i]',
      'div[aria-label*="Chat" i][contenteditable="true"]',
      'div[role="textbox"][contenteditable="true"]',
      'textarea',
      '[contenteditable="true"]'
    ];
    for (const selector of selectors) {
      const nodes = Array.from(document.querySelectorAll(selector)).filter(isVisible);
      const best = nodes.find(el => {
        const t = norm(el);
        if (el.tagName === 'TEXTAREA') return !/search|filter|buscar|pesquisar/i.test(t);
        return el.isContentEditable && !/search|filter|buscar|pesquisar/i.test(t);
      });
      if (best) return best;
    }
    return null;
  }

  function setInputValue(input, value) {
    if (!input) return false;
    input.focus();
    if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
      const proto = Object.getPrototypeOf(input);
      const desc = Object.getOwnPropertyDescriptor(proto, 'value');
      if (desc && desc.set) desc.set.call(input, value);
      else input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      return true;
    }
    if (input.isContentEditable) {
      input.textContent = value;
      input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data: value }));
      input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      return true;
    }
    return false;
  }

  function enabled(el) {
    return !!el && !el.disabled && el.getAttribute('aria-disabled') !== 'true' && isVisible(el);
  }

  function humanClick(el) {
    if (!el) return false;
    try { el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }); } catch (_) {}
    try {
      ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => {
        el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, composed: true, view: window }));
      });
      return true;
    } catch (_) {
      try { el.click(); return true; } catch (_) { return false; }
    }
  }

  function findSendButton(input) {
    const all = Array.from(document.querySelectorAll('button,[role="button"]')).filter(enabled);
    const textMatches = all.filter(btn => {
      const t = norm(btn);
      return /(send|enviar|submit|arrow-up|paper-plane|message-send)/i.test(t) && !/(cancel|stop|attach|upload|anex|file)/i.test(t);
    });
    if (textMatches.length) return textMatches[0];

    if (input) {
      const ir = input.getBoundingClientRect();
      const scored = all.map(btn => {
        const r = btn.getBoundingClientRect();
        const t = norm(btn);
        const reject = /(cancel|stop|attach|upload|anex|file|micro|voice|settings|menu)/i.test(t);
        const near = r.left >= ir.left - 40 && r.left <= ir.right + 180 && r.top <= ir.bottom + 80 && r.bottom >= ir.top - 80;
        const small = r.width >= 18 && r.width <= 90 && r.height >= 18 && r.height <= 90;
        return { btn, score: (near ? 30 : 0) + (small ? 10 : 0) + r.left / 1000 - (reject ? 100 : 0) };
      }).filter(x => x.score > 20).sort((a, b) => b.score - a.score);
      if (scored.length) return scored[0].btn;
    }
    return null;
  }

  function submitInput(input) {
    try {
      const form = input && input.closest && input.closest('form');
      if (form && typeof form.requestSubmit === 'function') {
        form.requestSubmit();
        return true;
      }
    } catch (_) {}
    const btn = findSendButton(input);
    if (btn) return humanClick(btn);
    try {
      const opts = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true, composed: true };
      input.dispatchEvent(new KeyboardEvent('keydown', opts));
      input.dispatchEvent(new KeyboardEvent('keyup', opts));
      return true;
    } catch (_) { return false; }
  }

  async function sendDirect(prompt) {
    const finalPrompt = String(prompt || '').trim();
    if (!finalPrompt) return { success: false, error: 'Prompt vazio.' };
    for (let i = 0; i < 20; i++) {
      const input = findChatInput();
      if (input) {
        setInputValue(input, finalPrompt);
        await sleep(180);
        if (submitInput(input)) return { success: true, mode: 'direct-ui-stable', wouldConsumeCredits: true };
        return { success: false, error: 'Não consegui acionar o botão Enviar do Lovable.' };
      }
      await sleep(250);
    }
    return { success: false, error: 'Campo de chat do Lovable não encontrado. Abra um projeto, aguarde carregar e tente novamente.' };
  }

  function findOfficialFixButton() {
    const buttons = Array.from(document.querySelectorAll('button,[role="button"],a')).filter(enabled);
    return buttons.find(btn => {
      const t = norm(btn);
      return /(try to fix|fix all|fix bug|corrigir|tentar corrigir|resolver erro|consertar)/i.test(t) && !/(chat|send|enviar|delete|remove)/i.test(t);
    }) || null;
  }

  async function sendBugFix(prompt) {
    const finalPrompt = String(prompt || '').trim();
    if (!finalPrompt) return { success: false, error: 'Prompt vazio.' };
    const fix = findOfficialFixButton();
    if (fix) {
      humanClick(fix);
      return { success: true, mode: 'official-fix-button-stable', wouldConsumeCredits: false };
    }
    return { success: false, error: 'Nenhum botão oficial Try to fix/Fix all visível nesta tela.' };
  }

  function findNativeAttachmentControl() {
    const controls = Array.from(document.querySelectorAll('button,[role="button"],input[type="file"],label,a')).filter(enabled);
    const strong = controls.find(el => {
      if (el.matches && el.matches('input[type="file"]')) return true;
      const t = norm(el);
      return /(attach|attachment|anex|anexo|arquivo|file|upload|paperclip|clip|imagem|image)/i.test(t) && !/(send|enviar|submit|stop|cancel|menu|download|export)/i.test(t);
    });
    if (strong) return strong;

    const input = findChatInput();
    if (!input) return null;
    const ir = input.getBoundingClientRect();
    const scored = controls.map(el => {
      const r = el.getBoundingClientRect();
      const t = norm(el);
      const reject = /(send|enviar|submit|stop|cancel|micro|voice|settings|menu)/i.test(t);
      const near = r.left >= ir.left - 110 && r.left <= ir.right + 120 && r.top <= ir.bottom + 70 && r.bottom >= ir.top - 70;
      const iconish = r.width > 14 && r.width < 90 && r.height > 14 && r.height < 90;
      const textish = /(plus|add|upload|file|attach|paperclip|clip|image|anex|\+)/i.test(t);
      return { el, score: (near ? 25 : 0) + (iconish ? 10 : 0) + (textish ? 20 : 0) - (reject ? 100 : 0) };
    }).filter(x => x.score > 30).sort((a, b) => b.score - a.score);
    return scored.length ? scored[0].el : null;
  }

  async function openNativeAttachmentPanel() {
    for (let i = 0; i < 8; i++) {
      const control = findNativeAttachmentControl();
      if (control) {
        humanClick(control);
        return { success: true, mode: 'native-lovable-attachment-stable' };
      }
      await sleep(250);
    }
    return { success: false, error: 'Botão nativo de anexo do Lovable não encontrado.' };
  }

  function capturePageContext() {
    try {
      const selectors = [
        '[role="alert"]', '[aria-live]', '[data-testid*="error" i]', '[class*="error" i]',
        '[class*="toast" i]', '[class*="notification" i]', '[class*="alert" i]', 'pre', 'code'
      ];
      const collected = [];
      selectors.forEach(sel => {
        try {
          Array.from(document.querySelectorAll(sel)).slice(0, 16).forEach(el => {
            const tx = safeText(el.innerText || el.textContent, 600);
            if (tx && /erro|error|failed|falha|exception|build|deploy|crash|warning|avis/i.test(tx)) collected.push(tx);
          });
        } catch (_) {}
      });
      let selectedText = '';
      try { selectedText = safeText(window.getSelection && window.getSelection().toString(), 1600); } catch (_) {}
      return {
        success: true,
        url: location.href,
        title: document.title || '',
        host: location.hostname,
        projectHint: location.pathname.split('/').filter(Boolean).slice(0, 5).join(' / '),
        visibleErrors: Array.from(new Set(collected)).slice(0, 10),
        consoleSignals: [],
        selectedText,
        stableMode: true,
        capturedAt: new Date().toISOString()
      };
    } catch (e) {
      return { success: false, error: e && e.message ? e.message : String(e) };
    }
  }


  function auditSeoAeoDocument(doc, targetLabel, targetUrl) {
    function one(selector, attr) {
      try {
        const el = doc.querySelector(selector);
        if (!el) return '';
        return safeText(attr ? el.getAttribute(attr) : el.textContent, 1200);
      } catch (_) { return ''; }
    }
    function count(selector) {
      try { return doc.querySelectorAll(selector).length; } catch (_) { return 0; }
    }
    function textLen(el) {
      try { return safeText(el && (el.innerText || el.textContent), 200000).length; } catch (_) { return 0; }
    }
    function add(checks, label, ok, detail, warn) {
      checks.push({ label, status: ok ? 'ok' : (warn ? 'warn' : 'miss'), detail: safeText(detail, 1200) });
    }

    const checks = [];
    const html = doc.documentElement;
    const body = doc.body;
    const title = safeText(doc.title || one('title'), 160);
    const description = one('meta[name="description"]', 'content');
    const canonical = one('link[rel="canonical"]', 'href');
    const lang = safeText(html && html.getAttribute('lang'), 60);
    const viewport = one('meta[name="viewport"]', 'content');
    const robots = one('meta[name="robots"]', 'content');
    const ogTitle = one('meta[property="og:title"]', 'content');
    const ogDescription = one('meta[property="og:description"]', 'content');
    const ogImage = one('meta[property="og:image"]', 'content');
    const ogType = one('meta[property="og:type"]', 'content');
    const twitterCard = one('meta[name="twitter:card"]', 'content');
    const jsonLdEls = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
    const jsonLdTypes = [];
    jsonLdEls.forEach(function(el) {
      try {
        const parsed = JSON.parse(el.textContent || '{}');
        const items = Array.isArray(parsed) ? parsed : [parsed];
        items.forEach(function(item) {
          const type = item && (item['@type'] || (item['@graph'] && item['@graph'][0] && item['@graph'][0]['@type']));
          if (type) jsonLdTypes.push(Array.isArray(type) ? type.join(', ') : String(type));
        });
      } catch (_) { jsonLdTypes.push('JSON-LD inválido'); }
    });
    const h1 = count('h1');
    const h2 = count('h2');
    const main = count('main');
    const header = count('header');
    const footer = count('footer');
    const article = count('article');
    const section = count('section');
    const nav = count('nav');
    const imgs = count('img');
    const imgsNoAlt = count('img:not([alt]), img[alt=""]');
    const links = count('a[href]');
    const emptyLinks = Array.from(doc.querySelectorAll('a[href]')).filter(function(a){ return !safeText(a.innerText || a.textContent || a.getAttribute('aria-label') || a.getAttribute('title'), 80); }).length;
    const bodyTextLength = textLen(body);
    const rootTextLength = textLen(doc.querySelector('#root, #__next, [data-reactroot]'));
    const ssrSignal = bodyTextLength > 900 || rootTextLength > 500;

    add(checks, 'Título da página', title.length >= 20 && title.length <= 65, title ? title + ' (' + title.length + ' caracteres)' : 'Ausente', title && title.length > 0);
    add(checks, 'Meta description', description.length >= 70 && description.length <= 165, description ? description + ' (' + description.length + ' caracteres)' : 'Ausente', description && description.length > 0);
    add(checks, 'Canonical', Boolean(canonical), canonical || 'Ausente', false);
    add(checks, 'Idioma do HTML', Boolean(lang), lang || 'Ausente', false);
    add(checks, 'Viewport mobile', /width=device-width/i.test(viewport), viewport || 'Ausente', false);
    add(checks, 'Robots', !/noindex|nofollow/i.test(robots || ''), robots || 'Sem meta robots restritiva detectada', false);
    add(checks, 'Open Graph básico', Boolean(ogTitle && ogDescription && ogImage), 'og:title=' + (ogTitle ? 'ok' : 'ausente') + ', og:description=' + (ogDescription ? 'ok' : 'ausente') + ', og:image=' + (ogImage ? 'ok' : 'ausente') + ', og:type=' + (ogType || 'ausente'), Boolean(ogTitle || ogDescription || ogImage));
    add(checks, 'Twitter Card', Boolean(twitterCard), twitterCard || 'Ausente', false);
    add(checks, 'Dados estruturados JSON-LD', jsonLdEls.length > 0 && !jsonLdTypes.includes('JSON-LD inválido'), jsonLdEls.length ? (jsonLdEls.length + ' bloco(s): ' + (jsonLdTypes.join(', ') || 'tipo não declarado')) : 'Ausente', jsonLdEls.length > 0);
    add(checks, 'HTML semântico', Boolean(main && (header || section || article || nav)), 'main=' + main + ', header=' + header + ', nav=' + nav + ', article=' + article + ', section=' + section + ', footer=' + footer, Boolean(main || header || section || article || nav));
    add(checks, 'Hierarquia de headings', h1 === 1 && h2 >= 1, 'h1=' + h1 + ', h2=' + h2, h1 > 0);
    add(checks, 'Imagens com alt', imgsNoAlt === 0, imgs + ' imagem(ns), ' + imgsNoAlt + ' sem alt', imgs > 0 && imgsNoAlt < imgs);
    add(checks, 'Links acessíveis', emptyLinks === 0, links + ' link(s), ' + emptyLinks + ' sem texto/label', links > 0 && emptyLinks < links);
    add(checks, 'Sinal de SSR/pré-renderização', ssrSignal, 'Texto renderizado detectado: body≈' + bodyTextLength + ' caracteres, root≈' + rootTextLength + ' caracteres', bodyTextLength > 250);

    const score = Math.round(checks.reduce(function(acc, c){ return acc + (c.status === 'ok' ? 1 : c.status === 'warn' ? 0.55 : 0); }, 0) / checks.length * 100);
    const recommendations = checks.filter(function(c){ return c.status !== 'ok'; }).slice(0, 8).map(function(c){ return c.label + ': ' + c.detail; });
    return { targetLabel, targetUrl, score, checks, summary: { title, description, canonical, lang, ogTitle, ogDescription, ogImage, twitterCard, jsonLdTypes, h1, h2, bodyTextLength }, recommendations };
  }

  function auditSeoAeo() {
    try {
      const frameNotes = [];
      let targetDoc = document;
      let targetLabel = 'Página atual do Lovable';
      let targetUrl = location.href;
      try {
        const frames = Array.from(document.querySelectorAll('iframe')).filter(isVisible);
        for (const frame of frames) {
          try {
            const fd = frame.contentDocument;
            if (!fd || !fd.body) continue;
            const len = safeText(fd.body.innerText || fd.body.textContent, 200000).length;
            const src = frame.src || '';
            if (len > 300 || /preview|app|sandbox|render|lovable/i.test(src)) {
              targetDoc = fd;
              targetLabel = 'Preview acessível dentro do Lovable';
              targetUrl = src || targetUrl;
              break;
            }
          } catch (e) {
            frameNotes.push('Preview/iframe não acessível por política do navegador: ' + safeText(frame.src || 'sem src', 300));
          }
        }
      } catch (_) {}
      const report = auditSeoAeoDocument(targetDoc, targetLabel, targetUrl);
      report.frameNotes = frameNotes.slice(0, 5);
      report.success = true;
      report.capturedAt = new Date().toISOString();
      report.url = targetUrl;
      report.prompt = [
        'Atue como especialista sênior em SEO técnico, AEO e Lovable com SSR/pré-renderização.',
        '',
        'Auditoria capturada pela extensão:',
        '- Alvo: ' + report.targetLabel,
        '- URL: ' + report.targetUrl,
        '- Score estimado: ' + report.score + '/100',
        '- Problemas/atenções:',
        (report.recommendations.length ? report.recommendations.map(function(x){ return '  - ' + x; }).join('\n') : '  - Nenhum problema crítico detectado automaticamente.'),
        '',
        'Tarefa:',
        '1. Corrija SEO/AEO on-page com menor alteração segura possível.',
        '2. Garanta title, meta description, canonical, Open Graph, Twitter Card e dados estruturados JSON-LD adequados ao conteúdo real da página.',
        '3. Melhore HTML semântico com header/main/section/article/footer quando fizer sentido.',
        '4. Preserve layout, identidade visual, rotas, regras de negócio e funcionalidades existentes.',
        '5. Se SSR/pré-renderização/metadados automáticos do Lovable estiverem disponíveis no projeto, use o caminho nativo mais seguro.',
        '6. Não invente métricas de Semrush; se dados Semrush estiverem disponíveis no chat, use-os apenas como referência.',
        '7. Ao final, liste arquivos alterados, metadados criados/ajustados, JSON-LD incluído e como validar no preview/publicação.'
      ].join('\n');
      return report;
    } catch (e) {
      return { success: false, error: e && e.message ? e.message : String(e) };
    }
  }

  try {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (!message || !message.action) return false;
      if (message.action === 'FL_GET_CONNECTION_STATUS') {
        syncCurrentPage();
        sendResponse(getConnectionStatus());
        return false;
      }
      if (message.action === 'FL_SEND_DIRECT') {
        sendDirect(message.prompt || '').then(sendResponse);
        return true;
      }
      if (message.action === 'FL_SEND_BUGFIX') {
        sendBugFix(message.prompt || '').then(sendResponse);
        return true;
      }
      if (message.action === 'FL_OPEN_NATIVE_ATTACH') {
        openNativeAttachmentPanel().then(sendResponse);
        return true;
      }
      if (message.action === 'FL_CAPTURE_PAGE_CONTEXT') {
        sendResponse(capturePageContext());
        return false;
      }
      if (message.action === 'FL_AUDIT_SEO_AEO') {
        sendResponse(auditSeoAeo());
        return false;
      }
      return false;
    });
  } catch (e) {
    console.warn(PREFIX, 'Falha ao registrar listener', e);
  }

  console.log(PREFIX, 'content script estável carregado');
})();
