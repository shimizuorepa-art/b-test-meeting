const STORAGE_KEY = "bsystem.minutes.mock.v1";
const STORAGE_VERSION = 1;
const DEMO_DATE = "2026-07-21";
const CONTACT_FORM_URL = "https://northern-hearing-e36.notion.site/ebd//55559c2fd62e828c8c318163c97e7d62";

const MEETING_TYPE_CONFIG = {
  cutoffHour: 12,
  options: [
    { id: "morning", label: "朝礼" },
    { id: "evening", label: "夕礼" },
    { id: "meeting", label: "ミーティング" },
  ],
};

const SECTION_CONFIG = [
  { key: "notices", label: "連絡事項", resultLabel: "連絡事項" },
  { key: "office", label: "事務所", resultLabel: "事務所" },
  { key: "restaurant", label: "レストラン", resultLabel: "レストラン" },
  { key: "farm", label: "農園（園の状況・予定）", resultLabel: "農園" },
];

const SECTION_ORDER = SECTION_CONFIG.map(({ key }) => key);
const SECTION_LABELS = Object.fromEntries(SECTION_CONFIG.map(({ key, label }) => [key, label]));
const RESULT_SECTION_LABELS = Object.fromEntries(SECTION_CONFIG.map(({ key, resultLabel }) => [key, resultLabel]));

const PARTICIPANT_CATEGORIES = [
  { id: "office", label: "事務所" },
  { id: "restaurant", label: "レストラン" },
  { id: "farm", label: "農園" },
  { id: "management", label: "管理・共通" },
];

const PARTICIPANTS = [
  { id: "office-tanaka", name: "田中", category: "office" },
  { id: "office-sato", name: "佐藤", category: "office" },
  { id: "office-suzuki", name: "鈴木", category: "office" },
  { id: "restaurant-takahashi", name: "高橋", category: "restaurant" },
  { id: "restaurant-ito", name: "伊藤", category: "restaurant" },
  { id: "restaurant-watanabe", name: "渡辺", category: "restaurant" },
  { id: "farm-yamamoto", name: "山本", category: "farm" },
  { id: "farm-nakamura", name: "中村", category: "farm" },
  { id: "farm-kobayashi", name: "小林", category: "farm" },
  { id: "management-kato", name: "加藤", category: "management" },
  { id: "management-yoshida", name: "吉田", category: "management" },
  { id: "management-yamada", name: "山田", category: "management" },
];

const CURRENT_ACCOUNT = Object.freeze({ id: "office-tanaka", name: "田中" });

const state = {
  input: "pristine",
  generation: "idle",
  save: "idle",
  stale: false,
  generatedText: "",
  resultStage: "source",
  savedEntries: [],
  failNextGeneration: false,
  failNextSave: false,
  selectedParticipantIds: new Set(),
  participantCategory: PARTICIPANT_CATEGORIES[0].id,
  participantSearch: "",
};

const elements = {
  appShell: document.querySelector(".app-shell"),
  mobileMenuTrigger: document.querySelector("#mobile-menu-trigger"),
  mobileMenuScrim: document.querySelector("#mobile-menu-scrim"),
  mobileMenuDrawer: document.querySelector("#mobile-menu-drawer"),
  mobileMenuClose: document.querySelector("[data-mobile-menu-close]"),
  mobileMenuCurrent: document.querySelector("[data-mobile-menu-current]"),
  inputStatus: document.querySelector("#input-status"),
  authorOutput: document.querySelector("#author-output"),
  meetingDateLabel: document.querySelector("#meeting-date-label"),
  meetingTypeSelect: document.querySelector("#meeting-type-select"),
  qaDisclosure: document.querySelector("#qa-disclosure"),
  failNextGeneration: document.querySelector("#fail-next-generation"),
  failNextSave: document.querySelector("#fail-next-save"),
  participantTrigger: document.querySelector("#participant-trigger"),
  participantMenu: document.querySelector("#participant-menu"),
  participantClose: document.querySelector("#participant-close"),
  participantCategoryTabs: document.querySelector("#participant-category-tabs"),
  participantSearch: document.querySelector("#participant-search"),
  participantOptions: document.querySelector("#participant-options"),
  participantSearchEmpty: document.querySelector("#participant-search-empty"),
  participantChips: document.querySelector("#participant-chips"),
  participantCount: document.querySelector("#participant-count"),
  sectionInputs: [...document.querySelectorAll("[data-section-input]")],
  generationError: document.querySelector("#generation-error"),
  resultPanel: document.querySelector("#result-panel"),
  generatedLabel: document.querySelector("#generated-label"),
  generatedText: document.querySelector("#generated-text"),
  resultFlowNote: document.querySelector("#result-flow-note"),
  generationBadge: document.querySelector("#generation-badge"),
  editResultButton: document.querySelector("#edit-result-button"),
  overwriteNote: document.querySelector("#overwrite-note"),
  saveButton: document.querySelector("#save-button"),
  saveStatus: document.querySelector("#save-status"),
  saveError: document.querySelector("#save-error"),
  actionStatus: document.querySelector("#action-status"),
  generateButton: document.querySelector("#generate-button"),
  contactTriggers: [...document.querySelectorAll("[data-contact-trigger]")],
  contactDialog: document.querySelector("#contact-dialog"),
  contactDialogTitle: document.querySelector("#contact-dialog-title"),
  contactDialogClose: document.querySelector("#contact-dialog-close"),
  contactIframe: document.querySelector("#contact-iframe"),
  contactFallback: document.querySelector("#contact-fallback"),
};

