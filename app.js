const STORAGE_KEY = "bsystem.minutes.mock.v1";
const STORAGE_VERSION = 1;
const DEMO_DATE = "2026-07-21";
const CONTACT_FORM_URL = "https://northern-hearing-e36.notion.site/ebd//55559c2fd62e828c8c318163c97e7d62";
const RECORDING_REVIEW_FIXTURES = [
  {
    id: "decision-1",
    kind: "決定事項",
    text: "各部署の夏期運営の注意点を次回朝礼で確認する",
    sourceTime: "00:18",
    sourceExcerpt: "来週の朝礼までに、各部署から夏期運営の注意点を持ち寄りましょう。",
    owner: "未割当",
    department: "未割当",
    due: "期限未確認",
  },
  {
    id: "task-1",
    kind: "task",
    text: "各部署の注意点を整理する",
    sourceTime: "00:42",
    sourceExcerpt: "担当と期限はこの場では決めず、次回確認します。",
    owner: "未割当",
    department: "未割当",
    due: "期限未確認",
  },
];

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

function createReviewSuggestions() {
  return RECORDING_REVIEW_FIXTURES.map((fixture) => ({
    ...fixture,
    status: "pending",
    provenance: "固定文字起こし",
    editing: false,
    editValue: fixture.text,
  }));
}

const recordingDemo = {
  screen: "setup",
  capture: "idle",
  permission: "required",
  consent: "required",
  offline: false,
  elapsedSeconds: 0,
  timerId: null,
  processingTimers: [],
  processingStep: "prepare",
  errorKind: "",
  draft: "idle",
  suggestions: createReviewSuggestions(),
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
  recordingScenarioSelect: document.querySelector("#recording-scenario-select"),
  recordingScenarioApply: document.querySelector("#recording-scenario-apply"),
  recordingOfflineToggle: document.querySelector("#recording-offline-toggle"),
  participantsPanel: document.querySelector(".participants-panel"),
  participantTrigger: document.querySelector("#participant-trigger"),
  participantMenu: document.querySelector("#participant-menu"),
  participantClose: document.querySelector("#participant-close"),
  participantCategoryTabs: document.querySelector("#participant-category-tabs"),
  participantSearch: document.querySelector("#participant-search"),
  participantOptions: document.querySelector("#participant-options"),
  participantSearchEmpty: document.querySelector("#participant-search-empty"),
  participantChips: document.querySelector("#participant-chips"),
  participantCount: document.querySelector("#participant-count"),
  recordingWorkflow: document.querySelector("#recording-workflow"),
  recordingWorkflowStatus: document.querySelector("#recording-workflow-status"),
  recordingDemoStatus: document.querySelector("#recording-demo-status"),
  recordingSteps: [...document.querySelectorAll("[data-recording-step]")],
  recordingScreens: [...document.querySelectorAll("[data-recording-screen]")],
  recordingMeetingSummary: document.querySelector("#recording-meeting-summary"),
  recordingParticipantSummary: document.querySelector("#recording-participant-summary"),
  recordingEnterConsent: document.querySelector("#recording-enter-consent"),
  devicePermissionStatus: document.querySelector("#device-permission-status"),
  demoDeviceCheck: document.querySelector("#demo-device-check"),
  participantConsentCheck: document.querySelector("#participant-consent-check"),
  participantConsentNote: document.querySelector("#participant-consent-note"),
  recordingConsentReady: document.querySelector("#recording-consent-ready"),
  recordingConsentBack: document.querySelector("#recording-consent-back"),
  recordingStartDemo: document.querySelector("#recording-start-demo"),
  recordingReadyBack: document.querySelector("#recording-ready-back"),
  captureStateLabel: document.querySelector("#capture-state-label"),
  captureMeetingLabel: document.querySelector("#capture-meeting-label"),
  recordingTimer: document.querySelector("#recording-timer"),
  recordingNetworkState: document.querySelector("#recording-network-state"),
  recordingQuickNote: document.querySelector("#recording-quick-note"),
  recordingStop: document.querySelector("#recording-stop"),
  recordingPause: document.querySelector("#recording-pause"),
  recordingInterrupt: document.querySelector("#recording-interrupt"),
  recordingInterruptionReason: document.querySelector("#recording-interruption-reason"),
  recordingResumeInterrupted: document.querySelector("#recording-resume-interrupted"),
  recordingProcessInterrupted: document.querySelector("#recording-process-interrupted"),
  processingScreen: document.querySelector(".processing-screen"),
  processingSteps: [...document.querySelectorAll("[data-processing-step]")],
  processingStatus: document.querySelector("#processing-status"),
  reviewPendingCount: document.querySelector("#review-pending-count"),
  reviewSuggestionList: document.querySelector("#review-suggestion-list"),
  recordingDraftStatus: document.querySelector("#recording-draft-status"),
  recordingSaveDraft: document.querySelector("#recording-save-draft"),
  recordingErrorTitle: document.querySelector("#recording-error-title"),
  recordingErrorMessage: document.querySelector("#recording-error-message"),
  recordingErrorRecovery: document.querySelector("#recording-error-recovery"),
  recordingErrorRetry: document.querySelector("#recording-error-retry"),
  recordingErrorReset: document.querySelector("#recording-error-reset"),
  manualFallback: document.querySelector("#manual-fallback"),
  openManualButtons: [...document.querySelectorAll("[data-open-manual]")],
  returnToRecording: document.querySelector("#return-to-recording"),
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
  infoTriggers: [...document.querySelectorAll("[data-info-trigger]")],
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
let activeInfoTrigger = null;
let infoOpenTimer = null;
let infoCloseTimer = null;
let suppressInfoFocusOpen = false;

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
  updateRecordingSummary();
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

function updateRecordingSummary() {
  const names = getSelectedParticipantNames();
  elements.recordingMeetingSummary.textContent = meetingTypeLabel(getSelectedMeetingType());
  elements.captureMeetingLabel.textContent = meetingTypeLabel(getSelectedMeetingType());
  elements.recordingParticipantSummary.textContent = names.length
    ? `${names.length}名・${names.join("、")}`
    : "0名・未選択";
}

function formatRecordingTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function updateRecordingTimer() {
  elements.recordingTimer.textContent = formatRecordingTime(recordingDemo.elapsedSeconds);
  elements.recordingTimer.setAttribute("aria-label", `録音経過時間 ${Math.floor(recordingDemo.elapsedSeconds / 60)}分${recordingDemo.elapsedSeconds % 60}秒`);
}

function stopCaptureTimer() {
  window.clearInterval(recordingDemo.timerId);
  recordingDemo.timerId = null;
}

function startCaptureTimer() {
  stopCaptureTimer();
  recordingDemo.timerId = window.setInterval(() => {
    if (recordingDemo.capture !== "recording") return;
    recordingDemo.elapsedSeconds += 1;
    updateRecordingTimer();
  }, 1000);
}

function stopProcessingDemo() {
  recordingDemo.processingTimers.forEach((timerId) => window.clearTimeout(timerId));
  recordingDemo.processingTimers = [];
}

function currentRecordingStep() {
  if (recordingDemo.screen === "capture" || recordingDemo.screen === "interrupted") return "capture";
  if (recordingDemo.screen === "processing") return "processing";
  if (recordingDemo.screen === "review") return "review";
  if (recordingDemo.screen === "error" && recordingDemo.errorKind === "processing-error") return "processing";
  return "setup";
}

function createReviewButton(label, action, suggestion, className = "button button-secondary") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.dataset.reviewAction = action;
  button.dataset.suggestionId = suggestion.id;
  button.setAttribute("aria-label", `${suggestion.kind}「${suggestion.text}」を${label}`);
  return button;
}

