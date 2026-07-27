const HISTORY_STORAGE_KEY = "bsystem.minutes.recording-history.v1";
const HISTORY_LIMIT = 100;
const DEMO_DATE = "2026-07-21";
const CONTACT_FORM_URL = "https://northern-hearing-e36.notion.site/ebd//55559c2fd62e828c8c318163c97e7d62";

const MEETING_TYPES = [
  { id: "morning", label: "朝礼" },
  { id: "evening", label: "夕礼" },
  { id: "meeting", label: "ミーティング" },
];

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

const REVIEW_FIXTURES = [
  {
    id: "decision-1",
    kind: "決定事項",
    text: "各部署の夏期運営の注意点を次回朝礼で確認する",
    sourceTime: "00:18",
    sourceExcerpt: "来週の朝礼までに、各部署から夏期運営の注意点を持ち寄りましょう。",
    owner: "未割当",
    due: "期限未確認",
  },
  {
    id: "task-1",
    kind: "タスク",
    text: "各部署の注意点を整理する",
    sourceTime: "00:42",
    sourceExcerpt: "担当と期限はこの場では決めず、次回確認します。",
    owner: "未割当",
    due: "期限未確認",
  },
];

const TRANSCRIPT = [
  { time: "00:18", text: "来週の朝礼までに、各部署から夏期運営の注意点を持ち寄りましょう。" },
  { time: "00:42", text: "担当と期限はこの場では決めず、次回確認します。" },
];

const DEMO_HISTORY = [
  {
    id: "demo-01",
    savedAt: "2026-07-26T09:12:00+09:00",
    meetingDate: "2026-07-26",
    meetingType: "morning",
    meetingLabel: "朝礼",
    author: "田中",
    participants: ["田中", "佐藤", "高橋"],
    durationSeconds: 732,
    quickNote: "週初めの準備状況を確認",
    suggestions: [
      { kind: "決定事項", text: "各部署の週次予定を午前中に共有する", owner: "各部署", due: "本日中" },
      { kind: "確認事項", text: "夏期運営の注意点を次回朝礼で確認する", owner: "田中", due: "次回朝礼" },
    ],
    transcript: [
      { time: "01:05", text: "今週の予定と注意点を部署ごとに共有しました。" },
      { time: "08:40", text: "夏期運営の確認事項は次回も継続して扱います。" },
    ],
    isSample: true,
  },
  {
    id: "demo-02",
    savedAt: "2026-07-25T17:38:00+09:00",
    meetingDate: "2026-07-25",
    meetingType: "evening",
    meetingLabel: "夕礼",
    author: "佐藤",
    participants: ["佐藤", "伊藤", "山本"],
    durationSeconds: 615,
    quickNote: "週末の申し送り",
    suggestions: [
      { kind: "申し送り", text: "週末対応の引き継ぎ事項を共有する", owner: "佐藤", due: "本日中" },
      { kind: "確認事項", text: "設備点検の結果を月曜日に確認する", owner: "山本", due: "7月27日" },
    ],
    transcript: [{ time: "03:12", text: "週末対応と設備点検の申し送りを行いました。" }],
    isSample: true,
  },
  {
    id: "demo-03",
    savedAt: "2026-07-24T14:05:00+09:00",
    meetingDate: "2026-07-24",
    meetingType: "meeting",
    meetingLabel: "ミーティング",
    author: "田中",
    participants: ["田中", "高橋", "中村", "加藤"],
    durationSeconds: 2840,
    quickNote: "8月の運営計画",
    suggestions: [
      { kind: "決定事項", text: "8月の運営計画案を部署別に作成する", owner: "各部署", due: "7月31日" },
      { kind: "タスク", text: "全体案を取りまとめる", owner: "加藤", due: "8月3日" },
    ],
    transcript: [{ time: "12:20", text: "8月の運営計画について、部署別の作業を確認しました。" }],
    isSample: true,
  },
  {
    id: "demo-04",
    savedAt: "2026-07-23T08:58:00+09:00",
    meetingDate: "2026-07-23",
    meetingType: "morning",
    meetingLabel: "朝礼",
    author: "高橋",
    participants: ["高橋", "伊藤", "渡辺"],
    durationSeconds: 488,
    quickNote: "レストラン予約状況",
    suggestions: [
      { kind: "確認事項", text: "団体予約の席配置を確認する", owner: "高橋", due: "本日12時" },
      { kind: "タスク", text: "仕込み数量を予約数に合わせて調整する", owner: "伊藤", due: "本日中" },
    ],
    transcript: [{ time: "02:42", text: "団体予約と仕込み数量について確認しました。" }],
    isSample: true,
  },
  {
    id: "demo-05",
    savedAt: "2026-07-22T17:22:00+09:00",
    meetingDate: "2026-07-22",
    meetingType: "evening",
    meetingLabel: "夕礼",
    author: "山本",
    participants: ["山本", "中村", "小林"],
    durationSeconds: 544,
    quickNote: "農園の作業進捗",
    suggestions: [
      { kind: "申し送り", text: "翌日の収穫区画と担当を共有する", owner: "山本", due: "翌朝" },
      { kind: "確認事項", text: "資材の在庫数を確認する", owner: "小林", due: "7月23日" },
    ],
    transcript: [{ time: "04:18", text: "収穫区画、担当、資材在庫について申し送りました。" }],
    isSample: true,
  },
  {
    id: "demo-06",
    savedAt: "2026-07-21T13:45:00+09:00",
    meetingDate: "2026-07-21",
    meetingType: "meeting",
    meetingLabel: "ミーティング",
    author: "加藤",
    participants: ["田中", "佐藤", "加藤", "吉田"],
    durationSeconds: 2215,
    quickNote: "業務改善案の確認",
    suggestions: [
      { kind: "決定事項", text: "改善案を試行し、1週間後に結果を確認する", owner: "吉田", due: "7月28日" },
      { kind: "タスク", text: "試行対象の手順を整理する", owner: "田中", due: "7月22日" },
    ],
    transcript: [{ time: "10:36", text: "業務改善案の試行範囲と確認日を決定しました。" }],
    isSample: true,
  },
  {
    id: "demo-07",
    savedAt: "2026-07-20T09:06:00+09:00",
    meetingDate: "2026-07-20",
    meetingType: "morning",
    meetingLabel: "朝礼",
    author: "田中",
    participants: ["田中", "鈴木", "渡辺", "小林"],
    durationSeconds: 679,
    quickNote: "連休明けの確認",
    suggestions: [
      { kind: "確認事項", text: "各部署の当日予定を共有する", owner: "各部署", due: "朝礼後" },
      { kind: "申し送り", text: "来客予定を受付へ共有する", owner: "鈴木", due: "本日9時30分" },
    ],
    transcript: [{ time: "01:28", text: "連休明けの予定と来客対応を確認しました。" }],
    isSample: true,
  },
  {
    id: "demo-08",
    savedAt: "2026-07-18T17:14:00+09:00",
    meetingDate: "2026-07-18",
    meetingType: "evening",
    meetingLabel: "夕礼",
    author: "伊藤",
    participants: ["高橋", "伊藤", "渡辺"],
    durationSeconds: 431,
    quickNote: "営業終了後の共有",
    suggestions: [
      { kind: "申し送り", text: "翌日の予約変更を担当者へ共有する", owner: "伊藤", due: "本日中" },
      { kind: "確認事項", text: "清掃箇所の最終確認を行う", owner: "渡辺", due: "退勤前" },
    ],
    transcript: [{ time: "02:55", text: "予約変更と清掃状況を確認しました。" }],
    isSample: true,
  },
  {
    id: "demo-09",
    savedAt: "2026-07-17T15:30:00+09:00",
    meetingDate: "2026-07-17",
    meetingType: "meeting",
    meetingLabel: "ミーティング",
    author: "吉田",
    participants: ["加藤", "吉田", "山田"],
    durationSeconds: 1962,
    quickNote: "安全管理の定例確認",
    suggestions: [
      { kind: "決定事項", text: "安全確認表の運用を継続する", owner: "吉田", due: "継続" },
      { kind: "タスク", text: "次回の点検対象を一覧化する", owner: "山田", due: "7月24日" },
    ],
    transcript: [{ time: "08:14", text: "安全確認表と次回点検について確認しました。" }],
    isSample: true,
  },
  {
    id: "demo-10",
    savedAt: "2026-07-16T09:20:00+09:00",
    meetingDate: "2026-07-16",
    meetingType: "morning",
    meetingLabel: "朝礼",
    author: "佐藤",
    participants: ["田中", "佐藤", "中村"],
    durationSeconds: 805,
    quickNote: "天候対応と作業順",
    suggestions: [
      { kind: "決定事項", text: "天候を確認して屋外作業の順番を調整する", owner: "中村", due: "本日中" },
      { kind: "確認事項", text: "変更後の予定を全体へ共有する", owner: "佐藤", due: "朝礼後" },
    ],
    transcript: [{ time: "05:08", text: "天候に合わせた作業順の変更を確認しました。" }],
    isSample: true,
  },
];

