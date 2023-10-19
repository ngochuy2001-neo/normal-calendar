const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let present = new Date();
let currentMonth = present.getMonth();

let headerYear = present.getFullYear();

let headerMonth = months[currentMonth];

const renderCalendar = (month, year) => {
  console.log(months[month], year)
  let curMonthStart = new Date(year, month, 1).getDay();
  let curMonthLast = new Date(year, month + 1, 0).getDay();
  let curMonthLastDate = new Date(year, month + 1, 0).getDate();
  let prevMonthLastDate = new Date(year, month, 0).getDate();


  console.log(month)
  document.getElementById("calendarCurrentDate").innerHTML = months[month] + ", " + year;
  let calendar = ''
  let calendarElement = document.getElementById("dayList"); 
  for (let i = curMonthStart; i > 0; i --){
    calendar += `<li class="day inactive">${prevMonthLastDate - i + 1}</li>`
  }
  for (let i = 1; i <= curMonthLastDate; i++){
    calendar += `<li class="day">${i}</li>`;
  }
  for (let i = curMonthLast; i < 6; i++){
    calendar += `<li class="day inactive">${i - curMonthLast + 1}</li>`
  }
  calendarElement.innerHTML = calendar;
}

renderCalendar(currentMonth, headerYear);

let nextMonthBtn = document.getElementById("nextMonth");
let previousMonthBtn = document.getElementById("previousMonth");

nextMonthBtn.addEventListener("click", () => {
  currentMonth += 1;
  if(currentMonth > 11){
    currentMonth = 0;
    headerYear += 1;
  }
  console.log(currentMonth)
  renderCalendar(currentMonth, headerYear);
  addEventBtn();
})

previousMonthBtn.addEventListener("click", ()=>{
  currentMonth -= 1;
  if(currentMonth < 0){
    currentMonth = 11;
    headerYear -= 1;
  }
  console.log(currentMonth)
  renderCalendar(currentMonth, headerYear);
  addEventBtn();
})


const addEventBtn = () => {
  let dateElements = document.getElementsByClassName("day");
  let selectedDate = new Date()
  let selectedElements = null;
  let dateBox = document.getElementById("dateBox")

  Array.from(dateElements).forEach((element) => {
    element.addEventListener("click", (event) => {
      const isSameElement = selectedElements === element
      Array.from(dateElements).forEach((element) => {
        element.classList.remove("active");
      })

      if(!isSameElement){
        element.classList.add("active");
        selectedElements = element;
        dateBox.innerHTML = `${event.target.innerHTML}/${currentMonth}/${headerYear}`;
      }
      else{
        dateBox.innerHTML = "";
        selectedElements = null;
      }

      selectedDate = new Date(headerYear, currentMonth, parseInt(event.target.innerHTML));
      console.log(element.classList)
    });
  })
}

addEventBtn();