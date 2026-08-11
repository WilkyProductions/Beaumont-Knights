// Placeholder season calendar — see SITE-PLAN.md §14.2.
// Replace with real dates once the board/coaches confirm the season, then
// move this into the CMS described in SITE-PLAN.md §10 so coaches can edit
// it themselves without a developer.

export type EventType =
  | "Tryout"
  | "Practice"
  | "Game"
  | "Tournament"
  | "Team Event";

export type Division = "9U" | "10U" | "Both";

export interface ScheduleEvent {
  id: string;
  title: string;
  type: EventType;
  division: Division;
  date: string; // ISO date, e.g. "2026-08-23"
  startTime: string; // "09:00"
  endTime?: string; // "11:00"
  allDay?: boolean;
  location: string;
  address?: string;
  notes?: string;
  recentlyUpdated?: boolean;
}

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "tryout-9u-2026-08-23",
    title: "9U Tryout",
    type: "Tryout",
    division: "9U",
    date: "2026-08-23",
    startTime: "09:00",
    endTime: "11:00",
    location: "Beaumont Sports Park, Field 1",
    notes:
      "Bring your glove, bat, and cleats. Arrive 15 minutes early to check in.",
  },
  {
    id: "tryout-10u-2026-08-23",
    title: "10U Tryout",
    type: "Tryout",
    division: "10U",
    date: "2026-08-23",
    startTime: "11:30",
    endTime: "13:30",
    location: "Beaumont Sports Park, Field 1",
    notes:
      "Bring your glove, bat, and cleats. Arrive 15 minutes early to check in.",
  },
  {
    id: "practice-9u-2026-08-26",
    title: "9U Practice",
    type: "Practice",
    division: "9U",
    date: "2026-08-26",
    startTime: "17:30",
    endTime: "19:00",
    location: "Beaumont Sports Park, Field 2",
    notes: "First practice of the season — team assignments announced.",
  },
  {
    id: "practice-10u-2026-08-28",
    title: "10U Practice",
    type: "Practice",
    division: "10U",
    date: "2026-08-28",
    startTime: "17:30",
    endTime: "19:00",
    location: "Beaumont Sports Park, Field 2",
    notes: "First practice of the season — team assignments announced.",
  },
  {
    id: "social-2026-08-30",
    title: "Team Kickoff & Ice Cream Social",
    type: "Team Event",
    division: "Both",
    date: "2026-08-30",
    startTime: "18:00",
    endTime: "19:30",
    location: "Beaumont Sports Park Pavilion",
    notes:
      "Meet your coaches and teammates — ice cream sundae bar for the whole family.",
  },
  {
    id: "practice-9u-2026-09-02",
    title: "9U Practice",
    type: "Practice",
    division: "9U",
    date: "2026-09-02",
    startTime: "17:30",
    endTime: "19:00",
    location: "Beaumont Sports Park, Field 2",
  },
  {
    id: "practice-10u-2026-09-04",
    title: "10U Practice",
    type: "Practice",
    division: "10U",
    date: "2026-09-04",
    startTime: "17:30",
    endTime: "19:00",
    location: "Beaumont Sports Park, Field 2",
  },
  {
    id: "game-9u-2026-09-13",
    title: "9U vs. TBD Opponent",
    type: "Game",
    division: "9U",
    date: "2026-09-13",
    startTime: "08:00",
    endTime: "13:00",
    location: "Away — opponent TBD",
    notes: "First game of the season.",
  },
  {
    id: "game-10u-2026-09-13",
    title: "10U vs. TBD Opponent",
    type: "Game",
    division: "10U",
    date: "2026-09-13",
    startTime: "08:00",
    endTime: "13:00",
    location: "Away — opponent TBD",
    notes: "First game of the season.",
  },
  {
    id: "tournament-2026-09-20",
    title: "Season-Opening Tournament",
    type: "Tournament",
    division: "Both",
    date: "2026-09-20",
    startTime: "08:00",
    allDay: true,
    location: "Location TBD",
    notes: "Details to follow.",
  },
];

export function getUpcomingEvents(count = 3): ScheduleEvent[] {
  const now = Date.now();
  return [...scheduleEvents]
    .filter((e) => new Date(`${e.date}T${e.startTime}`).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.startTime}`).getTime() -
        new Date(`${b.date}T${b.startTime}`).getTime()
    )
    .slice(0, count);
}

export function sortedEvents(): ScheduleEvent[] {
  return [...scheduleEvents].sort(
    (a, b) =>
      new Date(`${a.date}T${a.startTime}`).getTime() -
      new Date(`${b.date}T${b.startTime}`).getTime()
  );
}
