const HISTORY_STORAGE_KEY = "bsystem.minutes.recording-history.v1";
const HISTORY_LIMIT = 100;
const VEHICLE_DRAFT_STORAGE_KEY = "bsystem.vehicle-record.draft.v1";
const VEHICLE_DRAFT_VERSION = 1;
const DEMO_DATE = "2026-07-21";
const CONTACT_FORM_URL = "https://northern-hearing-e36.notion.site/ebd//55559c2fd62e828c8c318163c97e7d62";
const LOGIN_ACCOUNT = Object.freeze({ name: "田中" });
const VEHICLE_PREVIOUS_ODOMETERS = Object.freeze({
  "vehicle-a": 45168,
  "vehicle-b": 38120,
  "vehicle-c": 52604,
});

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
  vehicleId: "",
  vehiclePhotos: new Set(),
  vehiclePhotoView: "today",
  vehicleRecordStatus: "editing",
  vehicleDraftDirty: false,
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
  vehicleWorkspace: document.querySelector("#vehicle-workspace"),
  meetingContext: document.querySelector("[data-meeting-context]"),
  historyViewTrigger: document.querySelector("#history-view-trigger"),
  historyViewTriggerLabel: document.querySelector("#history-view-trigger-label"),
  historyViewTriggerLabelMobile: document.querySelector("#history-view-trigger-label-mobile"),
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
  minutesHistoryTriggers: [...document.querySelectorAll("[data-minutes-history]")],
  appViewLinks: [...document.querySelectorAll("[data-app-view]")],
  navigationLinks: [...document.querySelectorAll("[data-minutes-home], [data-app-view]")],
  vehiclePageHeading: document.querySelector("#vehicle-page-heading"),
  vehicleForm: document.querySelector("#vehicle-record-form"),
  vehicleFormError: document.querySelector("#vehicle-form-error"),
  vehicleFormSuccess: document.querySelector("#vehicle-form-success"),
  vehicleSelectionSection: document.querySelector("#vehicle-selection-section"),
  vehicleSelect: document.querySelector("#vehicle-select"),
  vehicleSelectedSummary: document.querySelector("#vehicle-selected-summary"),
  vehiclePhotoButtons: [...document.querySelectorAll("[data-photo-position]")],
  vehiclePhotoViewButtons: [...document.querySelectorAll("[data-vehicle-photo-view]")],
  vehiclePhotoCount: document.querySelector("#vehicle-photo-count"),
  vehiclePhotoToday: document.querySelector("#vehicle-photo-today"),
  vehiclePhotoYesterday: document.querySelector("#vehicle-photo-yesterday"),
  vehiclePhotoScope: document.querySelector("#vehicle-photo-scope"),
  vehiclePhotoGuideTrigger: document.querySelector("#vehicle-photo-guide-trigger"),
  vehiclePhotoGuideDialog: document.querySelector("#vehicle-photo-guide-dialog"),
  vehiclePhotoGuideTitle: document.querySelector("#vehicle-photo-guide-title"),
  vehiclePhotoGuideClose: document.querySelector("#vehicle-photo-guide-close"),
  vehiclePhotoGuideDone: document.querySelector("#vehicle-photo-guide-done"),
  vehiclePreviousName: document.querySelector("#vehicle-previous-name"),
  vehicleContextSection: document.querySelector("#vehicle-context-section"),
  vehiclePhotoSection: document.querySelector("#vehicle-photo-section"),
  vehicleGateSection: document.querySelector(".vehicle-gate-section"),
  vehicleAbnormalChecks: document.querySelector("#vehicle-abnormal-checks"),
  vehicleDistanceSection: document.querySelector("#vehicle-distance-section"),
  vehicleOdometer: document.querySelector("#vehicle-odometer"),
  vehiclePreviousOdometer: document.querySelector("#vehicle-previous-odometer"),
  vehicleDailyDistance: document.querySelector("#vehicle-daily-distance"),
  vehicleObservation: document.querySelector("#vehicle-observation"),
  vehicleObservationOtherWrap: document.querySelector("#vehicle-observation-other-wrap"),
  vehicleObservationOther: document.querySelector("#vehicle-observation-other"),
  vehicleFlowSteps: [...document.querySelectorAll("[data-vehicle-flow-step]")],
  vehicleRecordedAt: document.querySelector("#vehicle-recorded-at"),
  vehicleReporter: document.querySelector("#vehicle-reporter"),
  vehicleLinkedDate: document.querySelector("#vehicle-linked-date"),
  vehicleLinkedReporter: document.querySelector("#vehicle-linked-reporter"),
  vehiclePhotoRecordDates: [...document.querySelectorAll("[data-photo-record-date]")],
  vehiclePreviousDates: [...document.querySelectorAll("[data-yesterday-date]")],
  vehicleAccidentFields: document.querySelector("#vehicle-accident-fields"),
  vehicleAccidentOtherWrap: document.querySelector("#vehicle-accident-other-wrap"),
  vehicleConditionDetailWrap: document.querySelector("#vehicle-condition-detail-wrap"),
  vehicleConditionOtherWrap: document.querySelector("#vehicle-condition-other-wrap"),
  vehicleMaintenanceDetailWrap: document.querySelector("#vehicle-maintenance-detail-wrap"),
  vehicleMaintenanceOtherWrap: document.querySelector("#vehicle-maintenance-other-wrap"),
  vehicleMobileCompletion: document.querySelector("#vehicle-mobile-completion"),
  vehicleSaveHelp: document.querySelector("#vehicle-save-help"),
  vehicleFooterSummary: document.querySelector("#vehicle-footer-summary"),
  vehicleCompletionStatus: document.querySelector("#vehicle-completion-status"),
  vehicleCompletionButtons: [...document.querySelectorAll("[data-vehicle-complete]")],
  vehicleDraftButtons: [...document.querySelectorAll("[data-vehicle-draft-save]")],
  vehicleCompletionWorkspace: document.querySelector("#vehicle-completion-workspace"),
  vehicleCompletionTitle: document.querySelector("#vehicle-completion-title"),
  vehicleCompletionMessage: document.querySelector("#vehicle-completion-message"),
  vehicleCompletionVehicle: document.querySelector("#vehicle-completion-vehicle"),
  vehicleCompletionDistance: document.querySelector("#vehicle-completion-distance"),
  vehicleCompletionReporter: document.querySelector("#vehicle-completion-reporter"),
  vehicleContinueRecord: document.querySelector("#vehicle-continue-record"),
  vehicleNewRecord: document.querySelector("#vehicle-new-record"),
  vehicleHistoryTriggers: [...document.querySelectorAll("[data-vehicle-history-trigger]")],
  vehicleHistoryWorkspace: document.querySelector("#vehicle-history-workspace"),
  vehicleHistoryTitle: document.querySelector("#vehicle-history-title"),
  vehicleHistoryVehicleName: document.querySelector("#vehicle-history-vehicle-name"),
  vehicleHistoryClose: document.querySelector("#vehicle-history-close"),
  vehicleHistoryRecords: [...document.querySelectorAll("[data-vehicle-history-record]")],
  vehicleHistoryDates: [...document.querySelectorAll("[data-vehicle-history-date]")],
  vehicleLeaveDialog: document.querySelector("#vehicle-leave-dialog"),
  vehicleLeaveTitle: document.querySelector("#vehicle-leave-title"),
  vehicleLeaveDescription: document.querySelector("#vehicle-leave-description"),
  vehicleLeaveContinue: document.querySelector("#vehicle-leave-continue"),
  vehicleLeaveDiscard: document.querySelector("#vehicle-leave-discard"),
  vehicleLeaveSave: document.querySelector("#vehicle-leave-save"),
  appGuideTrigger: document.querySelector("#app-guide-trigger"),
  appGuideDialog: document.querySelector("#app-guide-dialog"),
  appGuideTitle: document.querySelector("#app-guide-title"),
  appGuideClose: document.querySelector("#app-guide-close"),
  appGuideDone: document.querySelector("#app-guide-done"),
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
let lastGuideTrigger = null;
let lastVehicleHistoryTrigger = null;
let pendingVehicleRevealFrame = null;
let pendingVehicleLeaveAction = null;
let lastVehicleLeaveTrigger = null;

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
  const showVehicle = view === "vehicle";
  if (!showVehicle && !elements.vehicleHistoryWorkspace.hidden) {
    closeVehicleHistory({ restoreFocus: false });
  }
  if ((showHistory || showVehicle) && recording.screen === "capture" && recording.capture === "recording") {
    recording.capture = "paused";
    clearCaptureTimer();
    renderRecording();
  }
  state.view = showVehicle ? "vehicle" : showHistory ? "history" : "create";
  document.body.dataset.appView = state.view;
  elements.creationWorkspace.hidden = showHistory || showVehicle;
  elements.historyWorkspace.hidden = !showHistory;
  elements.vehicleWorkspace.hidden = !showVehicle;
  elements.meetingContext.hidden = showVehicle;
  elements.historyViewTrigger.hidden = showVehicle;
  elements.pageTitle.textContent = showVehicle ? "車両記録" : showHistory ? "過去の議事録" : "議事録作成";
  elements.historyViewTriggerLabel.textContent = showHistory ? "議事録作成へ戻る" : "過去の議事録を見る";
  elements.historyViewTriggerLabelMobile.textContent = showHistory ? "戻る" : "履歴";
  elements.historyViewTrigger.classList.toggle("is-current", showHistory);
  for (const link of elements.navigationLinks) {
    const linkView = link.hasAttribute("data-minutes-home") ? "create" : link.dataset.appView;
    const isCurrent = linkView === state.view || (state.view === "history" && linkView === "create");
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  window.scrollTo({ top: 0, left: 0 });

  if (showHistory) {
    setParticipantMenu(false);
    closeInfo();
    state.selectedHistoryId = null;
    renderHistoryFilters();
    renderHistory();
    setHeaderStatus("履歴表示中", "is-progress");
    elements.historyPageHeading.focus({ preventScroll: true });
  } else if (showVehicle) {
    setParticipantMenu(false);
    closeInfo();
    const wasSaved = state.vehicleRecordStatus === "saved";
    elements.vehicleForm.hidden = wasSaved;
    elements.vehicleHistoryWorkspace.hidden = true;
    elements.vehicleCompletionWorkspace.hidden = !wasSaved;
    document.body.dataset.vehicleScreen = wasSaved ? "complete" : "form";
    if (wasSaved) renderVehicleSuccessSummary();
    renderVehicleFormState();
    setVehicleHeaderStatus();
    (wasSaved ? elements.vehicleCompletionTitle : elements.vehiclePageHeading).focus({ preventScroll: true });
  } else {
    renderRecording();
    elements.pageTitle.focus({ preventScroll: true });
  }
}

