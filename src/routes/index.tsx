import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  AudioLines,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  FileSpreadsheet,
  FolderOpen,
  Headphones,
  LayoutDashboard,
  ListChecks,
  LoaderCircle,
  Mic,
  Monitor,
  MoreHorizontal,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wifi,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SightPilot AI — Desktop Copilot" },
      {
        name: "description",
        content: "A clear, calm command center for planning and reviewing AI-assisted desktop tasks.",
      },
      { property: "og:title", content: "SightPilot AI — Desktop Copilot" },
      {
        property: "og:description",
        content: "Plan, approve, and verify desktop tasks from one focused workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SightPilotDashboard,
});

type TaskState = "ready" | "running" | "complete" | "cancelled";
type DialogKind = "settings" | "help" | null;

const taskSteps = [
  "Open the Q4 invoices spreadsheet",
  "Highlight overdue invoices in amber",
  "Prepare a concise summary for the team",
];

function SightPilotDashboard() {
  const [listening, setListening] = useState(false);
  const [taskState, setTaskState] = useState<TaskState>("ready");
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("Overview");
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [screenCapture, setScreenCapture] = useState(true);
  const [askBeforeAction, setAskBeforeAction] = useState(true);

  useEffect(() => {
    if (taskState !== "running") return;

    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 4, 100);
        if (next === 100) {
          window.clearInterval(interval);
          setTaskState("complete");
        }
        return next;
      });
    }, 120);

    return () => window.clearInterval(interval);
  }, [taskState]);

  const openActivity = () => {
    setActiveSection("Activity History");
    document.getElementById("activity-log")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToOverview = () => {
    setActiveSection("Overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelTask = () => {
    setTaskState("cancelled");
    setProgress(0);
  };

  const taskMessage = {
    ready: "Review the steps below before handing off.",
    running: "SightPilot is working through your approved steps.",
    complete: "All steps finished. Review the verified result below.",
    cancelled: "This task was cancelled. Your screen was not changed.",
  }[taskState];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            <Sparkles />
          </div>
          <div className="brand-copy">
            <span className="brand-name">SightPilot</span>
            <span className="brand-edition">AI DESKTOP COPILOT</span>
          </div>
          <span className="brand-version">AI</span>
        </div>

        <div className="workspace-picker">
          <div className="workspace-avatar">N</div>
          <div className="workspace-copy">
            <span className="eyebrow">WORKSPACE</span>
            <strong>Northstar Studio</strong>
          </div>
          <ChevronRight className="workspace-chevron" />
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <Button
            variant="ghost"
            className={`nav-item ${activeSection === "Overview" ? "is-active" : ""}`}
            onClick={goToOverview}
          >
            <LayoutDashboard />
            <span>Overview</span>
            {activeSection === "Overview" && <span className="nav-indicator" />}
          </Button>
          <Button
            variant="ghost"
            className={`nav-item ${activeSection === "Activity History" ? "is-active" : ""}`}
            onClick={openActivity}
          >
            <Clock3 />
            <span>Activity History</span>
            <span className="nav-count">3</span>
          </Button>
          <Button
            variant="ghost"
            className={`nav-item ${dialog === "settings" ? "is-active" : ""}`}
            onClick={() => setDialog("settings")}
          >
            <Settings2 />
            <span>Settings</span>
          </Button>
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon"><Zap /></div>
          <div>
            <strong>Stay in control</strong>
            <p>Every action waits for your approval.</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className={`nav-item help-nav ${dialog === "help" ? "is-active" : ""}`}
          onClick={() => setDialog("help")}
        >
          <CircleHelp />
          <span>Help & support</span>
          <ArrowRight className="help-arrow" />
        </Button>
        <div className="profile-row">
          <div className="profile-avatar">AM</div>
          <div className="profile-copy">
            <strong>Alex Morgan</strong>
            <span>Personal workspace</span>
          </div>
          <MoreHorizontal className="profile-more" />
        </div>
      </aside>

      <div className="dashboard">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Northstar Studio</span>
            <ChevronRight />
            <strong>{activeSection}</strong>
          </div>
          <div className="topbar-actions">
            <div className="connection-state"><span /> Desktop connected</div>
            <Button variant="ghost" size="icon" className="icon-button" aria-label="Notifications">
              <Bell />
              <i className="notification-dot" />
            </Button>
            <div className="topbar-divider" />
            <div className="topbar-avatar">AM</div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="page-heading">
            <div>
              <div className="section-kicker"><span className="kicker-mark" /> YOUR COMMAND CENTER</div>
              <h1>Good afternoon, Alex<span>.</span></h1>
              <p>Give your desktop a direction. Stay in control at every step.</p>
            </div>
            <div className="session-pill"><Wifi /> <span>MacBook Pro</span><i /> Connected</div>
          </section>

          <section className="workbench" aria-label="Active desktop task">
            <div className="panel screen-panel">
              <div className="panel-heading screen-heading">
                <div className="heading-copy">
                  <span className="panel-icon"><Monitor /></span>
                  <div>
                    <h2>Live screen</h2>
                    <p>What SightPilot can see</p>
                  </div>
                </div>
                <div className="live-tag"><span /> LIVE</div>
              </div>

              <div className="screen-frame">
                <div className="screen-toolbar">
                  <div className="window-controls"><i /><i /><i /></div>
                  <div className="screen-address"><ShieldCheck /> app.northstar.co / invoices</div>
                  <span className="screen-zoom">100%</span>
                </div>
                <div className="mock-app">
                  <div className="mock-sidebar">
                    <div className="mock-brand"><span>N</span> northstar</div>
                    <div className="mock-nav-active"><LayoutDashboard /> Overview</div>
                    <div className="mock-nav-item"><FileSpreadsheet /> Invoices</div>
                    <div className="mock-nav-item"><FolderOpen /> Files</div>
                    <div className="mock-sidebar-bottom"><span className="mock-user">JM</span><span>Jordan Miles</span></div>
                  </div>
                  <div className="mock-content">
                    <div className="mock-topline"><span>Invoices</span><span className="mock-top-action">Export report</span></div>
                    <div className="mock-greeting">Invoice overview <span>Q4 · 2025</span></div>
                    <div className="mock-metrics">
                      <div><span>Total outstanding</span><strong>$48,290</strong><small>Across 18 invoices</small></div>
                      <div><span>Overdue</span><strong className="metric-overdue">$12,640</strong><small>5 invoices need attention</small></div>
                    </div>
                    <div className="mock-table-head"><span>RECENT INVOICES</span><span>VIEW ALL <ChevronRight /></span></div>
                    <div className="mock-row"><span className="mock-row-mark">AC</span><span className="mock-row-name">Acme Creative</span><span>INV-2048</span><span>Oct 28</span><b className="status-overdue">Overdue</b><strong>$4,800</strong></div>
                    <div className="mock-row"><span className="mock-row-mark">BV</span><span className="mock-row-name">Bluebird Ventures</span><span>INV-2046</span><span>Oct 30</span><b className="status-paid">Paid</b><strong>$2,150</strong></div>
                    <div className="mock-row"><span className="mock-row-mark">MN</span><span className="mock-row-name">Monument North</span><span>INV-2041</span><span>Nov 02</span><b className="status-overdue">Overdue</b><strong>$3,200</strong></div>
                  </div>
                </div>
                <div className="screen-scanline" />
                <div className="screen-capture-label"><span /><Monitor /> Screen share active</div>
              </div>

              <div className="screen-footer">
                <span><span className="secure-dot" /> Private screen session</span>
                <span>Updated just now <MoreHorizontal /></span>
              </div>
            </div>

            <div className="assistant-column">
              <section className="panel voice-panel">
                <div className="panel-heading">
                  <div className="heading-copy">
                    <span className="panel-icon voice-icon"><AudioLines /></span>
                    <div>
                      <h2>Voice command</h2>
                      <p>Tell SightPilot what to do</p>
                    </div>
                  </div>
                  <span className={`voice-state ${listening ? "is-listening" : ""}`}>
                    <span /> {listening ? "LISTENING" : "READY"}
                  </span>
                </div>
                <div className="transcript-box">
                  <span className="transcript-quote">“</span>
                  <p>Open the Q4 invoices spreadsheet, highlight overdue invoices, and prepare a summary for the team.</p>
                  <div className="transcript-meta"><span><AudioLines /> ENGLISH (US)</span><span>JUST NOW</span></div>
                </div>
                <div className="voice-controls">
                  <div className="voice-hint"><span className="keyboard-key"><Command /> K</span> Press to speak</div>
                  <div className="mic-wrap">
                    {listening && <span className="mic-pulse mic-pulse-one" />}
                    {listening && <span className="mic-pulse mic-pulse-two" />}
                    <Button
                      variant="default"
                      size="icon"
                      className={`mic-button ${listening ? "is-listening" : ""}`}
                      onClick={() => setListening((value) => !value)}
                      aria-label={listening ? "Stop listening" : "Start voice command"}
                    >
                      {listening ? <AudioLines /> : <Mic />}
                    </Button>
                  </div>
                </div>
              </section>

              <section className="panel plan-panel">
                <div className="panel-heading plan-heading">
                  <div className="heading-copy">
                    <span className="panel-icon plan-icon"><ListChecks /></span>
                    <div>
                      <h2>Proposed plan</h2>
                      <p>3 steps · You’re in control</p>
                    </div>
                  </div>
                  <span className="confidence-tag"><Sparkles /> 98% confident</span>
                </div>
                <p className="task-context">{taskMessage}</p>
                <ol className={`task-steps ${taskState}`}>
                  {taskSteps.map((step, index) => (
                    <li key={step}>
                      <span className={`step-number ${taskState === "complete" ? "step-done" : ""}`}>
                        {taskState === "complete" ? <Check /> : index + 1}
                      </span>
                      <span>{step}</span>
                      {taskState === "running" && Math.floor(progress / 34) === index && <LoaderCircle className="step-spinner" />}
                      {taskState === "complete" && <CheckCircle2 className="step-complete" />}
                    </li>
                  ))}
                </ol>
                <div className="plan-actions">
                  <Button
                    variant="default"
                    className="approve-button"
                    onClick={() => {
                      setProgress(4);
                      setTaskState("running");
                    }}
                    disabled={taskState === "running" || taskState === "complete"}
                  >
                    {taskState === "running" ? <LoaderCircle className="button-spinner" /> : taskState === "complete" ? <Check /> : <Zap />}
                    {taskState === "running" ? "Working…" : taskState === "complete" ? "Task complete" : "Approve task"}
                  </Button>
                  <Button
                    variant="outline"
                    className="cancel-button"
                    onClick={cancelTask}
                    disabled={taskState === "complete" || taskState === "cancelled"}
                  >
                    <X /> Cancel
                  </Button>
                </div>
                <div className="approval-note"><ShieldCheck /> Nothing happens until you approve.</div>
              </section>
            </div>
          </section>

          <section className="status-grid" aria-label="Task status">
            <div className="panel progress-panel">
              <div className="panel-heading compact-heading">
                <div className="heading-copy">
                  <span className="panel-icon progress-icon"><Activity /></span>
                  <div><h2>Execution progress</h2><p>{taskState === "ready" ? "Ready when you are" : taskState === "cancelled" ? "Task stopped" : taskState === "complete" ? "Completed successfully" : "Running approved steps"}</p></div>
                </div>
                <strong className="progress-percent">{progress}<small>%</small></strong>
              </div>
              <div className="progress-track" role="progressbar" aria-label="Task execution progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="progress-steps">
                <span className={taskState === "running" || taskState === "complete" ? "step-active" : ""}><i />Planning</span>
                <span className={taskState === "running" || taskState === "complete" ? "step-active" : ""}><i />Executing</span>
                <span className={taskState === "complete" ? "step-active" : ""}><i />Verifying</span>
              </div>
            </div>

            <div className={`panel verification-panel ${taskState === "complete" ? "verified" : ""}`}>
              <div className="verification-symbol">{taskState === "complete" ? <CheckCircle2 /> : <ShieldCheck />}</div>
              <div className="verification-copy">
                <div className="verification-title-row"><h2>{taskState === "complete" ? "Task verified" : "Verification"}</h2><span className="verification-status">{taskState === "complete" ? "PASSED" : taskState === "cancelled" ? "CANCELLED" : "READY"}</span></div>
                <p>{taskState === "complete" ? "3 overdue invoices highlighted. Summary prepared." : taskState === "cancelled" ? "No changes were made to your screen." : "SightPilot will confirm each action after execution."}</p>
                <span className="verification-foot"><ShieldCheck /> {taskState === "complete" ? "All actions match your approved plan" : "Review before any changes are made"}</span>
              </div>
            </div>
          </section>

          <section className="panel activity-panel" id="activity-log">
            <div className="activity-header">
              <div className="panel-heading">
                <div className="heading-copy">
                  <span className="panel-icon activity-icon"><Clock3 /></span>
                  <div><h2>Recent activity</h2><p>Your latest desktop tasks</p></div>
                </div>
              </div>
              <Button variant="ghost" className="view-history" onClick={openActivity}>View history <ArrowRight /></Button>
            </div>
            <div className="activity-table">
              <div className="activity-table-head"><span>TASK</span><span>DEVICE</span><span>WHEN</span><span>STATUS</span><span /></div>
              {taskState === "complete" && <ActivityRow icon={<FileSpreadsheet />} title="Organized Q4 overdue invoices" detail="3 steps · Invoice overview" device="MacBook Pro" time="Just now" status="Completed" statusKind="success" />}
              <ActivityRow icon={<FileSpreadsheet />} title="Summarized project expenses" detail="4 steps · Finance dashboard" device="MacBook Pro" time="Today, 10:42 AM" status="Completed" statusKind="success" />
              <ActivityRow icon={<FolderOpen />} title="Sorted design review files" detail="2 steps · Shared drive" device="MacBook Pro" time="Today, 9:18 AM" status="Completed" statusKind="success" />
              <ActivityRow icon={<Terminal />} title="Drafted weekly team update" detail="3 steps · Notes" device="MacBook Pro" time="Yesterday" status="Needs review" statusKind="review" />
            </div>
          </section>

          <footer className="dashboard-footer"><span><ShieldCheck /> Your screen stays private. You’re always in control.</span><span>Made for thoughtful work <Sparkles /></span></footer>
        </main>
      </div>

      {dialog && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
          <section className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="dialog-heading">
              <div className="panel-icon">{dialog === "settings" ? <Settings2 /> : <Headphones />}</div>
              <div><h2 id="dialog-title">{dialog === "settings" ? "Settings" : "Help & support"}</h2><p>{dialog === "settings" ? "Choose how SightPilot works with you." : "A little clarity when you need it."}</p></div>
              <Button variant="ghost" size="icon" className="icon-button dialog-close" onClick={() => setDialog(null)} aria-label="Close"><X /></Button>
            </div>
            {dialog === "settings" ? (
              <div className="settings-options">
                <label className="setting-option"><span><strong>Screen sharing</strong><small>Show your connected desktop preview</small></span><input type="checkbox" checked={screenCapture} onChange={(event) => setScreenCapture(event.target.checked)} /></label>
                <label className="setting-option"><span><strong>Ask before actions</strong><small>Review every plan before it runs</small></span><input type="checkbox" checked={askBeforeAction} onChange={(event) => setAskBeforeAction(event.target.checked)} /></label>
                <div className="settings-privacy"><ShieldCheck /><span>Your screen is only used to complete tasks you approve.</span></div>
              </div>
            ) : (
              <div className="help-content">
                <div><span>01</span><p><strong>Describe the outcome</strong>Say what you want done in your own words.</p></div>
                <div><span>02</span><p><strong>Review the plan</strong>Check every proposed step before approving.</p></div>
                <div><span>03</span><p><strong>Verify the result</strong>See what changed when the task finishes.</p></div>
                <div className="settings-privacy"><ShieldCheck /><span>Nothing runs without your approval.</span></div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

type ActivityRowProps = {
  icon: React.ReactNode;
  title: string;
  detail: string;
  device: string;
  time: string;
  status: string;
  statusKind: "success" | "review";
};

function ActivityRow({ icon, title, detail, device, time, status, statusKind }: ActivityRowProps) {
  return (
    <div className="activity-row">
      <div className="activity-task"><span className="activity-file-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span></div>
      <span className="activity-device"><Monitor /> {device}</span>
      <span className="activity-time">{time}</span>
      <span className={`activity-status ${statusKind}`}><i />{status}</span>
      <Button variant="ghost" size="icon" className="row-more" aria-label={`More options for ${title}`}><MoreHorizontal /></Button>
    </div>
  );
}