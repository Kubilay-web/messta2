import { validateRequest } from "@/app/auth";
import { getOwnerAppointments, getRequesterAppointments } from "../../data";
import { getAvailability } from "../../appointments";
import AppointmentRow from "../../components/appointment-row";
import AppointmentCalendar, { type CalAppt } from "../../components/appointment-calendar";
import AvailabilityEditor from "../../components/availability-editor";

export const dynamic = "force-dynamic";

export default async function RandevularPage() {
  const { user } = await validateRequest();
  if (!user) return null;

  const [incoming, outgoing, availability] = await Promise.all([
    getOwnerAppointments(user.id),
    getRequesterAppointments(user.id),
    getAvailability(user.id),
  ]);

  const calAppts: CalAppt[] = [
    ...incoming.map((a): CalAppt => ({
      id: a.id,
      date: a.scheduledAt.toISOString(),
      title: a.listing?.title ?? "İlan",
      mode: a.mode,
      status: a.status,
      role: "owner",
      otherName: a.requester?.displayName || a.requester?.username || "Üye",
    })),
    ...outgoing.map((a): CalAppt => ({
      id: a.id,
      date: a.scheduledAt.toISOString(),
      title: a.listing?.title ?? "İlan",
      mode: a.mode,
      status: a.status,
      role: "requester",
      otherName: a.owner?.displayName || a.owner?.username || "Üye",
    })),
  ];

  return (
    <div className="space-y-6">
      <AvailabilityEditor
        initial={
          availability
            ? {
                slotMinutes: availability.slotMinutes,
                leadHours: availability.leadHours,
                maxDaysAhead: availability.maxDaysAhead,
                rules: (availability.rules as any) ?? [],
                blockedDates: (availability.blockedDates as any) ?? [],
                timezone: availability.timezone,
                autoConfirmVideo: availability.autoConfirmVideo,
                autoConfirmFaceToFace: availability.autoConfirmFaceToFace,
                maxPerDay: availability.maxPerDay,
              }
            : null
        }
      />

      {calAppts.length > 0 && (
        <div className="flex justify-end">
          <a
            href="/sahibinden/api/appointments/ical"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            📅 Takvime aktar (.ics)
          </a>
        </div>
      )}

      {calAppts.length > 0 && <AppointmentCalendar appts={calAppts} />}

      <div>
        <h1 className="mb-3 text-xl font-bold text-gray-800">Gelen Randevu Talepleri ({incoming.length})</h1>
        {incoming.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
            İlanlarınıza henüz randevu talebi yok.
          </p>
        ) : (
          <div className="space-y-3">
            {incoming.map((a) => (
              <AppointmentRow key={a.id} appt={a} role="owner" />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold text-gray-800">Aldığım Randevular ({outgoing.length})</h2>
        {outgoing.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
            Henüz randevu talebiniz yok.
          </p>
        ) : (
          <div className="space-y-3">
            {outgoing.map((a) => (
              <AppointmentRow key={a.id} appt={a} role="requester" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