function vehicleValue(name) {
  const checked = elements.vehicleForm.querySelector(`[name="${name}"]:checked`);
  if (checked) return checked.value;
  const control = elements.vehicleForm.elements.namedItem(name);
  return control instanceof HTMLSelectElement ? control.value : "";
}

function vehicleOtherSelected(name) {
  return vehicleValue(name) === "その他";
}

function markVehicleRecordEditing() {
  state.vehicleRecordStatus = "editing";
  state.vehicleDraftDirty = true;
  elements.vehicleFormSuccess.hidden = true;
}

function setVehicleHeaderStatus() {
  if (state.vehicleRecordStatus === "saved") {
    setHeaderStatus("登録完了", "is-saved");
  } else if (state.vehicleRecordStatus === "draft" && !state.vehicleDraftDirty) {
    setHeaderStatus("一時保存済み", "is-progress");
  } else {
    setHeaderStatus("未保存", "is-pristine");
  }
}

function renderVehicleDraftActions() {
  const finalSaved = state.vehicleRecordStatus === "saved";
  const draftSaved = state.vehicleRecordStatus === "draft" && !state.vehicleDraftDirty;
  const canSaveDraft = state.vehicleDraftDirty && !finalSaved;
  for (const button of elements.vehicleDraftButtons) {
    button.disabled = !canSaveDraft;
    button.dataset.state = finalSaved ? "complete" : draftSaved ? "saved" : canSaveDraft ? "ready" : "waiting";
    const label = button.querySelector("[data-vehicle-draft-label]");
    if (label) label.textContent = draftSaved ? "一時保存済み" : "一時保存";
  }
}

