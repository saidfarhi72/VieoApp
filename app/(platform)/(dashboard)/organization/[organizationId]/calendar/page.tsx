
'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';



const CalendarPage =  () => {
  const [events, setEvents] = React.useState<any[]>([]);

  const { data: event } = useQuery<any>({
    queryKey: ["event", 1],
    queryFn: () => fetcher(`/api/event`),
  });

 

  console.log("event",event)
  
  const eventContent = (arg:any) => {
    const eventEndTime = new Date(arg.event.end);
    
    console.log("arg,argargargargargargargargargargarg",arg,arg.event.end);

    const currentTime = new Date();
    const isFinished = eventEndTime < currentTime;
    console.log("isFinishedisFinishedisFinishedisFinishedisFinished",isFinished)
    //const eventClass = isFinished ? "text-red-500 text-base-200 bg-error" : " ";
    const eventClass = isFinished ? "bg-red-500 text-red-500 " : "bg-green-500 ";
    if (isFinished) {
      return (
        <div
          className={`fc-event-main bg-red-500 py-4 px-4 break-words  w-full flex items-center space-x-6  rounded-md`}
        >
          <div className='break-normal whitespace-normal'>{arg.event.title}</div>
        </div>
      );
    }
    
    return (
      <div
        className={`fc-event-main ${eventClass} py-4 px-4 break-words  w-full flex items-center space-x-6  rounded-md`}
      >
        <div className='break-normal whitespace-normal'>{arg.event.title}</div>
      </div>
    );

  };


  

      return  (
        <div className='w-full' >


      <div className="mx-8">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height={"90vh"}
              
              events={event}
              eventContent={eventContent}

          
            />
          </div>
        </div>
      )
    
  }
  
  export default CalendarPage

  /*  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }
  
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });*/