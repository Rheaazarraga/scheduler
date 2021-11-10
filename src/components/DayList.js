import React from "react";
import DayListItem from "./DayListItem";


// --------------- Component Function --------------- //

export default function DayList(props) {

const DayListItems = props.days.map(day => {
  return <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}/>
});
// --------------- DayList component ---------------  //

  return (
    <ul>
    {DayListItems}
  </ul>
  );
}