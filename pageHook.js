(function () {
  if (window.__assistente_lovable_page_hook_v3421) return;
  window.__assistente_lovable_page_hook_v3421 = true;

  const LOG_PREFIX = "[Assistente Lovable]";
  let capturedToken = null;
  let capturedProjectId = null;
  const recentConsoleSignals = [];

  function extractProjectIdFromUrl(url) {
    try {
      const value = String(url || "");
      const match = value.match(/\/projects\/([^/?#]+)/i);
      if (!match) return null;
      const id = decodeURIComponent(match[1] || "").trim();
      if (!id || /^(new|create|templates|settings)$/i.test(id)) return null;
      return id;
    } catch (_) {
      return null;
    }
  }

  function getProjectFromPage() {
    return extractProjectIdFromUrl(window.location.href) || extractProjectIdFromUrl(window.location.pathname);
  }

  function normalizeToken(token) {
    if (typeof token !== "string") return null;
    const value = token.replace(/^Bearer\s+/i, "").trim();
    if (!value || value.length < 20) return null;
    return value;
  }

  function getLatestTokenFromStorage() {
    try {
      const candidates = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const raw = key ? localStorage.getItem(key) : null;
        if (!key || !raw) continue;

        if (key.indexOf("sb-") === 0 && key.indexOf("-auth-token") > 0) {
          try {
            const parsed = JSON.parse(raw);
            const token = normalizeToken(parsed && (parsed.access_token || parsed.currentSession?.access_token));
            if (token) candidates.push(token);
          } catch (_) {}
        }

        if (/access[_-]?token|auth[_-]?token|jwt/i.test(key)) {
          const direct = normalizeToken(raw);
          if (direct) candidates.push(direct);
          try {
            const parsed = JSON.parse(raw);
            const token = normalizeToken(parsed && (parsed.access_token || parsed.token || parsed.jwt));
            if (token) candidates.push(token);
          } catch (_) {}
        }
      }
      return candidates[0] || null;
    } catch (_) {
      return null;
    }
  }

  function postStatus(force) {
    try {
      const projectId = getProjectFromPage() || capturedProjectId;
      const token = capturedToken || getLatestTokenFromStorage();
      let changed = false;
      if (projectId && projectId !== capturedProjectId) {
        capturedProjectId = projectId;
        changed = true;
      }
      if (token && token !== capturedToken) {
        capturedToken = token;
        changed = true;
      }
      if (!force && !changed) return;
      window.postMessage({
        type: "lovableTokenFound",
        token: capturedToken,
        projectId: capturedProjectId,
        sourceHost: window.location.hostname,
        url: window.location.href,
        ts: Date.now()
      }, "*");
    } catch (_) {}
  }

  function captureAuthFromFetchArgs(args) {
    try {
      let reqUrl = typeof args[0] === "string" ? args[0] : ((args[0] && args[0].url) || "");
      let auth = null;
      const opts = args[1] || {};
      if (args[0] instanceof Request) {
        reqUrl = args[0].url || reqUrl;
        auth = args[0].headers && typeof args[0].headers.get === "function"
          ? (args[0].headers.get("Authorization") || args[0].headers.get("authorization"))
          : null;
      }
      if (opts.headers) {
        if (opts.headers instanceof Headers) auth = opts.headers.get("Authorization") || opts.headers.get("authorization");
        else if (typeof opts.headers === "object") auth = opts.headers.Authorization || opts.headers.authorization;
      }
      const token = normalizeToken(auth || "");
      const projectId = extractProjectIdFromUrl(reqUrl);
      if (projectId) capturedProjectId = projectId;
      if (token) capturedToken = token;
      if (token || projectId) postStatus(true);
    } catch (_) {}
  }

  function wrapFetch() {
    try {
      const originalFetch = window.fetch;
      if (!originalFetch || originalFetch.__assistente_lovable_wrapped) return;
      function wrappedFetch() {
        captureAuthFromFetchArgs(arguments);
        return originalFetch.apply(this, arguments);
      }
      wrappedFetch.__assistente_lovable_wrapped = true;
      window.fetch = wrappedFetch;
    } catch (e) {
      console.warn(LOG_PREFIX, "falha ao observar fetch", e);
    }
  }

  function wrapXHR() {
    try {
      const origOpen = XMLHttpRequest.prototype.open;
      const origSetHeader = XMLHttpRequest.prototype.setRequestHeader;
      if (origOpen.__assistente_lovable_wrapped) return;
      XMLHttpRequest.prototype.open = function(method, url) {
        this.__assistente_lovable_url = url;
        const pid = extractProjectIdFromUrl(url);
        if (pid) {
          capturedProjectId = pid;
          postStatus(true);
        }
        return origOpen.apply(this, arguments);
      };
      XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
        if (name && String(name).toLowerCase() === "authorization") {
          const token = normalizeToken(value || "");
          if (token) {
            capturedToken = token;
            const pid = extractProjectIdFromUrl(this.__assistente_lovable_url);
            if (pid) capturedProjectId = pid;
            postStatus(true);
          }
        }
        return origSetHeader.apply(this, arguments);
      };
      XMLHttpRequest.prototype.open.__assistente_lovable_wrapped = true;
    } catch (e) {
      console.warn(LOG_PREFIX, "falha ao observar XHR", e);
    }
  }

  function captureConsoleAndRuntimeErrors() {
    try {
      if (window.__assistente_lovable_console_capture) return;
      window.__assistente_lovable_console_capture = true;
      function safeString(value) {
        try {
          if (value instanceof Error) return (value.stack || value.message || String(value)).slice(0, 1500);
          if (typeof value === "object") return JSON.stringify(value).slice(0, 1500);
          return String(value).slice(0, 1500);
        } catch (_) {
          return String(value).slice(0, 1500);
        }
      }
      function emit(level, args) {
        try {
          const message = Array.from(args || []).map(safeString).join(" ").trim();
          if (!message) return;
          recentConsoleSignals.unshift({ level, message, ts: Date.now(), url: location.href });
          recentConsoleSignals.splice(20);
          window.postMessage({
            type: "lovableConsoleSignal",
            level,
            message,
            recent: recentConsoleSignals.slice(0, 10)
          }, "*");
        } catch (_) {}
      }
      ["error", "warn"].forEach(function(level) {
        const original = console[level];
        console[level] = function() {
          emit(level, arguments);
          return original && original.apply ? original.apply(console, arguments) : undefined;
        };
      });
      window.addEventListener("error", function(e) {
        emit("error", [e.message || "window.error", e.filename || "", e.lineno || "", e.error || ""]);
      });
      window.addEventListener("unhandledrejection", function(e) {
        emit("error", ["unhandledrejection", e.reason || ""]);
      });
      window.postMessage({ type: "lovableConsoleSignalReady" }, "*");
    } catch (_) {}
  }

  window.addEventListener("message", function(event) {
    if (event.source !== window) return;
    if (!event.data || event.data.type !== "lovableRequestToken") return;
    postStatus(true);
  });

  wrapFetch();
  wrapXHR();
  captureConsoleAndRuntimeErrors();
  postStatus(true);
  setInterval(function() { postStatus(false); }, 2000);
  window.addEventListener("popstate", function() { setTimeout(function() { postStatus(true); }, 150); });
  document.addEventListener("visibilitychange", function() { if (!document.hidden) postStatus(true); });
})();
