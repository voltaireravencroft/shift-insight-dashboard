'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type EventKind = 'THROUGHPUT' | 'DELAY';

export interface CreateEventInput {
  stationId: string;
  value: number;
  kind: EventKind;
  // include if your schema needs it; otherwise it’s fine to leave null
  shiftId?: string | null;
}

export type CreateEventResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createEvent(
  input: CreateEventInput
): Promise<CreateEventResult> {
  try {
    const { stationId, kind, value, shiftId = null } = input;

    if (!stationId || (kind !== 'THROUGHPUT' && kind !== 'DELAY') || !Number.isFinite(value)) {
      return { ok: false, error: 'Invalid input' };
    }

    await prisma.event.create({
      data: {
        stationId,
        kind,
        value,
        shiftId,
        happenedAt: new Date(),
      },
    });

    revalidatePath('/');
    return { ok: true };
  } catch (err: unknown) {                     // 👈 important: NOT `any`
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, error: message };
  }
}