const state = {
  view: "create",
  selectedParticipantIds: new Set(),
  participantCategory: PARTICIPANT_CATEGORIES[0].id,
  participantSearch: "",
  history: [],
  selectedHistoryId: null,
  historyFilters: {
    category: "all",
    keyword: "",
    period: "all",
    dateFrom: "",
    dateTo: "",
    sort: "newest",
  },
};

function createSuggestions() {
  return REVIEW_FIXTURES.map((item) => ({
    ...item,
    status: "pending",
    editing: false,
    editValue: item.text,
  }));
}

const recording = {
  screen: "setup",
  capture: "idle",
  elapsedSeconds: 0,
  timerId: null,
  processingTimers: [],
  processingStep: "prepare",
  draft: "idle",
  suggestions: createSuggestions(),
};

const elements = {
  appShell: document.querySelector(".app-shell"),
  pageTitle: document.querySelector("#page-title"),
  creationWorkspace: document.querySelector("#creation-workspace"),
  historyWorkspace: document.querySelector("#history-workspace"),
  historyViewTrigger: document.querySelector("#history-view-trigger"),
  historyViewTriggerLabel: document.querySelector("#history-view-trigger-label"),
  historyCreateMinutes: document.querySelector("#history-create-minutes"),
  historyPageHeading: document.querySelector("#history-page-heading"),
  inputStatus: document.querySelector("#input-status"),
  authorOutput: document.querySelector("#author-output"),
  meetingDateLabel: document.querySelector("#meeting-date-label"),
  meetingTypeSelect: document.querySelector("#meeting-type-select"),
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
  recordingStartDemo: document.querySelector("#recording-start-demo"),
  recordingStartReason: document.querySelector("#recording-start-reason"),
  captureStateLabel: document.querySelector("#capture-state-label"),
  captureMeetingLabel: document.querySelector("#capture-meeting-label"),
  recordingTimer: document.querySelector("#recording-timer"),
  recordingNetworkState: document.querySelector("#recording-network-state"),
  recordingQuickNote: document.querySelector("#recording-quick-note"),
  recordingStop: document.querySelector("#recording-stop"),
  recordingPause: document.querySelector("#recording-pause"),
  recordingPauseIcon: document.querySelector("#recording-pause-icon"),
  recordingPauseLabel: document.querySelector("#recording-pause-label"),
  recordingInterruptionReason: document.querySelector("#recording-interruption-reason"),
  recordingResumeInterrupted: document.querySelector("#recording-resume-interrupted"),
  recordingProcessInterrupted: document.querySelector("#recording-process-interrupted"),
  processingSteps: [...document.querySelectorAll("[data-processing-step]")],
  processingStatus: document.querySelector("#processing-status"),
  recordingReviewTitle: document.querySelector("#recording-review-title"),
  reviewStateLabel: document.querySelector("#review-state-label"),
  reviewPendingCount: document.querySelector("#review-pending-count"),
  reviewSuggestionList: document.querySelector("#review-suggestion-list"),
  reviewCompletedSummary: document.querySelector("#review-completed-summary"),
  reviewSaveArea: document.querySelector("#review-save-area"),
  recordingDraftStatus: document.querySelector("#recording-draft-status"),
  recordingSaveDraft: document.querySelector("#recording-save-draft"),
  recordingErrorRetry: document.querySelector("#recording-error-retry"),
  recordingErrorReset: document.querySelector("#recording-error-reset"),
  historyCount: document.querySelector("#recording-history-count"),
  historyEmpty: document.querySelector("#recording-history-empty"),
  historyList: document.querySelector("#recording-history-list"),
  historyListView: document.querySelector("#recording-history-list-view"),
  historyDetail: document.querySelector("#recording-history-detail"),
  historyDetailTitle: document.querySelector("#recording-history-detail-title"),
  historyDetailContent: document.querySelector("#recording-history-detail-content"),
  historyBack: document.querySelector("#recording-history-back"),
  historyCategoryButtons: [...document.querySelectorAll("[data-history-category]")],
  historyKeyword: document.querySelector("#history-keyword"),
  historyPeriod: document.querySelector("#history-period"),
  historyDateFrom: document.querySelector("#history-date-from"),
  historyDateTo: document.querySelector("#history-date-to"),
  historySort: document.querySelector("#history-sort"),
  historyFilterReset: document.querySelector("#history-filter-reset"),
  historyFilterStatus: document.querySelector("#history-filter-status"),
  infoTriggers: [...document.querySelectorAll("[data-info-trigger]")],
  mobileMenuTrigger: document.querySelector("#mobile-menu-trigger"),
  mobileMenuScrim: document.querySelector("#mobile-menu-scrim"),
  mobileMenuDrawer: document.querySelector("#mobile-menu-drawer"),
  mobileMenuClose: document.querySelector("[data-mobile-menu-close]"),
  mobileMenuCurrent: document.querySelector("[data-mobile-menu-current]"),
  minutesHomeLinks: [...document.querySelectorAll("[data-minutes-home]")],
  contactTriggers: [...document.querySelectorAll("[data-contact-trigger]")],
  contactDialog: document.querySelector("#contact-dialog"),
  contactDialogTitle: document.querySelector("#contact-dialog-title"),
  contactDialogClose: document.querySelector("#contact-dialog-close"),
  contactIframe: document.querySelector("#contact-iframe"),
  contactFallback: document.querySelector("#contact-fallback"),
};