function renderVehicleCompletion(flow) {
  const saved = state.vehicleRecordStatus === "saved";
  const draftSaved = state.vehicleRecordStatus === "draft" && !state.vehicleDraftDirty;
  const ready = flow.requiredReady && !saved;
  for (const button of elements.vehicleCompletionButtons) {
    button.disabled = !ready;
    button.dataset.ready = String(ready);
    button.dataset.state = saved ? "success" : ready ? "ready" : "waiting";
    const label = button.querySelector("[data-vehicle-complete-label]");
    if (label) label.textContent = saved ? button.dataset.labelSuccess : button.dataset.labelDefault;
  }
  renderVehicleDraftActions();
  elements.vehicleCompletionStatus.textContent = saved
    ? "登録しました"
    : draftSaved
      ? flow.requiredReady
        ? "一時保存済み。登録できます"
        : "一時保存済み。続きから再開できます"
      : flow.requiredReady
        ? "入力完了。登録できます"
        : "必要な項目を入力してください";
}

function serializeVehicleDraft() {
  const values = {};
  for (const control of elements.vehicleForm.elements) {
    if (!control.name || ["button", "submit", "reset"].includes(control.type)) continue;
    if (["checkbox", "radio"].includes(control.type)) {
      if (control.checked) values[control.name] = control.value;
    } else {
      values[control.name] = control.value;
    }
  }
  return {
    version: VEHICLE_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    values,
    photos: [...state.vehiclePhotos],
    photoView: state.vehiclePhotoView,
  };
}

function applyVehicleDraft(draft) {
  elements.vehicleForm.reset();
  elements.vehicleRecordedAt.value = currentLocalDatetimeValue();
  elements.vehicleReporter.value = LOGIN_ACCOUNT.name;
  for (const control of elements.vehicleForm.elements) {
    if (!control.name || !(control.name in draft.values)) continue;
    if (["checkbox", "radio"].includes(control.type)) control.checked = draft.values[control.name] === control.value;
    else control.value = draft.values[control.name];
  }
  const validPhotoPositions = new Set(elements.vehiclePhotoButtons.map((button) => button.dataset.photoPosition));
  state.vehiclePhotos = new Set((draft.photos || []).filter((position) => validPhotoPositions.has(position)));
  state.vehiclePhotoView = draft.photoView === "yesterday" ? "yesterday" : "today";
  state.vehicleId = elements.vehicleSelect.value;
  state.vehicleRecordStatus = "draft";
  state.vehicleDraftDirty = false;
  elements.vehicleFormSuccess.hidden = true;
  clearVehicleErrors();
}

function restoreVehicleDraft() {
  try {
    const raw = window.sessionStorage.getItem(VEHICLE_DRAFT_STORAGE_KEY);
    if (!raw) return false;
    const draft = JSON.parse(raw);
    if (draft?.version !== VEHICLE_DRAFT_VERSION || !draft.values || typeof draft.values !== "object") return false;
    applyVehicleDraft(draft);
    return true;
  } catch {
    return false;
  }
}

function clearVehicleDraft() {
  try {
    window.sessionStorage.removeItem(VEHICLE_DRAFT_STORAGE_KEY);
  } catch {
    // The in-memory form remains usable when browser storage is unavailable.
  }
}

function saveVehicleDraft() {
  if (state.vehicleRecordStatus === "saved") return true;
  try {
    window.sessionStorage.setItem(VEHICLE_DRAFT_STORAGE_KEY, JSON.stringify(serializeVehicleDraft()));
  } catch {
    elements.vehicleFormError.textContent = "一時保存できませんでした。もう一度お試しください。";
    elements.vehicleFormError.hidden = false;
    setHeaderStatus("一時保存エラー", "is-error");
    return false;
  }
  state.vehicleRecordStatus = "draft";
  state.vehicleDraftDirty = false;
  elements.vehicleFormError.hidden = true;
  renderVehicleFormState();
  setVehicleHeaderStatus();
  return true;
}

function currentLocalDatetimeValue() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function formatVehicleRecordDate(value) {
  if (!value) return { iso: "", label: "日付未設定" };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { iso: "", label: "日付未設定" };
  return {
    iso: value.slice(0, 10),
    label: new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    }).format(date),
  };
}

function offsetVehicleRecordDate(value, days) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return { iso: "", label: "日付未設定" };
  date.setDate(date.getDate() - days);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return {
    iso: local.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    }).format(date),
  };
}

function renderVehicleHistoryDates() {
  for (const record of elements.vehicleHistoryRecords) {
    const days = Number.parseInt(record.dataset.offset, 10) || 1;
    const recordDate = offsetVehicleRecordDate(elements.vehicleRecordedAt.value, days);
    const time = record.querySelector("[data-vehicle-history-date]");
    if (!time) continue;
    time.dateTime = recordDate.iso;
    time.textContent = recordDate.label;
    record.dataset.dateLabel = recordDate.label;
  }
}

function selectVehicleHistoryRecord(record) {
  const shouldOpen = Boolean(record) && record.getAttribute("aria-expanded") !== "true";
  for (const item of elements.vehicleHistoryRecords) {
    item.classList.remove("is-current");
    item.setAttribute("aria-expanded", "false");
    const detail = document.querySelector(`#${item.getAttribute("aria-controls")}`);
    if (detail) detail.hidden = true;
  }
  if (!shouldOpen) return;
  record.classList.add("is-current");
  record.setAttribute("aria-expanded", "true");
  const detail = document.querySelector(`#${record.getAttribute("aria-controls")}`);
  if (detail) detail.hidden = false;
}

function selectedVehicleLabel() {
  return elements.vehicleSelect.selectedOptions[0]?.textContent.trim() || "";
}

