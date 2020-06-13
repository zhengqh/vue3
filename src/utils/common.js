export function timestampToTime(timestamp) {
    let now = new Date(timestamp*1000);
    let year = now.getFullYear();    
    let month = now.getMonth()+1;    
    let date = now.getDate();    
    let hour = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();    
    let minute = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();    
    let second = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds();    
    return year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
}