const mobileMenuMedia = window.matchMedia("(max-width: 47.999rem)");
let lastContactTrigger = null;
let restoreMenuAfterContact = false;
let activeInfoTrigger = null;

function meetingTypeLabel() {
  return MEETING_TYPES.find(({ id }) => id === elements.meetingTypeSelect.value)?.label ?? "朝礼";
}

function selectedParticipants() {
  return PARTICIPANTS.filter(({ id }) => state.selectedParticipantIds.has(id));
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function formatSavedDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "日時不明";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatMeetingDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "日付不明";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(date);
}

function renderMeetingTypes() {
  const now = new Date();
  const suggested = now.getHours() < 12 ? "morning" : "evening";
  for (const option of MEETING_TYPES) {
    const node = document.createElement("option");
    node.value = option.id;
    node.textContent = option.label;
    elements.meetingTypeSelect.append(node);
  }
  elements.meetingTypeSelect.value = suggested;
  elements.meetingDateLabel.textContent = "2026/07/21(火)";
  elements.meetingDateLabel.dateTime = DEMO_DATE;
  elements.authorOutput.textContent = "田中";
}

function renderParticipantCategories() {
  elements.participantCategoryTabs.replaceChildren();
  for (const category of PARTICIPANT_CATEGORIES) {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.participantCategory = category.id;
    button.textContent = category.label;
    button.setAttribute("aria-selected", String(category.id === state.participantCategory));
    button.tabIndex = category.id === state.participantCategory ? 0 : -1;
    elements.participantCategoryTabs.append(button);
  }
}

function renderParticipantOptions() {
  const query = state.participantSearch.trim().toLocaleLowerCase("ja");
  const matches = PARTICIPANTS.filter(
    ({ category, name }) => category === state.participantCategory && name.toLocaleLowerCase("ja").includes(query),
  );
  elements.participantOptions.replaceChildren();
  elements.participantSearchEmpty.hidden = matches.length > 0;

  for (const participant of matches) {
    const label = document.createElement("label");
    label.className = "participant-option";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = participant.id;
    checkbox.checked = state.selectedParticipantIds.has(participant.id);
    checkbox.dataset.participantId = participant.id;
    const name = document.createElement("span");
    name.textContent = participant.name;
    label.append(checkbox, name);
    elements.participantOptions.append(label);
  }
}

function renderParticipants() {
  const selected = selectedParticipants();
  elements.participantCount.textContent = `${selected.length}名`;
  elements.participantChips.replaceChildren();

  if (!selected.length) {
    const empty = document.createElement("p");
    empty.className = "participant-empty";
    empty.textContent = "参加者はまだ選択されていません。";
    elements.participantChips.append(empty);
  } else {
    for (const participant of selected) {
      const chip = document.createElement("span");
      chip.className = "participant-chip";
      chip.textContent = participant.name;
      elements.participantChips.append(chip);
    }
  }

  elements.recordingParticipantSummary.textContent = selected.length
    ? `${selected.length}名・${selected.map(({ name }) => name).join("、")}`
    : "0名・未選択";
  renderParticipantOptions();
  renderRecording();
}

function setParticipantMenu(open) {
  const wasOpen = !elements.participantMenu.hidden;
  elements.participantMenu.hidden = !open;
  elements.participantTrigger.setAttribute("aria-expanded", String(open));
  if (open) {
    elements.participantSearch.focus();
  } else if (wasOpen && !elements.creationWorkspace.hidden) {
    elements.participantTrigger.focus();
  }
}

