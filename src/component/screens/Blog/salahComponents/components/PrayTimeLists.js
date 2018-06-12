import React from 'react';
import { View, StyleSheet } from 'react-native';
import PrayTimeItem from './PrayTimeItem';
import PrayTimeItemChosen from './PrayTimeItemChosen';
import Header from './Header';
import prayNames from '../constants/prayNames';
import prayIcons from '../constants/prayicons';
import colors from '../constants/colors';
import moment from 'moment';
//import newTimes from 'blog/src/component/screens/salahComponents/salahTimes/salah_jan.json';





//import salahjson from '../salahTimes/salah_apr.json';


export default class PrayTimeLists extends React.Component {
    render() {


var month = new Date().getMonth()+1;
var day = new Date().getDate();

var newTimes;

if(month == '1'){
 newTimes = require('./salahtimes/salah_jan.json');

}

else if(month == '2'){
 newTimes = require( './salahtimes/salah_feb.json');

}

else if(month == '3'){
 newTimes = require('./salahtimes/salah_mrch.json');

}

else if(month == '4'){
 newTimes = require( './salahtimes/salah_apr.json');

}

else if(month == '5'){
 newTimes = require('./salahtimes/salah_may.json');

}

else if(month == '6'){
 newTimes = require('./salahtimes/salah_jun.json');

}


else if(month == '7'){
 newTimes = require( './salahtimes/salah_jul.json');

}


else if(month == '8'){
 newTimes = require('./salahtimes/salah_aug.json');

}

else if(month == '9'){
 newTimes = require('./salahtimes/salah_sep.json');

}

else if(month == '10'){
 newTimes = require('./salahtimes/salah_oct.json');

}

else if(month == '11'){
 newTimes = require('./salahtimes/salah_nov.json');

}

else if(month == '12'){
 newTimes = require( './salahtimes/salah_dec.json');
}


var a = moment().format('HH:mm');
var newsalah = newTimes[day+1];
var mysalahtime = newTimes[day-1]




        const lists = Object.keys((newTimes[day-1])).map(key => {
            const _name = prayNames[key];
            if (

                key === "imsak" || key === "sunset" || key === "midnight" || key === "sunrise"

                || key === "zuhurjamat" || key === "day" || key === "sehri" || key == "fajrjamat"

                || key === "asrjamat" || key === "ishaend" || key === "zawal"

                ) {
                return;
            }
 


if(key === "fajrstart" &&

                (moment.utc(moment(a,"HH:mm")).isBefore(moment(newTimes[day-1].zuhurstart,"HH:mm")))

                &&
                (moment.utc(moment(a,"HH:mm")).isAfter(moment(newTimes[day-1].fajrstart,"HH:mm")))

                || (moment.utc(moment(a,"HH:mm")).isSame(moment(newTimes[day-1].fajrstart,"HH:mm")))


    ){

var jamat = mysalahtime.fajrjamat;

            return <PrayTimeItemChosen key={key} name={_name} time={newTimes[day-1][key]} jamatTime={jamat}  icon={prayIcons[key][1]} />

       
          
  }else{


if(key === "fajrstart"){
            return <PrayTimeItem key={key} name={_name} time={newTimes[day-1][key]} icon={prayIcons[key][0]} />

 }
  }

  if(key === "zuhurstart" &&

                (moment.utc(moment(a,"HH:mm")).isBefore(moment(newTimes[day-1].asrstart,"HH:mm")))

                &&
                (moment.utc(moment(a,"HH:mm")).isAfter(moment(newTimes[day-1].zuhurstart,"HH:mm")))

                || (moment.utc(moment(a,"HH:mm")).isSame(moment(newTimes[day-1].zuhurstart,"HH:mm")))


    ){

var jamat = mysalahtime.zuhurjamat;

            return <PrayTimeItemChosen key={key} name={_name} time={newTimes[day-1][key]} jamatTime={jamat}  icon={prayIcons[key][1]} />

       


          
  }else{
    if(key === "zuhurstart"){

            return <PrayTimeItem key={key} name={_name} time={newTimes[day-1][key]} icon={prayIcons[key][0]} />
}
  }




if(key === "asrstart" &&

                (moment.utc(moment(a,"HH:mm")).isBefore(moment(newTimes[day-1].magribstart,"HH:mm")))

                &&
                (moment.utc(moment(a,"HH:mm")).isAfter(moment(newTimes[day-1].asrstart,"HH:mm")))

                || (moment.utc(moment(a,"HH:mm")).isSame(moment(newTimes[day-1].asrstart,"HH:mm")))


    ){


var jamat = mysalahtime.asrjamat;
//alert(JSON.stringify(jamat)); 
            return <PrayTimeItemChosen key={key} name={_name} time={newTimes[day-1][key]} jamatTime={jamat}  icon={prayIcons[key][1]} />

     return <Header jamatTime={jamat}/>
          
  }else{

if(key === "asrstart"){
            return <PrayTimeItem key={key} name={_name} time={newTimes[day-1][key]} icon={prayIcons[key][0]} />

        

 }

  }





if(key === "magribstart" &&


                (moment.utc(moment(a,"HH:mm")).isBefore(moment(newTimes[day-1].ishastart,"HH:mm")))

                &&
                (moment.utc(moment(a,"HH:mm")).isAfter(moment(newTimes[day-1].magribstart,"HH:mm")))

                || (moment.utc(moment(a,"HH:mm")).isSame(moment(newTimes[day-1].magribstart,"HH:mm")))


    ){

var jamat = mysalahtime.magribstart;

            return <PrayTimeItemChosen key={key} name={_name} time={newTimes[day-1][key]} jamatTime={jamat}  icon={prayIcons[key][1]} />

          
  }else{
  if(key === "magribstart"){
            return <PrayTimeItem key={key} name={_name} time={newTimes[day-1][key]} icon={prayIcons[key][0]} />
}
  }



    if(key === "ishastart" &&


                (moment.utc(moment(a,"HH:mm")).isAfter(moment(newTimes[day-1].ishastart,"HH:mm")))

                || 
                (moment.utc(moment(a,"HH:mm")).isSame(moment(newTimes[day-1].ishastart,"HH:mm"))) 

                ||

                  (moment.utc(moment(a,"HH:mm")).isBefore(moment(newTimes[day-1].fajrstart,"HH:mm")))


    ){


       var jamat = mysalahtime.ishaend;

            return <PrayTimeItemChosen key={key} name={_name} time={newTimes[day-1][key]} jamatTime={jamat}  icon={prayIcons[key][1]} />


          
  }else{
if(key === "ishastart"){
            return <PrayTimeItem key={key} name={_name} time={newTimes[day-1][key]} icon={prayIcons[key][0]} />

  }
  }






        })
        return (
            <View>
                {lists}
                 
            </View>
        )
    }
}

