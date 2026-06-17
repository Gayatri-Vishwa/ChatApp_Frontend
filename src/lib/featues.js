import moment from "moment";

const fileFormat=(url)=>{
    const fileEx=url.split(".").pop().toLowerCase(); // to rreturn last eelmnt of this url
    if(fileEx==="mp4" || fileEx==="webm" || fileEx==="ogg"){
        console.log(url);
console.log(url.split(".").pop().toLowerCase());
        return"video"
    }
    if(fileEx==="mp3" || fileEx==="wav" ){
        return"audio"
    }
     if(fileEx==="png" || fileEx==="jpeg" || fileEx==="jpg" || fileEx==="gif" ){
        return"image"
    }
    return"file"
    
    
}

const transformImage=(url="",width=100)=>{

    // const newUrl= url.replace("upload", `upload/dpr_auto/w_${width}/`)

    // return newUrl
    return url
}

const getLast7Days=()=>{
const currentDate=moment()
const last7Days=[]

for(let i=0;i<7;i++){
    const dayDate= currentDate.clone().subtract(i,"days");
    const dayName=dayDate.format("dddd")
    last7Days.unshift(dayName)
}
return last7Days
}
const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};


export  {fileFormat,transformImage,getLast7Days,getOrSaveFromStorage}