function clearCaptureTimer() {
  if (recording.timerId) {
    window.clearInterval(recording.timerId);
    recording.timerId = null;
  }
}

function startCaptureTimer() {
  clearCaptureTimer();
  recording.timerId = window.setInterval(() => {
    recording.elapsedSeconds += 1;
    elements.recordingTimer.textContent = formatDuration(recording.elapsedSeconds);
  }, 1000);
}

function clearProcessingTimers() {
  for (const timer of recording.processingTimers) window.clearTimeout(timer);
  recording.processingTimers = [];
}

function activeRecordingStep() {
  if (["setup", "capture", "interrupted"].includes(recording.screen)) return "capture";
  if (recording.screen === "processing") return "processing";
  return "review";
}

function setHeaderStatus(label, tone) {
  const text = elements.inputStatus.querySelector("span:last-child");
  text.textContent = label;
  elements.inputStatus.className = `status-pill recording-header-status ${tone}`;
}

function renderRecordingSteps() {
  const order = ["capture", "processing", "review"];
  const active = activeRecordingStep();
  const activeIndex = order.indexOf(active);
  for (const step of elements.recordingSteps) {
    const index = order.indexOf(step.dataset.recordingStep);
    const status = index < activeIndex ? "complete" : index === activeIndex ? "current" : "upcoming";
    step.dataset.status = status;
    if (status === "current") step.setAttribute("aria-current", "step");
    else step.removeAttribute("aria-current");
  }
}

function renderProcessing() {
  const order = ["prepare", "transcript", "extract"];
  const activeIndex = order.indexOf(recording.processingStep);
  for (const item of elements.processingSteps) {
    const index = order.indexOf(item.dataset.processingStep);
    item.dataset.status = index < activeIndex ? "complete" : index === activeIndex ? "current" : "upcoming";
  }
  const copy = {
    prepare: "録音内容をまとめています",
    transcript: "要点を抽出しています",
    extract: "保存できる形に整えています",
  };
  elements.processingStatus.textContent = copy[recording.processingStep];
}

function suggestionStatusLabel(status) {
  if (status === "confirmed") return "採用";
  if (status === "rejected") return "見送り";
  return "未確認";
}

function renderReview() {
  const pending = recording.suggestions.filter(({ status }) => status === "pending");
  const reviewed = recording.suggestions.filter(({ status }) => status !== "pending");
  const current = pending[0];
  elements.reviewSuggestionList.replaceChildren();

  if (current) {
    const article = document.createElement("article");
    article.className = "review-suggestion";
    article.dataset.suggestionId = current.id;

    const header = document.createElement("header");
    const title = document.createElement("h4");
    title.textContent = current.kind;
    const badge = document.createElement("span");
    badge.className = "state-label is-warning";
    badge.textContent = "未確認";
    header.append(title, badge);

    const content = document.createElement("div");
    content.className = "review-suggestion-content";
    if (current.editing) {
      const label = document.createElement("label");
      label.textContent = "内容を編集";
      const textarea = document.createElement("textarea");
      textarea.value = current.editValue;
      textarea.dataset.suggestionEdit = current.id;
      label.append(textarea);
      content.append(label);
    } else {
      const text = document.createElement("p");
      text.className = "review-suggestion-text";
      text.textContent = current.text;
      content.append(text);
    }

    const source = document.createElement("p");
    source.className = "review-source";
    const sourceTime = document.createElement("time");
    sourceTime.textContent = current.sourceTime;
    source.append(sourceTime, ` 「${current.sourceExcerpt}」`);

    const metadata = document.createElement("dl");
    metadata.className = "review-metadata";
    for (const [label, value] of [["担当", current.owner], ["期限", current.due]]) {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      row.append(term, description);
      metadata.append(row);
    }

    const actions = document.createElement("div");
    actions.className = "review-item-actions";
    if (current.editing) {
      actions.append(
        makeReviewButton("修正を反映", "button-primary", "apply", current.id),
        makeReviewButton("戻す", "button-secondary", "cancel", current.id),
      );
    } else {
      actions.append(
        makeReviewButton("採用", "button-primary", "confirm", current.id),
        makeReviewButton("編集", "button-secondary", "edit", current.id),
        makeReviewButton("見送り", "button-quiet", "reject", current.id),
      );
    }

    article.append(header, content, source, metadata, actions);
    elements.reviewSuggestionList.append(article);
  }

  elements.reviewPendingCount.textContent = pending.length
    ? `${reviewed.length + 1} / ${recording.suggestions.length}件目・未確認 ${pending.length}件`
    : `${recording.suggestions.length}件すべて確認済み`;
  elements.reviewCompletedSummary.textContent = reviewed.length
    ? `確認済み：${reviewed.map(({ kind, status }) => `${kind}（${suggestionStatusLabel(status)}）`).join("、")}`
    : "AIの提案を1件ずつ確認してください。";
  elements.reviewCompletedSummary.classList.toggle("is-complete", pending.length === 0);
  elements.reviewSaveArea.hidden = pending.length > 0;
  elements.reviewStateLabel.textContent = pending.length ? "保存前確認" : "確認完了";
  elements.reviewStateLabel.className = `state-label ${pending.length ? "is-warning" : "is-success"}`;
  elements.recordingSaveDraft.disabled = recording.draft === "saved";
  elements.recordingSaveDraft.textContent = recording.draft === "saved" ? "保存済み" : "保存";
  elements.recordingDraftStatus.textContent = recording.draft === "saved"
    ? "保存しました。下の保存済み議事録からいつでも開けます。"
    : "保存前の確認が完了しました";
}

function makeReviewButton(label, className, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `button ${className}`;
  button.textContent = label;
  button.dataset.reviewAction = action;
  button.dataset.suggestionId = id;
  return button;
}

