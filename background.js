const HISTORY_KEY = "fl_chat_history";
const MAX_HISTORY = 200;
const APP_NAME = "Assistente Lovable";

console.log("[Assistente Lovable] Background ativo");

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.sidePanel.open({ tabId: tab.id });
  } catch (err) {
    console.error("[Assistente Lovable] Falha ao abrir painel:", err);
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || typeof msg !== "object") return false;

  if (msg.action === "lovableSync") {
    const updates = {};
    if (msg.token) updates.lovable_token = msg.token;
    if (msg.projectId) updates.lovable_projectId = msg.projectId;
    if (msg.sourceHost) updates.lovable_sourceHost = msg.sourceHost;
    if (Object.keys(updates).length) chrome.storage.local.set(updates);
    return false;
  }

  if (msg.action === "openSidePanel") {
    if (sender.tab && sender.tab.id) {
      chrome.sidePanel.open({ tabId: sender.tab.id }).catch(() => {});
    }
    return false;
  }

  if (msg.action === "OFFICIAL_PROMPT_CAPTURED") {
    recordPromptHistory(msg.prompt, "captured");
    return false;
  }

  if (msg.action === "OFFICIAL_PROMPT_CONFIRM_CANCELLED" || msg.action === "OFFICIAL_PROMPT_BLOCKED_CREDIT_SAFE") {
    recordPromptHistory(msg.prompt, "cancelled-credit-risk");
    return false;
  }

  if (msg.action === "OFFICIAL_PROMPT_CONFIRMED_CREDIT_RISK") {
    recordPromptHistory(msg.prompt, "confirmed-credit-risk");
    return false;
  }


  if (msg.action === "FL_FETCH_PUBLIC_DOC") {
    handleFetchPublicDoc(msg, sendResponse);
    return true;
  }

  if (msg.action === "downloadProject") {
    handleDownloadProject(msg, sendResponse);
    return true;
  }

  if (msg.action === "apiAction") {
    handleLocalApiAction(msg, sendResponse);
    return true;
  }

  if (msg.action === "proxyFetch") {
    sendResponse({ ok: false, error: "proxyFetch externo removido nesta versão." });
    return true;
  }

  if (msg.action === "uploadFileProxy") {
    sendResponse({ success: false, error: "Upload externo removido. Use o anexo nativo do Lovable." });
    return true;
  }

  return false;
});


async function handleFetchPublicDoc(msg, sendResponse) {
  try {
    const url = String(msg.url || '').trim();
    if (!/^https?:\/\//i.test(url)) {
      sendResponse({ success: false, error: 'URL inválida. Use http(s).' });
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'Accept': 'application/json,text/plain,text/html,*/*' }
    });
    clearTimeout(timer);
    const text = await res.text();
    if (!res.ok) {
      sendResponse({ success: false, error: 'HTTP ' + res.status + ' ao ler documentação.' });
      return;
    }
    sendResponse({ success: true, status: res.status, contentType: res.headers.get('content-type') || '', text: text.slice(0, 120000) });
  } catch (err) {
    sendResponse({ success: false, error: err && err.name === 'AbortError' ? 'Tempo esgotado ao ler a URL.' : (err && err.message ? err.message : String(err)) });
  }
}

async function recordPromptHistory(prompt, status) {
  try {
    const text = String(prompt || "").trim();
    if (!text) return;
    const data = await chrome.storage.local.get([HISTORY_KEY]);
    const history = Array.isArray(data[HISTORY_KEY]) ? data[HISTORY_KEY] : [];
    history.unshift({ text, timestamp: new Date().toISOString(), status: status || "ok" });
    await chrome.storage.local.set({ [HISTORY_KEY]: history.slice(0, MAX_HISTORY) });
    chrome.runtime.sendMessage({ action: "REFRESH_HISTORY" }).catch(() => {});
  } catch (err) {
    console.error("[Assistente Lovable] Falha ao registrar histórico:", err);
  }
}

async function handleLocalApiAction(msg, sendResponse) {
  try {
    const subAction = msg.subAction || "";
    const version = chrome.runtime.getManifest().version;

    if (subAction === "GET_CONFIG") {
      sendResponse({
        ok: true,
        data: {
          config: {
            branding: {
              app_name: APP_NAME,
              panel_title: APP_NAME,
              support_label: "Ajuda",
              support_url: ""
            },
            ui: { show_support_link: false },
            update: { force_update: false, latest_version: version, min_version: "", download_url: "", message: "", features: "" },
            api: { validate_license_url: "", proxy_command_url: "" }
          }
        }
      });
      return;
    }

    if (subAction === "VALIDATE_LICENSE") {
      sendResponse({
        ok: true,
        data: {
          valid: true,
          session_id: "local",
          user_name: "Olá, seja bem vindo!",
          status: "active",
          expires_at: "",
          activated_at: new Date().toISOString(),
          user_id: "local-user",
          force_update: false
        }
      });
      return;
    }

    if (subAction === "TRANSFER_DEVICE") {
      sendResponse({ ok: true, data: { success: true, message: "Sem vínculo de dispositivo nesta versão local." } });
      return;
    }

    if (subAction === "OPTIMIZE_PROMPT") {
      sendResponse({ ok: false, data: { error: "Otimização externa removida. Use Preparar prompt localmente." } });
      return;
    }

    sendResponse({ ok: false, error: "Ação externa removida nesta versão." });
  } catch (err) {
    sendResponse({ ok: false, error: err.message || String(err) });
  }
}

async function handleDownloadProject(msg, sendResponse) {
  try {
    const projectId = String(msg.projectId || "").trim();
    const token = String(msg.token || "").trim();
    if (!projectId || !token) throw new Error("Projeto/token não sincronizados. Abra o projeto no Lovable e recarregue a página.");

    const resp = await fetch(`https://lovable-api.com/projects/${encodeURIComponent(projectId)}/source-code`, {
      headers: {
        Authorization: "Bearer " + token.replace(/^Bearer\s+/i, ""),
        Accept: "application/json"
      }
    });
    const data = await resp.json().catch(() => ({}));
    sendResponse({ success: resp.ok, files: data.files || [], error: resp.ok ? "" : (data.error || `HTTP ${resp.status}`) });
  } catch (err) {
    sendResponse({ success: false, error: err.message || String(err) });
  }
}