function currentVehicleDistanceState(vehicleId = vehicleValue("vehicle")) {
  return calculateDailyDistance(VEHICLE_PREVIOUS_ODOMETERS[vehicleId], elements.vehicleOdometer.value);
}

function vehicleRevealTargets() {
  return [
    { key: "distance", container: elements.vehicleDistanceSection, focus: elements.vehicleOdometer },
    { key: "photos", container: elements.vehiclePhotoSection, focus: document.querySelector("#vehicle-photo-heading") },
    { key: "context", container: elements.vehicleContextSection, focus: document.querySelector("#vehicle-context-heading") },
    { key: "observation-other", container: elements.vehicleObservationOtherWrap, focus: elements.vehicleObservationOther },
    { key: "gate", container: elements.vehicleGateSection, focus: document.querySelector("#vehicle-gate-heading") },
    { key: "abnormal", container: elements.vehicleAbnormalChecks, focus: document.querySelector("#vehicle-check-heading") },
    { key: "accident-detail", container: elements.vehicleAccidentFields, focus: elements.vehicleForm.elements["accident-type"] },
    { key: "accident-other", container: elements.vehicleAccidentOtherWrap, focus: elements.vehicleForm.elements["accident-other"] },
    { key: "condition-detail", container: elements.vehicleConditionDetailWrap, focus: elements.vehicleForm.elements["condition-type"] },
    { key: "condition-other", container: elements.vehicleConditionOtherWrap, focus: elements.vehicleForm.elements["condition-other"] },
    { key: "maintenance-detail", container: elements.vehicleMaintenanceDetailWrap, focus: elements.vehicleForm.elements["maintenance-type"] },
    { key: "maintenance-other", container: elements.vehicleMaintenanceOtherWrap, focus: elements.vehicleForm.elements["maintenance-other"] },
  ];
}

function captureVehicleRevealState() {
  return Object.fromEntries(vehicleRevealTargets().map(({ key, container }) => [key, !container.hidden]));
}

function focusNewVehicleReveal(previous) {
  const target = vehicleRevealTargets().find(({ key, container }) => !previous[key] && !container.hidden);
  if (!target || state.view !== "vehicle" || document.body.dataset.vehicleScreen !== "form") return;
  if (pendingVehicleRevealFrame) window.cancelAnimationFrame(pendingVehicleRevealFrame);
  pendingVehicleRevealFrame = window.requestAnimationFrame(() => {
    pendingVehicleRevealFrame = null;
    if (target.container.hidden) return;
    target.focus?.focus({ preventScroll: true });
    target.container.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  });
}

function resetVehicleEntryForVehicle(nextVehicleId) {
  const recordedAt = elements.vehicleRecordedAt.value;
  const reporter = elements.vehicleReporter.value;
  elements.vehicleForm.reset();
  elements.vehicleRecordedAt.value = recordedAt;
  elements.vehicleReporter.value = reporter || LOGIN_ACCOUNT.name;
  elements.vehicleSelect.value = nextVehicleId;
  state.vehicleId = nextVehicleId;
  state.vehiclePhotos.clear();
  state.vehiclePhotoView = "today";
  markVehicleRecordEditing();
  setHeaderStatus("未保存", "is-pristine");
  clearVehicleErrors();
}

