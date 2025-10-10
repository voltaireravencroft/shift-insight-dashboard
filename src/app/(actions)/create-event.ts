'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

type NewEvent = {
  stationId: string;
  kind: 'THROUGHPUT' | 'DELAY';
  value: number;
};

// return a small discriminated union so the client can react if needed
type CreateEventResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createEvent(
  input: NewEvent
): Promise<CreateEventResult> {
  try {
    const { stationId, kind, value } = input;

    if (!stationId || !kind || Number.isNaN(value)) {
      return { ok: false, error: 'Invalid input' };
    }

    // If you have a real shift id, use it; otherwise seed created one or null
    await prisma.event.create({
      data: {
        stationId,
        kind,
        value,
        happenedAt: new Date(),
        // shiftId: <put a real shift id if required by your schema>
      },
    });

    // Refresh data on the dashboard
    revalidatePath('/');

    return { ok: true };
  } catch (err) {
    // never type catch param as `any`; treat it as unknown
    const msg =
      err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, error: msg };
  }
}
