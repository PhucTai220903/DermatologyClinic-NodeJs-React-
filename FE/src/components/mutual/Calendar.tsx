import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuth } from "../../hooks/useAuth";
import ScheduleAPI from "../../api/schedule.api";
import { showSuccessToast, showErrorToast } from "../../utils/toast.util";

interface EventType {
  schedule_date: string;
  status: string;
}

const Calendar: React.FC = () => {
  const [apiEvents, setApiEvents] = useState<EventType[]>([]);
  const [userEvents, setUserEvents] = useState<EventType[]>([]);
  let { user } = useAuth();
  let clickTimeout: NodeJS.Timeout | null = null;

  const today = new Date().toISOString().split("T")[0];

  const handleDateClick = (dateStr: string) => {
    if (dateStr < today) return; // Không cho phép chọn ngày trong quá khứ

    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      handleRemoveEvent(dateStr);
    } else {
      clickTimeout = setTimeout(() => {
        handleAddEvent(dateStr);
        clickTimeout = null;
      }, 200);
    }
  };

  // Xử lý thêm sự kiện do người dùng chọn
  const handleAddEvent = (dateStr: string) => {
    if (!userEvents.some((event) => event.schedule_date === dateStr)) {
      setUserEvents([
        ...userEvents,
        { schedule_date: dateStr, status: "user_selected" },
      ]);
    }
  };

  // Xử lý xóa sự kiện do người dùng chọn
  const handleRemoveEvent = (dateStr: string) => {
    setUserEvents(
      userEvents.filter((event) => event.schedule_date !== dateStr)
    );
  };

  const handleSave = async () => {
    try {
      const response = await ScheduleAPI.add(userEvents);
      if (response.status === 200) {
        showSuccessToast(response.data.message);
      } else {
        showErrorToast(response.data.message);
      }
    } catch (error) {
      showErrorToast("Có lỗi xảy ra khi lưu sự kiện.");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await ScheduleAPI.getByDoctorId(user.id);
        if (response.status === 200) {
          // Lấy tất cả schedule từ danh sách
          const formattedEvents = response.data.flatMap((scheduleGroup: any) =>
            scheduleGroup.schedules.map((schedule: any) => ({
              schedule_date: schedule.schedule_date.split("T")[0], // Chuyển thành "YYYY-MM-DD"
              status: schedule.status, // Lưu trạng thái
            }))
          );

          setApiEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sự kiện từ API:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <h2>Lịch sự kiện</h2>
      <button className="btn btn-primary" onClick={handleSave}>
        Lưu
      </button>

      {/* Hiển thị FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        validRange={{ start: today }}
        events={[
          // Sự kiện từ API (màu theo trạng thái)
          ...apiEvents.map((event) => ({
            date: event.schedule_date,
            display: "background",
            backgroundColor: event.status === "available" ? "green" : "gray",
            allDay: true,
          })),
          // Sự kiện do người dùng chọn (màu đỏ)
          ...userEvents.map((event) => ({
            date: event.schedule_date,
            display: "background",
            backgroundColor: "red",
            allDay: true,
          })),
        ]}
        dateClick={(info) => handleDateClick(info.dateStr)}
        dayMaxEventRows={true}
      />
    </div>
  );
};

export default Calendar;