function renderReviewSuggestions() {
  const fragment = document.createDocumentFragment();
  recordingDemo.suggestions.forEach((suggestion) => {
    const article = document.createElement("article");
    article.className = `review-suggestion is-${suggestion.status}`;
    article.dataset.suggestionId = suggestion.id;

    const header = document.createElement("header");
    const title = document.createElement("h4");
    title.textContent = suggestion.kind;
    const status = document.createElement("span");
    status.className = `state-label ${
      suggestion.status === "confirmed"
        ? "is-success"
        : suggestion.status === "rejected"
          ? "is-neutral"
          : "is-warning"
    }`;
    status.textContent =
      suggestion.status === "confirmed"
        ? "確認済み"
        : suggestion.status === "rejected"
          ? "却下"
          : suggestion.editing
            ? "人が編集中"
            : "AI生成・未確認";
    header.append(title, status);

    const content = document.createElement("div");
    content.className = "review-suggestion-content";
    if (suggestion.editing) {
      const label = document.createElement("label");
      label.textContent = `${suggestion.kind}の編集`;
      const textarea = document.createElement("textarea");
      textarea.rows = 3;
      textarea.value = suggestion.editValue;
      textarea.dataset.reviewEditField = suggestion.id;
      label.append(textarea);
      content.append(label);
    } else {
      const text = document.createElement("p");
      text.className = "review-suggestion-text";
      text.textContent = suggestion.text;
      content.append(text);
    }

    const source = document.createElement("p");
    source.className = "review-source";
    const time = document.createElement("time");
    time.textContent = suggestion.sourceTime;
    time.dateTime = suggestion.sourceTime === "00:18" ? "PT18S" : "PT42S";
    source.append(time, document.createTextNode(` 根拠: 「${suggestion.sourceExcerpt}」`));

    const metadata = document.createElement("dl");
    metadata.className = "review-metadata";
    [
      ["担当", suggestion.owner],
      ["部署", suggestion.department],
      ["期限", suggestion.due],
      ["由来", suggestion.provenance],
    ].forEach(([term, value]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = term;
      dd.textContent = value;
      row.append(dt, dd);
      metadata.append(row);
    });

    const actions = document.createElement("div");
    actions.className = "review-item-actions";
    if (suggestion.editing) {
      actions.append(
        createReviewButton("編集を反映", "save-edit", suggestion),
        createReviewButton("編集を中止", "cancel-edit", suggestion, "button button-quiet"),
      );
    } else {
      const confirmButton = createReviewButton("確認", "confirm", suggestion);
      confirmButton.disabled = suggestion.status === "confirmed";
      actions.append(
        confirmButton,
        createReviewButton("編集", "edit", suggestion, "button button-quiet"),
        createReviewButton("却下", "reject", suggestion, "button button-quiet is-danger-text"),
      );
    }

    article.append(header, content, source, metadata, actions);
    fragment.append(article);
  });
  elements.reviewSuggestionList.replaceChildren(fragment);

  const pending = recordingDemo.suggestions.filter(({ status }) => status === "pending").length;
  const confirmed = recordingDemo.suggestions.filter(({ status }) => status === "confirmed").length;
  const rejected = recordingDemo.suggestions.filter(({ status }) => status === "rejected").length;
  elements.reviewPendingCount.textContent = `未確認 ${pending}件・確認済み ${confirmed}件・却下 ${rejected}件`;
}