function renderVehicleFormState() {
  const vehicleId = vehicleValue("vehicle");
  const hasVehicle = Boolean(vehicleId);
  const vehicleLabel = hasVehicle ? selectedVehicleLabel() : "";
  const abnormality = vehicleValue("abnormality");
  const hasGateAnswer = Boolean(abnormality);
  const hasAbnormality = abnormality === "yes";
  const recordDate = formatVehicleRecordDate(elements.vehicleRecordedAt.value);
  const usageReady = Boolean(vehicleValue("purpose"));

  elements.vehicleLinkedDate.textContent = recordDate.label;
  elements.vehicleLinkedReporter.textContent = `担当：${elements.vehicleReporter.value || LOGIN_ACCOUNT.name}`;
  elements.vehicleFooterSummary.textContent = `${vehicleLabel || "車両未選択"}・${recordDate.label}・${elements.vehicleReporter.value || LOGIN_ACCOUNT.name}`;
  elements.vehicleSelectedSummary.textContent = hasVehicle
    ? `${vehicleLabel}の記録を編集中`
    : "車両を選ぶと、この1台の記録を開始します";
  elements.vehiclePhotoScope.textContent = hasVehicle
    ? `${vehicleLabel}に4方向の写真を登録します`
    : "選択した1台に4方向の写真を登録します";
  elements.vehiclePreviousName.textContent = vehicleLabel || "車両A（25-07）";
  elements.vehicleHistoryVehicleName.textContent = vehicleLabel || "車両A（25-07）";
  const distanceState = currentVehicleDistanceState(vehicleId);
  if (distanceState.previous === null) {
    elements.vehiclePreviousOdometer.textContent = "— km";
    elements.vehicleOdometer.min = "0";
  } else {
    elements.vehiclePreviousOdometer.textContent = `${distanceState.previous.toLocaleString("ja-JP")} km`;
    elements.vehicleOdometer.min = String(distanceState.previous);
    elements.vehicleOdometer.placeholder = String(distanceState.previous);
  }
  elements.vehicleDailyDistance.dataset.state = distanceState.state;
  elements.vehicleDailyDistance.textContent =
    distanceState.state === "ready"
      ? `${distanceState.daily.toLocaleString("ja-JP")} km`
      : distanceState.state === "below-previous"
        ? "入力値を確認"
        : "— km";
  const distanceBelowPrevious = distanceState.state === "below-previous";
  elements.vehicleOdometer.closest(".vehicle-number-field")?.classList.toggle("has-error", distanceBelowPrevious);
  if (distanceBelowPrevious) elements.vehicleOdometer.setAttribute("aria-invalid", "true");
  else elements.vehicleOdometer.removeAttribute("aria-invalid");
  const previousDate = offsetVehicleRecordDate(elements.vehicleRecordedAt.value, 1);

  for (const time of elements.vehiclePreviousDates) {
    time.dateTime = previousDate.iso;
    time.textContent = previousDate.label;
  }
  renderVehicleHistoryDates();
  for (const button of elements.vehiclePhotoViewButtons) {
    const expanded = state.vehiclePhotoView === "yesterday";
    button.setAttribute("aria-expanded", String(expanded));
    button.disabled = !hasVehicle;
    const label = button.querySelector("[data-vehicle-photo-view-label]");
    if (label) label.textContent = expanded ? "昨日の写真を閉じる" : "昨日の写真を見る";
  }
  elements.vehiclePhotoToday.hidden = false;
  elements.vehiclePhotoYesterday.hidden = state.vehiclePhotoView !== "yesterday";

  for (const button of elements.vehiclePhotoButtons) {
    const captured = state.vehiclePhotos.has(button.dataset.photoPosition);
    const photoLabel = button.closest(".vehicle-photo-item")?.querySelector(":scope > strong")?.textContent.trim() || "車両写真";
    button.classList.toggle("is-captured", captured);
    button.closest(".vehicle-photo-item")?.classList.toggle("is-captured", captured);
    button.setAttribute("aria-pressed", String(captured));
    button.setAttribute("aria-label", captured ? `${photoLabel}を撮り直す` : `${photoLabel}を撮影する`);
    button.disabled = !hasVehicle;
    button.querySelector("[data-photo-status]").textContent = captured ? "撮影済み・撮り直す" : "撮影する";
  }
  for (const time of elements.vehiclePhotoRecordDates) {
    time.dateTime = recordDate.iso;
    time.textContent = recordDate.label;
  }
  elements.vehiclePhotoCount.textContent = `${state.vehiclePhotos.size} / 4枚`;

  const accident = vehicleValue("accident");
  const condition = vehicleValue("condition");
  const maintenance = vehicleValue("maintenance");
  const showAccident = hasAbnormality && accident === "yes";
  const showCondition = hasAbnormality && condition === "C";
  const showMaintenance = hasAbnormality && maintenance === "yes";
  const abnormalDetailsReady =
    !hasAbnormality ||
    (Boolean(accident) &&
      Boolean(condition) &&
      Boolean(maintenance) &&
      (!showAccident ||
        (Boolean(vehicleValue("accident-type")) &&
          (!vehicleOtherSelected("accident-type") || Boolean(elements.vehicleForm.elements["accident-other"].value.trim())))) &&
      (!showCondition ||
        (Boolean(vehicleValue("condition-type")) &&
          (!vehicleOtherSelected("condition-type") || Boolean(elements.vehicleForm.elements["condition-other"].value.trim())))) &&
      (!showMaintenance ||
        (Boolean(vehicleValue("maintenance-type")) &&
          (!vehicleOtherSelected("maintenance-type") || Boolean(elements.vehicleForm.elements["maintenance-other"].value.trim())))));
  const showObservationOther = vehicleOtherSelected("observation");
  const hasObservationAnswer = Boolean(vehicleValue("observation"));
  const observationReady =
    hasObservationAnswer && (!showObservationOther || Boolean(elements.vehicleObservationOther.value.trim()));
  const photosReady = state.vehiclePhotos.size === elements.vehiclePhotoButtons.length;
  const distanceReady = distanceState.valid;
  const flow = deriveVehicleFlowState({
    metadataReady: Boolean(elements.vehicleRecordedAt.value) && Boolean(elements.vehicleReporter.value),
    hasVehicle,
    photosReady,
    observationReady,
    usageReady,
    hasGateAnswer,
    abnormalDetailsReady,
    distanceReady,
  });

  elements.vehiclePhotoSection.hidden = !flow.showPhotos;
  elements.vehicleContextSection.hidden = !flow.showContext;
  elements.vehicleGateSection.hidden = !flow.showContext;
  elements.vehicleDistanceSection.hidden = !flow.showDistance;
  elements.vehicleAbnormalChecks.hidden = !(flow.showContext && hasAbnormality);
  elements.vehicleObservationOtherWrap.hidden = !showObservationOther;
  elements.vehicleAccidentFields.hidden = !showAccident;
  elements.vehicleConditionDetailWrap.hidden = !showCondition;
  elements.vehicleMaintenanceDetailWrap.hidden = !showMaintenance;
  elements.vehicleAccidentOtherWrap.hidden = !(showAccident && vehicleOtherSelected("accident-type"));
  elements.vehicleConditionOtherWrap.hidden = !(showCondition && vehicleOtherSelected("condition-type"));
  elements.vehicleMaintenanceOtherWrap.hidden = !(showMaintenance && vehicleOtherSelected("maintenance-type"));
  renderVehicleCompletion(flow);

  for (const step of elements.vehicleFlowSteps) {
    const key = step.dataset.vehicleFlowStep;
    step.classList.toggle("is-current", key === flow.currentStep);
    step.classList.toggle("is-complete", flow.stepComplete[key]);
    step.classList.remove("is-skipped");
  }

  if (!hasVehicle) {
    elements.vehicleSaveHelp.textContent = "最初に記録する車両を選択してください。";
  } else if (!photosReady) {
    elements.vehicleSaveHelp.textContent = `${vehicleLabel}の写真をあと${elements.vehiclePhotoButtons.length - state.vehiclePhotos.size}枚撮影してください。`;
  } else if (!hasObservationAnswer) {
    elements.vehicleSaveHelp.textContent = "車両の状況チェックを選択してください。";
  } else if (!observationReady) {
    elements.vehicleSaveHelp.textContent = "その他の気づきを入力してください。";
  } else if (!vehicleValue("purpose")) {
    elements.vehicleSaveHelp.textContent = "使用用途を選択してください。";
  } else if (!hasGateAnswer) {
    elements.vehicleSaveHelp.textContent = "異常の有無を選択してください。";
  } else if (hasAbnormality && !abnormalDetailsReady) {
    elements.vehicleSaveHelp.textContent = "異常の内容を上から順に選択してください。";
  } else if (distanceState.state === "below-previous") {
    elements.vehicleSaveHelp.textContent = `最終走行距離は前日の${distanceState.previous.toLocaleString("ja-JP")} km以上で入力してください。`;
  } else if (!distanceReady) {
    elements.vehicleSaveHelp.textContent = "最終走行距離を入力してください。";
  } else if (flow.requiredReady) {
    elements.vehicleSaveHelp.textContent = `${vehicleLabel}の入力完了。本日分を登録できます。`;
  }
}

