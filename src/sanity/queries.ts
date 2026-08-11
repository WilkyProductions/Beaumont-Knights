import type { Image } from "sanity";
import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import { scheduleEvents, type ScheduleEvent } from "@/data/schedule";

export interface RosterPlayer {
  id: string;
  name: string;
  division: "9U" | "10U";
  jerseyNumber?: string;
  position?: string;
  photo?: Image | null;
}

export interface GalleryPhoto {
  id: string;
  image: Image;
  caption?: string;
  takenAt?: string;
}

interface SanityEventDoc {
  _id: string;
  title: string;
  eventType: ScheduleEvent["type"];
  division: ScheduleEvent["division"];
  date: string;
  allDay?: boolean;
  startTime?: string;
  endTime?: string;
  location: string;
  address?: string;
  notes?: string;
}

function toScheduleEvent(doc: SanityEventDoc): ScheduleEvent {
  return {
    id: doc._id,
    title: doc.title,
    type: doc.eventType,
    division: doc.division,
    date: doc.date,
    startTime: doc.startTime ?? "00:00",
    endTime: doc.endTime,
    allDay: doc.allDay,
    location: doc.location,
    address: doc.address,
    notes: doc.notes,
  };
}

// Falls back to the static placeholder array (src/data/schedule.ts) until
// NEXT_PUBLIC_SANITY_PROJECT_ID is set, and again if the API call fails for
// any reason — the schedule should never go blank because of a CMS hiccup.
export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
  if (!isSanityConfigured) return scheduleEvents;
  try {
    const docs = await getClient().fetch<SanityEventDoc[]>(
      `*[_type == "event"] | order(date asc, startTime asc)`
    );
    if (docs.length === 0) return scheduleEvents;
    return docs.map(toScheduleEvent);
  } catch (err) {
    console.error("Sanity event fetch failed, using fallback schedule:", err);
    return scheduleEvents;
  }
}

export async function getRosterPlayers(division?: "9U" | "10U"): Promise<RosterPlayer[]> {
  if (!isSanityConfigured) return [];
  try {
    const filter =
      division ? `*[_type == "player" && division == $division]` : `*[_type == "player"]`;
    const docs = await getClient().fetch<RosterPlayer[]>(
      `${filter} | order(jerseyNumber asc) { "id": _id, name, division, jerseyNumber, position, photo }`,
      { division }
    );
    return docs;
  } catch (err) {
    console.error("Sanity roster fetch failed:", err);
    return [];
  }
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!isSanityConfigured) return [];
  try {
    const docs = await getClient().fetch<GalleryPhoto[]>(
      `*[_type == "photo"] | order(takenAt desc) { "id": _id, image, caption, takenAt }`
    );
    return docs;
  } catch (err) {
    console.error("Sanity photo fetch failed:", err);
    return [];
  }
}

