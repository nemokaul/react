/**
 * React & Modern Web Mastery Tracker Engine
 * - Interactive 3-State Progress Tracking (Not Started -> In Progress -> Completed)
 * - Selection & 3-Tier Sidebar Highlighting Engine (Pulse, Ring, Subtle)
 * - Interactive 3D Flip Flashcards & MCQ Study Engine with Local Decks
 * - Real-Time Dashboard & Section Analytics
 * - Instant Search Modal (Ctrl+K)
 * - Progress Backup & Restore (JSON Export/Import/Reset)
 * - Pop-Up Chapter Summary Notes Modal with Interactive Lesson Status
 * - Deep-Dive "Ask AI" Prompt Generator (Claude, ChatGPT, Gemini, Copilot, Grok, Mistral, Brave)
 * - Fully Mobile Responsive Navigation with Auto-Close & Touch Gestures
 */

(function () {
  "use strict";

  const STORAGE_KEY = "react_mastery_progress_v1";
  const FC_STORAGE_KEY = "react_mastery_flashcards_v1";

  // ---------------------------------------------------------------------------
  // Progress State
  // ---------------------------------------------------------------------------
  let progressState = loadProgress();

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("Failed to load progress from localStorage", e);
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
    } catch (e) {
      console.warn("Failed to save progress to localStorage", e);
    }
  }

  function getVideoStatus(videoKey) {
    return progressState[videoKey] || "not_started";
  }

  function setVideoStatus(videoKey, state) {
    if (state === "not_started") {
      delete progressState[videoKey];
    } else {
      progressState[videoKey] = state;
    }
    saveProgress();
    syncUI();
  }

  function cycleVideoStatus(videoKey) {
    const current = getVideoStatus(videoKey);
    let next = "in_progress";
    if (current === "in_progress") next = "completed";
    else if (current === "completed") next = "not_started";
    setVideoStatus(videoKey, next);
  }

  // ---------------------------------------------------------------------------
  // Time Formatting Helpers
  // ---------------------------------------------------------------------------
  function formatSeconds(totalSec) {
    if (!totalSec || isNaN(totalSec)) return "0m";
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${h}h ${m}m`;
    }
    return `${m}m ${s > 0 ? s + "s" : ""}`.trim();
  }

  function formatMinSec(totalSec) {
    if (!totalSec || isNaN(totalSec) || totalSec <= 0) return "00m00s";
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const mStr = String(m).padStart(2, "0");
    const sStr = String(s).padStart(2, "0");
    return `${mStr}m${sStr}s`;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---------------------------------------------------------------------------
  // Calculations
  // ---------------------------------------------------------------------------
  function getStats() {
    if (!window.COURSE_DATA || !window.COURSE_DATA.sections) {
      return { total: 0, completed: 0, inProgress: 0, totalSec: 0, completedSec: 0, inProgressSec: 0, pct: 0 };
    }

    let total = 0;
    let completed = 0;
    let inProgress = 0;
    let totalSec = 0;
    let completedSec = 0;
    let inProgressSec = 0;

    for (const sec of window.COURSE_DATA.sections) {
      for (const ch of sec.chapters) {
        for (const v of ch.videos) {
          total++;
          totalSec += v.duration_seconds || v.durationSeconds || 0;
          const status = getVideoStatus(v.id);
          if (status === "completed") {
            completed++;
            completedSec += v.duration_seconds || v.durationSeconds || 0;
          } else if (status === "in_progress") {
            inProgress++;
            inProgressSec += v.duration_seconds || v.durationSeconds || 0;
          }
        }
      }
    }

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, totalSec, completedSec, inProgressSec, pct };
  }

  function getSectionStats(sectionId) {
    if (!window.COURSE_DATA || !window.COURSE_DATA.sections) return null;
    const sec = window.COURSE_DATA.sections.find(s => s.id === sectionId);
    if (!sec) return null;

    let total = 0;
    let completed = 0;
    let inProgress = 0;
    let totalSec = 0;
    let completedSec = 0;
    let inProgressSec = 0;

    for (const ch of sec.chapters) {
      for (const v of ch.videos) {
        total++;
        const d = v.duration_seconds || v.durationSeconds || 0;
        totalSec += d;
        const status = getVideoStatus(v.id);
        if (status === "completed") {
          completed++;
          completedSec += d;
        } else if (status === "in_progress") {
          inProgress++;
          inProgressSec += d;
        }
      }
    }

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, totalSec, completedSec, inProgressSec, pct };
  }

  function getChapterStats(chapterId) {
    if (!window.COURSE_DATA || !window.COURSE_DATA.sections) return null;
    for (const sec of window.COURSE_DATA.sections) {
      const ch = sec.chapters.find(c => c.id === chapterId);
      if (ch) {
        let total = 0;
        let completed = 0;
        let inProgress = 0;
        let totalSec = 0;
        let completedSec = 0;
        let inProgressSec = 0;

        for (const v of ch.videos) {
          total++;
          const d = v.duration_seconds || v.durationSeconds || 0;
          totalSec += d;
          const status = getVideoStatus(v.id);
          if (status === "completed") {
            completed++;
            completedSec += d;
          } else if (status === "in_progress") {
            inProgress++;
            inProgressSec += d;
          }
        }

        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, inProgress, totalSec, completedSec, inProgressSec, pct };
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Sidebar Selection & 3-Tier Highlighting Engine
  // ---------------------------------------------------------------------------
  let currentHighlightedEl = null;
  let dismissHighlightListener = null;

  function clearSidebarHighlight() {
    if (dismissHighlightListener) {
      document.removeEventListener("pointerdown", dismissHighlightListener, true);
      document.removeEventListener("keydown", dismissHighlightListener, true);
      dismissHighlightListener = null;
    }
    document.querySelectorAll(".sidebar-highlight-active, .sidebar-highlight-ring, .sidebar-highlight-subtle, .glow-highlight").forEach(el => {
      el.classList.remove("sidebar-highlight-active", "sidebar-highlight-ring", "sidebar-highlight-subtle", "glow-highlight");
    });
    currentHighlightedEl = null;
  }

  function applySidebarHighlight(targetEl) {
    if (!targetEl) return;

    clearSidebarHighlight();
    currentHighlightedEl = targetEl;

    // Force DOM reflow to restart animation
    void targetEl.offsetWidth;

    // 1. Begin blink pulse and glowing ring
    targetEl.classList.add("sidebar-highlight-active", "sidebar-highlight-ring");

    // Remove active blink pulse after 1350ms, keep glowing ring
    const blinkTimer = setTimeout(() => {
      targetEl.classList.remove("sidebar-highlight-active");
    }, 1350);

    // 2. Attach user interaction listener to transition to subtle persistent highlight
    setTimeout(() => {
      if (currentHighlightedEl !== targetEl) return;

      dismissHighlightListener = (e) => {
        // Clicks inside sidebar shouldn't dismiss the ring on the page
        if (e.target && e.target.closest("#course-sidebar")) {
          return;
        }

        clearTimeout(blinkTimer);
        targetEl.classList.remove("sidebar-highlight-active", "sidebar-highlight-ring");
        targetEl.classList.add("sidebar-highlight-subtle");

        document.removeEventListener("pointerdown", dismissHighlightListener, true);
        document.removeEventListener("keydown", dismissHighlightListener, true);
        dismissHighlightListener = null;
      };

      document.addEventListener("pointerdown", dismissHighlightListener, true);
      document.addEventListener("keydown", dismissHighlightListener, true);
    }, 350);
  }

  function handleSidebarNavigation(targetId) {
    if (!targetId) return;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    // 1. Expand all parent <details>
    let parent = targetEl.parentElement;
    while (parent) {
      if (parent.tagName === "DETAILS" && !parent.open) {
        parent.open = true;
      }
      parent = parent.parentElement;
    }

    // 2. Smoothly scroll into center
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });

    // 3. Apply blink, ring, and persistent highlight
    applySidebarHighlight(targetEl);

    // 4. Update active states in sidebar
    if (targetId.startsWith("flashcards-")) {
      const cleanFcId = targetId.replace("flashcards-", "");
      updateActiveSidebarFlashcard(cleanFcId);
    } else {
      const cleanId = targetId.startsWith("video-") ? targetId.replace("video-", "") : targetId;
      updateActiveSidebarItem(cleanId);
    }

    // 5. Auto-close mobile sidebar
    if (window.innerWidth < 1024) {
      const sidebar = document.getElementById("course-sidebar");
      const backdrop = document.getElementById("sidebar-backdrop");
      if (sidebar) sidebar.classList.add("-translate-x-full");
      if (backdrop) backdrop.classList.add("hidden");
    }
  }

  function updateActiveSidebarFlashcard(deckId) {
    if (!deckId) return;
    document.querySelectorAll(".sidebar-video-link").forEach(link => {
      link.classList.remove("active-sidebar-item");
    });
    document.querySelectorAll(".sidebar-flashcard-link").forEach(link => {
      link.classList.remove("active-sidebar-item");
    });
    document.querySelectorAll(".chapter-summary").forEach(sum => {
      sum.classList.remove("active-chapter-header");
    });

    const activeFc = document.querySelector(`.sidebar-flashcard-link[data-sidebar-fc-deck="${deckId}"]`);
    if (activeFc) {
      activeFc.classList.add("active-sidebar-item");

      const parentChap = activeFc.closest(".chapter-details");
      if (parentChap) {
        if (!parentChap.open) parentChap.open = true;
        const sum = parentChap.querySelector(".chapter-summary");
        if (sum) sum.classList.add("active-chapter-header");
      }

      const parentSec = activeFc.closest("aside#course-sidebar details");
      if (parentSec && !parentSec.open) parentSec.open = true;

      const sidebarNav = document.getElementById("sidebar-nav-container");
      if (sidebarNav) {
        const linkRect = activeFc.getBoundingClientRect();
        const navRect = sidebarNav.getBoundingClientRect();
        if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
          activeFc.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }
  }

  function updateActiveSidebarItem(cleanVideoId) {
    if (!cleanVideoId) return;

    document.querySelectorAll(".sidebar-video-link").forEach(link => {
      link.classList.remove("active-sidebar-item");
    });
    document.querySelectorAll(".sidebar-flashcard-link").forEach(link => {
      link.classList.remove("active-sidebar-item");
    });
    document.querySelectorAll(".chapter-summary").forEach(sum => {
      sum.classList.remove("active-chapter-header");
    });

    const activeLink = document.querySelector(`.sidebar-video-link[data-sidebar-video-id="${cleanVideoId}"]`);
    if (activeLink) {
      activeLink.classList.add("active-sidebar-item");

      const parentChap = activeLink.closest(".chapter-details");
      if (parentChap) {
        if (!parentChap.open) parentChap.open = true;
        const sum = parentChap.querySelector(".chapter-summary");
        if (sum) sum.classList.add("active-chapter-header");
      }

      const parentSec = activeLink.closest("aside#course-sidebar details");
      if (parentSec && !parentSec.open) parentSec.open = true;

      const sidebarNav = document.getElementById("sidebar-nav-container");
      if (sidebarNav) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = sidebarNav.getBoundingClientRect();
        if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
          activeLink.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Sync UI (DOM Updates)
  // ---------------------------------------------------------------------------
  function syncUI() {
    const stats = getStats();

    // 1. Global Header Widget
    const globalCountEl = document.getElementById("global-video-count");
    if (globalCountEl && window.COURSE_DATA) {
      globalCountEl.textContent = `${stats.completed}/${stats.total}`;
    }
    const globalTimeEl = document.getElementById("global-time-count");
    if (globalTimeEl && window.COURSE_DATA) {
      const totalDur = formatSeconds(stats.totalSec);
      const compDur = formatSeconds(stats.completedSec);
      globalTimeEl.textContent = `${compDur} / ${totalDur}`;
    }
    const globalInProgEl = document.getElementById("global-inprogress-time");
    if (globalInProgEl) {
      if (stats.inProgressSec > 0) {
        globalInProgEl.textContent = `${formatSeconds(stats.inProgressSec)} in progress`;
        globalInProgEl.classList.remove("hidden");
      } else {
        globalInProgEl.classList.add("hidden");
      }
    }

    // 2. Sidebar Progress Card
    const sbPct = document.querySelector("[data-sidebar-progress-pct]");
    if (sbPct) sbPct.textContent = `${stats.pct}%`;
    const sbBar = document.querySelector("[data-sidebar-progress-bar]");
    if (sbBar) sbBar.style.width = `${stats.pct}%`;
    const sbCount = document.querySelector("[data-sidebar-video-count]");
    if (sbCount) sbCount.textContent = `${stats.completed}/${stats.total} videos`;
    const sbTime = document.querySelector("[data-sidebar-time-count]");
    if (sbTime) sbTime.textContent = `${formatSeconds(stats.completedSec)} / ${formatSeconds(stats.totalSec)}`;
    const sbInProgCont = document.querySelector("[data-sidebar-inprogress-container]");
    const sbInProgTime = document.querySelector("[data-sidebar-inprogress-time]");
    if (sbInProgCont && sbInProgTime) {
      if (stats.inProgressSec > 0) {
        sbInProgTime.textContent = formatSeconds(stats.inProgressSec);
        sbInProgCont.classList.remove("hidden");
      } else {
        sbInProgCont.classList.add("hidden");
      }
    }

    // 3. Section Stats in Sidebar & Headers
    if (window.COURSE_DATA && window.COURSE_DATA.sections) {
      for (const sec of window.COURSE_DATA.sections) {
        const secStats = getSectionStats(sec.id);
        if (!secStats) continue;

        // Sidebar count pill
        document.querySelectorAll(`[data-section-stats-id="${sec.id}"][data-stats-mode="count"]`).forEach(el => {
          el.textContent = `${secStats.completed}/${secStats.total}`;
        });

        // Section header elements (on section page)
        const secPctEl = document.querySelector(`[data-section-pct-id="${sec.id}"]`);
        if (secPctEl) secPctEl.textContent = `${secStats.pct}%`;
        const secPctDisp = document.querySelector(`[data-section-pct-display-id="${sec.id}"]`);
        if (secPctDisp) secPctDisp.textContent = `(${secStats.pct}%)`;
        const secBar = document.querySelector(`[data-section-progress-bar="${sec.id}"]`);
        if (secBar) secBar.style.width = `${secStats.pct}%`;
        const secTimeEl = document.querySelector(`[data-section-time-id="${sec.id}"]`);
        if (secTimeEl) secTimeEl.textContent = `${formatMinSec(secStats.completedSec)} / ${formatMinSec(secStats.totalSec)}`;
        const secSummaryTime = document.querySelector(`[data-section-time-summary-id="${sec.id}"]`);
        if (secSummaryTime) secSummaryTime.textContent = `${formatMinSec(secStats.completedSec)} / ${formatMinSec(secStats.totalSec)}`;

        const secInProgCont = document.querySelector(`[data-section-inprogress-container]`);
        const secInProgEl = document.querySelector(`[data-section-inprogress-id="${sec.id}"]`);
        if (secInProgCont && secInProgEl) {
          if (secStats.inProgressSec > 0) {
            secInProgEl.textContent = formatMinSec(secStats.inProgressSec);
            secInProgCont.classList.remove("hidden");
            secInProgCont.classList.add("flex");
          } else {
            secInProgCont.classList.add("hidden");
            secInProgCont.classList.remove("flex");
          }
        }

        // Chapter time indicators
        for (const ch of sec.chapters) {
          const chStats = getChapterStats(ch.id);
          if (!chStats) continue;
          document.querySelectorAll(`[data-chapter-time-id="${ch.id}"]`).forEach(el => {
            el.textContent = `${formatMinSec(chStats.completedSec)} / ${formatMinSec(chStats.totalSec)}`;
          });
        }
      }
    }

    // 4. Update Checkboxes & Video Cards
    document.querySelectorAll(".ll-checkbox[data-video-key]").forEach(cb => {
      const key = cb.getAttribute("data-video-key");
      const status = getVideoStatus(key);
      cb.setAttribute("data-state", status);

      const card = cb.closest(".video-card");
      if (card) {
        card.setAttribute("data-card-state", status);
      }
    });

    // 5. Sync flashcard badges
    syncFlashcardBadges();
  }

  // ---------------------------------------------------------------------------
  // INTERACTIVE FLASHCARD STUDY ENGINE
  // ---------------------------------------------------------------------------
  let fcState = loadFcState();

  function loadFcState() {
    try {
      const raw = localStorage.getItem(FC_STORAGE_KEY);
      return raw ? JSON.parse(raw) : { version: 1, decks: {} };
    } catch (e) {
      console.warn("Could not load flashcard state", e);
      return { version: 1, decks: {} };
    }
  }

  function saveFcState() {
    try {
      localStorage.setItem(FC_STORAGE_KEY, JSON.stringify(fcState));
    } catch (e) {
      console.warn("Could not save flashcard state", e);
    }
  }

  const deckCache = {};
  let currentDeck = null;
  let currentCardIndex = 0;
  let isCardFlipped = false;
  let isOptionLocked = false;
  let activeAttemptedOpts = new Set();

  function getDeckUrl(deckId) {
    let base = "";
    const meta = document.querySelector('meta[name="base-url"]');
    if (meta) {
      base = meta.getAttribute("content") || "";
    }
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      base = window.location.pathname.startsWith("/react") ? "/react/" : "/";
    }
    if (!base.endsWith("/")) base += "/";
    return `${base}data/flashcards/${deckId}.json`;
  }

  function getDeckMasteryStats(deckId, totalCards) {
    const deckRecord = fcState.decks[deckId];
    if (!deckRecord || !deckRecord.cards) {
      return { mastered: 0, total: totalCards || 4, pct: 0 };
    }
    let masteredCount = 0;
    Object.values(deckRecord.cards).forEach(c => {
      if (c && c.status === "mastered") masteredCount++;
    });
    const total = totalCards || Object.keys(deckRecord.cards).length || 4;
    const pct = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
    return { mastered: masteredCount, total, pct };
  }

  function syncFlashcardBadges() {
    document.querySelectorAll("[data-deck-badge]").forEach(el => {
      const deckId = el.getAttribute("data-deck-badge");
      const configuredTotal = parseInt(el.getAttribute("data-deck-total") || "4", 10);
      const stats = getDeckMasteryStats(deckId, configuredTotal);
      if (el.classList.contains("fc-badge-pill")) {
        el.textContent = `${stats.mastered}/${stats.total}`;
      } else {
        el.textContent = `${stats.mastered}/${stats.total} Mastered`;
      }
    });
  }

  function openFlashcards(deckId) {
    if (!deckId) return;

    if (deckCache[deckId]) {
      startDeckSession(deckCache[deckId]);
      return;
    }

    const url = getDeckUrl(deckId);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        deckCache[deckId] = data;
        startDeckSession(data);
      })
      .catch(err => {
        console.error("Failed to load flashcard deck:", deckId, err);
        // Fallback synthetic deck if file not found
        const fallbackDeck = {
          deckId: deckId,
          title: `Flashcards: ${deckId}`,
          cards: [
            {
              id: `${deckId}-01`,
              question: "What is the primary architectural benefit of React's declarative component model?",
              category: "Core React Architecture",
              options: [
                { id: "A", text: "Components describe what UI should look like for a given state; React handles reconciliation and minimal DOM mutations.", correct: true },
                { id: "B", text: "Directly mutate document body and bypass Virtual DOM reconciliation for higher throughput.", correct: false },
                { id: "C", text: "Forces all state variables to reside in global window scope as window.state.", correct: false },
                { id: "D", text: "Triggers full-page document reload on every button click event.", correct: false }
              ],
              explanation: "React components are pure projections of state and props. React Fiber schedules render reconciliation and applies only minimal batched mutations to host DOM nodes.",
              codeSnippet: "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;\n}",
              pitfall: "Never mutate state variables or DOM elements directly during render phase.",
              citation: "React 19 Official Documentation / react.dev"
            }
          ]
        };
        startDeckSession(fallbackDeck);
      });
  }

  function startDeckSession(deck) {
    currentDeck = deck;
    currentCardIndex = 0;
    isCardFlipped = false;
    isOptionLocked = false;
    activeAttemptedOpts.clear();

    const modal = document.getElementById("flashcard-modal");
    if (!modal) return;

    const titleEl = document.getElementById("fc-modal-title");
    if (titleEl) titleEl.textContent = deck.title || "Flashcard Study Deck";

    // Set first unmastered card index if available
    const deckRecord = fcState.decks[deck.deckId];
    if (deckRecord && deckRecord.cards && deck.cards) {
      const firstUnsolved = deck.cards.findIndex(c => !deckRecord.cards[c.id] || deckRecord.cards[c.id].status !== "mastered");
      if (firstUnsolved !== -1) currentCardIndex = firstUnsolved;
    }

    renderCurrentCard();

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeFlashcards() {
    const modal = document.getElementById("flashcard-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    syncFlashcardBadges();
  }

  function renderCurrentCard() {
    if (!currentDeck || !currentDeck.cards || currentDeck.cards.length === 0) return;
    const card = currentDeck.cards[currentCardIndex];
    if (!card) return;

    isCardFlipped = false;
    isOptionLocked = false;
    activeAttemptedOpts.clear();

    // Reset 3D flip card
    const inner = document.getElementById("fc-card-inner");
    if (inner) inner.classList.remove("is-flipped");

    // Counters & Header
    const counterEl = document.getElementById("fc-deck-counter");
    if (counterEl) counterEl.textContent = `Card ${currentCardIndex + 1} of ${currentDeck.cards.length}`;
    const navInd = document.getElementById("fc-nav-card-indicator");
    if (navInd) navInd.textContent = `${currentCardIndex + 1} / ${currentDeck.cards.length}`;

    const badgeEl = document.getElementById("fc-card-badge");
    if (badgeEl) badgeEl.textContent = card.category || "React Architecture";

    const questionEl = document.getElementById("fc-question-text");
    if (questionEl) questionEl.textContent = card.question;

    // Check saved state for this card
    const deckRecord = fcState.decks[currentDeck.deckId];
    const cardRecord = deckRecord && deckRecord.cards ? deckRecord.cards[card.id] : null;

    const statusEl = document.getElementById("fc-card-status");
    if (statusEl) {
      if (cardRecord && cardRecord.status === "mastered") {
        statusEl.textContent = "✅ Mastered";
        statusEl.className = "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800";
      } else if (cardRecord && cardRecord.status === "needs_review") {
        statusEl.textContent = "⚠️ Needs Review";
        statusEl.className = "text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800";
      } else {
        statusEl.textContent = "Not Answered";
        statusEl.className = "text-[10px] font-mono px-2 py-0.5 rounded border border-[#d0d7de] dark:border-[#30363d] text-[#656d76] dark:text-[#8b949e]";
      }
    }

    // Attempt Feedback Banner
    const attemptBanner = document.getElementById("fc-attempt-banner");
    if (attemptBanner) attemptBanner.classList.add("hidden");

    // Render MCQ Options
    const optContainer = document.getElementById("fc-options-container");
    if (optContainer) {
      optContainer.innerHTML = (card.options || []).map((opt, i) => `
        <button type="button" class="mcq-option-btn w-full flex items-start gap-3 p-3 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#161b22] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-left transition-all cursor-pointer shadow-2xs group" data-opt-id="${opt.id}">
          <span class="mcq-opt-key font-mono font-bold text-xs px-2 py-1 rounded bg-[#f6f8fa] dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] text-[#656d76] dark:text-[#8b949e] shrink-0 group-hover:border-[#0969da] dark:group-hover:border-[#58a6ff]">
            ${opt.id}
          </span>
          <span class="mcq-opt-text text-xs text-[#1f2328] dark:text-[#f0f6fc] leading-relaxed flex-1">
            ${escapeHtml(opt.text)}
          </span>
        </button>
      `).join("");
    }

    // Back Face Data
    const correctOpt = (card.options || []).find(o => o.correct) || (card.options ? card.options[0] : null);
    const correctTextEl = document.getElementById("fc-correct-answer-text");
    if (correctTextEl) correctTextEl.textContent = correctOpt ? `${correctOpt.id}: ${correctOpt.text}` : "";

    const expTextEl = document.getElementById("fc-explanation-text");
    if (expTextEl) expTextEl.textContent = card.explanation || "No explanation provided.";

    const codeSnippetEl = document.getElementById("fc-code-snippet");
    const codeContainer = document.getElementById("fc-code-container");
    if (card.codeSnippet) {
      if (codeSnippetEl) codeSnippetEl.textContent = card.codeSnippet;
      if (codeContainer) codeContainer.classList.remove("hidden");
    } else if (codeContainer) {
      codeContainer.classList.add("hidden");
    }

    const pitfallTextEl = document.getElementById("fc-pitfall-text");
    const pitfallContainer = document.getElementById("fc-pitfall-container");
    if (card.pitfall) {
      if (pitfallTextEl) pitfallTextEl.textContent = card.pitfall;
      if (pitfallContainer) pitfallContainer.classList.remove("hidden");
    } else if (pitfallContainer) {
      pitfallContainer.classList.add("hidden");
    }

    const citationLinkEl = document.getElementById("fc-citation-link");
    const citationTextEl = document.getElementById("fc-citation-text");
    if (card.citation) {
      if (citationTextEl) citationTextEl.textContent = card.citation;
      if (citationLinkEl) {
        citationLinkEl.href = `https://www.google.com/search?q=${encodeURIComponent("site:react.dev OR site:vite.dev " + card.citation)}`;
      }
    }

    // Attach Ask AI Context to Dock Buttons
    document.querySelectorAll("#fc-card-inner [data-ask-ai-provider]").forEach(btn => {
      btn.setAttribute("data-context-type", "flashcard");
      btn.setAttribute("data-card-id", card.id);
    });

    // Mastery Stats & Progress Bar
    const stats = getDeckMasteryStats(currentDeck.deckId, currentDeck.cards.length);
    const statEl = document.getElementById("fc-mastery-stat");
    if (statEl) statEl.textContent = `${stats.mastered} Mastered (${stats.pct}%)`;
    const barEl = document.getElementById("fc-progress-bar");
    if (barEl) barEl.style.width = `${stats.pct}%`;

    // Navigation Buttons States
    const prevBtn = document.getElementById("fc-btn-prev");
    if (prevBtn) prevBtn.disabled = currentCardIndex === 0;
    const nextBtn = document.getElementById("fc-btn-next");
    if (nextBtn) nextBtn.disabled = currentCardIndex === currentDeck.cards.length - 1;
  }

  function handleOptionSelect(optId) {
    if (isOptionLocked || !currentDeck || !currentDeck.cards) return;
    const card = currentDeck.cards[currentCardIndex];
    if (!card) return;

    activeAttemptedOpts.add(optId);
    const chosen = (card.options || []).find(o => o.id === optId);
    const isCorrect = chosen ? !!chosen.correct : false;

    const optBtn = document.querySelector(`#fc-options-container .mcq-option-btn[data-opt-id="${optId}"]`);
    const attemptBanner = document.getElementById("fc-attempt-banner");

    if (!isCorrect) {
      if (optBtn) {
        optBtn.classList.add("border-rose-500", "bg-rose-50/50", "dark:bg-rose-950/20");
        optBtn.disabled = true;
      }
      if (attemptBanner) {
        attemptBanner.className = "p-2.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-300";
        attemptBanner.innerHTML = "<span>⚠️ Incorrect. Think carefully and try again, or reveal the breakdown.</span>";
        attemptBanner.classList.remove("hidden");
      }

      // Record Needs Review
      if (!fcState.decks[currentDeck.deckId]) fcState.decks[currentDeck.deckId] = { cards: {} };
      fcState.decks[currentDeck.deckId].cards[card.id] = {
        status: "needs_review",
        selectedOpt: optId,
        isCorrect: false,
        updatedAt: Date.now()
      };
      saveFcState();

      // Auto-flip after 750ms
      setTimeout(() => {
        flipCard(true);
      }, 750);
    } else {
      isOptionLocked = true;
      if (optBtn) {
        optBtn.classList.add("border-emerald-500", "bg-emerald-50/50", "dark:bg-emerald-950/20");
      }
      if (attemptBanner) {
        attemptBanner.className = "p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-xs text-emerald-800 dark:text-emerald-300";
        attemptBanner.innerHTML = "<span>🎉 Correct on this attempt! Excellent recall.</span>";
        attemptBanner.classList.remove("hidden");
      }

      // Record Mastered
      if (!fcState.decks[currentDeck.deckId]) fcState.decks[currentDeck.deckId] = { cards: {} };
      fcState.decks[currentDeck.deckId].cards[card.id] = {
        status: "mastered",
        selectedOpt: optId,
        isCorrect: true,
        updatedAt: Date.now()
      };
      saveFcState();

      // Auto-flip after 600ms
      setTimeout(() => {
        flipCard(true);
      }, 600);
    }
  }

  function flipCard(forceState) {
    isCardFlipped = typeof forceState === "boolean" ? forceState : !isCardFlipped;
    const inner = document.getElementById("fc-card-inner");
    if (inner) {
      if (isCardFlipped) inner.classList.add("is-flipped");
      else inner.classList.remove("is-flipped");
    }
  }

  function rateCard(rating) {
    if (!currentDeck || !currentDeck.cards) return;
    const card = currentDeck.cards[currentCardIndex];
    if (!card) return;

    if (!fcState.decks[currentDeck.deckId]) fcState.decks[currentDeck.deckId] = { cards: {} };
    fcState.decks[currentDeck.deckId].cards[card.id] = {
      status: rating,
      updatedAt: Date.now()
    };
    saveFcState();

    // Advance to next card if available
    if (currentCardIndex < currentDeck.cards.length - 1) {
      currentCardIndex++;
      renderCurrentCard();
    } else {
      renderCurrentCard();
    }
  }

  function resetDeck(deckId) {
    if (!deckId) return;
    if (fcState.decks[deckId]) {
      delete fcState.decks[deckId];
      saveFcState();
    }
    currentCardIndex = 0;
    renderCurrentCard();
    syncFlashcardBadges();
  }

  function shuffleDeck() {
    if (!currentDeck || !currentDeck.cards || currentDeck.cards.length <= 1) return;
    for (let i = currentDeck.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentDeck.cards[i], currentDeck.cards[j]] = [currentDeck.cards[j], currentDeck.cards[i]];
    }
    currentCardIndex = 0;
    renderCurrentCard();
  }

  function initFlashcardSystem() {
    syncFlashcardBadges();

    // Gesture swipe on stage for mobile
    const stage = document.querySelector(".fc-stage");
    if (stage) {
      let touchStartX = 0;
      let touchStartY = 0;
      stage.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      stage.addEventListener("touchend", (e) => {
        if (e.changedTouches && e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
            if (deltaX < 0) {
              if (currentDeck && currentCardIndex < currentDeck.cards.length - 1) {
                currentCardIndex++;
                renderCurrentCard();
              }
            } else {
              if (currentCardIndex > 0) {
                currentCardIndex--;
                renderCurrentCard();
              }
            }
          }
        }
      }, { passive: true });
    }
  }

  // ---------------------------------------------------------------------------
  // Pop-Up Chapter Summary Notes Modal
  // ---------------------------------------------------------------------------
  let currentActiveChapter = null;

  function findChapter(chapterId) {
    if (!window.COURSE_DATA || !window.COURSE_DATA.sections) return null;
    for (const sec of window.COURSE_DATA.sections) {
      const ch = sec.chapters.find(c => c.id === chapterId);
      if (ch) return { section: sec, chapter: ch };
    }
    return null;
  }

  function openChapterSummary(chapterId) {
    const data = findChapter(chapterId);
    if (!data) return;

    const { section, chapter } = data;
    currentActiveChapter = { section, chapter };

    const modal = document.getElementById("chapter-summary-modal");
    if (!modal) return;

    // Header info
    const badge = document.getElementById("summary-modal-badge");
    if (badge) badge.textContent = `§${chapter.id}`;

    const secTitle = document.getElementById("summary-modal-section");
    if (secTitle) secTitle.textContent = `${section.title} (${section.partTitle})`;

    const titleEl = document.getElementById("summary-modal-title");
    if (titleEl) titleEl.textContent = chapter.title;

    // Attach chapter ID to Ask AI buttons
    modal.querySelectorAll("[data-ask-ai-provider]").forEach(btn => {
      btn.setAttribute("data-context-type", "chapter-summary");
      btn.setAttribute("data-chapter-id", chapter.id);
    });

    // Populate Body
    const body = document.getElementById("summary-modal-body");
    if (body) {
      const notes = chapter.summary_notes || {};
      const keyConceptsHtml = (chapter.key_concepts || []).map(k => `
        <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f6f8fa] dark:bg-[#0d1117] text-[#656d76] dark:text-[#8b949e] border border-[#d0d7de] dark:border-[#30363d]">
          ${escapeHtml(k)}
        </span>
      `).join("");

      const videoListHtml = (chapter.videos || []).map((v, i) => {
        const st = getVideoStatus(v.id);
        const stBadge = st === "completed" 
          ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">Completed ✓</span>`
          : st === "in_progress"
          ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">In Progress •</span>`
          : `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shrink-0">Not Started</span>`;

        return `
          <div class="p-3 rounded-lg border border-[#d0d7de]/60 dark:border-[#30363d]/60 bg-white dark:bg-[#161b22] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div class="flex items-center gap-2 min-w-0">
              <span class="font-mono text-xs text-[#0969da] dark:text-[#58a6ff] shrink-0">Lesson ${i + 1}:</span>
              <a href="${escapeHtml(v.url)}" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#1f2328] dark:text-[#f0f6fc] hover:text-[#0969da] dark:hover:text-[#58a6ff] truncate hover:underline leading-snug">
                ${escapeHtml(v.title)}
              </a>
              <span class="text-[10px] font-mono text-[#656d76] dark:text-[#8b949e] shrink-0">(${escapeHtml(v.duration_text || v.durationText || '')})</span>
            </div>
            <div class="shrink-0 flex items-center gap-2 self-end sm:self-auto">
              ${stBadge}
              <a href="${escapeHtml(v.url)}" target="_blank" rel="noopener noreferrer" class="p-1 rounded text-[#0969da] dark:text-[#58a6ff] hover:bg-[#0969da]/10 inline-flex items-center gap-1 font-semibold text-[11px]" title="Watch Lesson on LinkedIn Learning">
                <span>Watch</span>
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        `;
      }).join("");

      body.innerHTML = `
        <!-- Key Concepts -->
        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#656d76] dark:text-[#8b949e] mb-2 flex items-center gap-1.5">
            <span>🏷️</span>
            <span>Core Architectural Concepts</span>
          </div>
          <div class="flex flex-wrap items-center gap-1.5">
            ${keyConceptsHtml}
          </div>
        </div>

        <!-- 1. Architectural Definition -->
        <div class="p-3.5 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa]/60 dark:bg-[#0d1117]/60 space-y-1.5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#0969da] dark:text-[#58a6ff] flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Core Architectural Definition</span>
          </div>
          <p class="text-xs text-[#1f2328] dark:text-[#f0f6fc] leading-relaxed">
            ${escapeHtml(notes.definition || "Comprehensive modern React component architecture and state management.")}
          </p>
        </div>

        <!-- 2. Mental Model -->
        <div class="p-3.5 rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-white dark:bg-[#161b22] space-y-1.5 shadow-2xs">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#1f2328] dark:text-[#f0f6fc] flex items-center gap-1.5">
            <span class="text-sm">🧠</span>
            <span>Under-The-Hood Mental Model</span>
          </div>
          <p class="text-xs text-[#656d76] dark:text-[#8b949e] leading-relaxed">
            ${escapeHtml(notes.mental_model || "Components describe state transformations; React Fiber schedules declarative reconciliations against host nodes.")}
          </p>
        </div>

        <!-- 3. Key Code / CLI Implementation -->
        ${notes.code_example ? `
          <div class="space-y-1.5">
            <div class="text-[11px] font-bold uppercase tracking-wider text-[#238636] dark:text-[#3fb950] flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              <span>Production TypeScript Implementation</span>
            </div>
            <pre class="p-3 rounded-lg border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#0d1117] font-mono text-xs overflow-x-auto text-[#1f2328] dark:text-[#f0f6fc]"><code>${escapeHtml(notes.code_example)}</code></pre>
          </div>
        ` : ""}

        <!-- 4. Common Gotchas & Pitfalls -->
        <div class="p-3.5 rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/20 space-y-1.5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#9a6700] dark:text-[#e3b341] flex items-center gap-1.5">
            <span>⚠️</span>
            <span>Common Pitfall & Production Gotchas</span>
          </div>
          <p class="text-xs text-[#1f2328] dark:text-[#f0f6fc] leading-relaxed">
            ${escapeHtml(notes.pitfalls || "Direct DOM mutation or impure side effects during render cause hydration mismatches, duplicate executions in Strict Mode, and stale closures.")}
          </p>
        </div>

        <!-- 5. Associated LinkedIn Video Lessons -->
        <div class="space-y-2 pt-2 border-t border-[#d0d7de]/50 dark:border-[#30363d]/50">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#656d76] dark:text-[#8b949e] flex items-center gap-1.5">
            <span>📺</span>
            <span>LinkedIn Learning Lessons (${(chapter.videos || []).length})</span>
          </div>
          <div class="space-y-2">
            ${videoListHtml}
          </div>
        </div>
      `;
    }

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeChapterSummary() {
    const modal = document.getElementById("chapter-summary-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  // ---------------------------------------------------------------------------
  // Ask AI Assistant URL Generator & Handler
  // ---------------------------------------------------------------------------
  const AI_PROVIDERS = {
    claude: { name: "Anthropic Claude", url: "https://claude.ai/new?q=%s" },
    chatgpt: { name: "OpenAI ChatGPT", url: "https://chatgpt.com/?q=%s" },
    mistral: { name: "Mistral Le Chat", url: "https://chat.mistral.ai/chat?q=%s" },
    gemini: { name: "Google Gemini", url: "https://www.google.com/search?udm=50&q=%s" },
    copilot: { name: "Bing Copilot", url: "https://www.bing.com/copilotsearch?q=%s" },
    grok: { name: "xAI Grok", url: "https://grok.com/?q=%s" },
    brave: { name: "Brave Search", url: "https://search.brave.com/ask?q=%s" }
  };

  function handleAskAIClick(btn) {
    const providerKey = btn.getAttribute("data-ask-ai-provider");
    const provider = AI_PROVIDERS[providerKey];
    if (!provider) return;

    let prompt = "";
    const isFlashcard = btn.closest("#flashcard-modal") !== null || btn.getAttribute("data-context-type") === "flashcard";

    if (isFlashcard) {
      if (!currentDeck || !currentDeck.cards || !currentDeck.cards[currentCardIndex]) return;
      const card = currentDeck.cards[currentCardIndex];
      const correctOpt = card.options ? card.options.find(o => o.correct) : null;
      prompt = `I am practicing React 19 multiple-choice flashcards from the course:
Deck: ${currentDeck.title || 'React & Modern Web Mastery'}

Question:
${card.question}

Correct Answer:
${correctOpt ? `Option ${correctOpt.id}: ${correctOpt.text}` : 'See explanation'}

Concept Breakdown & Rationale:
${card.explanation || ''}
${card.codeSnippet ? `\nCode Snippet:\n${card.codeSnippet}\n` : ''}${card.pitfall ? `\nCommon Pitfall:\n${card.pitfall}\n` : ''}
Authoritative Source:
${card.citation || 'React 19 Official Documentation (react.dev)'}

Please provide an in-depth explanation of this concept, why this option is correct, how it works under the hood in React Fiber / Compiler, and practical TypeScript enterprise best practices.`;
    } else {
      // Chapter summary or video lesson context
      let chapData = currentActiveChapter;
      const chapIdFromBtn = btn.getAttribute("data-chapter-id");
      if (chapIdFromBtn && (!chapData || chapData.chapter.id !== chapIdFromBtn)) {
        chapData = findChapter(chapIdFromBtn);
      }

      if (chapData) {
        const { section, chapter } = chapData;
        const notes = chapter.summary_notes || {};
        prompt = `I am studying modern React 19 and Web Development architecture:
Section: ${section.title} (${section.partTitle})
Chapter §${chapter.id}: ${chapter.title}

Core Definition:
${notes.definition || ''}

Under-the-Hood Mental Model:
${notes.mental_model || ''}

TypeScript Implementation:
${notes.code_example || ''}

Pitfalls to avoid:
${notes.pitfalls || ''}

Key Concepts: ${(chapter.key_concepts || []).join(', ')}

Please act as a Principal Frontend Architect. Walk me through:
1. Deep-dive into the architectural mechanics of this chapter.
2. Under-the-hood execution model (React Fiber, concurrent rendering, memory model).
3. Production best practices and TypeScript strict type-safety patterns.
4. How to debug hydration mismatches or performance regressions.`;
      } else {
        prompt = `I am studying React 19, modern hooks, Vite tooling, and state management. Can you explain core architectural concepts and performance best practices in React 19?`;
      }
    }

    const finalUrl = provider.url.replace("%s", encodeURIComponent(prompt));
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  }

  // ---------------------------------------------------------------------------
  // Search Modal (Ctrl + K)
  // ---------------------------------------------------------------------------
  let searchIndex = [];

  function buildSearchIndex() {
    if (!window.COURSE_DATA || !window.COURSE_DATA.sections) return;
    searchIndex = [];
    for (const sec of window.COURSE_DATA.sections) {
      for (const ch of sec.chapters) {
        for (const v of ch.videos) {
          searchIndex.push({
            secId: sec.id,
            secTitle: sec.title,
            chapId: ch.id,
            chapTitle: ch.title,
            video: v,
            searchText: `${sec.title} ${ch.title} ${v.title} ${(ch.key_concepts || []).join(' ')} ${v.category_tag || ''}`.toLowerCase()
          });
        }
      }
    }
  }

  function openSearch() {
    const modal = document.getElementById("search-modal");
    if (!modal) return;
    if (searchIndex.length === 0) buildSearchIndex();

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    const input = document.getElementById("search-input");
    if (input) {
      input.value = "";
      input.focus();
      renderSearchResults("");
    }
  }

  function closeSearch() {
    const modal = document.getElementById("search-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById("search-results");
    if (!resultsContainer) return;

    const q = (query || "").trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `
        <div class="p-8 text-center text-xs text-[#656d76] dark:text-[#8b949e]">
          Start typing to search lessons across all 7 modules...
        </div>
      `;
      return;
    }

    const matches = searchIndex.filter(item => item.searchText.includes(q)).slice(0, 25);

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="p-8 text-center text-xs text-[#656d76] dark:text-[#8b949e]">
          No matching lessons found for "<span class="font-semibold">${escapeHtml(query)}</span>"
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(m => {
      const v = m.video;
      const status = getVideoStatus(v.id);
      const stDot = status === "completed" ? "🟢" : status === "in_progress" ? "🟡" : "⚪";
      return `
        <a href="#video-${v.id}" class="search-result-item flex items-start gap-3 p-3 hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] transition-colors rounded-lg group block">
          <span class="text-sm shrink-0 mt-0.5">${stDot}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 text-[10px] text-[#656d76] dark:text-[#8b949e] mb-0.5">
              <span class="font-mono text-[#0969da] dark:text-[#58a6ff]">§${m.chapId}</span>
              <span>•</span>
              <span class="truncate">${escapeHtml(m.chapTitle)}</span>
            </div>
            <div class="font-semibold text-xs text-[#1f2328] dark:text-[#f0f6fc] group-hover:text-[#0969da] dark:group-hover:text-[#58a6ff] truncate">
              ${escapeHtml(v.title)}
            </div>
          </div>
          <span class="font-mono text-[10px] text-[#656d76] dark:text-[#8b949e] shrink-0 mt-0.5">
            ${escapeHtml(v.duration_text || v.durationText || '')}
          </span>
        </a>
      `;
    }).join("");
  }

  // ---------------------------------------------------------------------------
  // Backup & Restore
  // ---------------------------------------------------------------------------
  function exportProgressJSON() {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      course: "React & Modern Web Mastery",
      progress: progressState,
      flashcards: fcState
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `react-mastery-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function resetAllProgress() {
    if (confirm("Are you sure you want to reset all course and flashcard progress? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(FC_STORAGE_KEY);
      progressState = {};
      fcState = { version: 1, decks: {} };
      syncUI();
      const backupModal = document.getElementById("backup-modal");
      if (backupModal) backupModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  // ---------------------------------------------------------------------------
  // Event Delegation & Setup
  // ---------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    syncUI();
    initFlashcardSystem();

    // Initial hash navigation
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash.startsWith("video-") || initialHash.startsWith("flashcards-")) {
      setTimeout(() => {
        handleSidebarNavigation(initialHash);
      }, 200);
    }

    // Hashchange listener
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("video-") || hash.startsWith("flashcards-")) {
        handleSidebarNavigation(hash);
      }
    });

    // Global Click Delegations
    document.addEventListener("click", (e) => {
      // 1. Checkbox click
      const cb = e.target.closest(".ll-checkbox[data-video-key]");
      if (cb) {
        e.preventDefault();
        e.stopPropagation();
        const key = cb.getAttribute("data-video-key");
        cycleVideoStatus(key);
        return;
      }

      // 2. Video link click
      const videoLink = e.target.closest("a[data-video-link]");
      if (videoLink) {
        const key = videoLink.getAttribute("data-video-key");
        if (getVideoStatus(key) === "not_started") {
          setVideoStatus(key, "in_progress");
        }
      }

      // 3. Sidebar links (video & flashcards)
      const sidebarNavTarget = e.target.closest(".sidebar-video-link, .sidebar-flashcard-link");
      if (sidebarNavTarget) {
        const href = sidebarNavTarget.getAttribute("href");
        if (href && href.includes("#")) {
          const hashIndex = href.indexOf("#");
          const hashPart = href.substring(hashIndex);
          const targetId = hashPart.replace("#", "");
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            handleSidebarNavigation(targetId);
            try {
              history.pushState(null, "", hashPart);
            } catch (err) {}
            return;
          }
        }
      }

      // 4. Auto-close mobile sidebar when clicking any link inside sidebar
      const sidebarNavLink = e.target.closest("#course-sidebar a");
      if (sidebarNavLink && window.innerWidth < 1024) {
        const sidebar = document.getElementById("course-sidebar");
        const backdrop = document.getElementById("sidebar-backdrop");
        if (sidebar) sidebar.classList.add("-translate-x-full");
        if (backdrop) backdrop.classList.add("hidden");
      }

      // 5. Open Flashcards triggers
      const fcTrigger = e.target.closest("[data-open-flashcards]");
      if (fcTrigger) {
        e.preventDefault();
        const deckId = fcTrigger.getAttribute("data-open-flashcards");
        if (deckId) openFlashcards(deckId);
        return;
      }

      // 6. Flashcard Option select
      const mcqOpt = e.target.closest("#fc-options-container .mcq-option-btn");
      if (mcqOpt) {
        e.preventDefault();
        const optId = mcqOpt.getAttribute("data-opt-id");
        if (optId) handleOptionSelect(optId);
        return;
      }

      // 7. Flashcard flip buttons
      if (e.target.closest("#fc-btn-flip-front") || e.target.closest("#fc-btn-flip-back")) {
        e.preventDefault();
        flipCard();
        return;
      }

      // 8. Flashcard rate buttons
      if (e.target.closest("#fc-btn-rate-review")) {
        e.preventDefault();
        rateCard("needs_review");
        return;
      }
      if (e.target.closest("#fc-btn-rate-mastered")) {
        e.preventDefault();
        rateCard("mastered");
        return;
      }

      // 9. Flashcard Prev / Next
      if (e.target.closest("#fc-btn-prev")) {
        e.preventDefault();
        if (currentCardIndex > 0) {
          currentCardIndex--;
          renderCurrentCard();
        }
        return;
      }
      if (e.target.closest("#fc-btn-next")) {
        e.preventDefault();
        if (currentDeck && currentCardIndex < currentDeck.cards.length - 1) {
          currentCardIndex++;
          renderCurrentCard();
        }
        return;
      }

      // 10. Flashcard Reset & Shuffle
      if (e.target.closest("#fc-btn-reset-deck")) {
        e.preventDefault();
        if (currentDeck) resetDeck(currentDeck.deckId);
        return;
      }
      if (e.target.closest("#fc-btn-shuffle")) {
        e.preventDefault();
        shuffleDeck();
        return;
      }

      // 11. Open Chapter Summary Notes
      const sumBtn = e.target.closest("[data-open-chapter-summary]");
      if (sumBtn) {
        e.preventDefault();
        const chapId = sumBtn.getAttribute("data-open-chapter-summary");
        if (chapId) openChapterSummary(chapId);
        return;
      }

      // 12. Ask AI trigger
      const aiBtn = e.target.closest("[data-ask-ai-provider]");
      if (aiBtn) {
        e.preventDefault();
        handleAskAIClick(aiBtn);
        return;
      }

      // 13. Close modal buttons
      const closeBtn = e.target.closest("[data-close-modal]");
      if (closeBtn) {
        e.preventDefault();
        closeFlashcards();
        closeChapterSummary();
        closeSearch();
        const backupModal = document.getElementById("backup-modal");
        if (backupModal) backupModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        return;
      }

      // 14. Modal Backdrop click
      if (e.target.classList.contains("modal-backdrop")) {
        closeFlashcards();
        closeChapterSummary();
        closeSearch();
        e.target.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        return;
      }

      // 15. Mobile sidebar toggle
      const mobToggle = e.target.closest("#mobile-sidebar-toggle");
      if (mobToggle) {
        e.preventDefault();
        const sidebar = document.getElementById("course-sidebar");
        const backdrop = document.getElementById("sidebar-backdrop");
        if (sidebar && backdrop) {
          const isOpen = !sidebar.classList.contains("-translate-x-full");
          if (isOpen) {
            sidebar.classList.add("-translate-x-full");
            backdrop.classList.add("hidden");
          } else {
            sidebar.classList.remove("-translate-x-full");
            backdrop.classList.remove("hidden");
          }
        }
        return;
      }

      // 16. Sidebar Backdrop click
      if (e.target.id === "sidebar-backdrop") {
        const sidebar = document.getElementById("course-sidebar");
        if (sidebar) sidebar.classList.add("-translate-x-full");
        e.target.classList.add("hidden");
        return;
      }

      // 17. Search trigger
      if (e.target.closest("#search-trigger-btn") || e.target.closest("#mobile-search-trigger")) {
        e.preventDefault();
        openSearch();
        return;
      }

      // 18. Search result click
      const searchItem = e.target.closest(".search-result-item");
      if (searchItem) {
        closeSearch();
        const href = searchItem.getAttribute("href");
        if (href && href.startsWith("#")) {
          const targetId = href.replace("#", "");
          setTimeout(() => {
            handleSidebarNavigation(targetId);
          }, 100);
        }
        return;
      }

      // 19. Backup triggers
      if (e.target.closest("#btn-export-backup")) {
        e.preventDefault();
        exportProgressJSON();
        return;
      }
      if (e.target.closest("#btn-reset-backup")) {
        e.preventDefault();
        resetAllProgress();
        return;
      }

      // 20. Complete Section & Reset Section
      const completeSecBtn = e.target.closest("[data-action='complete-section']");
      if (completeSecBtn) {
        e.preventDefault();
        const secId = completeSecBtn.getAttribute("data-section-id");
        if (secId && window.COURSE_DATA && window.COURSE_DATA.sections) {
          const sec = window.COURSE_DATA.sections.find(s => s.id === secId);
          if (sec) {
            for (const ch of sec.chapters) {
              for (const v of ch.videos) {
                progressState[v.id] = "completed";
              }
            }
            saveProgress();
            syncUI();
          }
        }
        return;
      }

      const resetSecBtn = e.target.closest("[data-action='reset-section']");
      if (resetSecBtn) {
        e.preventDefault();
        const secId = resetSecBtn.getAttribute("data-section-id");
        if (secId && window.COURSE_DATA && window.COURSE_DATA.sections) {
          const sec = window.COURSE_DATA.sections.find(s => s.id === secId);
          if (sec) {
            for (const ch of sec.chapters) {
              for (const v of ch.videos) {
                delete progressState[v.id];
              }
            }
            saveProgress();
            syncUI();
          }
        }
        return;
      }

      // 21. Collapse/Expand All in Sidebar
      const toggleAllBtn = e.target.closest("#toggle-all-sections-btn");
      if (toggleAllBtn) {
        e.preventDefault();
        const detailsList = document.querySelectorAll("#sidebar-nav-container details");
        const anyOpen = Array.from(detailsList).some(d => d.open);
        detailsList.forEach(d => {
          d.open = !anyOpen;
        });
        const textSpan = toggleAllBtn.querySelector(".toggle-text");
        if (textSpan) {
          textSpan.textContent = anyOpen ? "Expand all" : "Collapse all";
        }
        return;
      }
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl+K -> Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchModal = document.getElementById("search-modal");
        if (searchModal && !searchModal.classList.contains("hidden")) {
          closeSearch();
        } else {
          openSearch();
        }
        return;
      }

      // Escape -> Close any modal
      if (e.key === "Escape") {
        closeFlashcards();
        closeChapterSummary();
        closeSearch();
        const backupModal = document.getElementById("backup-modal");
        if (backupModal) backupModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        return;
      }

      // Flashcard keyboard shortcuts
      const fcModal = document.getElementById("flashcard-modal");
      if (fcModal && !fcModal.classList.contains("hidden")) {
        if (e.key === " " || e.code === "Space") {
          e.preventDefault();
          flipCard();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (currentCardIndex > 0) {
            currentCardIndex--;
            renderCurrentCard();
          }
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          if (currentDeck && currentCardIndex < currentDeck.cards.length - 1) {
            currentCardIndex++;
            renderCurrentCard();
          }
          return;
        }
        if (!isCardFlipped && ["1", "2", "3", "4"].includes(e.key)) {
          e.preventDefault();
          const optMap = { "1": "A", "2": "B", "3": "C", "4": "D" };
          handleOptionSelect(optMap[e.key]);
          return;
        }
        if (isCardFlipped && e.key === "1") {
          e.preventDefault();
          rateCard("needs_review");
          return;
        }
        if (isCardFlipped && e.key === "2") {
          e.preventDefault();
          rateCard("mastered");
          return;
        }
      }
    });

    // Search input live typing
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderSearchResults(e.target.value);
      });
    }

    // Backup file upload listener
    const fileInput = document.getElementById("import-file-input");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.progress) {
              progressState = data.progress;
              saveProgress();
            }
            if (data.flashcards) {
              fcState = data.flashcards;
              saveFcState();
            }
            syncUI();
            alert("Progress and flashcard backups successfully restored!");
            const backupModal = document.getElementById("backup-modal");
            if (backupModal) backupModal.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
          } catch (err) {
            alert("Error parsing JSON backup file. Please ensure it is a valid export.");
          }
        };
        reader.readAsText(file);
      });
    }
  });

  // Export to window for debugging or manual console access
  window.TRACKER = {
    getVideoStatus,
    setVideoStatus,
    cycleVideoStatus,
    getStats,
    getSectionStats,
    getChapterStats,
    openChapterSummary,
    closeChapterSummary,
    openFlashcards,
    closeFlashcards,
    handleSidebarNavigation,
    updateActiveSidebarItem,
    updateActiveSidebarFlashcard,
    applySidebarHighlight,
    syncUI,
    exportProgressJSON,
    resetAllProgress,
    askAI: handleAskAIClick,
    AI_PROVIDERS
  };
})();