function clearVehicleErrors() {
  elements.vehicleFormError.hidden = true;
  elements.vehicleFormError.textContent = "";
  for (const node of elements.vehicleForm.querySelectorAll(".has-error")) node.classList.remove("has-error");
  for (const control of elements.vehicleForm.querySelectorAll("[aria-invalid='true']")) control.removeAttribute("aria-invalid");
}

function markVehicleError(selector) {
  const control = elements.vehicleForm.querySelector(selector);
  if (!control) return null;
  control.setAttribute("aria-invalid", "true");
  control.closest(".vehicle-abnormal-card, .vehicle-choice-group, .vehicle-number-field, .vehicle-meta-field, .vehicle-select-field, .vehicle-detail-field, label")?.classList.add("has-error");
  return control;
}

function validateVehicleForm() {
  clearVehicleErrors();
  const messages = [];
  let firstInvalid = null;
  const requireChoice = (name, message) => {
    if (vehicleValue(name)) return;
    messages.push(message);
    firstInvalid ??= markVehicleError(`[name="${name}"]`);
  };
  if (!elements.vehicleRecordedAt.value) {
    messages.push("記録日時を選択してください。");
    firstInvalid ??= markVehicleError('[name="recorded-at"]');
  }
  if (!elements.vehicleReporter.value) {
    messages.push("担当者を選択してください。");
    firstInvalid ??= markVehicleError('[name="reporter"]');
  }
  requireChoice("vehicle", "最初に記録する車両を選択してください。");
  if (!vehicleValue("vehicle")) {
    elements.vehicleFormError.textContent = messages[0];
    elements.vehicleFormError.hidden = false;
    firstInvalid?.focus();
    return false;
  }
  if (state.vehiclePhotos.size !== elements.vehiclePhotoButtons.length) {
    messages.push(`写真を4枚撮影してください。残り${elements.vehiclePhotoButtons.length - state.vehiclePhotos.size}枚です。`);
    firstInvalid ??= elements.vehiclePhotoButtons.find((button) => !state.vehiclePhotos.has(button.dataset.photoPosition));
    firstInvalid?.classList.add("has-error");
  }
  requireChoice("observation", "車両の状況チェックを選択してください。");
  if (vehicleOtherSelected("observation") && !elements.vehicleObservationOther.value.trim()) {
    messages.push("その他の気づきを入力してください。");
    firstInvalid ??= markVehicleError('[name="observation-other"]');
  }
  requireChoice("purpose", "使用用途を選択してください。");
  requireChoice("abnormality", "異常の有無を選択してください。");
  const distanceState = currentVehicleDistanceState();
  if (distanceState.state === "empty") {
    messages.push("最終走行距離を入力してください。");
    firstInvalid ??= markVehicleError('[name="odometer"]');
  } else if (distanceState.state === "below-previous") {
    messages.push(`最終走行距離は前日の${distanceState.previous.toLocaleString("ja-JP")} km以上で入力してください。`);
    firstInvalid ??= markVehicleError('[name="odometer"]');
  } else if (!distanceState.valid) {
    messages.push("前日の走行距離を確認してください。");
    firstInvalid ??= markVehicleError('[name="odometer"]');
  }
  if (vehicleValue("abnormality") === "yes") {
    requireChoice("accident", "事故・接触の「なし / あり」を選択してください。");
    requireChoice("condition", "車両状態を選択してください。");
    requireChoice("maintenance", "整備・修繕の「なし / あり」を選択してください。");

    if (vehicleValue("accident") === "yes") {
      requireChoice("accident-type", "事故・接触の内容を選択してください。");
      if (vehicleOtherSelected("accident-type") && !elements.vehicleForm.elements["accident-other"].value.trim()) {
        messages.push("「その他」の事故・接触内容を入力してください。");
        firstInvalid ??= markVehicleError('[name="accident-other"]');
      }
    }
    if (vehicleValue("condition") === "C") {
      requireChoice("condition-type", "C・要修理の症状を選択してください。");
      if (vehicleOtherSelected("condition-type") && !elements.vehicleForm.elements["condition-other"].value.trim()) {
        messages.push("「その他」の症状を入力してください。");
        firstInvalid ??= markVehicleError('[name="condition-other"]');
      }
    }
    if (vehicleValue("maintenance") === "yes") {
      requireChoice("maintenance-type", "整備・修繕の内容を選択してください。");
      if (vehicleOtherSelected("maintenance-type") && !elements.vehicleForm.elements["maintenance-other"].value.trim()) {
        messages.push("「その他」の整備・修繕内容を入力してください。");
        firstInvalid ??= markVehicleError('[name="maintenance-other"]');
      }
    }
  }
  if (messages.length) {
    elements.vehicleFormError.textContent = messages[0];
    elements.vehicleFormError.hidden = false;
    firstInvalid?.focus();
    return false;
  }
  return true;
}

function saveVehicleRecord(event) {
  event.preventDefault();
  elements.vehicleFormSuccess.hidden = true;
  if (!validateVehicleForm()) {
    setHeaderStatus("入力を確認", "is-error");
    return;
  }
  state.vehicleRecordStatus = "saved";
  state.vehicleDraftDirty = false;
  clearVehicleDraft();
  renderVehicleFormState();
  showVehicleCompletion();
}

function renderVehicleSuccessSummary() {
  const vehicleLabel = selectedVehicleLabel() || "車両";
  const distance = elements.vehicleForm.elements.odometer.value;
  const reporter = elements.vehicleReporter.value || LOGIN_ACCOUNT.name;
  const formattedDistance = distance ? `${Number(distance).toLocaleString("ja-JP")} km` : "—";
  elements.vehicleCompletionMessage.textContent = `${vehicleLabel}の本日の記録を保存しました`;
  elements.vehicleCompletionVehicle.textContent = vehicleLabel;
  elements.vehicleCompletionDistance.textContent = formattedDistance;
  elements.vehicleCompletionReporter.textContent = reporter;
}