function renderRecording() {
  const selected = selectedParticipants();
  const screen = recording.screen;
  document.body.dataset.minutesMode = "recording";
  document.body.dataset.recordingScreen = screen;
  document.body.dataset.captureState = recording.capture;
  elements.participantsPanel.hidden = screen !== "setup";
  for (const panel of elements.recordingScreens) panel.hidden = panel.dataset.recordingScreen !== screen;

  elements.recordingMeetingSummary.textContent = meetingTypeLabel();
  elements.captureMeetingLabel.textContent = meetingTypeLabel();
  elements.recordingStartDemo.disabled = selected.length === 0;
  elements.recordingStartReason.textContent = selected.length
    ? `${selected.length}名を登録済みです。録音を開始できます。`
    : "上の「参加者を選ぶ」から1名以上登録してください。";

  if (screen === "setup") {
    elements.recordingWorkflowStatus.textContent = selected.length ? "録音を開始できます" : "参加者を選ぶと録音を開始できます";
    elements.recordingDemoStatus.textContent = selected.length ? "開始できます" : "参加者未選択";
    elements.recordingDemoStatus.className = `state-label ${selected.length ? "is-progress" : "is-neutral"}`;
    setHeaderStatus(selected.length ? "録音準備完了" : "参加者未選択", selected.length ? "is-progress" : "is-neutral");
  } else if (screen === "capture") {
    const paused = recording.capture === "paused";
    elements.recordingWorkflowStatus.textContent = paused ? "録音を一時停止しています" : "録音中です";
    elements.recordingDemoStatus.textContent = paused ? "一時停止中" : "録音中";
    elements.recordingDemoStatus.className = `state-label ${paused ? "is-warning" : "is-danger"}`;
    elements.captureStateLabel.textContent = paused ? "一時停止中" : "録音中";
    elements.captureStateLabel.className = `state-label ${paused ? "is-warning" : "is-danger"}`;
    elements.recordingNetworkState.textContent = paused ? "録音は止まっています。再開するとタイマーも進みます" : "録音中です。停止後にAIが内容を整理します";
    elements.recordingPauseLabel.textContent = paused ? "録音を再開" : "一時停止";
    elements.recordingPauseIcon.className = `recording-control-icon ${paused ? "is-play" : "is-pause"}`;
    elements.recordingTimer.textContent = formatDuration(recording.elapsedSeconds);
    setHeaderStatus(paused ? "一時停止中" : "録音中", paused ? "is-warning" : "is-danger");
  } else if (screen === "interrupted") {
    elements.recordingWorkflowStatus.textContent = "設定変更により録音を中断しました";
    elements.recordingDemoStatus.textContent = "録音中断";
    elements.recordingDemoStatus.className = "state-label is-warning";
    setHeaderStatus("録音中断", "is-warning");
  } else if (screen === "processing") {
    elements.recordingWorkflowStatus.textContent = "AIが録音内容を整理しています";
    elements.recordingDemoStatus.textContent = "AI整理中";
    elements.recordingDemoStatus.className = "state-label is-progress";
    setHeaderStatus("AI整理中", "is-progress");
    renderProcessing();
  } else if (screen === "review") {
    elements.recordingWorkflowStatus.textContent = "内容を確認して保存してください";
    elements.recordingDemoStatus.textContent = recording.draft === "saved" ? "保存済み" : "保存前確認";
    elements.recordingDemoStatus.className = `state-label ${recording.draft === "saved" ? "is-success" : "is-warning"}`;
    setHeaderStatus(recording.draft === "saved" ? "保存済み" : "保存前確認", recording.draft === "saved" ? "is-success" : "is-warning");
    renderReview();
  } else {
    elements.recordingWorkflowStatus.textContent = "処理を続けられません";
    elements.recordingDemoStatus.textContent = "エラー";
    elements.recordingDemoStatus.className = "state-label is-danger";
    setHeaderStatus("エラー", "is-danger");
  }
  renderRecordingSteps();
}

function beginRecording() {
  if (!selectedParticipants().length) return;
  recording.screen = "capture";
  recording.capture = "recording";
  recording.elapsedSeconds = 0;
  recording.draft = "idle";
  recording.suggestions = createSuggestions();
  elements.recordingQuickNote.value = "";
  startCaptureTimer();
  renderRecording();
  document.querySelector("#recording-capture-title").focus();
}

function toggleRecordingPause() {
  if (recording.capture === "recording") {
    recording.capture = "paused";
    clearCaptureTimer();
  } else {
    recording.capture = "recording";
    startCaptureTimer();
  }
  renderRecording();
}

function interruptRecording(reason) {
  if (recording.screen !== "capture") return;
  clearCaptureTimer();
  recording.capture = "interrupted";
  recording.screen = "interrupted";
  elements.recordingInterruptionReason.textContent = reason;
  renderRecording();
  document.querySelector("#recording-interrupted-title").focus();
}

function startProcessing() {
  clearCaptureTimer();
  clearProcessingTimers();
  recording.capture = "idle";
  recording.screen = "processing";
  recording.processingStep = "prepare";
  renderRecording();
  document.querySelector("#recording-processing-title").focus();

  const advance = (delay, step) => {
    recording.processingTimers.push(window.setTimeout(() => {
      recording.processingStep = step;
      renderRecording();
    }, delay));
  };
  advance(500, "transcript");
  advance(1000, "extract");
  recording.processingTimers.push(window.setTimeout(() => {
    recording.screen = "review";
    renderRecording();
    elements.recordingReviewTitle.focus();
  }, 1500));
}

function resumeInterrupted() {
  recording.screen = "capture";
  recording.capture = "recording";
  startCaptureTimer();
  renderRecording();
  document.querySelector("#recording-capture-title").focus();
}

