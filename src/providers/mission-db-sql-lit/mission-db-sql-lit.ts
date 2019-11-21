import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class MissionDbSqlLitProvider {

  private db : SQLiteObject;
  mission : any;
  constructor(private sqlLite :SQLite) {
    
  }

  initializeDataBase(){

    return this.sqlLite.create({name : 'RevealCrime.db' ,location : 'default' })
    .then((db : SQLiteObject)=>{
      this.db = db;
      // ----- create mission table ------ // params (id , name , description , date)
       this.db.executeSql('CREATE TABLE IF NOT EXISTS mission (id integer primary key, name text , description text)', [])
      .then((data)=>{
        console.log('after create table check data', data);
        console.log(data.rows)
      });
      
      // ----- create videos table ------- // params (videoid , videoname , mid , url , date )
       this.db.executeSql('CREATE TABLE IF NOT EXISTS videos (videoid integer primary key, videoname text, mid integer, url text, date text, foreign key(mid) references mission(id))',[])
      .then(data=>{
        console.log('after create table check data', data);
      })
      .catch(e=>{
        console.log(e , "videos");
      });
      // ----- create records table ------- //  params (recordid , recordname , mid , url , date)
      this.db.executeSql('CREATE TABLE IF NOT EXISTS records (recordid integer primary key, recordname text, mid integer, url text, date text, foreign key(mid)  references mission(id))',[])
      .then(data=>{
        console.log('after create table check data', data);
      })
      .catch(e=>{
        console.log(e , "record");
      });
      // ----- create photos table ------- //  params (photoid , photoname , mid , url , date)
      this.db.executeSql('CREATE TABLE IF NOT EXISTS photos (photoid integer primary key, photoname text, mid integer, url text, date, foreign key(mid)  references mission(id))',[])
      .then(data=>{
        console.log('after create table check data', data);
      })
      .catch(e=>{
        console.log(e , "photo");
      });
      // ----- create phone table ---------// params (phoneid , name , number , identiy)
      this.db.executeSql('CREATE TABLE IF NOT EXISTS phone (phoneid integer primary key, name text, number text, identiy text)',[])
      .then(data=>{
        console.log('after create table check data', data);
      })
      .catch(e=>{
        console.log(e , "phone");
      });

    });
  }

  // ---------------- get all missions --------------------- //
  getAllMissions(){

    return this.db.executeSql('select * from mission',[])
    .then(data=>{
      console.log("getting all missions",data);
      let missions = [];
      for(let i=0; i<data.rows.length; i++){
        console.log(data.rows.item(i));
        missions.push({name : data.rows.item(i).name , desc : data.rows.item(i).description , mid : data.rows.item(i).id });
      }
      return missions;
    })
    .catch(e=>{
      console.log(e);
    });
  }

  // -------------------- get a specific mission info by MissionName-------------- //
  getSpecificMission(MissionName){
    return this.db.executeSql('select * from mission where name =?',[MissionName])
    .then(data=>{
      let id : any;
      for(var i=0 ; i<data.rows.length ; i++){
        id = {name : data.rows.item(i).name, desc : data.rows.item(i).description ,    id : data.rows.item(i).id };
      }
      return id;
    })
    .catch(err=>{
      console.log(err,"getSpecificMission");
    })
  }

  // ---------------- get all videos ---------------- //
  getvideos(id){

    return this.db.executeSql('select * from videos  where mid=?',[id])
    .then(data=>{
      let Mission_videos = [];
      for(var i=0;i<data.rows.length;i++){
        Mission_videos.push({name : data.rows.item(i).videoname , url : data.rows.item(i).url , videoid : data.rows.item(i).videoid });
      }
      return Mission_videos;
    })
    .catch(e=>{
      console.log(e , "videos error");
    });
  }

  // ---------------- get all records --------------------- //
  getrecords(id){

    return this.db.executeSql('select * from records  where mid=?',[id])
    .then(data=>{
      let Mission_records = [];
      for(var i=0; i<data.rows.length; i++){
        Mission_records.push({name : data.rows.item(i).recordname , url : data.rows.item(i).url , recordid : data.rows.item(i).recordid });
      }
      return Mission_records;
    })
    .catch(e=>{
      console.log(e , "records error");
    });
  }

  // ---------------- get all photos --------------------- //
  getphotos(id){

    return this.db.executeSql('select * from photos  WHERE mid=?',[id])
    .then(data=>{
      let Mission_photos = [];
      for(var i=0;i<data.rows.length;i++){
        Mission_photos.push({name : data.rows.item(i).photoname , url : data.rows.item(i).url , photoid : data.rows.item(i).photoid });
      }
      return Mission_photos;
    })
    .catch(e=>{
      console.log(e , "photos error");
    });
  }

  // --------------- getting phoneList --------------- //
  getphoneList(){

    return this.db.executeSql('select * from phone',[])
    .then(data=>{
      let phones = [];
      for(var i=0;i<data.rows.length;i++){
        phones.push({name : data.rows.item(i).name , number : data.rows.item(i).number , identity : data.rows.item(i).identity , phoneid : data.rows.item(i).phoneid});
      }
      return phones;
    })
    .catch(e=>{
      console.log(e , "phoneList error");
    });
  }



  // -------------------- insert a mission --------------- //
  InsertAmission( mission : any){
    let name = mission.name;
    let desc = mission.description;
    return this.db.executeSql('INSERT INTO mission VALUES(null,?,?)',[ name , desc])
    .then(res=>{
      console.log("inserted successfully",res);
    })
    .catch(e=>{
      console.log(e);
    });

  }
  // -------------------- insert a video --------------- //
  InsertAvideo( missionid , videoName , VideoUrl , date){

    let mid = missionid;
    return this.db.executeSql('INSERT INTO videos VALUES(null,?,?,?,?)',[ videoName, mid, VideoUrl, date])
    .then(res=>{
      console.log("inserted successfully",res);
    })
    .catch(e=>{
      console.log(e);
    });

  }
    // -------------------- insert a record --------------- //
    InsertArecord( missionid , recordName , recordUrl , date){

      let mid = missionid;
      console.log(mid , " inserting record");
      return this.db.executeSql('INSERT INTO records VALUES(null,?,?,?,?)',[ recordName ,mid , recordUrl, date ])
      .then(res=>{
        console.log("inserted successfully",res);
      })
      .catch(e=>{
        console.log(e);
      });
  
    }
      // -------------------- insert a photo --------------- //
  InsertAphoto( missionid , photoName , photoUrl , date){

    let mid = missionid;
    return this.db.executeSql('INSERT INTO photos VALUES(null,?,?,?,?)',[photoName, mid, photoUrl,date])
    .then(res=>{
      console.log("inserted successfully",res);
    })
    .catch(e=>{
      console.log(e);
    });
  }
  
  // ---------------------- insert a phonenumber ------------- //
  InsertAphoneNumber(name , number , identity){
    return this.db.executeSql('INSERT INTO phone VALUES(null,?,?,?)',[name, number, identity])
    .then(res=>{
      console.log("inserted successfully",res);
    })
    .catch(e=>{
      console.log(e);
    });
  }

}