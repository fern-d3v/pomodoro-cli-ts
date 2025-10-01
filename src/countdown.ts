// Pomodoro Timer - Step 2: Real Countdown!

enum TimerState {
  STOPPED = "Timer is not running",
  RUNNING = "Timer is currently running",
  PAUSED = "Timer is paused",
}

enum SessionType {
  WORK = "Work Session (25 minutes)",
  SHORT_BREAK = "Short break (5 minutes)",
  LONG_BREAK = "Long break (15 minutes)",
}

// Enhanced timer object
const timer = {
  state: TimerState.STOPPED as TimerState,
  currentSession: SessionType.WORK as SessionType,
  remainingSeconds: 0 as number, // Notice: using SECONDS now, not minutes!
  intervalId: null as NodeJS.Timeout | null, // This will hold our countdown
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60); // How many full minutes?
  const seconds = totalSeconds % 60; // Remaining seconds?

  // Format with leading zeros: "4:05" not "4:5"
  const minutesStr = minutes.toString();
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${minutesStr}:${secondsStr}`; // Return "minutes:seconds"
}

// TODO: Create the countdown function that runs every second
function tick(): void {
  if (timer.state !== TimerState.RUNNING) {
    return; // Only tick if we're running
  }

  timer.remainingSeconds--;

  // Show the countdown
  console.log(
    `⏰ ${timer.currentSession}: ${formatTime(timer.remainingSeconds)} remaining`,
  );

  // TODO: What happens when we reach 0?
  if (timer.remainingSeconds <= 0) {
    console.log("🎉 Session complete!");
    stopTimer(); // Stop the timer
  }
}

// TODO: Enhanced start function with real countdown
function startWorkSession(): void {
  timer.state = TimerState.RUNNING;
  timer.currentSession = SessionType.WORK;
  timer.remainingSeconds = 25 * 60; // Convert 25 minutes to seconds

  console.log("🍅 Work session started!");

  // Start the countdown! Run tick() every 1000ms (1 second)
  timer.intervalId = setInterval(tick, 1000);
}

function stopTimer(): void {
  timer.state = TimerState.STOPPED;
  timer.remainingSeconds = 0;

  // IMPORTANT: Stop the countdown!
  if (timer.intervalId) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }

  console.log("🛑 Timer stopped!");
}

// TODO: Test with a SHORT timer so we can see it complete
// Let's use 5 seconds instead of 25 minutes for testing!
function startTestTimer(): void {
  timer.state = TimerState.RUNNING;
  timer.currentSession = SessionType.WORK;
  timer.remainingSeconds = 5; // Just 5 seconds for testing

  console.log("🧪 Test timer started!");
  timer.intervalId = setInterval(tick, 1000);
}

// Test it!
startTestTimer();

