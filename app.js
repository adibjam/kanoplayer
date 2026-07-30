document
.getElementById("createBtn")
.addEventListener(
    "click",
    createKanoFile
);



async function createKanoFile(){


    try{


        /*
        دریافت اطلاعات سازنده
        */


        let creator =
            document
            .getElementById("creator")
            .value
            .trim();



        let telegram =
            document
            .getElementById("telegram")
            .value
            .trim();



 let password = document.getElementById("password").value.trim();

let flags = 0;

if (password.length > 0) {

    if (password.length < 6) {
        alert("رمز باید حداقل ۶ کاراکتر باشد");
        return;
    }

    flags = 1;

} else {

    password = "simple.kano.player::KANO_PUBLIC_V1";
    flags = 0;

}





        let filename =
            document
            .getElementById("filename")
            .value
            .trim();



        let jsonText =
            document
            .getElementById("json")
            .value
            .trim();



        /*
        بررسی رمز
        */


if(password.length > 0 && password.length < 6){

    alert("رمز باید حداقل ۶ کاراکتر باشد");

    return;

}



        /*
        بررسی JSON
        */


        try{

            JSON.parse(jsonText);

        }
        catch(e){

            alert(
                "JSON وارد شده صحیح نیست"
            );

            return;

        }




        /*
        ساخت فایل KANO
        */


let kanoData =
    await KanoFile.create(

        jsonText,
        creator,
        telegram,
        password,
        flags

    );





        /*
        تبدیل به فایل
        */


        let blob =
            new Blob(

                [
                    kanoData
                ],

                {
                    type:
                    "application/kano"
                }

            );




        /*
        دانلود
        */


        let url =
            URL.createObjectURL(blob);



        let a =
            document.createElement("a");



        a.href = url;



        if(!filename){

            filename="config";

        }


        a.download =
            filename + ".kano";



        document
        .body
        .appendChild(a);



        a.click();



        a.remove();



        URL.revokeObjectURL(url);



        alert(
            "فایل KANO با موفقیت ساخته شد"
        );



    }
    catch(error){


        console.error(error);


        alert(
            "خطا در ساخت فایل KANO"
        );


    }


}
