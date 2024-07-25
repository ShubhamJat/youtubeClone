export const API_KEY='AIzaSyDAOqabui6BHUuaTAt87Wa7CT8CWzVlBXE';



export const value_converter = (input) => {
    if(input>= 1000000){
        return Math.floor(input/1000000) + "M";
    }
    else if(input>= 1000){
        return Math.floor(input/1000) + "K";
    }
    else {
        return input;
    }
}