const mobileMenuMedia = window.matchMedia("(max-width: 47.999rem)");
let lastContactTrigger = null;
let restoreMobileMenuAfterContact = false;

function textToItems(value) {
  return value
    .split(/\r?\n/u)
    .map((item) => item.trim().replace(/^[・●•\-]\s*/u, ""))
    .filter(Boolean);
}

function itemsToText(items) {
  return Array.isArray(items) ? items.filter((item) => typeof item === "string" && item.trim()).join("\n") : "";
}

function formatDateWithWeekday(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}(${weekdays[localDate.getDay()]})`;
}

function meetingTypeLabel(meetingType) {
  return MEETING_TYPE_CONFIG.options.find(({ id }) => id === meetingType)?.label ?? MEETING_TYPE_CONFIG.options[0].label;
}

function normalizeDraftInput(input) {
  const sections = {};
  SECTION_ORDER.forEach((key) => {
    sections[key] = Array.isArray(input.sections?.[key])
      ? input.sections[key].map((item) => String(item).trim()).filter(Boolean)
      : [];
  });
  const validMeetingType = MEETING_TYPE_CONFIG.options.some(({ id }) => id === input.meetingType)
    ? input.meetingType
    : MEETING_TYPE_CONFIG.options[0].id;
  return {
    date: String(input.date),
    meetingType: validMeetingType,
    author: String(input.author).trim(),
    participants: Array.isArray(input.participants)
      ? input.participants.map((item) => String(item).trim()).filter(Boolean)
      : [],
    sections,
  };
}

export async function generateMinutesDraft(input) {
  const normalized = normalizeDraftInput(input);
  const lines = [
    "Solution.News",
    `${formatDateWithWeekday(normalized.date)} ${meetingTypeLabel(normalized.meetingType)}`,
    `記入者: ${normalized.author}`,
    `参加者: ${normalized.participants.length ? normalized.participants.join("、") : "未選択"}`,
    "",
  ];

  SECTION_ORDER.forEach((key, index) => {
    lines.push(`【${RESULT_SECTION_LABELS[key]}】`);
    const items = normalized.sections[key];
    if (items.length === 0) {
      lines.push("・特になし");
    } else {
      items.forEach((item) => lines.push(`・${item}`));
    }
    if (index < SECTION_ORDER.length - 1) lines.push("");
  });

  return lines.join("\n");
}

function composeSourceDraft(input) {
  const normalized = normalizeDraftInput(input);
  return SECTION_ORDER
    .map((key) => [`【${RESULT_SECTION_LABELS[key]}】`, ...normalized.sections[key]].join("\n"))
    .join("\n\n");
}

function renderMeetingTypeOptions() {
  const fragment = document.createDocumentFragment();
  MEETING_TYPE_CONFIG.options.forEach((meetingType) => {
    const option = document.createElement("option");
    option.value = meetingType.id;
    option.textContent = meetingType.label;
    fragment.append(option);
  });
  elements.meetingTypeSelect.replaceChildren(fragment);
}

function getSelectedMeetingType() {
  return elements.meetingTypeSelect.value || MEETING_TYPE_CONFIG.options[0].id;
}

function getCurrentAccount() {
  return CURRENT_ACCOUNT;
}

function getAuthor() {
  return getCurrentAccount().name;
}

function renderAuthor() {
  const author = getAuthor();
  elements.authorOutput.textContent = author;
  elements.authorOutput.setAttribute("aria-label", `記入者：${author}`);
}

function getSelectedParticipantIds() {
  return [...state.selectedParticipantIds];
}

function getSelectedParticipantNames() {
  return PARTICIPANTS.filter((participant) => state.selectedParticipantIds.has(participant.id)).map((participant) => participant.name);
}

function getSectionsFromInputs() {
  return Object.fromEntries(
    SECTION_ORDER.map((key) => {
      const input = elements.sectionInputs.find((candidate) => candidate.dataset.sectionInput === key);
      return [key, textToItems(input?.value ?? "")];
    }),
  );
}

function collectDraftInput() {
  return {
    date: DEMO_DATE,
    meetingType: getSelectedMeetingType(),
    author: getAuthor(),
    participants: getSelectedParticipantNames(),
    sections: getSectionsFromInputs(),
  };
}

function createRecord(status) {
  const input = collectDraftInput();
  return {
    date: input.date,
    meetingType: input.meetingType,
    author: input.author,
    participants: [...input.participants],
    sections: Object.fromEntries(SECTION_ORDER.map((key) => [key, [...input.sections[key]]])),
    generatedText: state.generatedText,
    resultStage: state.resultStage,
    status,
  };
}

function hasSourceContent() {
  return Object.values(getSectionsFromInputs()).some((items) => items.length > 0);
}

function syncSourceDraft() {
  state.generatedText = composeSourceDraft(collectDraftInput());
  state.resultStage = "source";
  state.generation = "source";
  state.stale = false;
}

function markSourceDirty(message = "入力が変わりました") {
  const returnedFromFinishedResult = state.resultStage !== "source";
  state.input = "dirty";
  state.save = "idle";
  elements.saveError.hidden = true;
  syncSourceDraft();
  renderState(returnedFromFinishedResult ? `${message}。清書欄を最新の入力内容へ戻しました` : message);
}

function setParticipantsByIds(ids, markDirty = true) {
  const validIds = new Set(PARTICIPANTS.map(({ id }) => id));
  state.selectedParticipantIds = new Set(ids.filter((id) => validIds.has(id)));
  renderParticipantOptions();
  renderParticipants();
  if (markDirty) markSourceDirty("参加者を更新しました");
}

function renderParticipantCategoryTabs() {
  const fragment = document.createDocumentFragment();
  PARTICIPANT_CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    const isSelected = category.id === state.participantCategory;
    button.type = "button";
    button.id = `participant-category-${category.id}`;
    button.dataset.participantCategory = category.id;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(isSelected));
    button.setAttribute("aria-controls", "participant-options");
    button.tabIndex = isSelected ? 0 : -1;
    button.textContent = category.label;
    fragment.append(button);
  });
  elements.participantCategoryTabs.replaceChildren(fragment);
}

function renderParticipantOptions() {
  const query = state.participantSearch.trim().toLocaleLowerCase("ja-JP");
  const visibleParticipants = PARTICIPANTS.filter(
    (participant) => participant.category === state.participantCategory && participant.name.toLocaleLowerCase("ja-JP").includes(query),
  );
  const fragment = document.createDocumentFragment();
  visibleParticipants.forEach((participant) => {
    const label = document.createElement("label");
    label.className = "participant-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = participant.id;
    input.checked = state.selectedParticipantIds.has(participant.id);
    input.dataset.participantName = participant.name;
    const name = document.createElement("span");
    name.textContent = participant.name;
    label.append(input, name);
    fragment.append(label);
  });
  elements.participantOptions.replaceChildren(fragment);
  elements.participantSearchEmpty.hidden = visibleParticipants.length > 0;
}

function renderParticipants() {
  const participants = PARTICIPANTS.filter((participant) => state.selectedParticipantIds.has(participant.id));
  const fragment = document.createDocumentFragment();
  participants.forEach((participant) => {
    const chip = document.createElement("span");
    chip.className = "participant-chip";
    const label = document.createElement("span");
    label.textContent = participant.name;
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.dataset.removeParticipant = participant.id;
    removeButton.setAttribute("aria-label", `${participant.name}を参加者から外す`);
    chip.append(label, removeButton);
    fragment.append(chip);
  });
  elements.participantChips.replaceChildren(fragment);
  elements.participantCount.textContent = `${participants.length}名`;
}

function switchParticipantCategory(categoryId, { focus = true, resetSearch = true } = {}) {
  if (!PARTICIPANT_CATEGORIES.some(({ id }) => id === categoryId)) return;
  state.participantCategory = categoryId;
  if (resetSearch) {
    state.participantSearch = "";
    elements.participantSearch.value = "";
  }
  elements.participantCategoryTabs.querySelectorAll("[data-participant-category]").forEach((tab) => {
    const isSelected = tab.dataset.participantCategory === categoryId;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });
  renderParticipantOptions();
  if (focus) elements.participantCategoryTabs.querySelector(`[data-participant-category="${categoryId}"]`)?.focus({ preventScroll: true });
}

function renderState(actionMessage = "") {
  const isGenerating = state.generation === "generating";
  const isSaving = state.save === "saving";
  const hasResult = Boolean(state.generatedText);
  const sourceHasContent = hasSourceContent();
  const isSourceStage = state.resultStage === "source";
  const sourceReadyForAi = isSourceStage && sourceHasContent && state.save === "saved";
  let resultState = "idle";
  if (state.stale) resultState = "stale";
  else if (isGenerating) resultState = "generating";
  else if (isSaving) resultState = "saving";
  else if (state.generation === "generation-error") resultState = "generation-error";
  else if (state.save === "save-error") resultState = "save-error";
  else if (state.generation === "editing") resultState = "editing";
  else if (isSourceStage) resultState = "source";
  else if (state.save === "saved") resultState = "saved";
  else if (hasResult) resultState = "generated";

  elements.resultPanel.dataset.state = resultState;
  elements.resultPanel.dataset.resultStage = state.resultStage;

  elements.inputStatus.className = `status-pill is-${state.input}`;
  elements.inputStatus.querySelector("span:last-child").textContent = state.input === "dirty" ? "未保存" : "未変更";

  elements.generateButton.disabled = isGenerating || isSaving || (isSourceStage && !sourceReadyForAi);
  elements.generateButton.classList.toggle("is-loading", isGenerating);
  elements.generateButton.setAttribute("aria-busy", String(isGenerating));

  elements.saveButton.disabled = (isSourceStage ? !sourceHasContent : !hasResult) || state.stale || state.save === "saved" || isGenerating || isSaving;
  elements.saveButton.classList.toggle("is-loading", isSaving);
  elements.saveButton.setAttribute("aria-busy", String(isSaving));
  elements.editResultButton.disabled = isSourceStage || !hasResult || state.stale || isGenerating || isSaving;
  elements.meetingTypeSelect.disabled = isGenerating || isSaving;
  if (elements.generatedText.value !== state.generatedText) elements.generatedText.value = state.generatedText;
  elements.generatedText.readOnly = state.generation !== "editing";
  elements.editResultButton.textContent = state.generation === "editing" ? "編集を終了" : "編集";
  elements.overwriteNote.hidden = isSourceStage || !hasResult;

  if (state.stale) {
    elements.generationBadge.textContent = "要再清書";
    elements.overwriteNote.textContent = "入力が変わりました。保存前に再清書してください。再清書すると現在の清書を上書きします。";
    elements.resultFlowNote.textContent = "保存済みの記入者と現在の記入者が異なります。4区分を更新すると、最新の入力内容へ戻せます。";
  } else if (state.generation === "generating") {
    elements.generationBadge.textContent = "清書中";
    elements.resultFlowNote.textContent = "保存した4区分の内容へAI清書を適用しています。";
  } else if (state.generation === "generation-error") {
    elements.generationBadge.textContent = "清書エラー";
    elements.resultFlowNote.textContent = "入力内容は保持しています。もう一度「AI清書」を押してください。";
  } else if (state.generation === "editing") {
    elements.generationBadge.textContent = "手動編集中";
    elements.overwriteNote.textContent = "再清書すると、現在の手動編集を上書きします。";
    elements.resultFlowNote.textContent = "この欄へ直接入力できます。終わったら「編集を終了」を押してください。";
  } else if (isSourceStage) {
    elements.generationBadge.textContent = sourceHasContent ? "入力内容" : "入力待ち";
    elements.resultFlowNote.textContent = sourceReadyForAi
      ? "入力内容を保存しました。「AI清書」で文章を整えられます。"
      : "4区分の入力内容を上から反映しています。保存するとAI清書を実行できます。";
  } else if (state.resultStage === "manual") {
    elements.generationBadge.textContent = "手動編集済み";
    elements.overwriteNote.textContent = "再清書すると、現在の手動編集を上書きします。";
    elements.resultFlowNote.textContent = "手動編集した内容です。必要なら再度「編集」で修正できます。";
  } else if (state.generation === "generated") {
    elements.generationBadge.textContent = "清書済み";
    elements.overwriteNote.textContent = "再清書すると、現在の清書を上書きします。";
    elements.resultFlowNote.textContent = "AI清書を反映しました。「編集」で直接修正できます。";
  } else {
    elements.generationBadge.textContent = "清書前";
    elements.resultFlowNote.textContent = "4区分の入力内容を保存してからAI清書を実行できます。";
  }

  elements.saveStatus.className = "save-status";
  if (state.save === "saving") {
    elements.saveStatus.classList.add("is-saving");
    elements.saveStatus.textContent = "この端末に保存中";
  } else if (state.save === "saved") {
    elements.saveStatus.classList.add("is-saved");
    elements.saveStatus.textContent = isSourceStage
      ? "入力内容を保存しました（この端末に保存）"
      : "保存しました（この端末に保存）";
  } else if (state.save === "save-error") {
    elements.saveStatus.classList.add("is-error");
    elements.saveStatus.textContent = "保存できませんでした";
  } else {
    elements.saveStatus.textContent = isSourceStage
      ? sourceHasContent
        ? "入力内容を保存するとAI清書できます"
        : "4区分へ入力すると保存できます"
      : hasResult
        ? "清書後の内容はまだ保存していません"
        : "清書後に保存できます";
  }

  if (actionMessage) elements.actionStatus.textContent = actionMessage;
}

function hydrateRecord(record) {
  if (!record || typeof record !== "object") return false;
  if (MEETING_TYPE_CONFIG.options.some(({ id }) => id === record.meetingType)) {
    elements.meetingTypeSelect.value = record.meetingType;
  }
  renderAuthor();
  const participantIds = PARTICIPANTS
    .filter((participant) => Array.isArray(record.participants) && record.participants.includes(participant.name))
    .map((participant) => participant.id);
  setParticipantsByIds(participantIds, false);
  SECTION_ORDER.forEach((key) => {
    const input = elements.sectionInputs.find((candidate) => candidate.dataset.sectionInput === key);
    if (input) input.value = itemsToText(record.sections?.[key] ?? []);
  });
  state.generatedText = typeof record.generatedText === "string" ? record.generatedText : "";
  const hasGeneratedText = Boolean(state.generatedText);
  const storedResultStage = ["source", "generated", "manual"].includes(record.resultStage)
    ? record.resultStage
    : hasGeneratedText
      ? "generated"
      : "source";
  const authorMismatch = String(record.author ?? "").trim() !== getAuthor();
  const needsAuthorRefresh = hasGeneratedText && authorMismatch;
  state.resultStage = storedResultStage;
  state.generation = storedResultStage === "source" ? "source" : hasGeneratedText ? "generated" : "idle";
  state.save = hasGeneratedText && !authorMismatch ? "saved" : "idle";
  state.input = needsAuthorRefresh ? "dirty" : "pristine";
  state.stale = needsAuthorRefresh && storedResultStage !== "source";
  return true;
}

function loadStoredEntries() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== STORAGE_VERSION || !Array.isArray(parsed.entries)) {
      throw new Error("保存形式が一致しません");
    }
    state.savedEntries = parsed.entries.filter((entry) => entry && typeof entry === "object" && entry.record);
    if (state.savedEntries[0]) hydrateRecord(state.savedEntries[0].record);
  } catch {
    state.savedEntries = [];
    elements.saveError.hidden = false;
    elements.saveError.textContent = "保存データを読み込めませんでした。現在の入力はそのまま続けられます。次回保存で復旧を試します。";
    state.save = "save-error";
  }
}

function writeStoredRecord(record) {
  const entry = { savedAt: new Date().toISOString(), record };
  const nextEntries = [entry, ...state.savedEntries].slice(0, 20);
  const payload = { version: STORAGE_VERSION, entries: nextEntries };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  state.savedEntries = nextEntries;
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function handleGenerate() {
  if (state.resultStage === "source" && state.save !== "saved") return;
  state.generation = "generating";
  elements.generationError.hidden = true;
  elements.saveError.hidden = true;
  renderState("AI清書中");
  await wait(500);

  if (state.failNextGeneration) {
    state.failNextGeneration = false;
    elements.failNextGeneration.setAttribute("aria-pressed", "false");
    state.generation = "generation-error";
    elements.generationError.hidden = false;
    elements.generationError.textContent = "AI清書を完了できませんでした。入力は保持しています。もう一度「AI清書」を押してください。";
    renderState("清書エラー：入力は保持しています");
    return;
  }

  try {
    state.generatedText = await generateMinutesDraft(collectDraftInput());
    state.resultStage = "generated";
    state.generation = "generated";
    state.stale = false;
    state.save = "idle";
    state.input = "dirty";
    renderState("AI清書が完了しました。内容を確認してください");
    elements.resultPanel.focus({ preventScroll: false });
  } catch {
    state.generation = "generation-error";
    elements.generationError.hidden = false;
    elements.generationError.textContent = "AI清書を完了できませんでした。入力は保持しています。もう一度「AI清書」を押してください。";
    renderState("清書エラー：入力は保持しています");
  }
}

async function handleSave() {
  if ((!state.generatedText && state.resultStage !== "source") || (state.resultStage === "source" && !hasSourceContent()) || state.stale) return;
  state.save = "saving";
  elements.saveError.hidden = true;
  renderState("この端末に保存中");
  await wait(420);

  if (state.failNextSave) {
    state.failNextSave = false;
    elements.failNextSave.setAttribute("aria-pressed", "false");
    state.save = "save-error";
    elements.saveError.hidden = false;
    elements.saveError.textContent = "保存できませんでした。入力と清書は保持しています。保存を再試行してください。";
    renderState("保存エラー：入力と清書は保持しています");
    return;
  }

  try {
    writeStoredRecord(createRecord("saved"));
    state.save = "saved";
    state.input = "pristine";
    renderState(state.resultStage === "source" ? "入力内容を保存しました。AI清書を実行できます" : "保存しました（この端末に保存）");
  } catch {
    state.save = "save-error";
    elements.saveError.hidden = false;
    elements.saveError.textContent = "保存できませんでした。入力と清書は保持しています。保存を再試行してください。";
    renderState("保存エラー：入力と清書は保持しています");
  }
}

function toggleParticipantMenu(force, { restoreFocus = false } = {}) {
  const willOpen = typeof force === "boolean" ? force : elements.participantMenu.hidden;
  if (!willOpen && restoreFocus) elements.participantTrigger.focus({ preventScroll: true });
  elements.participantMenu.hidden = !willOpen;
  elements.participantTrigger.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) {
    elements.participantCategoryTabs.querySelector('[aria-selected="true"]')?.focus({ preventScroll: true });
  }
}

function isElementVisible(element) {
  if (!element?.isConnected) return false;
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
}

function getMobileMenuFocusableElements() {
  return [...elements.mobileMenuDrawer.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter(isElementVisible);
}

function setMobileMenu(open, { restoreFocus = false, focusTarget = null } = {}) {
  const next = Boolean(open && mobileMenuMedia.matches);
  if (next && !elements.participantMenu.hidden) toggleParticipantMenu(false);
  elements.mobileMenuTrigger.setAttribute("aria-expanded", String(next));
  elements.mobileMenuTrigger.setAttribute("aria-label", next ? "メニューを閉じる" : "メニューを開く");
  elements.mobileMenuDrawer.setAttribute("aria-hidden", String(!next));
  elements.mobileMenuDrawer.hidden = !next;
  elements.mobileMenuScrim.hidden = !next;
  elements.appShell.inert = next;
  document.body.classList.toggle("is-mobile-menu-open", next);
  if (next) {
    window.requestAnimationFrame(() => {
      const target = isElementVisible(focusTarget) ? focusTarget : elements.mobileMenuCurrent;
      target?.focus({ preventScroll: true });
    });
  } else if (restoreFocus && isElementVisible(elements.mobileMenuTrigger)) {
    elements.mobileMenuTrigger.focus({ preventScroll: true });
  }
}

function trapMobileMenuFocus(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    setMobileMenu(false, { restoreFocus: true });
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = getMobileMenuFocusableElements();
  if (focusable.length === 0) {
    event.preventDefault();
    elements.mobileMenuDrawer.focus({ preventScroll: true });
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeIndex = focusable.indexOf(document.activeElement);
  if (activeIndex === -1) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus({ preventScroll: true });
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
}

function getContactDialogFocusableElements() {
  return [...elements.contactDialog.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
  )].filter((element) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
  });
}

function openContactDialog(trigger) {
  if (elements.contactDialog.open) return;
  if (!elements.participantMenu.hidden) toggleParticipantMenu(false);
  lastContactTrigger = trigger;
  elements.contactFallback.href = CONTACT_FORM_URL;
  if (!elements.contactIframe.hasAttribute("src")) elements.contactIframe.src = CONTACT_FORM_URL;
  document.body.classList.add("is-contact-open");
  elements.contactDialog.showModal();
  window.requestAnimationFrame(() => elements.contactDialogTitle.focus({ preventScroll: true }));
}

function closeContactDialog() {
  if (elements.contactDialog.open) elements.contactDialog.close();
}

function trapContactDialogFocus(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeContactDialog();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = getContactDialogFocusableElements();
  if (focusable.length === 0) {
    event.preventDefault();
    elements.contactDialogTitle.focus({ preventScroll: true });
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeIndex = focusable.indexOf(document.activeElement);
  if (activeIndex === -1) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus({ preventScroll: true });
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
}

function bindEvents() {
  elements.mobileMenuTrigger.addEventListener("click", () => {
    setMobileMenu(elements.mobileMenuTrigger.getAttribute("aria-expanded") !== "true");
  });
  elements.mobileMenuScrim.addEventListener("click", () => setMobileMenu(false, { restoreFocus: true }));
  elements.mobileMenuClose.addEventListener("click", () => setMobileMenu(false, { restoreFocus: true }));
  elements.mobileMenuCurrent.addEventListener("click", () => setMobileMenu(false, { restoreFocus: true }));
  elements.mobileMenuDrawer.addEventListener("keydown", trapMobileMenuFocus);
  mobileMenuMedia.addEventListener("change", (event) => {
    if (!event.matches) setMobileMenu(false);
  });
  elements.contactTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      restoreMobileMenuAfterContact = Boolean(trigger.closest("#mobile-menu-drawer"));
      if (restoreMobileMenuAfterContact) setMobileMenu(false);
      openContactDialog(trigger);
    });
  });
  elements.contactDialogClose.addEventListener("click", closeContactDialog);
  elements.contactDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeContactDialog();
  });
  elements.contactDialog.addEventListener("click", (event) => {
    if (event.target === elements.contactDialog) closeContactDialog();
  });
  elements.contactDialog.addEventListener("keydown", trapContactDialogFocus);
  elements.contactDialog.addEventListener("close", () => {
    document.body.classList.remove("is-contact-open");
    const trigger = lastContactTrigger;
    const shouldRestoreMobileMenu = restoreMobileMenuAfterContact;
    lastContactTrigger = null;
    restoreMobileMenuAfterContact = false;
    window.requestAnimationFrame(() => {
      if (shouldRestoreMobileMenu && mobileMenuMedia.matches) {
        setMobileMenu(true, { focusTarget: trigger });
        return;
      }
      const focusTarget = [trigger, ...elements.contactTriggers, elements.mobileMenuTrigger].find(isElementVisible);
      focusTarget?.focus({ preventScroll: true });
    });
  });

  elements.meetingTypeSelect.addEventListener("change", () => {
    markSourceDirty(`${meetingTypeLabel(elements.meetingTypeSelect.value)}へ切り替えました`);
  });

  elements.sectionInputs.forEach((input) => {
    input.addEventListener("input", () => markSourceDirty(`${SECTION_LABELS[input.dataset.sectionInput]}を更新しました`));
  });

  elements.generatedText.addEventListener("input", () => {
    state.generatedText = elements.generatedText.value;
    state.resultStage = "manual";
    state.save = "idle";
    state.input = "dirty";
    renderState("清書を手動で編集しました");
  });

  elements.participantOptions.addEventListener("change", (event) => {
    if (!event.target.matches('input[type="checkbox"]')) return;
    if (event.target.checked) state.selectedParticipantIds.add(event.target.value);
    else state.selectedParticipantIds.delete(event.target.value);
    renderParticipants();
    markSourceDirty("参加者を更新しました");
  });

  elements.participantChips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-participant]");
    if (!button) return;
    state.selectedParticipantIds.delete(button.dataset.removeParticipant);
    renderParticipantOptions();
    renderParticipants();
    markSourceDirty("参加者を外しました");
  });

  elements.participantCategoryTabs.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-participant-category]");
    if (tab) switchParticipantCategory(tab.dataset.participantCategory);
  });

  elements.participantCategoryTabs.addEventListener("keydown", (event) => {
    const tab = event.target.closest("[data-participant-category]");
    if (!tab) return;
    const currentIndex = PARTICIPANT_CATEGORIES.findIndex(({ id }) => id === tab.dataset.participantCategory);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % PARTICIPANT_CATEGORIES.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + PARTICIPANT_CATEGORIES.length) % PARTICIPANT_CATEGORIES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = PARTICIPANT_CATEGORIES.length - 1;
    else return;
    event.preventDefault();
    switchParticipantCategory(PARTICIPANT_CATEGORIES[nextIndex].id);
  });

  elements.participantSearch.addEventListener("input", () => {
    state.participantSearch = elements.participantSearch.value;
    renderParticipantOptions();
  });

  elements.participantTrigger.addEventListener("click", () => toggleParticipantMenu());
  elements.participantClose.addEventListener("click", () => toggleParticipantMenu(false, { restoreFocus: true }));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".participant-picker") && !elements.participantMenu.hidden) {
      toggleParticipantMenu(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.participantMenu.hidden) {
      event.preventDefault();
      toggleParticipantMenu(false, { restoreFocus: true });
    }
  });

  elements.generateButton.addEventListener("click", handleGenerate);
  elements.saveButton.addEventListener("click", handleSave);

  elements.editResultButton.addEventListener("click", () => {
    state.generation = state.generation === "editing" ? "generated" : "editing";
    renderState(state.generation === "editing" ? "清書を手動編集できます" : "手動編集を終了しました");
    if (state.generation === "editing") elements.generatedText.focus();
  });

  elements.failNextGeneration.addEventListener("click", () => {
    state.failNextGeneration = !state.failNextGeneration;
    elements.failNextGeneration.setAttribute("aria-pressed", String(state.failNextGeneration));
  });
  elements.failNextSave.addEventListener("click", () => {
    state.failNextSave = !state.failNextSave;
    elements.failNextSave.setAttribute("aria-pressed", String(state.failNextSave));
  });
}

function initialize() {
  renderMeetingTypeOptions();
  renderParticipantCategoryTabs();
  renderParticipantOptions();
  elements.qaDisclosure.hidden = new URLSearchParams(window.location.search).get("dev") !== "1";
  elements.contactFallback.href = CONTACT_FORM_URL;
  const formattedDate = formatDateWithWeekday(DEMO_DATE);
  elements.meetingDateLabel.textContent = formattedDate;
  elements.meetingDateLabel.dateTime = DEMO_DATE;
  elements.meetingDateLabel.setAttribute("aria-label", `実施日：${formattedDate}`);
  const inferredType = new Date().getHours() < MEETING_TYPE_CONFIG.cutoffHour ? "morning" : "evening";
  elements.meetingTypeSelect.value = inferredType;
  renderAuthor();
  renderParticipants();
  loadStoredEntries();
  const restoredSavedEntry = Boolean(state.savedEntries[0]);
  if (!restoredSavedEntry) syncSourceDraft();
  bindEvents();
  renderState(
    restoredSavedEntry
      ? `${meetingTypeLabel(getSelectedMeetingType())}の保存内容を復元しました`
      : `${meetingTypeLabel(getSelectedMeetingType())}を${MEETING_TYPE_CONFIG.cutoffHour}:00を境に初期設定しました`,
  );
}

initialize();