function renderRecordingError() {
  const errors = {
    "permission-denied": {
      title: "端末利用が拒否されました",
      message: "デモ上で端末利用不可を再現しています。実際の権限要求は行っていません。",
      recovery: "設定方法を確認して再試行するか、4区分の手入力へ切り替えてください。",
      retry: "同意確認へ戻る",
    },
    unsupported: {
      title: "この環境では利用できません",
      message: "録音機能を利用できない環境を想定したデモです。音声データはありません。",
      recovery: "4区分の手入力なら、このまま議事録を作成できます。",
      retry: "設定へ戻る",
    },
    "processing-error": {
      title: "デモ処理を完了できませんでした",
      message: "固定文字起こしからAI提案を準備できない状態を再現しています。簡易メモは保持しています。",
      recovery: "同じ固定サンプルで再試行するか、4区分の手入力へ切り替えてください。",
      retry: "処理を再試行",
    },
  };
  const detail = errors[recordingDemo.errorKind] ?? errors["processing-error"];
  elements.recordingErrorTitle.textContent = detail.title;
  elements.recordingErrorMessage.textContent = detail.message;
  elements.recordingErrorRecovery.textContent = detail.recovery;
  elements.recordingErrorRetry.textContent = detail.retry;
}

function renderRecordingDemo(message = "") {
  const visibleScreen = recordingDemo.screen;
  elements.recordingScreens.forEach((screen) => {
    screen.hidden = screen.dataset.recordingScreen !== visibleScreen;
  });

  const step = currentRecordingStep();
  const stepOrder = ["setup", "capture", "processing", "review"];
  const currentIndex = stepOrder.indexOf(step);
  elements.recordingSteps.forEach((item) => {
    const itemIndex = stepOrder.indexOf(item.dataset.recordingStep);
    item.dataset.status = itemIndex < currentIndex ? "complete" : itemIndex === currentIndex ? "current" : "upcoming";
    if (itemIndex === currentIndex) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });

  const statusByScreen = {
    setup: ["準備前", "is-neutral", "会議設定と参加者を確認してください"],
    consent: ["録音前確認", "is-warning", "端末状態と参加者同意を別々に確認してください"],
    ready: ["準備完了", "is-success", "デモ録音を開始できます"],
    capture:
      recordingDemo.capture === "paused"
        ? ["一時停止", "is-warning", "録音デモを一時停止しています"]
        : ["録音中", "is-danger", "録音中です。停止が主操作です"],
    interrupted: ["録音中断", "is-warning", "明示的な再開または手入力への切替が必要です"],
    processing: ["デモ処理中", "is-progress", "固定サンプルを処理しています"],
    review: ["人による確認", "is-warning", "AI提案を1件ずつ確認してください"],
    error: ["デモエラー", "is-danger", "再試行または手入力へ切り替えてください"],
  };
  const [statusText, statusClass, helper] = statusByScreen[visibleScreen];
  elements.recordingDemoStatus.className = `state-label ${statusClass}`;
  elements.recordingDemoStatus.textContent = statusText;
  elements.recordingWorkflowStatus.textContent = message || helper;

  updateRecordingSummary();
  updateRecordingTimer();
  elements.participantsPanel.hidden = !["setup", "consent", "ready"].includes(visibleScreen) && document.body.dataset.minutesMode !== "manual";

  elements.devicePermissionStatus.className = `state-label ${
    recordingDemo.permission === "supported"
      ? "is-success"
      : recordingDemo.permission === "denied"
        ? "is-danger"
        : "is-neutral"
  }`;
  elements.devicePermissionStatus.textContent =
    recordingDemo.permission === "supported"
      ? "デモ上で利用可能"
      : recordingDemo.permission === "denied"
        ? "利用不可"
        : "未確認";
  elements.participantConsentCheck.checked = recordingDemo.consent === "confirmed";
  elements.participantConsentNote.textContent =
    recordingDemo.consent === "stale"
      ? "参加者または会議設定が変わりました。録音開始前に同意を再確認してください。"
      : "参加者の選択だけでは同意済みになりません。参加者が変わると再確認が必要です。";
  elements.participantConsentNote.classList.toggle("is-stale", recordingDemo.consent === "stale");
  elements.recordingConsentReady.disabled = !(recordingDemo.permission === "supported" && recordingDemo.consent === "confirmed");

  const isPaused = recordingDemo.capture === "paused";
  elements.captureStateLabel.className = `state-label ${isPaused ? "is-warning" : "is-danger"}`;
  elements.captureStateLabel.textContent = isPaused ? "一時停止" : "録音中";
  elements.recordingPause.textContent = isPaused ? "録音を再開" : "一時停止";
  elements.recordingNetworkState.textContent = recordingDemo.offline
    ? "オフライン想定・録音デモは継続・送信待ちデータなし"
    : "オンライン想定・音声データなし";
  elements.recordingNetworkState.classList.toggle("is-offline", recordingDemo.offline);
  elements.processingSteps.forEach((item) => {
    const order = ["prepare", "transcript", "extract"];
    const itemIndex = order.indexOf(item.dataset.processingStep);
    const activeIndex = order.indexOf(recordingDemo.processingStep);
    item.dataset.status = itemIndex < activeIndex ? "complete" : itemIndex === activeIndex ? "current" : "upcoming";
  });
  elements.processingStatus.textContent =
    recordingDemo.processingStep === "prepare"
      ? "音声準備を再現しています"
      : recordingDemo.processingStep === "transcript"
        ? "固定文字起こしを準備しています"
        : "決定事項とtaskの提案を準備しています";
  elements.processingScreen.setAttribute("aria-busy", String(visibleScreen === "processing"));

  if (visibleScreen === "review") renderReviewSuggestions();
  elements.recordingDraftStatus.textContent =
    recordingDemo.draft === "saved"
      ? "このページを開いている間だけ、デモ下書きを保持しています"
      : "デモ下書きはまだ保持していません";
  elements.recordingSaveDraft.disabled = recordingDemo.draft === "saved";
  elements.recordingSaveDraft.textContent = recordingDemo.draft === "saved" ? "デモ下書き保持中" : "デモ下書きを保持";
  if (visibleScreen === "error") renderRecordingError();

  if (document.body.dataset.minutesMode !== "manual") {
    elements.inputStatus.className = `status-pill recording-header-status ${statusClass}`;
    elements.inputStatus.querySelector("span:last-child").textContent = statusText;
  }
}