function showVehicleCompletion({ focus = true } = {}) {
  renderVehicleSuccessSummary();
  elements.vehicleForm.hidden = true;
  elements.vehicleHistoryWorkspace.hidden = true;
  elements.vehicleCompletionWorkspace.hidden = false;
  document.body.dataset.vehicleScreen = "complete";
  setHeaderStatus("登録完了", "is-saved");
  window.scrollTo({ top: 0, left: 0 });
  if (focus) elements.vehicleCompletionTitle.focus({ preventScroll: true });
}

function openVehicleHistory(trigger) {
  lastVehicleHistoryTrigger = trigger;
  renderVehicleHistoryDates();
  selectVehicleHistoryRecord(null);
  elements.vehicleForm.hidden = true;
  elements.vehicleCompletionWorkspace.hidden = true;
  elements.vehicleHistoryWorkspace.hidden = false;
  document.body.dataset.vehicleScreen = "history";
  setHeaderStatus("履歴表示中", "is-progress");
  elements.vehicleHistoryTitle.focus({ preventScroll: true });
}

function closeVehicleHistory({ restoreFocus = true } = {}) {
  if (elements.vehicleHistoryWorkspace.hidden) return;
  elements.vehicleHistoryWorkspace.hidden = true;
  const wasSaved = state.vehicleRecordStatus === "saved";
  elements.vehicleForm.hidden = wasSaved;
  elements.vehicleCompletionWorkspace.hidden = !wasSaved;
  document.body.dataset.vehicleScreen = wasSaved ? "complete" : "form";
  if (wasSaved) renderVehicleSuccessSummary();
  else renderVehicleFormState();
  setVehicleHeaderStatus();
  if (restoreFocus) lastVehicleHistoryTrigger?.focus();
  lastVehicleHistoryTrigger = null;
}

function startNewVehicleRecord() {
  clearVehicleDraft();
  elements.vehicleForm.reset();
  elements.vehicleRecordedAt.value = currentLocalDatetimeValue();
  elements.vehicleReporter.value = LOGIN_ACCOUNT.name;
  state.vehicleId = "";
  state.vehiclePhotos.clear();
  state.vehiclePhotoView = "today";
  state.vehicleRecordStatus = "editing";
  state.vehicleDraftDirty = false;
  elements.vehicleFormSuccess.hidden = true;
  clearVehicleErrors();
}

function openVehicleEntry() {
  if (!elements.vehicleHistoryWorkspace.hidden) closeVehicleHistory({ restoreFocus: false });
  if (state.vehicleRecordStatus === "saved") startNewVehicleRecord();
  document.body.dataset.vehicleScreen = "form";
  elements.vehicleForm.hidden = false;
  elements.vehicleCompletionWorkspace.hidden = true;
  elements.vehicleHistoryWorkspace.hidden = true;
  renderVehicleFormState();
  setVehicleHeaderStatus();
  window.requestAnimationFrame(() => {
    elements.vehicleSelectionSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    elements.vehicleSelect.focus({ preventScroll: true });
  });
}

function shouldConfirmVehicleLeave() {
  return (
    state.view === "vehicle" &&
    document.body.dataset.vehicleScreen === "form" &&
    state.vehicleRecordStatus === "editing" &&
    state.vehicleDraftDirty
  );
}

function requestVehicleLeave(action, trigger) {
  if (!shouldConfirmVehicleLeave()) {
    action();
    return;
  }
  pendingVehicleLeaveAction = action;
  lastVehicleLeaveTrigger = trigger;
  elements.vehicleLeaveDescription.textContent = "一時保存してから移動すると、続きから再開できます。";
  elements.vehicleLeaveDialog.showModal();
  elements.vehicleLeaveTitle.focus();
}

function closeVehicleLeaveDialog({ restoreFocus = true } = {}) {
  elements.vehicleLeaveDialog.close();
  if (restoreFocus) lastVehicleLeaveTrigger?.focus();
  pendingVehicleLeaveAction = null;
  lastVehicleLeaveTrigger = null;
}

function discardUnsavedVehicleChanges() {
  if (!restoreVehicleDraft()) startNewVehicleRecord();
  renderVehicleFormState();
  setVehicleHeaderStatus();
}

function resolveVehicleLeave(mode) {
  if (mode === "save" && !saveVehicleDraft()) {
    elements.vehicleLeaveDescription.textContent = "一時保存できませんでした。入力を続けてもう一度お試しください。";
    return;
  }
  if (mode === "discard") discardUnsavedVehicleChanges();
  const action = pendingVehicleLeaveAction;
  closeVehicleLeaveDialog({ restoreFocus: false });
  action?.();
}

function openAppGuide(trigger) {
  lastGuideTrigger = trigger;
  elements.appGuideDialog.showModal();
  elements.appGuideTitle.focus();
}

function closeAppGuide() {
  elements.appGuideDialog.close();
  lastGuideTrigger?.focus();
}

function openVehiclePhotoGuide() {
  elements.vehiclePhotoGuideDialog.showModal();
  elements.vehiclePhotoGuideTitle.focus();
}