function resetRecording() {
  clearCaptureTimer();
  clearProcessingTimers();
  recording.screen = "setup";
  recording.capture = "idle";
  recording.elapsedSeconds = 0;
  recording.processingStep = "prepare";
  recording.draft = "idle";
  recording.suggestions = createSuggestions();
  elements.recordingQuickNote.value = "";
  renderRecording();
  elements.recordingWorkflow.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleReviewAction(button) {
  const suggestion = recording.suggestions.find(({ id }) => id === button.dataset.suggestionId);
  if (!suggestion) return;
  const action = button.dataset.reviewAction;
  if (action === "edit") {
    suggestion.editing = true;
    suggestion.editValue = suggestion.text;
  } else if (action === "cancel") {
    suggestion.editing = false;
    suggestion.editValue = suggestion.text;
  } else if (action === "apply") {
    const field = elements.reviewSuggestionList.querySelector(`[data-suggestion-edit="${suggestion.id}"]`);
    const value = field?.value.trim();
    if (!value) {
      field?.focus();
      return;
    }
    suggestion.text = value;
    suggestion.editValue = value;
    suggestion.editing = false;
    suggestion.status = "confirmed";
  } else if (action === "confirm") {
    suggestion.status = "confirmed";
  } else if (action === "reject") {
    suggestion.status = "rejected";
  }
  renderRecording();
  elements.reviewSuggestionList.querySelector("button")?.focus();
}

function loadHistory() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(HISTORY_STORAGE_KEY) ?? "[]");
    state.history = Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.savedAt) : [];
  } catch {
    state.history = [];
  }
}

function persistHistory() {
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history.slice(0, HISTORY_LIMIT)));
}

function createHistoryRecord() {
  return {
    id: window.crypto?.randomUUID?.() ?? `minutes-${Date.now()}`,
    savedAt: new Date().toISOString(),
    meetingDate: DEMO_DATE,
    meetingType: elements.meetingTypeSelect.value,
    meetingLabel: meetingTypeLabel(),
    author: "田中",
    participants: selectedParticipants().map(({ name }) => name),
    durationSeconds: recording.elapsedSeconds,
    quickNote: elements.recordingQuickNote.value.trim(),
    transcript: TRANSCRIPT.map((item) => ({ ...item })),
    suggestions: recording.suggestions
      .filter(({ status }) => status === "confirmed")
      .map(({ kind, text, owner, due }) => ({ kind, text, owner, due })),
  };
}

function saveCurrentMinutes() {
  if (recording.draft === "saved") return;
  const item = createHistoryRecord();
  state.history = [item, ...state.history].slice(0, HISTORY_LIMIT);
  persistHistory();
  recording.draft = "saved";
  renderRecording();
  renderHistory();
}

function allHistoryItems() {
  return [...state.history, ...DEMO_HISTORY];
}