function setRecordingScreen(screen, { focus = true, message = "" } = {}) {
  if (recordingDemo.screen === "processing" && screen !== "processing") stopProcessingDemo();
  if (screen !== "capture") stopCaptureTimer();
  recordingDemo.screen = screen;
  renderRecordingDemo(message);
  if (!focus) return;
  window.requestAnimationFrame(() => {
    const heading = elements.recordingScreens
      .find((candidate) => candidate.dataset.recordingScreen === screen)
      ?.querySelector("h3");
    heading?.focus({ preventScroll: false });
  });
}

function beginRecordingDemo({ resetElapsed = true } = {}) {
  stopProcessingDemo();
  if (resetElapsed) recordingDemo.elapsedSeconds = 0;
  recordingDemo.capture = "recording";
  recordingDemo.errorKind = "";
  setRecordingScreen("capture", { message: "録音中です。停止が主操作です" });
  startCaptureTimer();
}

function toggleRecordingPause() {
  if (recordingDemo.capture === "paused") {
    recordingDemo.capture = "recording";
    startCaptureTimer();
    renderRecordingDemo("録音デモを再開しました");
    return;
  }
  recordingDemo.capture = "paused";
  stopCaptureTimer();
  renderRecordingDemo("録音デモを一時停止しました");
}

