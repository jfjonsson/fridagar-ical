const fridagar = require('fridagar');
const iCal = require('ical-generator');
const readline = require("readline");
const fs = require('fs');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calendar = iCal({
    name: 'Frídagar',
    timezone: 'Atlantic/Reykjavik',
    prodId: { company: 'github.com/jfjonsson', product: 'fridagar-ical' }
});

console.log('Generate calendar.  📆');
rl.question('year: ', (year) => {
    const days = fridagar.getAllDays(year);

    days.forEach(({ date, description, }) => {
        calendar.createEvent({
            allDay: true,
            start: new Date(date),
            summary: description,
        });
    });
    rl.close();

    fs.writeFile(`fridagar-${year}.ics`, calendar.toString(), (err) => {
      if (err) return console.log(err);
    });
});