function itemSearchText(item) {
  return [
    item.meetingLabel,
    item.author,
    ...(item.participants ?? []),
    item.quickNote,
    ...(item.suggestions ?? []).flatMap(({ kind, text, owner, due }) => [kind, text, owner, due]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("ja");
}

function dateMatchesPeriod(dateString, period) {
  if (period === "all") return true;
  const itemDate = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const differenceInDays = Math.round((today.getTime() - itemDate.getTime()) / 86400000);
  if (period === "yesterday") return differenceInDays === 1;
  if (period === "7days") return differenceInDays >= 0 && differenceInDays <= 6;
  if (period === "30days") return differenceInDays >= 0 && differenceInDays <= 29;
  return true;
}

function filteredHistoryItems() {
  const filters = state.historyFilters;
  const keyword = filters.keyword.trim().toLocaleLowerCase("ja");
  return allHistoryItems()
    .filter((item) => filters.category === "all" || item.meetingType === filters.category)
    .filter((item) => !keyword || itemSearchText(item).includes(keyword))
    .filter((item) => dateMatchesPeriod(item.meetingDate, filters.period))
    .filter((item) => !filters.dateFrom || item.meetingDate >= filters.dateFrom)
    .filter((item) => !filters.dateTo || item.meetingDate <= filters.dateTo)
    .sort((first, second) => {
      const dateOrder = first.meetingDate.localeCompare(second.meetingDate);
      const savedOrder = first.savedAt.localeCompare(second.savedAt);
      return filters.sort === "oldest" ? dateOrder || savedOrder : -(dateOrder || savedOrder);
    });
}

function renderHistoryFilters() {
  for (const button of elements.historyCategoryButtons) {
    const selected = button.dataset.historyCategory === state.historyFilters.category;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
  elements.historyKeyword.value = state.historyFilters.keyword;
  elements.historyPeriod.value = state.historyFilters.period;
  elements.historyDateFrom.value = state.historyFilters.dateFrom;
  elements.historyDateTo.value = state.historyFilters.dateTo;
  elements.historySort.value = state.historyFilters.sort;
}

function renderHistory() {
  const items = filteredHistoryItems();
  elements.historyCount.textContent = `${items.length}件`;
  elements.historyEmpty.hidden = items.length > 0;
  elements.historyList.replaceChildren();
  elements.historyFilterStatus.textContent = `${items.length}件・${state.historyFilters.sort === "newest" ? "日付の新しい順" : "日付の古い順"}`;

  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recording-history-item";
    button.dataset.historyId = item.id;
    button.setAttribute("aria-label", `${item.meetingLabel}、${formatMeetingDate(item.meetingDate)}の議事録を開く`);

    const main = document.createElement("span");
    main.className = "history-item-main";
    const heading = document.createElement("span");
    heading.className = "history-item-heading";
    const title = document.createElement("strong");
    title.textContent = item.meetingLabel || "議事録";
    heading.append(title);
    if (item.isSample) {
      const sample = document.createElement("small");
      sample.className = "history-sample-label";
      sample.textContent = "サンプル";
      heading.append(sample);
    }
    const participants = document.createElement("span");
    participants.textContent = item.participants?.length ? item.participants.join("、") : "参加者未登録";
    const summary = document.createElement("span");
    summary.textContent = item.suggestions?.[0]?.text || item.quickNote || "議事録";
    main.append(heading, summary, participants);

    const meta = document.createElement("span");
    meta.className = "history-item-meta";
    const meetingDate = document.createElement("time");
    meetingDate.dateTime = item.meetingDate;
    meetingDate.textContent = formatMeetingDate(item.meetingDate);
    const duration = document.createElement("span");
    duration.textContent = `録音 ${formatDuration(Number(item.durationSeconds) || 0)}`;
    meta.append(meetingDate, duration);
    button.append(main, meta);
    elements.historyList.append(button);
  }

  if (state.selectedHistoryId && allHistoryItems().some(({ id }) => id === state.selectedHistoryId)) {
    renderHistoryDetail();
  } else {
    state.selectedHistoryId = null;
    elements.historyListView.hidden = false;
    elements.historyDetail.hidden = true;
  }
}

function appendDetailRow(list, termText, valueText) {
  const row = document.createElement("div");
  const term = document.createElement("dt");
  term.textContent = termText;
  const value = document.createElement("dd");
  value.textContent = valueText;
  row.append(term, value);
  list.append(row);
}

function renderHistoryDetail() {
  const item = allHistoryItems().find(({ id }) => id === state.selectedHistoryId);
  if (!item) return;
  elements.historyListView.hidden = true;
  elements.historyDetail.hidden = false;
  elements.historyDetailTitle.textContent = `${item.meetingLabel || "議事録"}の議事録`;
  elements.historyDetailContent.replaceChildren();

  const metadata = document.createElement("dl");
  metadata.className = "history-detail-metadata";
  appendDetailRow(metadata, "実施日", formatMeetingDate(item.meetingDate));
  appendDetailRow(metadata, "会議種別", item.meetingLabel || "未設定");
  appendDetailRow(metadata, "保存日時", formatSavedDate(item.savedAt));
  appendDetailRow(metadata, "参加者", item.participants?.length ? item.participants.join("、") : "未登録");
  appendDetailRow(metadata, "録音時間", formatDuration(Number(item.durationSeconds) || 0));
  elements.historyDetailContent.append(metadata);

  if (item.quickNote) {
    const section = makeHistorySection("録音中のメモ");
    const paragraph = document.createElement("p");
    paragraph.textContent = item.quickNote;
    section.append(paragraph);
    elements.historyDetailContent.append(section);
  }

  const suggestions = makeHistorySection("議事録");
  if (item.suggestions?.length) {
    const list = document.createElement("ul");
    for (const suggestion of item.suggestions) {
      const entry = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = `${suggestion.kind}：`;
      entry.append(label, suggestion.text);
      list.append(entry);
    }
    suggestions.append(list);
  } else {
    const empty = document.createElement("p");
    empty.textContent = "採用した項目はありません。";
    suggestions.append(empty);
  }
  elements.historyDetailContent.append(suggestions);

  const transcript = makeHistorySection("文字起こし");
  for (const line of item.transcript ?? []) {
    const paragraph = document.createElement("p");
    const time = document.createElement("time");
    time.textContent = line.time;
    paragraph.append(time, ` ${line.text}`);
    transcript.append(paragraph);
  }
  elements.historyDetailContent.append(transcript);
}

function makeHistorySection(titleText) {
  const section = document.createElement("section");
  section.className = "history-detail-section";
  const heading = document.createElement("h4");
  heading.textContent = titleText;
  section.append(heading);
  return section;
}

function openHistory(id) {
  state.selectedHistoryId = id;
  renderHistoryDetail();
  elements.historyDetailTitle.focus();
}

function closeHistory() {
  state.selectedHistoryId = null;
  elements.historyDetail.hidden = true;
  elements.historyListView.hidden = false;
  elements.historyList.querySelector("button")?.focus();
}

function closeInfo() {
  if (!activeInfoTrigger) return;
  const popover = document.querySelector(`#${activeInfoTrigger.getAttribute("aria-controls")}`);
  if (popover) popover.hidden = true;
  activeInfoTrigger.setAttribute("aria-expanded", "false");
  activeInfoTrigger = null;
}

function toggleInfo(trigger) {
  const wasOpen = trigger === activeInfoTrigger;
  closeInfo();
  if (wasOpen) return;
  const popover = document.querySelector(`#${trigger.getAttribute("aria-controls")}`);
  if (!popover) return;
  popover.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  activeInfoTrigger = trigger;
}

function setMobileMenu(open, { restoreFocus = true } = {}) {
  if (!mobileMenuMedia.matches && open) return;
  elements.mobileMenuDrawer.hidden = !open;
  elements.mobileMenuScrim.hidden = !open;
  elements.mobileMenuDrawer.setAttribute("aria-hidden", String(!open));
  elements.mobileMenuTrigger.setAttribute("aria-expanded", String(open));
  elements.appShell.inert = open;
  document.body.classList.toggle("is-mobile-menu-open", open);
  if (open) elements.mobileMenuDrawer.focus();
  else if (restoreFocus) elements.mobileMenuTrigger.focus();
}

function openContact(trigger) {
  lastContactTrigger = trigger;
  restoreMenuAfterContact = !elements.mobileMenuDrawer.hidden;
  if (restoreMenuAfterContact) setMobileMenu(false, { restoreFocus: false });
  if (!elements.contactIframe.src) elements.contactIframe.src = CONTACT_FORM_URL;
  elements.contactFallback.href = CONTACT_FORM_URL;
  elements.contactDialog.showModal();
  elements.contactDialogTitle.focus();
}

function closeContact() {
  elements.contactDialog.close();
  if (restoreMenuAfterContact && mobileMenuMedia.matches) {
    restoreMenuAfterContact = false;
    setMobileMenu(true);
  } else {
    lastContactTrigger?.focus();
  }
}

function setAppView(view) {
  const showHistory = view === "history";
  if (showHistory && recording.screen === "capture" && recording.capture === "recording") {
    recording.capture = "paused";
    clearCaptureTimer();
    renderRecording();
  }
  state.view = showHistory ? "history" : "create";
  document.body.dataset.appView = state.view;
  elements.creationWorkspace.hidden = showHistory;
  elements.historyWorkspace.hidden = !showHistory;
  elements.pageTitle.textContent = showHistory ? "過去の議事録" : "議事録作成";
  elements.historyViewTriggerLabel.textContent = showHistory ? "議事録作成へ戻る" : "過去の議事録を見る";
  elements.historyViewTrigger.classList.toggle("is-current", showHistory);

  if (showHistory) {
    setParticipantMenu(false);
    closeInfo();
    state.selectedHistoryId = null;
    renderHistoryFilters();
    renderHistory();
    setHeaderStatus("履歴表示中", "is-progress");
    elements.historyPageHeading.focus();
  } else {
    renderRecording();
    elements.pageTitle.focus({ preventScroll: true });
  }
}

function applyHistoryFilter(key, value) {
  state.historyFilters[key] = value;
  state.selectedHistoryId = null;
  renderHistory();
}

function resetHistoryFilters() {
  state.historyFilters = {
    category: "all",
    keyword: "",
    period: "all",
    dateFrom: "",
    dateTo: "",
    sort: "newest",
  };
  state.selectedHistoryId = null;
  renderHistoryFilters();
  renderHistory();
  elements.historyKeyword.focus();
}

function handleContextChange(reason) {
  if (recording.screen === "capture") interruptRecording(reason);
  else renderRecording();
}

function bindEvents() {
  for (const link of elements.minutesHomeLinks) {
    link.addEventListener("click", () => {
      if (!elements.mobileMenuDrawer.hidden) setMobileMenu(false, { restoreFocus: false });
      setAppView("create");
    });
  }
  elements.historyViewTrigger.addEventListener("click", () => setAppView(state.view === "history" ? "create" : "history"));
  elements.historyCreateMinutes.addEventListener("click", () => setAppView("create"));
  for (const button of elements.historyCategoryButtons) {
    button.addEventListener("click", () => {
      applyHistoryFilter("category", button.dataset.historyCategory);
      renderHistoryFilters();
    });
  }
  elements.historyKeyword.addEventListener("input", () => applyHistoryFilter("keyword", elements.historyKeyword.value));
  elements.historyPeriod.addEventListener("change", () => applyHistoryFilter("period", elements.historyPeriod.value));
  elements.historyDateFrom.addEventListener("change", () => applyHistoryFilter("dateFrom", elements.historyDateFrom.value));
  elements.historyDateTo.addEventListener("change", () => applyHistoryFilter("dateTo", elements.historyDateTo.value));
  elements.historySort.addEventListener("change", () => applyHistoryFilter("sort", elements.historySort.value));
  elements.historyFilterReset.addEventListener("click", resetHistoryFilters);
  elements.participantTrigger.addEventListener("click", () => setParticipantMenu(elements.participantMenu.hidden));
  elements.participantClose.addEventListener("click", () => setParticipantMenu(false));
  elements.participantCategoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-participant-category]");
    if (!button) return;
    state.participantCategory = button.dataset.participantCategory;
    renderParticipantCategories();
    renderParticipantOptions();
  });
  elements.participantOptions.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-participant-id]");
    if (!checkbox) return;
    if (checkbox.checked) state.selectedParticipantIds.add(checkbox.dataset.participantId);
    else state.selectedParticipantIds.delete(checkbox.dataset.participantId);
    renderParticipants();
    handleContextChange("参加者が変更されたため録音を中断しました。");
  });
  elements.participantSearch.addEventListener("input", () => {
    state.participantSearch = elements.participantSearch.value;
    renderParticipantOptions();
  });
  elements.meetingTypeSelect.addEventListener("change", () => handleContextChange("会議種別が変更されたため録音を中断しました。"));
  elements.recordingStartDemo.addEventListener("click", beginRecording);
  elements.recordingPause.addEventListener("click", toggleRecordingPause);
  elements.recordingStop.addEventListener("click", startProcessing);
  elements.recordingResumeInterrupted.addEventListener("click", resumeInterrupted);
  elements.recordingProcessInterrupted.addEventListener("click", startProcessing);
  elements.recordingErrorRetry.addEventListener("click", startProcessing);
  elements.recordingErrorReset.addEventListener("click", resetRecording);
  elements.reviewSuggestionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-action]");
    if (button) handleReviewAction(button);
  });
  elements.recordingSaveDraft.addEventListener("click", saveCurrentMinutes);
  elements.historyList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-history-id]");
    if (button) openHistory(button.dataset.historyId);
  });
  elements.historyBack.addEventListener("click", closeHistory);

  for (const trigger of elements.infoTriggers) trigger.addEventListener("click", () => toggleInfo(trigger));
  document.addEventListener("pointerdown", (event) => {
    if (activeInfoTrigger && !event.target.closest(".info-affordance")) closeInfo();
    if (!elements.participantMenu.hidden && !event.target.closest(".participant-picker")) setParticipantMenu(false);
  });

  elements.mobileMenuTrigger.addEventListener("click", () => setMobileMenu(true));
  elements.mobileMenuClose.addEventListener("click", () => setMobileMenu(false));
  elements.mobileMenuScrim.addEventListener("click", () => setMobileMenu(false));
  mobileMenuMedia.addEventListener("change", ({ matches }) => {
    if (!matches && !elements.mobileMenuDrawer.hidden) setMobileMenu(false, { restoreFocus: false });
  });
  for (const trigger of elements.contactTriggers) trigger.addEventListener("click", () => openContact(trigger));
  elements.contactDialogClose.addEventListener("click", closeContact);
  elements.contactDialog.addEventListener("click", (event) => {
    if (event.target === elements.contactDialog) closeContact();
  });
  elements.contactDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeContact();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!elements.participantMenu.hidden) setParticipantMenu(false);
    else if (activeInfoTrigger) closeInfo();
    else if (!elements.mobileMenuDrawer.hidden) setMobileMenu(false);
  });
}

function initialize() {
  document.body.dataset.appView = state.view;
  renderMeetingTypes();
  renderParticipantCategories();
  loadHistory();
  renderParticipants();
  renderHistoryFilters();
  renderHistory();
  bindEvents();
}

initialize();