function closeVehiclePhotoGuide({ focusCapture = false } = {}) {
  elements.vehiclePhotoGuideDialog.close();
  if (focusCapture) {
    const nextPhoto = elements.vehiclePhotoButtons.find((button) => !state.vehiclePhotos.has(button.dataset.photoPosition));
    (nextPhoto || elements.vehiclePhotoButtons[0])?.focus();
  } else {
    elements.vehiclePhotoGuideTrigger.focus();
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
    link.addEventListener("click", (event) => {
      event.preventDefault();
      requestVehicleLeave(() => {
        if (!elements.mobileMenuDrawer.hidden) setMobileMenu(false, { restoreFocus: false });
        setAppView("create");
        window.history.replaceState(null, "", link.getAttribute("href"));
      }, link);
    });
  }
  for (const link of elements.appViewLinks) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const navigate = () => {
        if (!elements.mobileMenuDrawer.hidden) setMobileMenu(false, { restoreFocus: false });
        setAppView(link.dataset.appView);
        window.history.replaceState(null, "", link.getAttribute("href"));
      };
      if (link.dataset.appView === state.view) navigate();
      else requestVehicleLeave(navigate, link);
    });
  }
  elements.historyViewTrigger.addEventListener("click", () => setAppView(state.view === "history" ? "create" : "history"));
  for (const trigger of elements.minutesHistoryTriggers) {
    trigger.addEventListener("click", () => setAppView("history"));
  }
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
  for (const button of elements.vehiclePhotoViewButtons) {
    button.addEventListener("click", () => {
      state.vehiclePhotoView = state.vehiclePhotoView === "yesterday" ? "today" : "yesterday";
      renderVehicleFormState();
      button.focus({ preventScroll: true });
    });
  }
  for (const button of elements.vehiclePhotoButtons) {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      const previousRevealState = captureVehicleRevealState();
      const position = button.dataset.photoPosition;
      if (state.vehiclePhotos.has(position)) state.vehiclePhotos.delete(position);
      else state.vehiclePhotos.add(position);
      markVehicleRecordEditing();
      setHeaderStatus("未保存", "is-pristine");
      clearVehicleErrors();
      renderVehicleFormState();
      focusNewVehicleReveal(previousRevealState);
    });
  }
  elements.vehicleSelect.addEventListener("change", () => {
    const previousRevealState = captureVehicleRevealState();
    const nextVehicleId = elements.vehicleSelect.value;
    if (nextVehicleId !== state.vehicleId) resetVehicleEntryForVehicle(nextVehicleId);
    renderVehicleFormState();
    focusNewVehicleReveal(previousRevealState);
  });
  elements.vehicleForm.addEventListener("change", () => {
    const previousRevealState = captureVehicleRevealState();
    markVehicleRecordEditing();
    setHeaderStatus("未保存", "is-pristine");
    clearVehicleErrors();
    renderVehicleFormState();
    focusNewVehicleReveal(previousRevealState);
  });
  elements.vehicleForm.addEventListener("input", () => {
    const previousRevealState = captureVehicleRevealState();
    markVehicleRecordEditing();
    setHeaderStatus("未保存", "is-pristine");
    clearVehicleErrors();
    renderVehicleFormState();
    focusNewVehicleReveal(previousRevealState);
  });
  elements.vehicleForm.addEventListener("submit", saveVehicleRecord);
  for (const button of elements.vehicleCompletionButtons) {
    if (button.type === "button") button.addEventListener("click", () => elements.vehicleForm.requestSubmit());
  }
  for (const button of elements.vehicleDraftButtons) {
    button.addEventListener("click", () => saveVehicleDraft());
  }
  elements.vehicleNewRecord.addEventListener("click", openVehicleEntry);
  elements.vehicleContinueRecord.addEventListener("click", openVehicleEntry);
  for (const trigger of elements.vehicleHistoryTriggers) {
    trigger.addEventListener("click", () => requestVehicleLeave(() => openVehicleHistory(trigger), trigger));
  }
  for (const record of elements.vehicleHistoryRecords) {
    record.addEventListener("click", () => selectVehicleHistoryRecord(record));
  }
  elements.vehicleHistoryClose.addEventListener("click", closeVehicleHistory);
  elements.vehicleLeaveContinue.addEventListener("click", () => closeVehicleLeaveDialog());
  elements.vehicleLeaveDiscard.addEventListener("click", () => resolveVehicleLeave("discard"));
  elements.vehicleLeaveSave.addEventListener("click", () => resolveVehicleLeave("save"));
  elements.vehicleLeaveDialog.addEventListener("click", (event) => {
    if (event.target === elements.vehicleLeaveDialog) closeVehicleLeaveDialog();
  });
  elements.vehicleLeaveDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeVehicleLeaveDialog();
  });
  elements.vehiclePhotoGuideTrigger.addEventListener("click", openVehiclePhotoGuide);
  elements.vehiclePhotoGuideClose.addEventListener("click", () => closeVehiclePhotoGuide());
  elements.vehiclePhotoGuideDone.addEventListener("click", () => closeVehiclePhotoGuide({ focusCapture: true }));
  elements.vehiclePhotoGuideDialog.addEventListener("click", (event) => {
    if (event.target === elements.vehiclePhotoGuideDialog) closeVehiclePhotoGuide();
  });
  elements.vehiclePhotoGuideDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeVehiclePhotoGuide();
  });
  elements.appGuideTrigger.addEventListener("click", () => openAppGuide(elements.appGuideTrigger));
  elements.appGuideClose.addEventListener("click", closeAppGuide);
  elements.appGuideDone.addEventListener("click", closeAppGuide);
  elements.appGuideDialog.addEventListener("click", (event) => {
    if (event.target === elements.appGuideDialog) closeAppGuide();
  });
  elements.appGuideDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeAppGuide();
  });

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
    if (!elements.vehicleHistoryWorkspace.hidden) closeVehicleHistory();
    else if (!elements.participantMenu.hidden) setParticipantMenu(false);
    else if (activeInfoTrigger) closeInfo();
    else if (!elements.mobileMenuDrawer.hidden) setMobileMenu(false);
  });
}

function initialize() {
  document.body.dataset.appView = state.view;
  document.body.dataset.vehicleScreen = "form";
  elements.vehicleForm.insertBefore(elements.vehiclePhotoSection, elements.vehicleGateSection);
  elements.vehicleForm.insertBefore(elements.vehicleContextSection, elements.vehicleGateSection);
  elements.vehicleRecordedAt.value = currentLocalDatetimeValue();
  elements.vehicleReporter.value = LOGIN_ACCOUNT.name;
  state.vehicleId = elements.vehicleSelect.value;
  restoreVehicleDraft();
  renderMeetingTypes();
  renderParticipantCategories();
  loadHistory();
  renderParticipants();
  renderHistoryFilters();
  renderHistory();
  renderVehicleFormState();
  bindEvents();
}

initialize();