function interruptRecordingDemo(reason = "着信や画面ロックを想定したデモ中断です。取得済み音声はありません。") {
  stopCaptureTimer();
  recordingDemo.capture = "interrupted";
  elements.recordingInterruptionReason.textContent = reason;
  setRecordingScreen("interrupted", { message: "録音デモを中断しました。自動では再開しません" });
}

function runProcessingDemo({ autoAdvance = true } = {}) {
  stopCaptureTimer();
  stopProcessingDemo();
  recordingDemo.capture = "stopped";
  recordingDemo.processingStep = "prepare";
  recordingDemo.errorKind = "";
  setRecordingScreen("processing", { message: "固定サンプルの処理を開始しました" });
  if (!autoAdvance) return;
  recordingDemo.processingTimers.push(
    window.setTimeout(() => {
      recordingDemo.processingStep = "transcript";
      renderRecordingDemo();
    }, 450),
    window.setTimeout(() => {
      recordingDemo.processingStep = "extract";
      renderRecordingDemo();
    }, 900),
    window.setTimeout(() => {
      recordingDemo.suggestions = createReviewSuggestions();
      recordingDemo.draft = "idle";
      setRecordingScreen("review", { message: "AI提案を人が確認してください" });
    }, 1400),
  );
}

function showRecordingError(kind) {
  stopCaptureTimer();
  stopProcessingDemo();
  recordingDemo.errorKind = kind;
  recordingDemo.permission = kind === "permission-denied" ? "denied" : recordingDemo.permission;
  setRecordingScreen("error", { message: "録音デモを続けられません" });
}

function resetRecordingDemo() {
  stopCaptureTimer();
  stopProcessingDemo();
  recordingDemo.capture = "idle";
  recordingDemo.permission = "required";
  recordingDemo.consent = "required";
  recordingDemo.elapsedSeconds = 0;
  recordingDemo.processingStep = "prepare";
  recordingDemo.errorKind = "";
  recordingDemo.draft = "idle";
  recordingDemo.suggestions = createReviewSuggestions();
  elements.participantConsentCheck.checked = false;
  setRecordingScreen("setup", { message: "会議設定と参加者を確認してください" });
}

function openManualFallback() {
  if (recordingDemo.capture === "recording" || recordingDemo.capture === "paused") {
    interruptRecordingDemo("手入力へ切り替えたため録音デモを中断しました。取得済み音声はありません。");
  }
  stopProcessingDemo();
  document.body.dataset.minutesMode = "manual";
  elements.manualFallback.open = true;
  elements.participantsPanel.hidden = false;
  renderState("4区分の手入力へ切り替えました");
  window.requestAnimationFrame(() => {
    elements.sectionInputs[0]?.focus({ preventScroll: false });
  });
}

function returnToRecordingDemo() {
  document.body.dataset.minutesMode = "recording";
  elements.manualFallback.open = false;
  renderRecordingDemo("録音デモへ戻りました");
  window.requestAnimationFrame(() => elements.recordingWorkflow.focus?.({ preventScroll: false }));
}

function handleRecordingContextChange() {
  updateRecordingSummary();
  if (recordingDemo.consent !== "confirmed") return;
  recordingDemo.consent = "stale";
  elements.participantConsentCheck.checked = false;
  if (recordingDemo.capture === "recording" || recordingDemo.capture === "paused") {
    interruptRecordingDemo("参加者または会議設定が変わったため中断しました。同意を再確認してください。");
    return;
  }
  if (!["setup", "consent"].includes(recordingDemo.screen)) {
    setRecordingScreen("consent", { message: "参加者または会議設定が変わりました。同意を再確認してください" });
  } else {
    renderRecordingDemo("参加者または会議設定が変わりました。同意を再確認してください");
  }
}

function applyRecordingScenario(scenario) {
  document.body.dataset.minutesMode = "recording";
  elements.manualFallback.open = false;
  stopCaptureTimer();
  stopProcessingDemo();
  recordingDemo.errorKind = "";
  recordingDemo.elapsedSeconds = 83;
  recordingDemo.permission = "supported";
  recordingDemo.consent = "confirmed";
  recordingDemo.capture = "idle";
  recordingDemo.processingStep = "prepare";
  if (scenario === "setup") {
    resetRecordingDemo();
  } else if (scenario === "consent") {
    recordingDemo.permission = "required";
    recordingDemo.consent = "required";
    setRecordingScreen("consent");
  } else if (scenario === "ready") {
    setRecordingScreen("ready");
  } else if (scenario === "recording") {
    beginRecordingDemo({ resetElapsed: false });
  } else if (scenario === "paused") {
    recordingDemo.capture = "paused";
    setRecordingScreen("capture");
  } else if (scenario === "interrupted") {
    interruptRecordingDemo();
  } else if (scenario === "processing") {
    runProcessingDemo({ autoAdvance: false });
  } else if (scenario === "review") {
    recordingDemo.suggestions = createReviewSuggestions();
    recordingDemo.draft = "idle";
    setRecordingScreen("review");
  } else if (scenario === "permission-denied") {
    showRecordingError("permission-denied");
  } else if (scenario === "processing-error") {
    showRecordingError("processing-error");
  }
}

