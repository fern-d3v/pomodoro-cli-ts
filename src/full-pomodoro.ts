// Complete Pomodoro Timer - Full Cycle with Auto-Transitions!

enum TimerState {
  STOPPED = "Timer is not running",
  RUNNING = "Timer is currently running",
  PAUSED = "Timer is paused",
}

enum SessionType {
  WORK = "Work Session",
  SHORT_BREAK = "Short Break",
  LONG_BREAK = "Long Break",
}

// Enhanced timer with session tracking
const pomodoro = {
  state: TimerState.STOPPED as TimerState,
  currentSession: SessionType.WORK as SessionType,
  remainingSeconds: 0 as number,
  intervalId: null as NodeJS.Timeout | null,

  // NEW: Track completed work sessions for long break logic
  completedWorkSessions: 0 as number, // How many work sessions done?
  sessionsUntilLongBreak: 4 as number, // Work sessions before long break (usually 4)
};

// Session durations (we'll use short times for testing!)
const SESSION_DURATIONS = {
  WORK: 3,
  SHORT_BREAK: 2,
  LONG_BREAK: 4,
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();
  return `${minutes}:${secondsStr}`;
}

function tick(): void {
  if (pomodoro.state !== TimerState.RUNNING) return;

  pomodoro.remainingSeconds--;

  // Show countdown with session info
  const sessionInfo = `${pomodoro.currentSession} (${pomodoro.completedWorkSessions}/4 work sessions completed)`;
  console.log(
    `⏰ ${sessionInfo}: ${formatTime(pomodoro.remainingSeconds)} remaining`,
  );

  // When session completes, auto-transition!
  if (pomodoro.remainingSeconds <= 0) {
    completeCurrentSession();
  }
}

function completeCurrentSession(): void {
  console.log(`🎉 ${pomodoro.currentSession} complete!`);

  // If we just finished a WORK session
  if (pomodoro.currentSession === SessionType.WORK) {
    pomodoro.completedWorkSessions++;

    // Check if it's time for a long break
    if (pomodoro.completedWorkSessions >= pomodoro.sessionsUntilLongBreak) {
      console.log("🌴 Time for a long break! You've earned it!");
      startSession(SessionType.LONG_BREAK, SESSION_DURATIONS.LONG_BREAK);
      pomodoro.completedWorkSessions = 0; // Reset counter
    } else {
      console.log("☕ Time for a short break!");
      startSession(SessionType.SHORT_BREAK, SESSION_DURATIONS.SHORT_BREAK);
    }
  }
  // If we just finished a break (short or long)
  else {
    console.log("🍅 Back to work!");
    startSession(SessionType.WORK, SESSION_DURATIONS.WORK);
  }
}

function startSession(sessionType: SessionType, durationSeconds: number): void {
  // Stop any existing timer
  if (pomodoro.intervalId) {
    clearInterval(pomodoro.intervalId);
  }

  // Set up new session
  pomodoro.state = TimerState.RUNNING;
  pomodoro.currentSession = sessionType;
  pomodoro.remainingSeconds = durationSeconds;

  // Start the countdown
  pomodoro.intervalId = setInterval(tick, 1000);

  console.log(
    `\n🚀 Starting ${sessionType}! Duration: ${formatTime(durationSeconds)}`,
  );
}

function startPomodoro(): void {
  console.log("🍅 Welcome to the Pomodoro Techsique!");
  console.log(
    "Work sessions: 25 minutes | Short breaks: 5 minutes | Long break every 4 work sessions",
  );

  startSession(SessionType.WORK, SESSION_DURATIONS.WORK);
}

function pausePomodoro(): void {
  pomodoro.state = TimerState.PAUSED;
  console.log("⏸️ Pomodoro paused!");
}

function resumePomodoro(): void {
  if (pomodoro.state === TimerState.PAUSED) {
    pomodoro.state = TimerState.RUNNING;
    console.log("▶️ Pomodoro resumed!");
  }
}

function stopPomodoro(): void {
  pomodoro.state = TimerState.STOPPED;
  if (pomodoro.intervalId) {
    clearInterval(pomodoro.intervalId);
    pomodoro.intervalId = null;
  }
  pomodoro.remainingSeconds = 0;
  pomodoro.completedWorkSessions = 0;
  console.log("🛑 Pomodoro stopped! Great work today!");
}

// Initialize and start!
pomodoro.completedWorkSessions = 0;
pomodoro.sessionsUntilLongBreak = 4;

console.log("=".repeat(50));
console.log("🍅 COMPLETE POMODORO TIMER 🍅");
console.log("=".repeat(50));

startPomodoro();