function renderState(actionMessage = "") {
  const isGenerating = state.generation === "generating";
  const isSaving = state.save === "saving";
  const hasResult = Boolean(state.generatedText);
  const sourceHasContent = hasSourceContent();
  const isSourceStage = state.resultStage === "source";
  const sourceReadyForAi = isSourceStage && sourceHasContent && state.save === "saved";
  const isEditing = state.generation === "editing";
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

  elements.saveButton.disabled = (isSourceStage ? !sourceHasContent : !hasResult) || state.stale || state.save === "saved" || isGenerating || isSaving || isEditing;
  elements.saveButton.classList.toggle("is-loading", isSaving);
  elements.saveButton.setAttribute("aria-busy", String(isSaving));
  elements.editResultButton.disabled = isSourceStage || !hasResult || state.stale || isGenerating || isSaving;
  elements.meetingTypeSelect.disabled = isGenerating || isSaving;
  if (elements.generatedText.value !== state.generatedText) elements.generatedText.value = state.generatedText;
  elements.generatedText.readOnly = !isEditing;
  elements.editResultButton.textContent = isEditing ? "編集を終了" : "編集";
  elements.editResultButton.classList.toggle("button-primary", isEditing);
  elements.editResultButton.classList.toggle("button-secondary", !isEditing);
  elements.saveButton.textContent = isSourceStage ? "入力を保存" : "清書を保存";
  elements.overwriteNote.hidden = isSourceStage || !hasResult;

  if (state.stale) {
    elements.generationBadge.textContent = "要再清書";
    elements.overwriteNote.textContent = "入力が変わりました。保存前に再清書してください。再清書すると現在の清書を上書きします。";
    elements.resultFlowNote.textContent = "記入者が変わりました。再清書が必要です";
  } else if (state.generation === "generating") {
    elements.generationBadge.textContent = "清書中";
    elements.resultFlowNote.textContent = "AI清書中です";
  } else if (state.generation === "generation-error") {
    elements.generationBadge.textContent = "清書エラー";
    elements.resultFlowNote.textContent = "AI清書を再試行できます";
  } else if (state.generation === "editing") {
    elements.generationBadge.textContent = "手動編集中";
    elements.overwriteNote.textContent = "再清書すると、現在の手動編集を上書きします。";
    elements.resultFlowNote.textContent = "直接編集できます";
  } else if (isSourceStage) {
    elements.generationBadge.textContent = sourceHasContent ? "入力内容" : "入力待ち";
    elements.resultFlowNote.textContent = sourceReadyForAi
      ? "入力保存済み。AI清書できます"
      : sourceHasContent
        ? "入力内容を保存してください"
        : "4区分へ入力して保存してください";
  } else if (state.resultStage === "manual") {
    elements.generationBadge.textContent = "手動編集済み";
    elements.overwriteNote.textContent = "再清書すると、現在の手動編集を上書きします。";
    elements.resultFlowNote.textContent = "手動編集済みです";
  } else if (state.generation === "generated") {
    elements.generationBadge.textContent = "清書済み";
    elements.overwriteNote.textContent = "再清書すると、現在の清書を上書きします。";
    elements.resultFlowNote.textContent = "清書済み。必要なら編集できます";
  } else {
    elements.generationBadge.textContent = "清書前";
    elements.resultFlowNote.textContent = "4区分を保存してください";
  }

  elements.saveStatus.className = "save-status";
  if (state.save === "saving") {
    elements.saveStatus.classList.add("is-saving");
    elements.saveStatus.textContent = "このタブに一時保存中";
  } else if (state.save === "saved") {
    elements.saveStatus.classList.add("is-saved");
    elements.saveStatus.textContent = isSourceStage
      ? "入力内容を保存しました（このタブを閉じると消えます）"
      : "清書を保存しました（このタブを閉じると消えます）";
  } else if (state.save === "save-error") {
    elements.saveStatus.classList.add("is-error");
    elements.saveStatus.textContent = isSourceStage ? "入力未保存・内容は保持しています" : "清書未保存・内容は保持しています";
  } else {
    elements.saveStatus.textContent = state.stale
      ? "再清書後に保存できます"
      : isSourceStage
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
  renderState("このタブに一時保存中");
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
    renderState(state.resultStage === "source" ? "入力内容を一時保存しました。AI清書を実行できます" : "このタブに一時保存しました");
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

function getInfoPopover(trigger) {
  return trigger ? document.getElementById(trigger.getAttribute("aria-controls")) : null;
}

function clearInfoTimers() {
  window.clearTimeout(infoOpenTimer);
  window.clearTimeout(infoCloseTimer);
  infoOpenTimer = null;
  infoCloseTimer = null;
}

function positionInfoPopover(trigger, popover) {
  const viewportGap = 8;
  const triggerGap = 6;
  popover.style.visibility = "hidden";
  popover.hidden = false;
  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const left = Math.min(
    Math.max(viewportGap, triggerRect.left),
    window.innerWidth - popoverRect.width - viewportGap,
  );
  const preferredTop = triggerRect.bottom + triggerGap;
  const top = preferredTop + popoverRect.height <= window.innerHeight - viewportGap
    ? preferredTop
    : Math.max(viewportGap, triggerRect.top - popoverRect.height - triggerGap);
  popover.style.left = `${Math.round(left)}px`;
  popover.style.top = `${Math.round(top)}px`;
  popover.style.visibility = "visible";
}

function closeInfoPopover({ restoreFocus = false } = {}) {
  clearInfoTimers();
  if (!activeInfoTrigger) return;
  const trigger = activeInfoTrigger;
  const popover = getInfoPopover(trigger);
  trigger.setAttribute("aria-expanded", "false");
  if (popover) {
    popover.hidden = true;
    popover.style.removeProperty("left");
    popover.style.removeProperty("top");
    popover.style.removeProperty("visibility");
  }
  activeInfoTrigger = null;
  if (restoreFocus) trigger.focus({ preventScroll: true });
}

function openInfoPopover(trigger) {
  clearInfoTimers();
  if (activeInfoTrigger && activeInfoTrigger !== trigger) closeInfoPopover();
  const popover = getInfoPopover(trigger);
  if (!popover) return;
  activeInfoTrigger = trigger;
  trigger.setAttribute("aria-expanded", "true");
  positionInfoPopover(trigger, popover);
}

function scheduleInfoClose(trigger) {
  window.clearTimeout(infoCloseTimer);
  infoCloseTimer = window.setTimeout(() => {
    const popover = getInfoPopover(trigger);
    if (document.activeElement !== trigger && !popover?.matches(":hover")) closeInfoPopover();
  }, 100);
}

function bindInfoAffordances() {
  elements.infoTriggers.forEach((trigger) => {
    const popover = getInfoPopover(trigger);
    trigger.addEventListener("pointerdown", () => {
      suppressInfoFocusOpen = true;
    });
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      suppressInfoFocusOpen = false;
      if (isOpen) closeInfoPopover();
      else openInfoPopover(trigger);
    });
    trigger.addEventListener("focus", () => {
      if (!suppressInfoFocusOpen) openInfoPopover(trigger);
    });
    trigger.addEventListener("blur", () => {
      suppressInfoFocusOpen = false;
      scheduleInfoClose(trigger);
    });
    trigger.addEventListener("mouseenter", () => {
      clearInfoTimers();
      infoOpenTimer = window.setTimeout(() => openInfoPopover(trigger), 800);
    });
    trigger.addEventListener("mouseleave", () => scheduleInfoClose(trigger));
    popover?.addEventListener("mouseenter", clearInfoTimers);
    popover?.addEventListener("mouseleave", () => scheduleInfoClose(trigger));
  });
  document.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".info-affordance")) return;
    closeInfoPopover();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !activeInfoTrigger) return;
    event.preventDefault();
    closeInfoPopover({ restoreFocus: true });
  });
  window.addEventListener("resize", () => closeInfoPopover());
  window.addEventListener("scroll", () => closeInfoPopover(), { passive: true });
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
  bindInfoAffordances();
  elements.recordingEnterConsent.addEventListener("click", () => {
    setRecordingScreen("consent", { message: "端末状態と参加者同意を確認してください" });
  });
  elements.demoDeviceCheck.addEventListener("click", () => {
    recordingDemo.permission = "supported";
    renderRecordingDemo("端末利用可否をデモ上で確認しました");
  });
  elements.participantConsentCheck.addEventListener("change", () => {
    recordingDemo.consent = elements.participantConsentCheck.checked ? "confirmed" : "required";
    renderRecordingDemo(elements.participantConsentCheck.checked ? "参加者の録音同意を確認しました" : "参加者の録音同意が未確認です");
  });
  elements.recordingConsentReady.addEventListener("click", () => {
    if (recordingDemo.permission !== "supported" || recordingDemo.consent !== "confirmed") return;
    setRecordingScreen("ready", { message: "録音デモの準備が完了しました" });
  });
  elements.recordingConsentBack.addEventListener("click", () => setRecordingScreen("setup"));
  elements.recordingReadyBack.addEventListener("click", () => setRecordingScreen("consent"));
  elements.recordingStartDemo.addEventListener("click", () => beginRecordingDemo());
  elements.recordingPause.addEventListener("click", toggleRecordingPause);
  elements.recordingStop.addEventListener("click", () => runProcessingDemo());
  elements.recordingInterrupt.addEventListener("click", () => interruptRecordingDemo());
  elements.recordingResumeInterrupted.addEventListener("click", () => beginRecordingDemo({ resetElapsed: false }));
  elements.recordingProcessInterrupted.addEventListener("click", () => runProcessingDemo());
  elements.recordingQuickNote.addEventListener("input", () => {
    elements.recordingWorkflowStatus.textContent = "簡易メモをこのページ内に保持しています";
  });
  elements.recordingSaveDraft.addEventListener("click", () => {
    recordingDemo.draft = "saved";
    renderRecordingDemo("デモ下書きをこのページ内に保持しました");
  });
  elements.reviewSuggestionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-action]");
    if (!button) return;
    const suggestion = recordingDemo.suggestions.find(({ id }) => id === button.dataset.suggestionId);
    if (!suggestion) return;
    if (button.dataset.reviewAction === "confirm") {
      suggestion.status = "confirmed";
      suggestion.editing = false;
      suggestion.provenance = suggestion.provenance === "人が編集" ? "人が編集・確認" : "人が確認";
    } else if (button.dataset.reviewAction === "reject") {
      suggestion.status = "rejected";
      suggestion.editing = false;
      suggestion.provenance = "人が却下";
    } else if (button.dataset.reviewAction === "edit") {
      suggestion.editing = true;
      suggestion.editValue = suggestion.text;
    } else if (button.dataset.reviewAction === "save-edit") {
      const field = elements.reviewSuggestionList.querySelector(`[data-review-edit-field="${suggestion.id}"]`);
      const nextText = field?.value.trim();
      if (nextText) suggestion.text = nextText;
      suggestion.editValue = suggestion.text;
      suggestion.status = "pending";
      suggestion.editing = false;
      suggestion.provenance = "人が編集";
    } else if (button.dataset.reviewAction === "cancel-edit") {
      suggestion.editing = false;
      suggestion.editValue = suggestion.text;
    }
    recordingDemo.draft = "idle";
    renderRecordingDemo(`${suggestion.kind}の確認状態を更新しました`);
    window.requestAnimationFrame(() => {
      elements.reviewSuggestionList
        .querySelector(`[data-suggestion-id="${suggestion.id}"] [data-review-action]`)
        ?.focus({ preventScroll: true });
    });
  });
  elements.recordingErrorRetry.addEventListener("click", () => {
    if (recordingDemo.errorKind === "processing-error") runProcessingDemo();
    else {
      recordingDemo.permission = "required";
      recordingDemo.consent = "required";
      setRecordingScreen(recordingDemo.errorKind === "unsupported" ? "setup" : "consent");
    }
  });
  elements.recordingErrorReset.addEventListener("click", resetRecordingDemo);
  elements.openManualButtons.forEach((button) => button.addEventListener("click", openManualFallback));
  elements.returnToRecording.addEventListener("click", returnToRecordingDemo);
  elements.manualFallback.addEventListener("toggle", () => {
    if (elements.manualFallback.open && document.body.dataset.minutesMode !== "manual") {
      openManualFallback();
    } else if (!elements.manualFallback.open && document.body.dataset.minutesMode === "manual") {
      returnToRecordingDemo();
    }
  });
  elements.recordingScenarioApply.addEventListener("click", () => applyRecordingScenario(elements.recordingScenarioSelect.value));
  elements.recordingOfflineToggle.addEventListener("click", () => {
    recordingDemo.offline = !recordingDemo.offline;
    elements.recordingOfflineToggle.setAttribute("aria-pressed", String(recordingDemo.offline));
    elements.recordingOfflineToggle.textContent = recordingDemo.offline ? "オンラインへ戻す" : "オフラインを再現";
    renderRecordingDemo(recordingDemo.offline ? "オフライン状態を再現しています" : "オンライン想定へ戻しました");
  });
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
    handleRecordingContextChange();
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
    handleRecordingContextChange();
  });

  elements.participantChips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-participant]");
    if (!button) return;
    state.selectedParticipantIds.delete(button.dataset.removeParticipant);
    renderParticipantOptions();
    renderParticipants();
    markSourceDirty("参加者を外しました");
    handleRecordingContextChange();
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
  document.body.dataset.minutesMode = "recording";
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
  const searchParams = new URLSearchParams(window.location.search);
  const legacyQaRequested = [...searchParams.keys()].some((key) => key.startsWith("density-v4"));
  if (legacyQaRequested) openManualFallback();
  else renderRecordingDemo("会議設定と参加者を確認してください");
}

initialize();
